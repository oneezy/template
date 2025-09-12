import { dirname, join } from "path";
import { promises as fs } from "fs";
import {
	deleteFile,
	type FileInfo,
	Logger,
	pascalCase,
	resolvePath,
	scanFolderStructure,
	writeFileAtomic,
} from "../utils.ts";
import { TOOLS_CONFIG } from "../config.ts";

// Import new story generation modules
import { type JSDocConfig, parseJSDocTags } from "./stories/jsdoc-parser.ts";
import {
	analyzeComponent,
	type ComponentAnalysis,
	generateAutoStories,
} from "./stories/typescript-analyzer.ts";
import { generateArgTypes } from "./stories/argtypes-generator.ts";
import {
	type GeneratedStory,
	generateStoriesFromJSDoc,
	generateStoryTemplate,
	type TemplateData,
	type VariantArray,
} from "./stories/story-template.ts";

const logger = new Logger();

/**
 * Story generation configuration
 */
interface StoryConfig {
	componentPath: string;
	storyPath: string;
	componentName: string;
	storyTitle: string;
	importName: string;
	jsdocConfig: JSDocConfig;
	analysis: ComponentAnalysis;
}

/**
 * Generate story content from template using enhanced system
 */
async function generateStoryContent(config: StoryConfig): Promise<string> {
	const { componentName, storyTitle, importName, jsdocConfig, analysis } =
		config;

	// Generate argTypes from component analysis and JSDoc configuration
	const argTypes = generateArgTypes(analysis, jsdocConfig);

	// Check if we have JSDoc stories or need to auto-generate
	let stories: GeneratedStory[];
	let variantArrays: VariantArray[];

	if (jsdocConfig.stories.length > 0) {
		// Use JSDoc-defined stories
		const jsdocResult = generateStoriesFromJSDoc(
			jsdocConfig.stories,
			componentName,
		);
		stories = jsdocResult.stories;
		variantArrays = jsdocResult.variantArrays;
	} else {
		// Auto-generate stories based on component analysis
		const autoConfig = generateAutoStories(componentName, analysis);

		// Convert auto-generated config to story format
		stories = autoConfig.stories.map((story) => ({
			name: story.name,
			type: story.props.variants ? "multi-variant" as const : "single" as const,
			args: story.props.variants ? undefined : story.props,
			variantArrayName: story.props.variants
				? `${story.name.toLowerCase()}Variants`
				: undefined,
		}));

		// Generate variant arrays for auto-generated multi-variant stories
		variantArrays = stories
			.filter((story) => story.type === "multi-variant")
			.map((story) => {
				const autoStory = autoConfig.stories.find((s) => s.name === story.name);
				const propName = autoStory?.propName;
				const isStringUnion = autoStory?.isStringUnion;

				return {
					name: story.variantArrayName!,
					variants: autoStory!.props.variants.map((variant: string) => {
						if (isStringUnion && propName) {
							// For string unions: { icon: 'home' }
							return { [propName]: variant } as Record<string, any>;
						} else {
							// For boolean unions: { primary: true }
							return { [variant]: true } as Record<string, any>;
						}
					}),
				};
			});
	}

	// Apply @type override if specified (works for both JSDoc and auto-generated stories)
	// Default behavior is now "single" - convert multi-variant to individual single stories
	if (jsdocConfig.type === "multi") {
		// Only when @type multi is explicitly specified, convert single stories to multi-variant if possible
		stories = stories.map((story) => {
			if (story.type === "single" && story.args) {
				// Try to convert single story to multi-variant
				const propEntries = Object.entries(story.args).filter(([key]) =>
					key !== "label"
				);
				if (propEntries.length === 1) {
					const [propName, propValue] = propEntries[0];
					const arrayName = `${story.name.toLowerCase()}Variants`;

					// Create a variant array with the current value and some defaults
					const newVariantArray: VariantArray = {
						name: arrayName,
						variants: [
							{ [propName]: propValue, label: story.name },
							{ label: "Default" }, // Add a default variant
						],
					};

					variantArrays.push(newVariantArray);

					return {
						...story,
						type: "multi-variant" as const,
						variantArrayName: arrayName,
						args: undefined,
						tags: ["!dev"],
					};
				}
			}
			return story;
		});
	} else {
		// Default behavior: convert all stories to single type, expand multi-variant stories into individual single stories
		const newStories: GeneratedStory[] = [];

		for (const story of stories) {
			if (story.type === "multi-variant" && story.variantArrayName) {
				// Find the variant array for this story
				const variantArray = variantArrays.find((arr) =>
					arr.name === story.variantArrayName
				);

				if (variantArray) {
					// Create individual single stories for each variant
					variantArray.variants.forEach((variant, index) => {
						const variantName = story.name === "Variants"
							? Object.keys(variant).find((key) => key !== "label") ||
								`Variant${index + 1}`
							: `${story.name} ${index + 1}`;

						newStories.push({
							name: variantName.charAt(0).toUpperCase() + variantName.slice(1),
							type: "single" as const,
							args: { ...variant, label: componentName },
							variantArrayName: undefined,
						});
					});
				}
			} else {
				// Keep single stories as-is
				newStories.push({
					...story,
					type: "single" as const,
					variantArrayName: undefined,
					args: story.args || { label: componentName },
				});
			}
		}

		stories = newStories;
		variantArrays = []; // Clear variant arrays for single mode since we expanded them into individual stories
	}

	// Determine if we have multi-variant stories
	const hasMultiVariantStories = stories.some((story) =>
		story.type === "multi-variant"
	);

	// Create template data
	const templateData: TemplateData = {
		componentName,
		storyTitle,
		importName,
		storyTags: jsdocConfig.tags,
		argTypes,
		stories,
		variantArrays,
		hasMultiVariantStories,
		layout: jsdocConfig.layout,
		showInSidebar: jsdocConfig.dev === true, // Only show in sidebar if @dev true is explicitly set
	};

	// Generate final template
	return generateStoryTemplate(templateData);
}

/**
 * Map component file to story configuration
 */
async function mapComponentToStoryConfig(file: FileInfo): Promise<StoryConfig> {
	const componentsPath = TOOLS_CONFIG.packages.ui.componentsPath;
	const storiesPath = TOOLS_CONFIG.packages.storybook.storiesPath;

	// Extract relative path from components directory
	// e.g., "components/atoms/button/button.svelte" -> "atoms/button/button"
	let relativePath = file.relativePath
		.replace(`${componentsPath.split("/").pop()}/`, "") // Remove "components/" prefix
		.replace(".svelte", ""); // Remove ".svelte" suffix

	// Handle different component structures:
	// 1. "molecules/test" (from molecules/test.svelte) -> "molecules/test"
	// 2. "molecules/test/test" (from molecules/test/test.svelte) -> "molecules/test"
	const pathParts = relativePath.split("/");
	const fileName = pathParts[pathParts.length - 1]; // Last part (component name)
	const folderPath = pathParts.slice(0, -1).join("/"); // Everything except last part

	// If the last folder name matches the file name, remove the duplicate
	// e.g., "molecules/test/test" -> "molecules/test"
	if (pathParts.length > 1 && pathParts[pathParts.length - 2] === fileName) {
		relativePath = pathParts.slice(0, -1).join("/");
	}

	// Create story path
	// e.g., "molecules/test" -> "molecules/test.stories.svelte"
	const storyRelativePath = `${relativePath}.stories.svelte`;
	const storyPath = resolvePath(storiesPath, storyRelativePath);

	// Create story title with proper casing
	// e.g., "molecules/test" -> "Components/Molecules/Test"
	const titleParts = [
		"Components",
		...relativePath.split("/").map((part) => pascalCase(part)),
	];
	const storyTitle = titleParts.join("/");

	// Component name for import (PascalCase)
	const componentName = pascalCase(fileName);

	// Parse JSDoc configuration from component
	const jsdocConfig = await parseJSDocTags(
		await fs.readFile(file.path, "utf-8"),
	);

	// Analyze component TypeScript interface
	const analysis = await analyzeComponent(file.path);

	return {
		componentPath: file.path,
		storyPath,
		componentName,
		storyTitle,
		importName: componentName,
		jsdocConfig,
		analysis,
	};
}

/**
 * Clean up orphaned story files that don't have corresponding components
 */
async function cleanupOrphanedStories(
	validStoryPaths: Set<string>,
): Promise<void> {
	try {
		const storiesPath = resolvePath(
			TOOLS_CONFIG.packages.storybook.storiesPath,
		);

		// Scan existing story files
		const storyStructure = await scanFolderStructure(storiesPath, {
			includeFileTypes: [".svelte"],
			excludePatterns: [/\.test\.svelte$/],
		});

		const orphanedStories: string[] = [];

		// Check each existing story file
		for (const [hierarchyKey, files] of storyStructure.files) {
			for (const file of files) {
				if (file.name.endsWith(".stories")) {
					const storyPath = file.path;

					// If this story doesn't correspond to a current component, mark for deletion
					if (!validStoryPaths.has(storyPath)) {
						orphanedStories.push(storyPath);
					}
				}
			}
		}

		// Remove orphaned stories
		if (orphanedStories.length > 0) {
			logger.info(
				`🧹 Cleaning up ${orphanedStories.length} orphaned story files...`,
			);

			for (const storyPath of orphanedStories) {
				try {
					// Use direct fs.unlink instead of deleteFile for more reliable cleanup
					await fs.unlink(storyPath);
					logger.info(
						`🗑️  Removed orphaned story: ${storyPath}`,
					);
				} catch (error) {
					// Try alternative cleanup method
					try {
						const { unlink } = await import("node:fs/promises");
						await unlink(storyPath);
						logger.info(
							`🗑️  Removed orphaned story (alt method): ${storyPath}`,
						);
					} catch (altError) {
						logger.warn(`Failed to remove story: ${storyPath}`, error);
					}
				}
			}
		}
	} catch (error) {
		logger.warn("Failed to cleanup orphaned stories:", error);
		// Don't throw - cleanup is optional
	}
}

/**
 * Standalone cleanup function that runs independently
 */
async function runCleanupOnly(): Promise<void> {
	try {
		logger.info("🧹 Running story cleanup...");

		const componentsPath = resolvePath(TOOLS_CONFIG.packages.ui.componentsPath);

		// Scan for current Svelte components
		const structure = await scanFolderStructure(componentsPath, {
			includeFileTypes: [".svelte"],
			excludePatterns: [/\.stories\.svelte$/, /\.test\.svelte$/],
		});

		const validStoryPaths = new Set<string>();

		// Build set of valid story paths based on current components
		for (const [hierarchyKey, files] of structure.files) {
			for (const file of files) {
				if (file.fileType === "svelte") {
					const config = await mapComponentToStoryConfig(file);
					validStoryPaths.add(config.storyPath);
				}
			}
		}

		// Run cleanup
		await cleanupOrphanedStories(validStoryPaths);
	} catch (error) {
		logger.warn("Cleanup failed but continuing:", error);
		// Don't throw - cleanup failure shouldn't stop other processes
	}
}

/**
 * Generate Storybook stories for all components
 */
export async function generateStories(): Promise<void> {
	// Always run cleanup first, independently of story generation
	await runCleanupOnly();

	try {
		logger.info("🎭 Generating Storybook stories...");

		const componentsPath = resolvePath(TOOLS_CONFIG.packages.ui.componentsPath);

		// Scan for Svelte components
		const structure = await scanFolderStructure(componentsPath, {
			includeFileTypes: [".svelte"],
			excludePatterns: [/\.stories\.svelte$/, /\.test\.svelte$/],
		});

		const storyConfigs: StoryConfig[] = [];

		// Process all component files
		for (const [hierarchyKey, files] of structure.files) {
			for (const file of files) {
				// Only process .svelte files (not .svelte.ts)
				if (file.fileType === "svelte") {
					const config = await mapComponentToStoryConfig(file);
					storyConfigs.push(config);
				}
			}
		}

		if (storyConfigs.length === 0) {
			logger.info("📭 No components found to generate stories for");
			return;
		}

		logger.info(`📝 Generating ${storyConfigs.length} story files...`);

		// Generate story files with individual error handling
		let successCount = 0;
		let errorCount = 0;

		for (const config of storyConfigs) {
			try {
				const storyContent = await generateStoryContent(config);

				// Ensure directory exists
				await writeFileAtomic(config.storyPath, storyContent);

				logger.info(
					`✅ Generated story: ${
						config.storyPath.split("/").slice(-3).join("/")
					}`,
				);
				successCount++;
			} catch (error) {
				logger.warn(
					`❌ Failed to generate story: ${
						config.storyPath.split("/").slice(-3).join("/")
					}`,
					error,
				);
				errorCount++;
			}
		}

		if (successCount > 0) {
			logger.info(`🎉 Successfully generated ${successCount} stories`);
		}
		if (errorCount > 0) {
			logger.warn(
				`⚠️  Failed to generate ${errorCount} stories (permission issues)`,
			);
		}
	} catch (error) {
		logger.error("Failed to generate stories:", error);
		throw error;
	}
}

/**
 * Generate story for a single component
 */
export async function generateStoryForComponent(
	componentPath: string,
): Promise<void> {
	try {
		logger.info(
			`🎯 Generating story for: ${
				componentPath.split("/").slice(-2).join("/")
			}`,
		);

		// Create file info object from component path
		const componentsBasePath = resolvePath(
			TOOLS_CONFIG.packages.ui.componentsPath,
		);
		const relativePath = componentPath.replace(
			componentsBasePath + (process.platform === "win32" ? "\\" : "/"),
			"",
		).replace(".svelte", "");
		const pathParts = relativePath.split(/[/\\]/); // Handle both / and \ separators
		const fileName = pathParts[pathParts.length - 1]; // Get just the filename without extension

		const fileInfo: FileInfo = {
			name: fileName,
			path: componentPath,
			relativePath: relativePath.replace(/\\/g, "/") + ".svelte", // Normalize to forward slashes and add back .svelte
			depth: pathParts.length,
			hierarchy: pathParts.slice(0, -1), // Remove filename, keep folder structure
			exportType: "default", // Svelte components are default exports
			fileType: "svelte",
		};

		// Generate story config
		const config = await mapComponentToStoryConfig(fileInfo);

		// Generate and write story content
		const storyContent = await generateStoryContent(config);
		await writeFileAtomic(config.storyPath, storyContent);

		logger.info(
			`✅ Generated story: ${config.storyPath.split("/").slice(-3).join("/")}`,
		);
	} catch (error) {
		logger.error(`❌ Failed to generate story for ${componentPath}:`, error);
		throw error;
	}
}

/**
 * Get recently changed components based on file timestamps
 */
async function getRecentlyChangedComponents(): Promise<string[]> {
	const componentsPath = resolvePath(TOOLS_CONFIG.packages.ui.componentsPath);

	// Scan for Svelte components
	const structure = await scanFolderStructure(componentsPath, {
		includeFileTypes: [".svelte"],
		excludePatterns: [/\.stories\.svelte$/, /\.test\.svelte$/],
	});

	const recentlyChanged: string[] = [];
	const fiveSecondsAgo = Date.now() - 5000; // 5 seconds threshold

	for (const [hierarchyKey, files] of structure.files) {
		for (const file of files) {
			if (file.fileType === "svelte") {
				try {
					const stats = await fs.stat(file.path);
					if (stats.mtime.getTime() > fiveSecondsAgo) {
						recentlyChanged.push(file.path);
					}
				} catch (error) {
					// File might have been deleted, skip
					continue;
				}
			}
		}
	}

	return recentlyChanged;
}

/**
 * Check for orphaned story files that need cleanup
 */
async function findOrphanedStories(): Promise<string[]> {
	try {
		const componentsPath = resolvePath(TOOLS_CONFIG.packages.ui.componentsPath);
		const storiesPath = resolvePath(
			TOOLS_CONFIG.packages.storybook.storiesPath,
		);

		// Get valid story paths from current components
		const structure = await scanFolderStructure(componentsPath, {
			includeFileTypes: [".svelte"],
			excludePatterns: [/\.stories\.svelte$/, /\.test\.svelte$/],
		});

		const validStoryPaths = new Set<string>();
		for (const [hierarchyKey, files] of structure.files) {
			for (const file of files) {
				if (file.fileType === "svelte") {
					const config = await mapComponentToStoryConfig(file);
					validStoryPaths.add(config.storyPath);
				}
			}
		}

		// Check existing story files
		const storyStructure = await scanFolderStructure(storiesPath, {
			includeFileTypes: [".svelte"],
			excludePatterns: [/\.test\.svelte$/],
		});

		const orphanedStories: string[] = [];
		for (const [hierarchyKey, files] of storyStructure.files) {
			for (const file of files) {
				if (file.name.endsWith(".stories")) {
					if (!validStoryPaths.has(file.path)) {
						orphanedStories.push(file.path);
					}
				}
			}
		}

		return orphanedStories;
	} catch (error) {
		logger.warn("Failed to find orphaned stories:", error);
		return [];
	}
}

/**
 * Run story generation (main entry point)
 */
export async function run(options: { watch?: boolean } = {}): Promise<void> {
	if (options.watch) {
		logger.info("📺 Story generation watch mode not yet implemented");
		// TODO: Watch for component changes and regenerate stories
		// Could use chokidar or similar file watcher
	} else {
		// Detect operation type: bulk vs single change
		const recentlyChanged = await getRecentlyChangedComponents();
		const orphanedStories = await findOrphanedStories();

		if (recentlyChanged.length > 1 || orphanedStories.length > 0) {
			// Bulk operation detected - run full generation + cleanup
			logger.info(
				`🎭 Bulk operation detected: ${recentlyChanged.length} changed, ${orphanedStories.length} orphaned`,
			);
			await generateStories();
		} else if (recentlyChanged.length === 1) {
			// Single file change - targeted generation
			logger.info(`🎯 Single component change detected`);
			await generateStoryForComponent(recentlyChanged[0]);
		} else {
			// Startup or no recent changes - full generation
			logger.info("🎭 Full story generation (startup or no recent changes)");
			await generateStories();
		}
	}
}
