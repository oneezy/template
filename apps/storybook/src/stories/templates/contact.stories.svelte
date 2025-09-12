<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Contact } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Templates/Contact",
		component: Contact,
		tags: [],
		argTypes: {

	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />