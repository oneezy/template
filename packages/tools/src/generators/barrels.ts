import { TOOLS_CONFIG } from "../config.ts";
import {
	type FileInfo,
	type FolderStructure,
	Logger,
	pascalCase,
	readFile,
	REGEX_PATTERNS,
	resolvePath,
	scanFolderStructure,
	writeFileAtomic,
} from "../utils.ts";

const logger = new Logger(TOOLS_CONFIG.logging.level);

// Prevent concurrent runs
let isGenerating = false;

/**
 * Barrel-specific structure interface
 */
interface BarrelStructure {
	sections: Map<string, FileInfo[]>; // section name -> files
	categories: Map<string, Map<string, FileInfo[]>>; // section -> category -> files
}

/**
 * Convert universal FolderStructure to barrel-specific structure
 */
function convertToBarrelStructure(
	folderStructure: FolderStructure,
): BarrelStructure {
	const structure: BarrelStructure = {
		sections: new Map(),
		categories: new Map(),
	};

	logger.debug("Converting folder structure to barrel structure:");
	logger.debug(
		"Input folderStructure.files:",
		Array.from(folderStructure.files.keys()),
	);

	// Process files from the universal structure
	for (const [hierarchyKey, files] of folderStructure.files) {
		const hierarchy = hierarchyKey ? hierarchyKey.split(".") : ["root"];
		const section = hierarchy[0];
		const category = hierarchy[1];

		logger.debug(
			`Processing hierarchy: ${hierarchyKey} -> section: ${section}, category: ${category}, files: ${files.length}`,
		);

		// Initialize section
		if (!structure.sections.has(section)) {
			structure.sections.set(section, []);
		}
		if (!structure.categories.has(section)) {
			structure.categories.set(section, new Map());
		}

		// Add files to section
		structure.sections.get(section)!.push(...files);

		// Add files to category if it exists
		if (category) {
			const sectionCategories = structure.categories.get(section)!;
			if (!sectionCategories.has(category)) {
				sectionCategories.set(category, []);
			}
			sectionCategories.get(category)!.push(...files);
		}
	}

	logger.debug(
		"Final barrel structure sections:",
		Array.from(structure.sections.keys()),
	);
	return structure;
}

/**
 * Generate barrel file content from barrel structure
 */
async function generateBarrelContent(
	structure: BarrelStructure,
): Promise<string> {
	const lines: string[] = [];

	// Sort sections for consistent output - handle utils specially
	const sortedSections = Array.from(structure.sections.keys()).sort((a, b) => {
		// Always put 'components' first, 'utils' second, then alphabetical
		if (a === "components") return -1;
		if (b === "components") return 1;
		if (a === "utils") return -1;
		if (b === "utils") return 1;
		return a.localeCompare(b);
	});

	for (const sectionName of sortedSections) {
		// Skip root section (loose files) for now, handle at end
		if (sectionName === "root") continue;

		const sectionFiles = structure.sections.get(sectionName) || [];
		const sectionCategories = structure.categories.get(sectionName) ||
			new Map();

		if (sectionFiles.length === 0) continue;

		// Add section header
		lines.push(`/* ${sectionName.toUpperCase()} */`);

		// Special handling for utils section - no categories, flat structure
		if (sectionName === "utils") {
			for (
				const file of sectionFiles.sort((a: FileInfo, b: FileInfo) =>
					a.name.localeCompare(b.name)
				)
			) {
				const fileExports = await generateFileExportsEnhanced(file);
				lines.push(...fileExports);
			}
			lines.push("");
			continue;
		}

		// If we have categories in this section, organize by category
		if (sectionCategories.size > 0) {
			const sortedCategories = Array.from(sectionCategories.keys()).sort();

			for (const categoryName of sortedCategories) {
				const categoryFiles = sectionCategories.get(categoryName) || [];
				if (categoryFiles.length === 0) continue;

				lines.push(`// ${categoryName}`);

				for (
					const file of categoryFiles.sort((a: FileInfo, b: FileInfo) =>
						a.name.localeCompare(b.name)
					)
				) {
					const fileExports = await generateFileExportsEnhanced(file);
					lines.push(...fileExports);
				}

				lines.push(""); // Empty line between categories
			}
		} else {
			// No categories, just list all files in section
			for (
				const file of sectionFiles.sort((a: FileInfo, b: FileInfo) =>
					a.name.localeCompare(b.name)
				)
			) {
				const fileExports = await generateFileExportsEnhanced(file);
				lines.push(...fileExports);
			}
			lines.push("");
		}
	}

	// Handle root files at the end
	const rootFiles = structure.sections.get("root") || [];
	if (rootFiles.length > 0) {
		lines.push("/* ROOT */");
		for (
			const file of rootFiles.sort((a: FileInfo, b: FileInfo) =>
				a.name.localeCompare(b.name)
			)
		) {
			const fileExports = await generateFileExportsEnhanced(file);
			lines.push(...fileExports);
		}
		lines.push("");
	}

	return lines.join("\n");
}

/**
 * Extract interface names from a Svelte file content
 */
async function extractInterfacesFromSvelte(
	filePath: string,
): Promise<string[]> {
	try {
		const content = await readFile(filePath);
		const interfaces: string[] = [];

		// Only look for exported interfaces - this prevents picking up internal/library interfaces
		const exportInterfacePattern = /export\s+interface\s+(\w+)/g;

		let match;

		// Find exported interfaces only
		while ((match = exportInterfacePattern.exec(content)) !== null) {
			const interfaceName = match[1];
			if (!interfaces.includes(interfaceName)) {
				interfaces.push(interfaceName);
				logger.debug(
					`Found exported interface: ${interfaceName} in ${filePath}`,
				);
			}
		}

		return interfaces;
	} catch (error) {
		logger.debug(
			`Failed to read file for interface extraction: ${filePath}`,
			error,
		);
		return [];
	}
}

/**
 * Generate export statements for a file
 */
function generateFileExports(file: FileInfo): string[] {
	const exportLines: string[] = [];
	const importPath = `./${file.relativePath}`;

	if (file.fileType === "svelte.ts" || file.fileType === "ts") {
		// For TypeScript files, export all
		exportLines.push(`export * from "${importPath}";`);
	} else if (file.fileType === "svelte") {
		// For Svelte files, export default with PascalCase name
		const exportName = pascalCase(file.name);
		exportLines.push(
			`export { default as ${exportName} } from "${importPath}";`,
		);
	}

	return exportLines;
}

/**
 * Check if a file should be exported as both default and named exports
 * This handles special cases like component.svelte.ts that should have both
 */
function shouldExportBoth(file: FileInfo): boolean {
	// Special case: component.svelte.ts should have both default and named exports
	if (file.name === "component" && file.fileType === "svelte.ts") {
		return true;
	}
	return false;
}

/**
 * Generate export statements for a file with enhanced logic
 */
async function generateFileExportsEnhanced(file: FileInfo): Promise<string[]> {
	const exportLines: string[] = [];
	const importPath = `./${file.relativePath}`;

	if (file.fileType === "svelte.ts" || file.fileType === "ts") {
		// Check if we should export both default and named
		if (shouldExportBoth(file)) {
			const exportName = pascalCase(file.name);
			exportLines.push(
				`export { default as ${exportName} } from "${importPath}";`,
			);
			exportLines.push(`export * from "${importPath}";`);
		} else {
			// For TypeScript files, export all
			exportLines.push(`export * from "${importPath}";`);
		}
	} else if (file.fileType === "svelte") {
		// For Svelte files, check for interfaces and export both component and interfaces
		const exportName = pascalCase(file.name);
		const interfaces = await extractInterfacesFromSvelte(file.path);

		if (interfaces.length > 0) {
			// Export component and interfaces together
			const typeExports = interfaces.map((interfaceName) =>
				`type ${interfaceName}`
			).join(", ");
			exportLines.push(
				`export { default as ${exportName}, ${typeExports} } from "${importPath}";`,
			);
			logger.debug(
				`Enhanced export for ${file.name}: component + ${interfaces.length} interfaces`,
			);
		} else {
			// Export just the component (existing behavior)
			exportLines.push(
				`export { default as ${exportName} } from "${importPath}";`,
			);
		}
	}

	return exportLines;
}

/**
 * Generate barrel file for UI library using dynamic structure discovery
 */
export async function generateBarrel(): Promise<void> {
	// Prevent concurrent runs
	if (isGenerating) {
		logger.debug("Barrel generation already in progress, skipping...");
		return;
	}

	isGenerating = true;

	try {
		logger.info("Starting dynamic barrel generation...");

		const libPath = resolvePath(TOOLS_CONFIG.packages.ui.libPath);
		const barrelFile = resolvePath(TOOLS_CONFIG.packages.ui.barrelFile);

		// Use universal folder scanning with barrel-specific options
		const folderStructure = await scanFolderStructure(libPath, {
			includeFileTypes: [".svelte", ".ts", ".svelte.ts"],
			excludePatterns: [
				REGEX_PATTERNS.testFiles,
				REGEX_PATTERNS.barrelFiles,
				REGEX_PATTERNS.configFiles,
			],
		});

		// Convert to barrel-specific structure
		const barrelStructure = convertToBarrelStructure(folderStructure);

		// Log discovered structure
		const totalFiles = Array.from(barrelStructure.sections.values())
			.reduce((sum, files) => sum + files.length, 0);

		logger.debug(`Discovered library structure:`);
		for (const [sectionName, files] of barrelStructure.sections) {
			logger.debug(`  ${sectionName}: ${files.length} files`);

			const categories = barrelStructure.categories.get(sectionName);
			if (categories && categories.size > 0) {
				for (const [categoryName, categoryFiles] of categories) {
					logger.debug(`    ${categoryName}: ${categoryFiles.length} files`);
					for (const file of categoryFiles) {
						logger.debug(`      - ${file.name} (${file.relativePath})`);
					}
				}
			} else {
				for (const file of files) {
					logger.debug(`    - ${file.name} (${file.relativePath})`);
				}
			}
		}

		// Generate barrel content from discovered structure
		const content = await generateBarrelContent(barrelStructure);

		// Write barrel file atomically
		await writeFileAtomic(barrelFile, content);

		logger.info(
			`✅ Dynamic barrel file generated: ${totalFiles} files exported from ${barrelStructure.sections.size} sections`,
		);
	} catch (error) {
		logger.error("Failed to generate barrel file:", error);
		throw error;
	} finally {
		isGenerating = false;
	}
}

/**
 * Run barrel generation (main entry point)
 */
export async function run(): Promise<void> {
	await generateBarrel();
}
