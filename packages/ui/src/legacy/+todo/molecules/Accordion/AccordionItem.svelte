<script lang="ts">
	import { getAccordionCtx } from './Accordion.svelte';
	import { slide } from 'svelte/transition';
	import type { AccordionItemProps } from './types.js';
	import { Button } from '$lib';
	let {
		id = '',
		disabled = false,
		// Root
		base = 'text-xl',
		spaceY = 'py-2',
		classes = '',
		// Control
		controlBase = 'flex text-start items-center justify-between space-x-4 w-full group',
		controlHover = '',
		controlPadding = 'py-2 px-4',
		controlRounded = 'rounded',
		controlClasses = '',
		// Icons
		iconsBase = 'text-2xl text-neutral-200-400 group-hover:text-accent',
		// Panel
		panelBase = 'text-neutral-500-400',
		panelPadding = 'py-2 px-4',
		panelRounded = '',
		panelClasses = '',
		// Events
		onclick = () => {},
		// Snippets
		control,
		controlLead,
		panel
	}: AccordionItemProps = $props();

	function clickHandler(event: MouseEvent) {
		ctx.toggle(id);
		onclick(event);
	}

	// Context
	const ctx = getAccordionCtx();
</script>

<!-- @component An Accordion child item. -->

<div class="{base} {spaceY} {classes}" data-testid="accordion-item">
	<!-- Control -->
	<Button
		type="button"
		lg
		{id}
		class="{controlBase} {controlHover} {controlPadding} {controlRounded} {controlClasses}"
		aria-expanded={ctx.isOpen(id)}
		aria-controls="accordion-panel-{id}"
		onclick={clickHandler}
		{disabled}
	>
		<!-- Lead -->
		{#if controlLead}
			<div>
				{@render controlLead()}
			</div>
		{/if}

		<!-- Content -->
		<div class="flex-1">
			{@render control()}
		</div>

		{#snippet arrowIcon(rotate, color)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class={color}
				width="32"
				height="32"
				viewBox="0 0 12 12"
				style="rotate: {rotate}deg;"
				><path
					fill="currentColor"
					d="M4.7 10c-.2 0-.4-.1-.5-.2c-.3-.3-.3-.8 0-1.1L6.9 6L4.2 3.3c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7q-.3.3-.6.3"
				/></svg
			>
		{/snippet}
		<!-- Icons -->
		<div class={iconsBase}>
			{#if ctx.isOpen(id)}
				{#if ctx.iconOpen}
					{@render ctx.iconOpen()}
				{:else}
					{@render arrowIcon(90, 'text-accent')}
				{/if}
			{:else if ctx.iconClosed}
				{@render ctx.iconClosed()}
			{:else}
				{@render arrowIcon(0, '')}
			{/if}
		</div>
	</Button>

	<!-- Panel -->
	{#if panel && ctx.isOpen(id)}
		<div
			class="{panelBase} {panelPadding} {panelRounded} {panelClasses}"
			transition:slide={{ duration: ctx.animDuration }}
			id="accordion-panel-{id}"
			role="region"
			aria-hidden={ctx.isOpen(id)}
			aria-labelledby={id}
		>
			{@render panel()}
		</div>
	{/if}
</div>
