import { existsSync, promises as fs } from "fs";
import { dirname, isAbsolute, join, relative, resolve } from "path";
import { glob } from "glob";

/**
 * Common regex patterns for file processing
 */
export const REGEX_PATTERNS = {
	// File extensions
	svelteFile: /\.svelte$/,
	svelteTs: /\.svelte\.ts$/,
	tsFile: /\.ts$/,
	supportedFiles: /\.(svelte\.ts|svelte|ts)$/,

	// Export detection
	defaultExport: /export\s+default\s+/,
	svelteDefaultExport: /<script[^>]*>\s*export\s+default/,

	// File naming
	testFiles: /\.(test|spec)\./,
	barrelFiles: /^index\.ts$/,
	configFiles: /\.(css|json|config\.)$/,

	// Case conversion
	caseDelimiters: /[-_.\s]+/,
	camelCaseBoundary: /([a-z])([A-Z])/g,
} as const;

/**
 * Universal file information interface
 */
export interface FileInfo {
	name: string;
	path: string;
	relativePath: string;
	depth: number;
	hierarchy: string[]; // ['components', 'atoms', 'button']
	exportType: "default" | "named";
	fileType: string;
}

/**
 * Universal folder structure interface
 */
export interface FolderStructure {
	files: Map<string, FileInfo[]>; // hierarchy key -> files ("components.atoms", "utils")
	depthMap: Map<number, Map<string, FileInfo[]>>; // depth -> name -> files
}

/**
 * Core scanning options
 */
export interface ScanOptions {
	maxDepth?: number;
	includeFileTypes?: string[];
	excludePatterns?: RegExp[];
	includeDotFiles?: boolean;
}

/**
 * Internal scanning result
 */
interface ScanResult {
	files: Array<{
		path: string;
		relativePath: string;
		depth: number;
		hierarchy: string[];
		name: string;
		extension: string;
	}>;
	directories: Array<{
		path: string;
		name: string;
		depth: number;
		hierarchy: string[];
	}>;
}

/**
 * Core scanning engine - discovers all files and folders recursively
 */
export async function scanFolders(
	rootPath: string,
	options: ScanOptions = {},
): Promise<ScanResult> {
	const {
		maxDepth = Infinity,
		includeFileTypes = [],
		excludePatterns = [],
		includeDotFiles = false,
	} = options;

	const absoluteRootPath = isAbsolute(rootPath)
		? rootPath
		: resolvePath(rootPath);

	if (!(await fileExists(absoluteRootPath))) {
		throw new Error(`Directory not found: ${absoluteRootPath}`);
	}

	const result: ScanResult = {
		files: [],
		directories: [],
	};

	await scanRecursively(
		absoluteRootPath,
		absoluteRootPath,
		[],
		0,
		result,
		{
			maxDepth,
			includeFileTypes,
			excludePatterns,
			includeDotFiles,
		},
	);

	return result;
}

/**
 * Recursive scanning implementation (private)
 */
export async function scanRecursively(
	currentPath: string,
	rootPath: string,
	hierarchy: string[],
	depth: number,
	result: ScanResult,
	options: Required<ScanOptions>,
): Promise<void> {
	if (depth > options.maxDepth) return;

	const entries = await fs.readdir(currentPath, { withFileTypes: true });

	for (const entry of entries) {
		const entryPath = join(currentPath, entry.name);
		const relativePath = relative(rootPath, entryPath).replace(/\\/g, "/");

		// Skip dot files unless explicitly included
		if (!options.includeDotFiles && entry.name.startsWith(".")) continue;

		// Skip excluded patterns
		if (options.excludePatterns.some((pattern) => pattern.test(entry.name))) {
			continue;
		}

		// Skip barrel files and config files
		if (
			REGEX_PATTERNS.barrelFiles.test(entry.name) ||
			REGEX_PATTERNS.configFiles.test(entry.name)
		) {
			continue;
		}

		if (entry.isDirectory()) {
			// Record directory
			result.directories.push({
				path: entryPath,
				name: entry.name,
				depth,
				hierarchy: [...hierarchy],
			});

			// Recurse into subdirectory
			await scanRecursively(
				entryPath,
				rootPath,
				[...hierarchy, entry.name],
				depth + 1,
				result,
				options,
			);
		} else if (entry.isFile()) {
			const extension = entry.name.substring(entry.name.lastIndexOf("."));

			// Filter by file types if specified
			if (options.includeFileTypes.length > 0) {
				const matchesType = options.includeFileTypes.some((type) =>
					entry.name.endsWith(type)
				);
				if (!matchesType) continue;
			}

			// Record file
			result.files.push({
				path: entryPath,
				relativePath,
				depth,
				hierarchy: [...hierarchy],
				name: entry.name.replace(extension, ""),
				extension,
			});
		}
	}
}

/**
 * Scan folder structure for generators (barrels, stories, etc.)
 */
export async function scanFolderStructure(
	rootPath: string,
	options: ScanOptions = {},
): Promise<FolderStructure> {
	const scanResult = await scanFolders(rootPath, options);

	const structure: FolderStructure = {
		files: new Map(),
		depthMap: new Map(),
	};

	// Process files into structured format
	for (const file of scanResult.files) {
		// Create FileInfo with export detection
		const fileInfo: FileInfo = {
			name: file.name,
			path: file.path,
			relativePath: file.relativePath,
			depth: file.depth,
			hierarchy: file.hierarchy,
			exportType: await detectExportType(file.path),
			fileType: file.extension.substring(1), // Remove dot
		};

		// Add to hierarchy map (e.g., "components.atoms")
		const hierarchyKey = file.hierarchy.join(".");
		if (!structure.files.has(hierarchyKey)) {
			structure.files.set(hierarchyKey, []);
		}
		structure.files.get(hierarchyKey)!.push(fileInfo);

		// Add to depth map
		if (!structure.depthMap.has(file.depth)) {
			structure.depthMap.set(file.depth, new Map());
		}
		const depthMap = structure.depthMap.get(file.depth)!;
		const depthKey = file.hierarchy[file.hierarchy.length - 1] || "root";
		if (!depthMap.has(depthKey)) {
			depthMap.set(depthKey, []);
		}
		depthMap.get(depthKey)!.push(fileInfo);
	}

	return structure;
}

/**
 * Get folder names at a specific depth
 */
export async function getFolderNames(
	rootPath: string,
	depth: number = 0,
): Promise<string[]> {
	const scanResult = await scanFolders(rootPath, { maxDepth: depth });

	return scanResult.directories
		.filter((dir) => dir.depth === depth)
		.map((dir) => dir.name)
		.sort();
}

/**
 * Get file paths matching criteria
 */
export async function getFilePaths(
	rootPath: string,
	options: { fileTypes?: string[]; maxDepth?: number } = {},
): Promise<string[]> {
	const scanResult = await scanFolders(rootPath, {
		includeFileTypes: options.fileTypes,
		maxDepth: options.maxDepth,
	});

	return scanResult.files
		.map((file) => file.path)
		.sort();
}

/**
 * Cross-platform path resolution from workspace root
 */
export function resolvePath(...paths: string[]): string {
	// Find the workspace root by looking for pnpm-workspace.yaml
	let current = process.cwd();
	while (current !== dirname(current)) {
		try {
			const workspaceFile = join(current, "pnpm-workspace.yaml");
			if (existsSync(workspaceFile)) {
				// Found workspace root
				return resolve(current, ...paths);
			}
		} catch {
			// Continue searching
		}
		current = dirname(current);
	}

	// Fallback to current directory
	return resolve(process.cwd(), ...paths);
}

/**
 * Atomic file write operation
 */
export async function writeFileAtomic(
	filePath: string,
	content: string,
): Promise<void> {
	const tempPath = `${filePath}.tmp`;
	const dir = dirname(filePath);

	try {
		await fs.mkdir(dir, { recursive: true });
		await fs.writeFile(tempPath, content, "utf8");
		await fs.rename(tempPath, filePath);
	} catch (error) {
		// Cleanup temp file if it exists
		try {
			await fs.unlink(tempPath);
		} catch {
			// Ignore cleanup errors
		}

		// On Windows during dev mode, rename can fail due to file locks
		// Fall back to direct write (non-atomic but functional)
		if ((error as any)?.code === "EPERM") {
			console.warn(
				`⚠️  Atomic write failed for ${filePath}, falling back to direct write...`,
			);
			try {
				await fs.mkdir(dir, { recursive: true });
				await fs.writeFile(filePath, content, "utf8");
				return; // Success with fallback
			} catch (fallbackError) {
				console.error(
					`❌ Both atomic and direct write failed for ${filePath}:`,
					fallbackError,
				);
				throw fallbackError;
			}
		}

		throw error;
	}
}

/**
 * Check if file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Read file content safely
 */
export async function readFile(filePath: string): Promise<string> {
	try {
		return await fs.readFile(filePath, "utf8");
	} catch (error) {
		throw new Error(`Failed to read file ${filePath}: ${error}`);
	}
}

/**
 * Delete file safely
 */
export async function deleteFile(filePath: string): Promise<void> {
	try {
		await fs.unlink(filePath);
	} catch (error) {
		throw new Error(`Failed to delete file ${filePath}: ${error}`);
	}
}

/**
 * Check if path is a directory
 */
export async function isDirectory(path: string): Promise<boolean> {
	try {
		const stat = await fs.stat(path);
		return stat.isDirectory();
	} catch {
		return false;
	}
}

/**
 * Convert any case format to PascalCase
 * Handles: camelCase, PascalCase, snake_case, kebab-case, dot.case
 */
export function pascalCase(str: string): string {
	return str
		.replace(REGEX_PATTERNS.camelCaseBoundary, "$1-$2")
		.split(REGEX_PATTERNS.caseDelimiters)
		.filter((word) => word.length > 0)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
}

/**
 * Detect if a file has default or named exports
 */
export async function detectExportType(
	filePath: string,
): Promise<"default" | "named"> {
	try {
		const content = await readFile(filePath);

		// Look for default export patterns
		const defaultExportPatterns = [
			REGEX_PATTERNS.defaultExport,
			REGEX_PATTERNS.svelteDefaultExport,
		];

		for (const pattern of defaultExportPatterns) {
			if (pattern.test(content)) {
				return "default";
			}
		}

		return "named";
	} catch (error) {
		console.warn(`Warning: Could not analyze exports in ${filePath}:`, error);
		return "default"; // Safe fallback
	}
}

/**
 * Simple logger utility
 */
export class Logger {
	private level: "debug" | "info" | "warn" | "error";

	constructor(level: "debug" | "info" | "warn" | "error" = "info") {
		this.level = level;
	}

	debug(message: string, ...args: any[]): void {
		if (this.level === "debug") {
			console.log(`🔍 ${message}`, ...args);
		}
	}

	info(message: string, ...args: any[]): void {
		if (["debug", "info"].includes(this.level)) {
			console.log(`ℹ️  ${message}`, ...args);
		}
	}

	warn(message: string, ...args: any[]): void {
		if (["debug", "info", "warn"].includes(this.level)) {
			console.warn(`⚠️  ${message}`, ...args);
		}
	}

	error(message: string, ...args: any[]): void {
		console.error(`❌ ${message}`, ...args);
	}
}
