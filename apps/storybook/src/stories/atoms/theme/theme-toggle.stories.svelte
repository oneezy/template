<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ThemeToggle } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Theme/ThemeToggle",
		component: ThemeToggle,
		tags: ["theme", "toggle", "dark mode"],
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
		preset: { control: "inline-radio", options: ["simple", "icon-only", "theme-only", "full"], table: { category: "Props" } },
		showIcon: { control: "boolean", table: { category: "Props" } },
		showText: { control: "boolean", table: { category: "Props" } },
		theme: { control: "text", table: { category: "Styles" } },
		defaultMode: { control: "inline-radio", options: ["system", "light", "dark"], table: { category: "Props" } },
		defaultTheme: { control: "text", table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Color 1" args={{"color":"base","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Color 2" args={{"color":"neutral","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Color 3" args={{"color":"primary","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Color 4" args={{"color":"secondary","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Color 5" args={{"color":"accent","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Size 1" args={{"size":"xs","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Size 2" args={{"size":"sm","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Size 3" args={{"size":"md","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Size 4" args={{"size":"lg","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Size 5" args={{"size":"xl","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"left","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"center","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"right","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Preset 1" args={{"preset":"simple","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Preset 2" args={{"preset":"icon-only","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Preset 3" args={{"preset":"theme-only","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="Preset 4" args={{"preset":"full","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="DefaultMode 1" args={{"defaultMode":"system","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="DefaultMode 2" args={{"defaultMode":"light","label":"ThemeToggle"}} tags={["!dev"]} />

<Story name="DefaultMode 3" args={{"defaultMode":"dark","label":"ThemeToggle"}} tags={["!dev"]} />