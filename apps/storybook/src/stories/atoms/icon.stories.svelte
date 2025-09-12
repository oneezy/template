<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Icon } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";

	const nameVariants: ComponentProps[] = [
		{ name: "home" },
		{ name: "user" },
		{ name: "settings" },
		{ name: "menu" },
		{ name: "close" },
		{ name: "search" },
		{ name: "edit" },
		{ name: "delete" },
		{ name: "add" },
		{ name: "check" },
		{ name: "arrow-right" },
		{ name: "arrow-left" },
		{ name: "arrow-up" },
		{ name: "arrow-down" },
		{ name: "chevron-right" },
		{ name: "chevron-left" },
		{ name: "chevron-up" },
		{ name: "chevron-down" }
	];

	const themeVariants: ComponentProps[] = [
		{ theme: "mdi" },
		{ theme: "heroicons" },
		{ theme: "carbon" },
		{ theme: "solar" }
	];


	const { Story } = defineMeta({
		title: "Components/Atoms/Icon",
		component: Icon,
		tags: ["icon", "iconify", "theme"],
		argTypes: {
		name: { control: "inline-radio", options: ["home", "user", "settings", "menu", "close", "search", "edit", "delete", "add", "check", "arrow-right", "arrow-left", "arrow-up", "arrow-down", "chevron-right", "chevron-left", "chevron-up", "chevron-down"], table: { category: "Props" } },
		theme: { control: "inline-radio", options: ["mdi", "heroicons", "carbon", "solar"], table: { category: "Styles" } },
		all: { control: "boolean", table: { category: "Props" } },
		remote: { control: "boolean", table: { category: "Props" } },
		icons: { control: "text", table: { category: "Props" } },
		class: { control: "text", table: { category: "Customization", disable: true } },
		role: { control: "text", table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>

<!-- Template for multiple variants -->
{#snippet template(args: any)}
	<div class="flex gap-4 items-center justify-center">
		{#each args.icons as iconProps}
			<Icon {...iconProps} />
		{/each}
	</div>
{/snippet}


<Story name="Default" args={{}} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Name" args={{ icons: nameVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Theme" args={{ icons: themeVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />