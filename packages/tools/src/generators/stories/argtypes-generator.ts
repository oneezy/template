/**
 * ArgTypes generator for Storybook
 */
import {
	type ArgType,
	AUTO_DISABLED_PROPS,
	CATEGORY_RULES,
	SMART_DEFAULTS,
} from "./defaults.ts";
import type {
	ComponentAnalysis,
	PropDefinition,
} from "./typescript-analyzer.ts";
import type { JSDocConfig, PropOverride } from "./jsdoc-parser.ts";

/**
 * Generate comprehensive argTypes from component analysis and JSDoc configuration
 */
export function generateArgTypes(
	analysis: ComponentAnalysis,
	jsdocConfig: JSDocConfig,
): Record<string, ArgType> {
	const argTypes: Record<string, ArgType> = {};

	// Process each prop from the component analysis
	for (const prop of analysis.props) {
		const argType = generateArgTypeForProp(prop, jsdocConfig);
		argTypes[prop.name] = argType;
	}

	// Apply JSDoc prop overrides
	for (const override of jsdocConfig.props) {
		if (argTypes[override.name]) {
			applyPropOverride(argTypes[override.name], override);
		}
	}

	// Handle ignore list (disable props)
	for (const propName of jsdocConfig.ignore) {
		if (argTypes[propName]) {
			argTypes[propName].table.disable = true;
		}
	}

	// Handle enable list (force enable auto-disabled props)
	for (const propName of jsdocConfig.enable) {
		if (argTypes[propName]) {
			argTypes[propName].table.disable = false;
		}
	}

	return argTypes;
}

/**
 * Generate argType for a single prop based on its definition
 */
function generateArgTypeForProp(
	prop: PropDefinition,
	jsdocConfig: JSDocConfig,
): ArgType {
	// Check if this prop should be auto-disabled
	const shouldAutoDisable = AUTO_DISABLED_PROPS.includes(prop.name) &&
		!jsdocConfig.enable.includes(prop.name);

	// Determine control type and category from smart defaults
	const smartDefault = getSmartDefault(prop, SMART_DEFAULTS);

	// Build base argType
	const argType: ArgType = {
		control: smartDefault.control || getControlForType(prop.type),
		table: {
			category: smartDefault.table?.category || CATEGORY_RULES[prop.name] ||
				"Props",
			disable: shouldAutoDisable,
		},
	};

	// Add options for union types
	if (prop.type === "union" && prop.unionValues) {
		argType.options = prop.unionValues;
	}

	// Add description if available
	if (prop.description) {
		argType.description = prop.description;
	}

	// Handle function props (event handlers)
	if (prop.type === "function") {
		argType.control = false;
		if (prop.name.startsWith("on") || prop.name.startsWith("handle")) {
			argType.action = prop.name.replace(/^on/, "").toLowerCase();
		}
	}

	// Apply any smart default properties (but preserve disable setting)
	const originalDisable = argType.table.disable;
	Object.assign(argType, smartDefault);

	// Ensure disable setting is preserved if it was set to true
	if (originalDisable) {
		argType.table.disable = originalDisable;
	}

	return argType;
}

/**
 * Get smart default configuration for a prop
 */
function getSmartDefault(
	prop: PropDefinition,
	smartDefaults: typeof SMART_DEFAULTS,
): Partial<ArgType> {
	// Check exact name matches first
	if (smartDefaults[prop.name]) {
		return smartDefaults[prop.name];
	}

	// Check regex patterns
	for (const [pattern, config] of Object.entries(smartDefaults)) {
		if (pattern.startsWith("/") && pattern.endsWith("/")) {
			const regex = new RegExp(pattern.slice(1, -1));
			if (regex.test(prop.name)) {
				return config;
			}
		}
	}

	// Check by type
	if (smartDefaults[prop.type]) {
		return smartDefaults[prop.type];
	}

	return {};
}

/**
 * Get appropriate control type for a prop type
 */
function getControlForType(type: PropDefinition["type"]): string | false {
	switch (type) {
		case "boolean":
			return "boolean";
		case "string":
			return "text";
		case "number":
			return "number";
		case "union":
			return "inline-radio";
		case "function":
			return false;
		default:
			return "text";
	}
}

/**
 * Apply JSDoc prop override to an existing argType
 */
function applyPropOverride(argType: ArgType, override: PropOverride): void {
	if (override.control) {
		if (override.control === "action") {
			argType.control = false;
			argType.action = true;
		} else {
			argType.control = override.control;
		}
	}

	if (override.category) {
		argType.table.category = override.category;
	}

	if (override.description) {
		argType.description = override.description;
	}
}
