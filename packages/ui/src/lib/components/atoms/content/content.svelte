<script lang="ts">
	/**
	 * @tags content, typography, prose, blog, article, test
	 * @type single
	 * @layout horizontal
	 */
	import { Component, type ComponentProps } from '@layerd/ui';
	import { all, small, blog, openprops } from '@layerd/ui';

	interface ContentProps extends ComponentProps {
		/** Content type to display */
		type?: 'custom' | 'text' | 'blog' | 'minimal' | 'openprops';
		/** Enable prose styling with prose classes */
		prose?: boolean;
		/** Custom HTML content to display */
		html?: string;
		/** Image source for image-focused content */
		imgSrc?: string;
		/** Image alt text */
		imgAlt?: string;
		/** Disable default content when no children provided */
		blank?: boolean;
	}

	let {
		type = undefined,
		prose = true,
		html,
		imgSrc,
		imgAlt = 'Sample image',
		blank = false,
		children,
		...props
	}: ContentProps = $props();

	// Determine what content to show
	const content = $derived(children ? 'children' : html ? 'custom' : blank ? 'blank' : type);

	// prose classes
	const proseClasses = $derived(prose ? 'prose ' : '');
</script>

<Component {...props} class="content mx-auto {proseClasses} {props.class}">
	{#snippet component({ props })}
		<div {...props}>
			{#if content === 'children'}
				{@render children?.()}
			{:else if content === 'custom'}
				{@html html}
			{:else if content === 'text'}
				{@html small}
			{:else if content === 'blog'}
				{@html blog}
			{:else if content === 'openprops'}
				{@html openprops}
			{:else}
				{@html all}
			{/if}
		</div>
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	/* .content {
		@apply block;

		:global(pre) {
			@apply overflow-x-auto p-4;
		}

		:global(code) {
			@apply rounded px-1 py-0.5 text-sm;
		}

		:global(table) {
			@apply w-full border-collapse;
		}

		:global(th),
		:global(td) {
			@apply border border-gray-300 px-3 py-2 dark:border-gray-600;
		}

		:global(th) {
			@apply bg-gray-50 font-semibold dark:bg-gray-700;
		}
	} */
</style>
