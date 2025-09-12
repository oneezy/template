<script lang="ts">
	/**
	 * @tags ui
	 * @layout horizontal
	 */
	import { Component, type ComponentProps } from '@layerd/ui';

	export interface FlexProps extends ComponentProps {
		text?: string;
		variant?: 'base' | 'variant1' | 'variant2';
	}

	let { text = undefined, variant = 'base', children = undefined, ...props }: FlexProps = $props();
</script>

<!-- ⬜ default ⬛ prop 🟪 snippet 🟦 children -->

<!-- Variants 
::::::::::::::::::::::::::::::::::::::::::::: -->
<!-- Base -->
{#snippet base(text: string)}
	{text}
{/snippet}

<!-- Variant 1 -->
{#snippet variant1(text: string)}
	{text}
{/snippet}

<!-- Variant 2 -->
{#snippet variant2(text: string)}
	{text}
{/snippet}

<!-- Template 
::::::::::::::::::::::::::::::::::::::::::::: -->
<Component
	{...props}
	class="flex {props.class}"
>
	{#snippet component({ props })}
		<div {...props}>
			{#if children}
				{@render children()}
			{:else if variant === 'variant1'}
				{@render variant1('hi variant1')}
			{:else if variant === 'variant2'}
				{@render variant2('hi variant2')}
			{:else}
				{@render base('flex')}
			{/if}
		</div>
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.flex {
		@apply flex;

		@variant state {
			@variant before {
				@apply opacity-20;
			}
		}

		/* sizes (md stays text-md) */
		&:where(.xs) {
			/* @apply text-xs; */
		}
		&:where(.sm) {
			/* @apply text-sm; */
		}
		&:where(.md) {
			/* @apply text-md; */
		}
		&:where(.lg) {
			/* @apply text-lg; */
		}
		&:where(.xl) {
			/* @apply text-2xl; */
		}
	}
</style>
