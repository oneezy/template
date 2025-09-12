<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button } from "@layerd/ui";
	import { fn } from "storybook/test";
	import type { ComponentProps } from "@layerd/ui";

	const colorVariants: ComponentProps[] = [
		{ color: "base" },
		{ color: "neutral" },
		{ color: "primary" },
		{ color: "secondary" },
		{ color: "accent" }
	];

	const appearanceVariants: ComponentProps[] = [
		{ appearance: "heavy" },
		{ appearance: "lite" },
		{ appearance: "outline" },
		{ appearance: "ghost" },
		{ appearance: "glass" },
		{ appearance: "gradient" }
	];

	const sizeVariants: ComponentProps[] = [
		{ size: "xs" },
		{ size: "sm" },
		{ size: "md" },
		{ size: "lg" },
		{ size: "xl" }
	];

	const positionVariants: ComponentProps[] = [
		{ position: "left" },
		{ position: "center" },
		{ position: "right" }
	];

	const iconVariants: ComponentProps[] = [
		{ icon: "home" },
		{ icon: "menu" },
		{ icon: "arrow-right" }
	];

	const typeVariants: ComponentProps[] = [
		{ type: "button" },
		{ type: "submit" },
		{ type: "reset" },
		{ type: "radio" },
		{ type: "checkbox" }
	];

	const icontoggleVariants: ComponentProps[] = [
		{ iconToggle: "home" },
		{ iconToggle: "menu" },
		{ iconToggle: "arrow-right" }
	];

	const iconhoverVariants: ComponentProps[] = [
		{ iconHover: "home" },
		{ iconHover: "menu" },
		{ iconHover: "arrow-right" }
	];

	const variantVariants: ComponentProps[] = [
		{ variant: "text" },
		{ variant: "icon" },
		{ variant: "icon text" },
		{ variant: "text icon" },
		{ variant: "icon text icon" }
	];

	const widthVariants: ComponentProps[] = [
		{ width: "auto" },
		{ width: "full" }
	];

	const paddingVariants: ComponentProps[] = [
		{ padding: "default" },
		{ padding: "none" }
	];

	const alignVariants: ComponentProps[] = [
		{ align: "center" },
		{ align: "start" },
		{ align: "end" },
		{ align: "between" },
		{ align: "around" }
	];

	const iconendVariants: ComponentProps[] = [
		{ iconEnd: "home" },
		{ iconEnd: "menu" },
		{ iconEnd: "arrow-right" }
	];

	const iconendhoverVariants: ComponentProps[] = [
		{ iconEndHover: "home" },
		{ iconEndHover: "menu" },
		{ iconEndHover: "arrow-right" }
	];

	const iconendtoggleVariants: ComponentProps[] = [
		{ iconEndToggle: "home" },
		{ iconEndToggle: "menu" },
		{ iconEndToggle: "arrow-right" }
	];


	const { Story } = defineMeta({
		title: "Components/Atoms/Button",
		component: Button,
		tags: ["button", "form"],
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
		icon: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Content" } },
		label: { control: "text", table: { category: "Props" } },
		type: { control: "inline-radio", options: ["button", "submit", "reset", "radio", "checkbox"], table: { category: "Props" } },
		name: { control: "text", table: { category: "Props" } },
		value: { control: "text", table: { category: "Controls" } },
		checked: { control: "boolean", table: { category: "Controls" } },
		reverse: { control: "boolean", table: { category: "Props" } },
		iconToggle: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		iconHover: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		toggled: { control: "boolean", table: { category: "Props" } },
		onToggle: { control: false, action: true, table: { category: "Events" } },
		variant: { control: "inline-radio", options: ["text", "icon", "icon text", "text icon", "icon text icon"], table: { category: "Props" } },
		width: { control: "inline-radio", options: ["auto", "full"], table: { category: "Props" } },
		padding: { control: "inline-radio", options: ["default", "none"], table: { category: "Props" } },
		align: { control: "inline-radio", options: ["center", "start", "end", "between", "around"], table: { category: "Layout" } },
		iconEnd: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		iconEndHover: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } },
		iconEndToggle: { control: "inline-radio", options: ["home", "menu", "arrow-right"], table: { category: "Props" } }
	},
		args: {
			// Args will be populated per story variant
		},
	});
</script>

<!-- Template for multiple variants -->
{#snippet template(args: any)}
	<div class="flex gap-4 items-center justify-center">
		{#each args.buttons as buttonProps}
			<Button {...buttonProps} />
		{/each}
	</div>
{/snippet}


<Story name="Default" args={{}} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Color" args={{ buttons: colorVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Appearance" args={{ buttons: appearanceVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Size" args={{ buttons: sizeVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Position" args={{ buttons: positionVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Icon" args={{ buttons: iconVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Type" args={{ buttons: typeVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="IconToggle" args={{ buttons: icontoggleVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="IconHover" args={{ buttons: iconhoverVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Variant" args={{ buttons: variantVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Width" args={{ buttons: widthVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Padding" args={{ buttons: paddingVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="Align" args={{ buttons: alignVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="IconEnd" args={{ buttons: iconendVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="IconEndHover" args={{ buttons: iconendhoverVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />

<Story name="IconEndToggle" args={{ buttons: iconendtoggleVariants }} {template} tags={["!dev"]} parameters={{ globals: { dualLayout: "horizontal" } }} />