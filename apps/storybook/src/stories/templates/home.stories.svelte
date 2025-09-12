<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Home } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Templates/Home",
		component: Home,
		tags: [],
		argTypes: {

	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />