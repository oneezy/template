<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Divider } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Divider",
		component: Divider,
		tags: ["divider", "separator", "section", "shape", "svg"],
		argTypes: {
		label: { control: "text", description: "Component label", table: { category: "Props" } },
		color: { control: "inline-radio", options: ["base", "neutral", "primary", "secondary", "accent"], description: "Style variant", table: { category: "Styles" } },
		appearance: { control: "inline-radio", options: ["heavy", "lite", "outline", "ghost", "glass", "gradient"], description: "Visual appearance", table: { category: "Styles" } },
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"], description: "Component size", table: { category: "Layout" } },
		position: { control: "inline-radio", options: ["left", "center", "right"], description: "Content position", table: { category: "Layout" } },
		disabled: { control: "boolean", description: "Disable component", table: { category: "States" } },
		class: { control: "text", description: "Additional CSS classes", table: { category: "Customization", disable: true } },
		heavy: { control: "inline-radio", table: { category: "Styles", disable: true } },
		lite: { control: "inline-radio", table: { category: "Styles", disable: true } },
		outline: { control: "inline-radio", table: { category: "Styles", disable: true } },
		ghost: { control: "inline-radio", table: { category: "Styles", disable: true } },
		glass: { control: "inline-radio", table: { category: "Styles", disable: true } },
		gradient: { control: "boolean", table: { category: "Props", disable: true } },
		xs: { control: "inline-radio", table: { category: "Layout", disable: true } },
		sm: { control: "inline-radio", table: { category: "Layout", disable: true } },
		md: { control: "inline-radio", table: { category: "Layout", disable: true } },
		lg: { control: "inline-radio", table: { category: "Layout", disable: true } },
		xl: { control: "inline-radio", table: { category: "Layout", disable: true } },
		left: { control: "inline-radio", table: { category: "Layout", disable: true } },
		center: { control: "inline-radio", table: { category: "Layout", disable: true } },
		right: { control: "inline-radio", table: { category: "Layout", disable: true } },
		total: { control: "text", description: "Total count", table: { category: "Controls" } },
		bleed: { control: "boolean", table: { category: "Props" } },
		height: { control: "text", table: { category: "Props" } },
		width: { control: "text", table: { category: "Props" } },
		shape: { control: "inline-radio", options: ["waves", "curve", "tilt", "triangle", "arrow"], table: { category: "Props" } },
		align: { control: "inline-radio", options: ["top", "bottom", "both"], table: { category: "Layout" } },
		outside: { control: "boolean", table: { category: "Props" } },
		flip: { control: "inline-radio", options: ["x", "y", "xy"], table: { category: "Props" } },
		invert: { control: "boolean", table: { category: "Styles" } },
		negative: { control: "boolean", table: { category: "Props" } },
		svg: { control: "text", table: { category: "Props" } },
		children: { control: false, table: { category: "Content", disable: true } },
		primary: { control: "inline-radio", table: { category: "Styles", disable: true } },
		secondary: { control: "inline-radio", table: { category: "Styles", disable: true } },
		accent: { control: "inline-radio", table: { category: "Styles", disable: true } },
		base: { control: "inline-radio", table: { category: "Styles", disable: true } },
		neutral: { control: "inline-radio", table: { category: "Styles", disable: true } },
		top: { control: "boolean", table: { category: "Props" } },
		bottom: { control: "boolean", table: { category: "Props" } },
		flipX: { control: "boolean", table: { category: "Props" } },
		flipY: { control: "boolean", table: { category: "Props" } },
		flipXY: { control: "boolean", table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Color 1" args={{"color":"base","label":"Divider"}} tags={["!dev"]} />

<Story name="Color 2" args={{"color":"neutral","label":"Divider"}} tags={["!dev"]} />

<Story name="Color 3" args={{"color":"primary","label":"Divider"}} tags={["!dev"]} />

<Story name="Color 4" args={{"color":"secondary","label":"Divider"}} tags={["!dev"]} />

<Story name="Color 5" args={{"color":"accent","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"Divider"}} tags={["!dev"]} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"Divider"}} tags={["!dev"]} />

<Story name="Size 1" args={{"size":"xs","label":"Divider"}} tags={["!dev"]} />

<Story name="Size 2" args={{"size":"sm","label":"Divider"}} tags={["!dev"]} />

<Story name="Size 3" args={{"size":"md","label":"Divider"}} tags={["!dev"]} />

<Story name="Size 4" args={{"size":"lg","label":"Divider"}} tags={["!dev"]} />

<Story name="Size 5" args={{"size":"xl","label":"Divider"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"left","label":"Divider"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"center","label":"Divider"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"right","label":"Divider"}} tags={["!dev"]} />

<Story name="Shape 1" args={{"shape":"waves","label":"Divider"}} tags={["!dev"]} />

<Story name="Shape 2" args={{"shape":"curve","label":"Divider"}} tags={["!dev"]} />

<Story name="Shape 3" args={{"shape":"tilt","label":"Divider"}} tags={["!dev"]} />

<Story name="Shape 4" args={{"shape":"triangle","label":"Divider"}} tags={["!dev"]} />

<Story name="Shape 5" args={{"shape":"arrow","label":"Divider"}} tags={["!dev"]} />

<Story name="Align 1" args={{"align":"top","label":"Divider"}} tags={["!dev"]} />

<Story name="Align 2" args={{"align":"bottom","label":"Divider"}} tags={["!dev"]} />

<Story name="Align 3" args={{"align":"both","label":"Divider"}} tags={["!dev"]} />

<Story name="Flip 1" args={{"flip":"x","label":"Divider"}} tags={["!dev"]} />

<Story name="Flip 2" args={{"flip":"y","label":"Divider"}} tags={["!dev"]} />

<Story name="Flip 3" args={{"flip":"xy","label":"Divider"}} tags={["!dev"]} />