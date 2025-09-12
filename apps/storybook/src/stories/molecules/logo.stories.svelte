<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Logo } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Molecules/Logo",
		component: Logo,
		tags: ["branding", "logo", "navigation"],
		argTypes: {
		href: { control: "text", table: { category: "Props" } },
		src: { control: "text", table: { category: "Content" } },
		name: { control: "text", table: { category: "Props" } },
		variant: { control: "inline-radio", options: ["color", "dark", "light"], table: { category: "Props" } },
		type: { control: "inline-radio", options: ["icon", "logo", "both"], table: { category: "Props" } },
		dark: { control: "boolean", table: { category: "Props" } },
		light: { control: "boolean", table: { category: "Props" } },
		icon: { control: "boolean", table: { category: "Content" } },
		logo: { control: "boolean", table: { category: "Props" } },
		both: { control: "boolean", table: { category: "Props" } },
		children: { control: false, table: { category: "Content", disable: true } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Variant 1" args={{"variant":"color","label":"Logo"}} tags={["!dev"]} />

<Story name="Variant 2" args={{"variant":"dark","label":"Logo"}} tags={["!dev"]} />

<Story name="Variant 3" args={{"variant":"light","label":"Logo"}} tags={["!dev"]} />

<Story name="Type 1" args={{"type":"icon","label":"Logo"}} tags={["!dev"]} />

<Story name="Type 2" args={{"type":"logo","label":"Logo"}} tags={["!dev"]} />

<Story name="Type 3" args={{"type":"both","label":"Logo"}} tags={["!dev"]} />