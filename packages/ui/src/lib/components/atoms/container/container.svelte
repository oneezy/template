<script lang="ts">
	/**
	 * @tags section, layout, container
	 */
	import { Component, type ComponentProps } from '@layerd/ui';

	export interface ContainerProps extends ComponentProps {
		layout?: string;
	}

	let { layout = '', ...props }: ContainerProps = $props();
</script>

<Component
	{...props}
	class="container {layout} {props.class}"
>
	{#snippet component({ props, content })}
		<div {...props}>
			{@render content('Container')}
		</div>
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.container {
		&:where(.active) {
			@apply opacity-100;
		}
	}
</style>
