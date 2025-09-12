/**
 * TypeScript analyzer for component interfaces
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { TOOLS_CONFIG } from "../../config.ts";

export interface ComponentAnalysis {
	interface: TypeScriptInterface;
	props: PropDefinition[];
	imports: string[];
	importedComponentProps?: Record<string, PropDefinition[]>;
}

export interface TypeScriptInterface {
	name: string;
	extends?: string[];
	properties: Property[];
}

export interface Property {
	name: string;
	type: string;
	optional: boolean;
	description?: string;
}

export interface PropDefinition {
	name: string;
	type: "boolean" | "string" | "number" | "union" | "function" | "any";
	unionValues?: string[];
	optional: boolean;
	description?: string;
}

/**
 * Analyze a component file to extract TypeScript interface information
 */
export async function analyzeComponent(
	filePath: string,
): Promise<ComponentAnalysis> {
	const content = await readFile(filePath, "utf-8");

	const analysis: ComponentAnalysis = {
		interface: extractInterface(content),
		props: [],
		imports: extractImports(content),
	};

	// Convert interface properties to prop definitions
	const componentProps = analysis.interface.properties.map((prop) =>
		convertPropertyToProp(prop)
	);

	// If component extends ComponentProps, we should also analyze the base props
	if (analysis.interface.extends?.includes("ComponentProps")) {
		const baseProps = await extractComponentProps();

		// Deduplicate props by name, giving precedence to component-specific props
		const componentPropNames = new Set(componentProps.map((p) => p.name));
		const filteredBaseProps = baseProps.filter((baseProp) =>
			!componentPropNames.has(baseProp.name)
		);

		analysis.props = [...filteredBaseProps, ...componentProps];
	} else {
		analysis.props = componentProps;
	}

	// Analyze imported components to extract their prop unions
	const importedComponentProps = await analyzeImportedComponents(
		content,
		filePath,
	);
	analysis.importedComponentProps = importedComponentProps;

	return analysis;
}

/**
 * Extract TypeScript interface from component content
 */
function extractInterface(content: string): TypeScriptInterface {
	// Look for interface definitions (including export interface)
	const interfaceMatch = content.match(
		/(?:export\s+)?interface\s+(\w+)(?:\s+extends\s+([^{]+))?\s*\{([^}]+)\}/s,
	);

	if (!interfaceMatch) {
		return {
			name: "Props",
			properties: [],
		};
	}

	const name = interfaceMatch[1];
	const extendsClause = interfaceMatch[2]?.trim();
	const body = interfaceMatch[3];

	const extends_ = extendsClause
		? extendsClause.split(",").map((e) => e.trim())
		: undefined;

	const properties = extractPropertiesFromInterface(body);

	return {
		name,
		extends: extends_,
		properties,
	};
}

/**
 * Extract properties from interface body
 */
function extractPropertiesFromInterface(body: string): Property[] {
	const properties: Property[] = [];

	// Remove comments first for cleaner parsing
	const cleanBody = body
		.replace(/\/\*\*[\s\S]*?\*\//g, "") // Remove JSDoc comments
		.replace(/\/\*[\s\S]*?\*\//g, "") // Remove block comments
		.replace(/\/\/.*$/gm, ""); // Remove line comments

	// Split by semicolons to get complete property definitions (including multi-line)
	const propertyStrings = cleanBody
		.split(";")
		.map((prop) => prop.trim())
		.filter((prop) => prop.length > 0);

	for (const propString of propertyStrings) {
		// Parse property definition - now handles multi-line union types
		const propMatch = propString.match(/^(\w+)(\?)?:\s*([\s\S]+)$/);

		if (propMatch) {
			const name = propMatch[1];
			const optional = !!propMatch[2];
			// Normalize the type string by removing extra whitespace and line breaks
			const type = propMatch[3]
				.replace(/\s*\|\s*/g, " | ") // Normalize union separators
				.replace(/\s+/g, " ") // Replace multiple spaces with single space
				.trim();
			const description = "";

			properties.push({
				name,
				type,
				optional,
				description: description || undefined,
			});
		}
	}

	return properties;
}

/**
 * Convert TypeScript property to prop definition with semantic analysis
 */
function convertPropertyToProp(property: Property): PropDefinition {
	const { name, type, optional, description } = property;

	// Analyze type to determine prop type and union values
	if (type === "boolean") {
		return { name, type: "boolean", optional, description };
	}

	if (type === "string") {
		return { name, type: "string", optional, description };
	}

	if (type === "number") {
		return { name, type: "number", optional, description };
	}

	// Check for union types (e.g., "xs" | "sm" | "md" | "lg" | "xl" or 'home' | 'menu' | string)
	const hasUnionPipe = type.includes(" | ");
	if (hasUnionPipe) {
		// Extract quoted values from the union (single or double quotes)
		const quotedValues = type.match(/['"]([^'"]+)['"]/g)?.map((v) =>
			v.replace(/['"]/g, "")
		) || [];

		// If we found quoted values, treat as union (even if it also has string/other types)
		if (quotedValues.length > 0) {
			return {
				name,
				type: "union",
				unionValues: quotedValues,
				optional,
				description,
			};
		}
	}

	// Check for function types (event handlers)
	if (
		type.includes("=>") || type.includes("function") || name.startsWith("on")
	) {
		return { name, type: "function", optional, description };
	}

	// Default to string type for unknown types
	return { name, type: "string", optional, description };
}

/**
 * Extract imports from component content
 */
function extractImports(content: string): string[] {
	const imports: string[] = [];
	const importMatches = content.match(/import\s+.+\s+from\s+['"][^'"]+['"]/g) ||
		[];

	for (const match of importMatches) {
		imports.push(match);
	}

	return imports;
}

/**
 * Extract ComponentProps base properties
 * This should analyze the ComponentProps interface from the component system
 */
async function extractComponentProps(): Promise<PropDefinition[]> {
	// For now, return the known ComponentProps structure
	// In a more sophisticated implementation, this would parse the actual ComponentProps interface
	return [
		{
			name: "label",
			type: "string",
			optional: true,
			description: "Component label",
		},
		{
			name: "color",
			type: "union",
			unionValues: ["base", "neutral", "primary", "secondary", "accent"],
			optional: true,
			description: "Style variant",
		},
		{
			name: "appearance",
			type: "union",
			unionValues: ["heavy", "lite", "outline", "ghost", "glass", "gradient"],
			optional: true,
			description: "Visual appearance",
		},
		{
			name: "size",
			type: "union",
			unionValues: ["xs", "sm", "md", "lg", "xl"],
			optional: true,
			description: "Component size",
		},
		{
			name: "position",
			type: "union",
			unionValues: ["left", "center", "right"],
			optional: true,
			description: "Content position",
		},
		{
			name: "invert",
			type: "boolean",
			optional: true,
			description: "Invert colors",
		},
		{
			name: "disabled",
			type: "boolean",
			optional: true,
			description: "Disable component",
		},
		{
			name: "class",
			type: "string",
			optional: true,
			description: "Additional CSS classes",
		},
		// Boolean variants (these would be auto-disabled)
		{ name: "base", type: "boolean", optional: true },
		{ name: "primary", type: "boolean", optional: true },
		{ name: "secondary", type: "boolean", optional: true },
		{ name: "neutral", type: "boolean", optional: true },
		{ name: "accent", type: "boolean", optional: true },
		{ name: "heavy", type: "boolean", optional: true },
		{ name: "lite", type: "boolean", optional: true },
		{ name: "outline", type: "boolean", optional: true },
		{ name: "ghost", type: "boolean", optional: true },
		{ name: "glass", type: "boolean", optional: true },
		{ name: "gradient", type: "boolean", optional: true },
		{ name: "xs", type: "boolean", optional: true },
		{ name: "sm", type: "boolean", optional: true },
		{ name: "md", type: "boolean", optional: true },
		{ name: "lg", type: "boolean", optional: true },
		{ name: "xl", type: "boolean", optional: true },
		{ name: "left", type: "boolean", optional: true },
		{ name: "center", type: "boolean", optional: true },
		{ name: "right", type: "boolean", optional: true },
		{
			name: "total",
			type: "string",
			optional: true,
			description: "Total count",
		},
	];
}

/**
 * Analyze imported components to extract their prop definitions
 */
async function analyzeImportedComponents(
	content: string,
	filePath: string,
): Promise<Record<string, PropDefinition[]>> {
	const importedComponentProps: Record<string, PropDefinition[]> = {};

	// Extract import statements that import from '@layerd/ui'
	const importMatches = content.matchAll(
		/import\s+(?:\{([^}]+)\}|\*\s+as\s+\w+)\s+from\s+['"]@layerd\/ui['"]/g,
	);

	for (const match of importMatches) {
		const importedItems = match[1];
		if (importedItems) {
			// Parse imported items (components and interfaces)
			const items = importedItems.split(",").map((item) => {
				const trimmed = item.trim();
				// Handle "type IconProps" or just "Icon"
				return trimmed.replace(/^type\s+/, "");
			});

			// For each imported item, try to find and analyze its source file
			for (const item of items) {
				if (item.endsWith("Props")) {
					// This is likely a Props interface - analyze it
					const componentName = item.replace("Props", "").toLowerCase();
					const componentProps = await extractPropsFromComponent(componentName);
					if (componentProps.length > 0) {
						importedComponentProps[item] = componentProps;
					}
				}
			}
		}
	}

	return importedComponentProps;
}

/**
 * Extract props from a specific component by name
 */
async function extractPropsFromComponent(
	componentName: string,
): Promise<PropDefinition[]> {
	try {
		// Construct path to the component file using config
		const componentsPath = TOOLS_CONFIG.packages.ui.componentsPath;
		const componentPath = join(
			componentsPath,
			"atoms",
			componentName,
			`${componentName}.svelte`,
		);

		const componentContent = await readFile(componentPath, "utf-8");
		const componentInterface = extractInterface(componentContent);

		return componentInterface.properties.map((prop) =>
			convertPropertyToProp(prop)
		);
	} catch (error) {
		// Component file not found or couldn't be read
		return [];
	}
}

/**
 * Auto-generate stories based on component structure analysis
 * This function is completely generic and makes no assumptions about specific component types
 */
export function generateAutoStories(
	componentName: string,
	analysis: ComponentAnalysis,
): AutoStoryConfig {
	const props = analysis.props;
	const importedProps = analysis.importedComponentProps || {};

	const stories: Array<{
		name: string;
		props: Record<string, any>;
		propName?: string;
		isStringUnion?: boolean;
	}> = [];

	// Always include a default story with no props
	stories.push({
		name: "Default",
		props: {},
	});

	// Find all union type props (these represent different options/variants)
	const unionProps = props.filter((p) =>
		p.type === "union" && p.unionValues && p.unionValues.length > 1
	);

	// Create a story for each union prop to showcase all its options
	unionProps.forEach((prop) => {
		if (prop.unionValues && prop.unionValues.length > 1) {
			stories.push({
				name: `${prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}`,
				props: {
					variants: prop.unionValues,
				},
				propName: prop.name,
				isStringUnion: prop.type === "union" &&
					!prop.unionValues.every((v) => v === "true" || v === "false"),
			});
		}
	});

	// Look for props that reference imported component props
	// If we import IconProps and have string props, use IconProps union values
	const stringProps = props.filter((p) =>
		p.type === "string" && p.name !== "class" && p.name !== "id"
	);

	for (
		const [importedInterface, importedPropsList] of Object.entries(
			importedProps,
		)
	) {
		// Find any union props in the imported interface
		const unionPropsFromImport = importedPropsList.filter((ip) =>
			ip.type === "union" && ip.unionValues && ip.unionValues.length > 1
		);

		if (unionPropsFromImport.length > 0) {
			// For each union prop found, see if we have string props that could use these values
			for (const unionProp of unionPropsFromImport) {
				// Look for string props that might relate to this union prop
				const relevantStringProps = stringProps.filter((sp) => {
					// Generic matching - if the union prop is from IconProps,
					// it could apply to any string prop (icon, iconLeft, iconRight, etc.)
					return importedInterface.toLowerCase().includes("icon")
						? sp.name.toLowerCase().includes("icon")
						: false; // Could add more generic matching here
				});

				if (relevantStringProps.length > 0 && unionProp.unionValues) {
					// Use the first non-string value from the union, or first value
					const exampleValue = unionProp.unionValues.find((v) =>
						v !== "string"
					) || unionProp.unionValues[0];

					// Create a story using the first relevant string prop
					const exampleProp = relevantStringProps[0];
					stories.push({
						name: `With${
							exampleProp.name.charAt(0).toUpperCase() +
							exampleProp.name.slice(1)
						}`,
						props: {
							[exampleProp.name]: exampleValue,
						},
					});
					break; // Only create one story per imported interface
				}
			}
		}
	}

	return {
		stories,
		category: "atoms",
	};
}

interface AutoStoryConfig {
	stories: Array<{
		name: string;
		props: Record<string, any>;
		propName?: string;
		isStringUnion?: boolean;
	}>;
	category: string;
}
