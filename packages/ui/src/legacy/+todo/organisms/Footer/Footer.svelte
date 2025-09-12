<script>
	import { Divider } from '$lib';
	let {
		divider,
		dividerFill = 'fill-accent-500-500',
		dividerWidth = '150%',
		dividerHeight = '14vw',
		containerClass = '',
		left = '⬜ footer left',
		center = '⬜ footer center',
		right = '⬜ footer right',
		children = null,
		...props
	} = $props();
</script>

{#if divider}
	<Divider
		class="mb-[-1px]"
		fill={dividerFill}
		width={dividerWidth}
		height={dividerHeight}
	/>
{/if}

<div {...props} class="footer {props.class}">
	<div
		class="container
	{children
			? containerClass
			: 'grid grid-cols-[auto_1fr_auto] justify-center gap-4 md:grid-cols-[200px_1fr_200px]'}"
	>
		{#if children}
			{@render children()}
		{:else}
			<section class="self-center justify-self-start">
				{#if typeof left === 'function'}{@render left()}{:else}{left}{/if}
			</section>
			<section class="hidden h-full items-center justify-center md:flex">
				{#if typeof center === 'function'}{@render center()}{:else}{center}{/if}
			</section>
			<section class="self-center justify-self-end">
				{#if typeof right === 'function'}{@render right()}{:else}{right}{/if}
			</section>
		{/if}
	</div>
</div>
