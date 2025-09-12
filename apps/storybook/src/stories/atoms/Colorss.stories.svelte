<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Colorss } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Atoms/Colorss",
		component: Colorss,
		tags: [],
		argTypes: {

	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />