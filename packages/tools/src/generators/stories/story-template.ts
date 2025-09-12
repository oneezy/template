/**
 * Story template generator
 */
import type { ArgType } from "./defaults.ts";
import type { StoryDefinition } from "./jsdoc-parser.ts";

export interface TemplateData {
	componentName: string;
	storyTitle: string;
	importName: string;
	storyTags: string[];
	argTypes: Record<string, ArgType>;
	stories: GeneratedStory[];
	variantArrays: VariantArray[];
	hasMultiVariantStories: boolean;
	layout?: "vertical" | "horizontal";
	showInSidebar?: boolean;
}

export interface GeneratedStory {
	name: string;
	type: "single" | "multi-variant";
	args?: Record<string, any>;
	template?: boolean;
	tags?: string[];
	variantArrayName?: string;
}

export interface VariantArray {
	name: string;
	variants: Record<string, any>[];
}

/**
 * Generate complete story template content
 */
export function generateStoryTemplate(data: TemplateData): string {
	const {
		componentName,
		storyTitle,
		importName,
		storyTags,
		argTypes,
		stories,
		variantArrays,
		hasMultiVariantStories,
		layout,
	} = data;

	return `<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ${componentName} } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";

${generateVariantArrays(variantArrays)}

	const { Story } = defineMeta({
		title: "${storyTitle}",
		component: ${componentName},
		tags: [${storyTags.map((tag) => `"${tag}"`).join(", ")}],
		argTypes: ${generateArgTypesObject(argTypes)},
		args: {
			// Args will be populated per story variant
		},
	});
</script>

${hasMultiVariantStories ? generateMultiVariantTemplate(componentName) : ""}
${
		generateStoryDefinitions(stories, componentName, layout, data.showInSidebar)
	}`;
}

/**
 * Generate variant arrays in the script section
 */
function generateVariantArrays(variantArrays: VariantArray[]): string {
	if (variantArrays.length === 0) return "";

	const arrays = variantArrays.map((array) => {
		const variants = array.variants.map((variant) => {
			const props = Object.entries(variant)
				.map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
				.join(", ");
			return `\t\t{ ${props} }`;
		}).join(",\n");

		return `\tconst ${array.name}: ComponentProps[] = [
${variants}
	];`;
	}).join("\n\n");

	return `${arrays}\n`;
}

/**
 * Generate the multi-variant template snippet
 */
function generateMultiVariantTemplate(
	componentName: string = "Button",
): string {
	const componentKey = componentName.toLowerCase() + "s";
	return `<!-- Template for multiple variants -->
{#snippet template(args: any)}
	<div class="flex gap-4 items-center justify-center">
		{#each args.${componentKey} as ${componentName.toLowerCase()}Props}
			<${componentName} {...${componentName.toLowerCase()}Props} />
		{/each}
	</div>
{/snippet}

`;
}

/**
 * Generate story definitions
 */
function generateStoryDefinitions(
	stories: GeneratedStory[],
	componentName: string = "Button",
	layout?: "vertical" | "horizontal",
	showInSidebar: boolean = false,
): string {
	const componentKey = componentName.toLowerCase() + "s";

	return stories.map((story, index) => {
		// Default story (first one) should be visible, others hidden unless showInSidebar is true
		const shouldShow = index === 0 || showInSidebar;

		if (story.type === "single") {
			const args = story.args ? ` args={${JSON.stringify(story.args)}}` : "";
			const tags = story.tags
				? ` tags={[${story.tags.map((t) => `"${t}"`).join(", ")}]}`
				: shouldShow
				? ""
				: ` tags={["!dev"]}`;
			const parameters = layout
				? ` parameters={{ globals: { dualLayout: "${layout}" } }}`
				: "";
			return `<Story name="${story.name}"${args}${tags}${parameters} />`;
		} else {
			// Multi-variant story
			const args = story.variantArrayName
				? ` args={{ ${componentKey}: ${story.variantArrayName} }}`
				: "";
			const tags = story.tags
				? ` tags={[${story.tags.map((t) => `"${t}"`).join(", ")}]}`
				: ` tags={["!dev"]}`;
			const parameters = layout
				? ` parameters={{ globals: { dualLayout: "${layout}" } }}`
				: "";
			return `<Story name="${story.name}"${args} {template}${tags}${parameters} />`;
		}
	}).join("\n\n");
}

/**
 * Generate argTypes object as formatted string
 */
function generateArgTypesObject(argTypes: Record<string, ArgType>): string {
	const entries = Object.entries(argTypes).map(([key, value]) => {
		return `\t\t${key}: ${formatArgType(value)}`;
	});

	return `{
${entries.join(",\n")}
\t}`;
}

/**
 * Format a single argType as a string
 */
function formatArgType(argType: ArgType): string {
	const parts: string[] = [];

	if (argType.control !== undefined) {
		if (argType.control === false) {
			parts.push("control: false");
		} else {
			parts.push(`control: "${argType.control}"`);
		}
	}

	if (argType.options) {
		parts.push(`options: [${argType.options.map((o) => `"${o}"`).join(", ")}]`);
	}

	if (argType.action) {
		if (typeof argType.action === "string") {
			parts.push(`action: "${argType.action}"`);
		} else {
			parts.push("action: true");
		}
	}

	if (argType.description) {
		parts.push(`description: "${argType.description}"`);
	}

	// Table configuration
	const tableProps: string[] = [];
	if (argType.table.category) {
		tableProps.push(`category: "${argType.table.category}"`);
	}
	if (argType.table.disable) {
		tableProps.push("disable: true");
	}

	if (tableProps.length > 0) {
		parts.push(`table: { ${tableProps.join(", ")} }`);
	}

	return `{ ${parts.join(", ")} }`;
}

/**
 * Generate stories and variant arrays from JSDoc story definitions
 */
export function generateStoriesFromJSDoc(
	storyDefinitions: StoryDefinition[],
	componentName: string,
): { stories: GeneratedStory[]; variantArrays: VariantArray[] } {
	const stories: GeneratedStory[] = [];
	const variantArrays: VariantArray[] = [];

	// If no stories defined, create a default story
	if (storyDefinitions.length === 0) {
		stories.push({
			name: "Default",
			type: "single",
			args: { label: componentName },
		});
		return { stories, variantArrays };
	}

	for (const def of storyDefinitions) {
		if (def.combinations) {
			// Handle combination stories (pipe syntax)
			const story = generateCombinationStory(def, componentName);
			stories.push(story);
		} else if (def.values.length === 1) {
			// Single value story
			const story = generateSingleStory(def, componentName);
			stories.push(story);
		} else {
			// Multi-variant story
			const { story, variantArray } = generateMultiVariantStory(
				def,
				componentName,
			);
			stories.push(story);
			variantArrays.push(variantArray);
		}
	}

	return { stories, variantArrays };
}

/**
 * Generate a single story from definition
 */
function generateSingleStory(
	def: StoryDefinition,
	componentName: string,
): GeneratedStory {
	const value = def.values[0];
	const name = def.name || capitalizeFirst(value);

	// Create args object based on the value
	const args: Record<string, any> = {
		label: componentName,
	};

	// Try to intelligently assign the value to the right prop
	if (["xs", "sm", "md", "lg", "xl"].includes(value)) {
		args.size = value;
	} else if (
		["primary", "secondary", "accent", "neutral", "base"].includes(value)
	) {
		args.color = value;
	} else if (
		["heavy", "lite", "outline", "ghost", "glass", "gradient"].includes(value)
	) {
		args.appearance = value;
	} else if (value === "disabled") {
		args.disabled = true;
	} else {
		// Default to boolean prop
		args[value] = true;
	}

	return {
		name,
		type: "single",
		args,
	};
}

/**
 * Generate a multi-variant story from definition
 */
function generateMultiVariantStory(
	def: StoryDefinition,
	componentName: string,
): { story: GeneratedStory; variantArray: VariantArray } {
	const name = def.name || "Variants";
	const arrayName = `${name.toLowerCase().replace(/\s+/g, "")}Variants`;

	// Generate variant objects
	const variants = def.values.map((value) => {
		const variant: Record<string, any> = {
			label: capitalizeFirst(value),
		};

		// Assign value to appropriate prop
		if (["xs", "sm", "md", "lg", "xl"].includes(value)) {
			variant.size = value;
		} else if (
			["primary", "secondary", "accent", "neutral", "base"].includes(value)
		) {
			variant.color = value;
		} else if (
			["heavy", "lite", "outline", "ghost", "glass", "gradient"].includes(value)
		) {
			variant.appearance = value;
		} else {
			variant[value] = true;
		}

		return variant;
	});

	const story: GeneratedStory = {
		name,
		type: "multi-variant",
		variantArrayName: arrayName,
		tags: ["!dev"],
	};

	const variantArray: VariantArray = {
		name: arrayName,
		variants,
	};

	return { story, variantArray };
}

/**
 * Generate a combination story (pipe syntax like "primary|disabled")
 */
function generateCombinationStory(
	def: StoryDefinition,
	componentName: string,
): GeneratedStory {
	const combination = def.values[0];
	const name = def.name ||
		combination.replace(/\|/g, " ").split(" ").map(capitalizeFirst).join(" ");

	const args: Record<string, any> = {
		label: name,
	};

	// Parse combination and apply each part
	const parts = combination.split("|");
	for (const part of parts) {
		const trimmed = part.trim();

		if (["xs", "sm", "md", "lg", "xl"].includes(trimmed)) {
			args.size = trimmed;
		} else if (
			["primary", "secondary", "accent", "neutral", "base"].includes(trimmed)
		) {
			args.color = trimmed;
		} else if (
			["heavy", "lite", "outline", "ghost", "glass", "gradient"].includes(
				trimmed,
			)
		) {
			args.appearance = trimmed;
		} else if (trimmed === "disabled") {
			args.disabled = true;
		} else {
			args[trimmed] = true;
		}
	}

	return {
		name,
		type: "single",
		args,
	};
}

/**
 * Capitalize first letter of a string
 */
function capitalizeFirst(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
