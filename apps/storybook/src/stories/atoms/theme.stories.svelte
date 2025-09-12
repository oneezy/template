<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Theme } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Theme",
		component: Theme,
		tags: ["theme", "settings", "dark mode", "theme selector"],
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
		showModeToggle: { control: "boolean", table: { category: "Props" } },
		showThemeSelector: { control: "boolean", table: { category: "Props" } },
		themes: { control: "text", table: { category: "Props" } },
		variant: { control: "inline-radio", options: ["buttons", "dropdown", "compact", "full"], table: { category: "Props" } },
		defaultMode: { control: "inline-radio", options: ["system", "light", "dark"], table: { category: "Props" } },
		defaultTheme: { control: "text", table: { category: "Props" } },
		track: { control: "boolean", table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Color 1" args={{"color":"base","label":"Theme"}} tags={["!dev"]} />

<Story name="Color 2" args={{"color":"neutral","label":"Theme"}} tags={["!dev"]} />

<Story name="Color 3" args={{"color":"primary","label":"Theme"}} tags={["!dev"]} />

<Story name="Color 4" args={{"color":"secondary","label":"Theme"}} tags={["!dev"]} />

<Story name="Color 5" args={{"color":"accent","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 1" args={{"appearance":"heavy","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 2" args={{"appearance":"lite","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 3" args={{"appearance":"outline","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 4" args={{"appearance":"ghost","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 5" args={{"appearance":"glass","label":"Theme"}} tags={["!dev"]} />

<Story name="Appearance 6" args={{"appearance":"gradient","label":"Theme"}} tags={["!dev"]} />

<Story name="Size 1" args={{"size":"xs","label":"Theme"}} tags={["!dev"]} />

<Story name="Size 2" args={{"size":"sm","label":"Theme"}} tags={["!dev"]} />

<Story name="Size 3" args={{"size":"md","label":"Theme"}} tags={["!dev"]} />

<Story name="Size 4" args={{"size":"lg","label":"Theme"}} tags={["!dev"]} />

<Story name="Size 5" args={{"size":"xl","label":"Theme"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"left","label":"Theme"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"center","label":"Theme"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"right","label":"Theme"}} tags={["!dev"]} />

<Story name="Variant 1" args={{"variant":"buttons","label":"Theme"}} tags={["!dev"]} />

<Story name="Variant 2" args={{"variant":"dropdown","label":"Theme"}} tags={["!dev"]} />

<Story name="Variant 3" args={{"variant":"compact","label":"Theme"}} tags={["!dev"]} />

<Story name="Variant 4" args={{"variant":"full","label":"Theme"}} tags={["!dev"]} />

<Story name="DefaultMode 1" args={{"defaultMode":"system","label":"Theme"}} tags={["!dev"]} />

<Story name="DefaultMode 2" args={{"defaultMode":"light","label":"Theme"}} tags={["!dev"]} />

<Story name="DefaultMode 3" args={{"defaultMode":"dark","label":"Theme"}} tags={["!dev"]} />