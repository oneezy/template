/**
 * JSDoc parser for story generation configuration
 */

export interface JSDocConfig {
	tags: string[];
	stories: StoryDefinition[];
	props: PropOverride[];
	ignore: string[];
	enable: string[];
	type?: "single" | "multi";
	layout?: "vertical" | "horizontal";
	dev?: boolean;
}

export interface StoryDefinition {
	values: string[];
	name?: string;
	control?: string;
	combinations?: boolean; // true if using pipe syntax like "primary|disabled"
}

export interface PropOverride {
	name: string;
	control?: string;
	category?: string;
	description?: string;
}

/**
 * Parse JSDoc tags from component content
 */
export function parseJSDocTags(content: string): JSDocConfig {
	const config: JSDocConfig = {
		tags: [],
		stories: [],
		props: [],
		ignore: [],
		enable: [],
		type: "single", // Default to single stories
	};

	// Extract JSDoc comment blocks
	const jsdocBlocks = content.match(/\/\*\*[\s\S]*?\*\//g) || [];

	for (const block of jsdocBlocks) {
		// Parse @tags
		const tagsMatch = block.match(/@tags\s+([^\r\n]+)/);
		if (tagsMatch) {
			config.tags = tagsMatch[1].split(",").map((tag) => tag.trim());
		}

		// Parse @story entries
		const storyMatches = block.match(/@story\s+([^\r\n]+)/g) || [];
		for (const match of storyMatches) {
			const storyConfig = parseStoryDefinition(match);
			if (storyConfig) {
				config.stories.push(storyConfig);
			}
		}

		// Parse @props entries
		const propMatches = block.match(/@props\s+([^\r\n]+)/g) || [];
		for (const match of propMatches) {
			const propConfig = parsePropDefinition(match);
			if (propConfig) {
				config.props.push(propConfig);
			}
		}

		// Parse @ignore
		const ignoreMatch = block.match(/@ignore\s+([^\r\n]+)/);
		if (ignoreMatch) {
			config.ignore = ignoreMatch[1].split(",").map((prop) => prop.trim());
		}

		// Parse @enable
		const enableMatch = block.match(/@enable\s+([^\r\n]+)/);
		if (enableMatch) {
			config.enable = enableMatch[1].split(",").map((prop) => prop.trim());
		}

		// Parse @type
		const typeMatch = block.match(/@type\s+(single|multi)/);
		if (typeMatch) {
			config.type = typeMatch[1] as "single" | "multi";
		}

		// Parse @layout
		const layoutMatch = block.match(/@layout\s+(vertical|horizontal)/);
		if (layoutMatch) {
			config.layout = layoutMatch[1] as "vertical" | "horizontal";
		}

		// Parse @dev
		const devMatch = block.match(/@dev\s+(true|false)/);
		if (devMatch) {
			config.dev = devMatch[1] === "true";
		}
	}

	return config;
}

/**
 * Parse a single @story definition
 * Examples:
 * @story base [Default]
 * @story primary,secondary,accent [Styles](inline-radio)
 * @story primary|disabled [Primary Disabled](boolean)
 */
function parseStoryDefinition(storyLine: string): StoryDefinition | null {
	// Remove @story prefix
	const content = storyLine.replace(/@story\s+/, "");

	// Parse pattern: values [Name](control)
	const match = content.match(
		/^([^[\]]+)(?:\s*\[([^\]]+)\])?(?:\s*\(([^)]+)\))?/,
	);

	if (!match) return null;

	const valuesStr = match[1].trim();
	const name = match[2]?.trim();
	const control = match[3]?.trim();

	// Check if it's a combination (contains pipe)
	const combinations = valuesStr.includes("|");

	// Split values by comma or pipe
	const values = combinations
		? [valuesStr] // Keep as single combination string for pipe syntax
		: valuesStr.split(",").map((v) => v.trim());

	return {
		values,
		name,
		control,
		combinations,
	};
}

/**
 * Parse a single @props definition
 * Examples:
 * @props size (inline-radio) [Layout] - Component size
 * @props disabled (boolean) [States] - Disable interaction
 * @props onclick (action) [Events] - Click handler
 */
function parsePropDefinition(propLine: string): PropOverride | null {
	// Remove @props prefix
	const content = propLine.replace(/@props\s+/, "");

	// Parse pattern: name (control) [Category] - Description
	const match = content.match(
		/^(\w+)(?:\s*\(([^)]+)\))?(?:\s*\[([^\]]+)\])?(?:\s*-\s*(.+))?/,
	);

	if (!match) return null;

	return {
		name: match[1].trim(),
		control: match[2]?.trim(),
		category: match[3]?.trim(),
		description: match[4]?.trim(),
	};
}
