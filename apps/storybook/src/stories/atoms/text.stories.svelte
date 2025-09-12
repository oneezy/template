<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Text } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Text",
		component: Text,
		tags: ["text", "typography", "heading", "paragraph"],
		argTypes: {
		label: { control: "text", description: "Component label", table: { category: "Props" } },
		color: { control: "inline-radio", options: ["base", "neutral", "primary", "secondary", "accent"], description: "Style variant", table: { category: "Styles" } },
		appearance: { control: "inline-radio", options: ["heavy", "lite", "outline", "ghost", "glass", "gradient"], description: "Visual appearance", table: { category: "Styles" } },
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"], description: "Component size", table: { category: "Layout" } },
		position: { control: "inline-radio", options: ["left", "center", "right"], description: "Content position", table: { category: "Layout" } },
		invert: { control: "boolean", description: "Invert colors", table: { category: "Styles" } },
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
		left: { control: "inline-radio", table: { category: "Layout", disable: true } },
		center: { control: "inline-radio", table: { category: "Layout", disable: true } },
		right: { control: "inline-radio", table: { category: "Layout", disable: true } },
		total: { control: "text", description: "Total count", table: { category: "Controls" } },
		type: { control: "inline-radio", options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "bold", "italic", "line", "underline", "quote", "key", "small", "code", "codeblock"], table: { category: "Props" } },
		text: { control: "text", table: { category: "Props" } },
		prose: { control: "boolean", table: { category: "Props" } },
		noprose: { control: "boolean", table: { category: "Props" } },
		disabled: { control: "boolean", table: { category: "States" } },
		xs: { control: "inline-radio", table: { category: "Layout", disable: true } },
		sm: { control: "inline-radio", table: { category: "Layout", disable: true } },
		md: { control: "inline-radio", table: { category: "Layout", disable: true } },
		lg: { control: "inline-radio", table: { category: "Layout", disable: true } },
		xl: { control: "inline-radio", table: { category: "Layout", disable: true } },
		h1: { control: "text", table: { category: "Props" } },
		h2: { control: "text", table: { category: "Props" } },
		h3: { control: "text", table: { category: "Props" } },
		h4: { control: "text", table: { category: "Props" } },
		h5: { control: "text", table: { category: "Props" } },
		h6: { control: "text", table: { category: "Props" } },
		p: { control: "text", table: { category: "Props" } },
		bold: { control: "text", table: { category: "Props" } },
		italic: { control: "text", table: { category: "Props" } },
		line: { control: "text", table: { category: "Props" } },
		underline: { control: "text", table: { category: "Props" } },
		quote: { control: "text", table: { category: "Props" } },
		key: { control: "text", table: { category: "Props" } },
		small: { control: "text", table: { category: "Props" } },
		code: { control: "text", table: { category: "Props" } },
		codeblock: { control: "text", table: { category: "Props" } },
		children: { control: false, table: { category: "Content", disable: true } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Color 1" args={{"color":"base","label":"Text"}} tags={["!dev"]} />

<Story name="Color 2" args={{"color":"neutral","label":"Text"}} tags={["!dev"]} />

<Story name="Color 3" args={{"color":"primary","label":"Text"}} tags={["!dev"]} />

<Story name="Color 4" args={{"color":"secondary","label":"Text"}} tags={["!dev"]} />

<Story name="Color 5" args={{"color":"accent","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"Text"}} tags={["!dev"]} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"Text"}} tags={["!dev"]} />

<Story name="Size 1" args={{"size":"xs","label":"Text"}} tags={["!dev"]} />

<Story name="Size 2" args={{"size":"sm","label":"Text"}} tags={["!dev"]} />

<Story name="Size 3" args={{"size":"md","label":"Text"}} tags={["!dev"]} />

<Story name="Size 4" args={{"size":"lg","label":"Text"}} tags={["!dev"]} />

<Story name="Size 5" args={{"size":"xl","label":"Text"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"left","label":"Text"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"center","label":"Text"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"right","label":"Text"}} tags={["!dev"]} />

<Story name="Type 1" args={{"type":"h1","label":"Text"}} tags={["!dev"]} />

<Story name="Type 2" args={{"type":"h2","label":"Text"}} tags={["!dev"]} />

<Story name="Type 3" args={{"type":"h3","label":"Text"}} tags={["!dev"]} />

<Story name="Type 4" args={{"type":"h4","label":"Text"}} tags={["!dev"]} />

<Story name="Type 5" args={{"type":"h5","label":"Text"}} tags={["!dev"]} />

<Story name="Type 6" args={{"type":"h6","label":"Text"}} tags={["!dev"]} />

<Story name="Type 7" args={{"type":"p","label":"Text"}} tags={["!dev"]} />

<Story name="Type 8" args={{"type":"bold","label":"Text"}} tags={["!dev"]} />

<Story name="Type 9" args={{"type":"italic","label":"Text"}} tags={["!dev"]} />

<Story name="Type 10" args={{"type":"line","label":"Text"}} tags={["!dev"]} />

<Story name="Type 11" args={{"type":"underline","label":"Text"}} tags={["!dev"]} />

<Story name="Type 12" args={{"type":"quote","label":"Text"}} tags={["!dev"]} />

<Story name="Type 13" args={{"type":"key","label":"Text"}} tags={["!dev"]} />

<Story name="Type 14" args={{"type":"small","label":"Text"}} tags={["!dev"]} />

<Story name="Type 15" args={{"type":"code","label":"Text"}} tags={["!dev"]} />

<Story name="Type 16" args={{"type":"codeblock","label":"Text"}} tags={["!dev"]} />