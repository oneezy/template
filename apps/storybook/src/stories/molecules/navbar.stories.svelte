<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Navbar } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Molecules/Navbar",
		component: Navbar,
		tags: [],
		argTypes: {

	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />