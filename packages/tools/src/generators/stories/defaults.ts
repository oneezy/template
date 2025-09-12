/**
 * Default configuration for story generation
 */

export interface ArgType {
	control: string | false;
	options?: string[];
	table: {
		category: string;
		disable?: boolean;
	};
	description?: string;
	action?: string | boolean;
}

/**
 * Props that should always be auto-disabled in Storybook
 * These are typically boolean variants of union props or internal props
 */
export const AUTO_DISABLED_PROPS: string[] = [
	// Boolean variants of union props (since we have the union version)
	"base",
	"primary",
	"secondary",
	"neutral",
	"accent",
	"heavy",
	"lite",
	"outline",
	"ghost",
	"glass",
	"gradient",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"left",
	"center",
	"right",

	// Internal props that shouldn't be exposed
	"class",
	"children",
	"$$slots",
	"$$events",
];

/**
 * Smart default rules for generating argTypes based on prop patterns
 */
export const SMART_DEFAULTS: Record<string, Partial<ArgType>> = {
	// Control type detection by type
	boolean: { control: "boolean" },
	string: { control: "text" },
	number: { control: "number" },

	// Union type patterns (regex keys start with /)
	"/^(xs|sm|md|lg|xl)$/": {
		control: "inline-radio",
		table: { category: "Layout" },
	},
	"/^(left|center|right)$/": {
		control: "inline-radio",
		table: { category: "Layout" },
	},
	"/^(primary|secondary|accent|neutral|base)$/": {
		control: "inline-radio",
		table: { category: "Styles" },
	},
	"/^(heavy|lite|outline|ghost|glass)$/": {
		control: "inline-radio",
		table: { category: "Styles" },
	},

	// Function patterns (event handlers)
	"/^on[A-Z]\\w*$/": {
		control: false,
		action: true,
		table: { category: "Events" },
	},
	"/^handle[A-Z]\\w*$/": {
		control: false,
		action: true,
		table: { category: "Events" },
	},

	// Special props by exact name
	class: { control: "text", table: { category: "Customization" } },
	style: { control: "text", table: { category: "Customization" } },
	children: { control: false, table: { category: "Content" } },
	disabled: { control: "boolean", table: { category: "States" } },
	loading: { control: "boolean", table: { category: "States" } },
	readonly: { control: "boolean", table: { category: "States" } },

	// Content props
	"/^(label|title|text|content)$/i": {
		control: "text",
		table: { category: "Content" },
	},
	"/icon.*$/i": { control: "text", table: { category: "Content" } },
};

/**
 * Category assignment rules for props that don't match smart defaults
 */
export const CATEGORY_RULES: Record<string, string> = {
	// Layout
	size: "Layout",
	position: "Layout",
	align: "Layout",
	justify: "Layout",

	// Styles
	color: "Styles",
	appearance: "Styles",
	theme: "Styles",
	invert: "Styles",

	// States
	active: "States",
	focused: "States",
	hover: "States",
	pressed: "States",
	selected: "States",

	// Content
	icon: "Content",
	image: "Content",
	src: "Content",
	alt: "Content",

	// Controls
	value: "Controls",
	checked: "Controls",
	total: "Controls",

	// Events (fallback)
	onclick: "Events",
	onchange: "Events",
	oninput: "Events",
};
