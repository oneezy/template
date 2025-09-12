<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Content } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Content",
		component: Content,
		tags: ["content", "typography", "prose", "blog", "article", "test"],
		argTypes: {
		label: { control: "text", description: "Component label", table: { category: "Props" } },
		color: { control: "inline-radio", options: ["base", "neutral", "primary", "secondary", "accent"], description: "Style variant", table: { category: "Styles" } },
		appearance: { control: "inline-radio", options: ["heavy", "lite", "outline", "ghost", "glass", "gradient"], description: "Visual appearance", table: { category: "Styles" } },
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"], description: "Component size", table: { category: "Layout" } },
		position: { control: "inline-radio", options: ["left", "center", "right"], description: "Content position", table: { category: "Layout" } },
		invert: { control: "boolean", description: "Invert colors", table: { category: "Styles" } },
		disabled: { control: "boolean", description: "Disable component", table: { category: "States" } },
		class: { control: "text", description: "Additional CSS classes", table: { category: "Customization", disable: true } },
		base: { control: "inline-radio", table: { category: "Styles", disable: true } },
		primary: { control: "inline-radio", table: { category: "Styles", disable: true } },
		secondary: { control: "inline-radio", table: { category: "Styles", disable: true } },
		neutral: { control: "inline-radio", table: { category: "Styles", disable: true } },
		accent: { control: "inline-radio", table: { category: "Styles", disable: true } },
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
		type: { control: "inline-radio", options: ["custom", "text", "blog", "minimal", "openprops"], table: { category: "Props" } },
		prose: { control: "boolean", table: { category: "Props" } },
		html: { control: "text", table: { category: "Props" } },
		imgSrc: { control: "text", table: { category: "Props" } },
		imgAlt: { control: "text", table: { category: "Props" } },
		blank: { control: "boolean", table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color 1" args={{"color":"base","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color 2" args={{"color":"neutral","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color 3" args={{"color":"primary","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color 4" args={{"color":"secondary","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color 5" args={{"color":"accent","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size 1" args={{"size":"xs","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size 2" args={{"size":"sm","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size 3" args={{"size":"md","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size 4" args={{"size":"lg","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size 5" args={{"size":"xl","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Position 1" args={{"position":"left","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Position 2" args={{"position":"center","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Position 3" args={{"position":"right","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type 1" args={{"type":"custom","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type 2" args={{"type":"text","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type 3" args={{"type":"blog","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type 4" args={{"type":"minimal","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type 5" args={{"type":"openprops","label":"Content"}} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />