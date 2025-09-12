<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Toggle } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";



	const { Story } = defineMeta({
		title: "Components/Molecules/Toggle",
		component: Toggle,
		tags: [],
		argTypes: {
		button: { control: "text", table: { category: "Props" } },
		variant: { control: "inline-radio", options: ["panel", "tooltip", "menu", "dialog", "sheet", "toast"], table: { category: "Props" } },
		autoClose: { control: "boolean", table: { category: "Props" } },
		trigger: { control: "inline-radio", options: ["click", "hover"], table: { category: "Props" } },
		position: { control: "inline-radio", options: ["relative", "absolute", "fixed"], table: { category: "Layout" } },
		animation: { control: "inline-radio", options: ["fade", "slide", "scale"], table: { category: "Props" } },
		align: { control: "inline-radio", options: ["top", "bottom", "left", "right", "center", "inline", "bottom-right", "bottom-left", "top-right", "top-left"], table: { category: "Layout" } },
		closeOnOutsideClick: { control: "boolean", table: { category: "Props" } },
		closeOnEscape: { control: "boolean", table: { category: "Props" } },
		detached: { control: "boolean", table: { category: "Props" } },
		triggerClass: { control: "text", table: { category: "Props" } },
		contentClass: { control: "text", table: { category: "Props" } },
		navId: { control: "text", table: { category: "Props" } },
		label: { control: "text", table: { category: "Props" } },
		trigger_content: { control: "text", table: { category: "Props" } },
		content: { control: "text", table: { category: "Props" } },
		class: { control: "text", table: { category: "Customization", disable: true } },
		id: { control: "text", table: { category: "Props" } },
		onclick: { control: false, action: "click", table: { category: "Events" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>


<Story name="Default" args={{}} />

<Story name="Variant 1" args={{"variant":"panel","label":"Toggle"}} tags={["!dev"]} />

<Story name="Variant 2" args={{"variant":"tooltip","label":"Toggle"}} tags={["!dev"]} />

<Story name="Variant 3" args={{"variant":"menu","label":"Toggle"}} tags={["!dev"]} />

<Story name="Variant 4" args={{"variant":"dialog","label":"Toggle"}} tags={["!dev"]} />

<Story name="Variant 5" args={{"variant":"sheet","label":"Toggle"}} tags={["!dev"]} />

<Story name="Variant 6" args={{"variant":"toast","label":"Toggle"}} tags={["!dev"]} />

<Story name="Trigger 1" args={{"trigger":"click","label":"Toggle"}} tags={["!dev"]} />

<Story name="Trigger 2" args={{"trigger":"hover","label":"Toggle"}} tags={["!dev"]} />

<Story name="Position 1" args={{"position":"relative","label":"Toggle"}} tags={["!dev"]} />

<Story name="Position 2" args={{"position":"absolute","label":"Toggle"}} tags={["!dev"]} />

<Story name="Position 3" args={{"position":"fixed","label":"Toggle"}} tags={["!dev"]} />

<Story name="Animation 1" args={{"animation":"fade","label":"Toggle"}} tags={["!dev"]} />

<Story name="Animation 2" args={{"animation":"slide","label":"Toggle"}} tags={["!dev"]} />

<Story name="Animation 3" args={{"animation":"scale","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 1" args={{"align":"top","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 2" args={{"align":"bottom","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 3" args={{"align":"left","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 4" args={{"align":"right","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 5" args={{"align":"center","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 6" args={{"align":"inline","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 7" args={{"align":"bottom-right","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 8" args={{"align":"bottom-left","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 9" args={{"align":"top-right","label":"Toggle"}} tags={["!dev"]} />

<Story name="Align 10" args={{"align":"top-left","label":"Toggle"}} tags={["!dev"]} />