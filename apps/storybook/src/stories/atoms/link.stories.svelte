<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Link } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Link",
		component: Link,
		tags: ["navigation", "link", "anchor"],
		argTypes: {
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
		href: { control: "text", table: { category: "Props" } },
		text: { control: "text", table: { category: "Props" } },
		target: { control: "inline-radio", options: ["_blank", "_self", "_parent", "_top"], table: { category: "Props" } },
		rel: { control: "text", table: { category: "Props" } },
		external: { control: "boolean", table: { category: "Props" } },
		type: { control: "inline-radio", options: ["link", "button"], table: { category: "Props" } },
		icon: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Content" } },
		label: { control: "text", table: { category: "Props" } },
		reverse: { control: "boolean", table: { category: "Props" } },
		iconToggle: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		iconHover: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		toggled: { control: "boolean", table: { category: "Props" } },
		onToggle: { control: false, action: true, table: { category: "Events" } },
		children: { control: false, table: { category: "Content", disable: true } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Color 1" args={{"color":"base","label":"Link"}} tags={["!dev"]} />

<Story name="Color 2" args={{"color":"neutral","label":"Link"}} tags={["!dev"]} />

<Story name="Color 3" args={{"color":"primary","label":"Link"}} tags={["!dev"]} />

<Story name="Color 4" args={{"color":"secondary","label":"Link"}} tags={["!dev"]} />

<Story name="Color 5" args={{"color":"accent","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"Link"}} tags={["!dev"]} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"Link"}} tags={["!dev"]} />

<Story name="Size 1" args={{"size":"xs","label":"Link"}} tags={["!dev"]} />

<Story name="Size 2" args={{"size":"sm","label":"Link"}} tags={["!dev"]} />

<Story name="Size 3" args={{"size":"md","label":"Link"}} tags={["!dev"]} />

<Story name="Size 4" args={{"size":"lg","label":"Link"}} tags={["!dev"]} />

<Story name="Size 5" args={{"size":"xl","label":"Link"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"left","label":"Link"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"center","label":"Link"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"right","label":"Link"}} tags={["!dev"]} />

<Story name="Target 1" args={{"target":"_blank","label":"Link"}} tags={["!dev"]} />

<Story name="Target 2" args={{"target":"_self","label":"Link"}} tags={["!dev"]} />

<Story name="Target 3" args={{"target":"_parent","label":"Link"}} tags={["!dev"]} />

<Story name="Target 4" args={{"target":"_top","label":"Link"}} tags={["!dev"]} />

<Story name="Type 1" args={{"type":"link","label":"Link"}} tags={["!dev"]} />

<Story name="Type 2" args={{"type":"button","label":"Link"}} tags={["!dev"]} />

<Story name="Icon 1" args={{"icon":"home","label":"Link"}} tags={["!dev"]} />

<Story name="Icon 2" args={{"icon":"menu","label":"Link"}} tags={["!dev"]} />

<Story name="Icon 3" args={{"icon":"arrow-right","label":"Link"}} tags={["!dev"]} />

<Story name="IconToggle 1" args={{"iconToggle":"home","label":"Link"}} tags={["!dev"]} />

<Story name="IconToggle 2" args={{"iconToggle":"menu","label":"Link"}} tags={["!dev"]} />

<Story name="IconToggle 3" args={{"iconToggle":"arrow-right","label":"Link"}} tags={["!dev"]} />

<Story name="IconHover 1" args={{"iconHover":"home","label":"Link"}} tags={["!dev"]} />

<Story name="IconHover 2" args={{"iconHover":"menu","label":"Link"}} tags={["!dev"]} />

<Story name="IconHover 3" args={{"iconHover":"arrow-right","label":"Link"}} tags={["!dev"]} />