<!--
	@component Header
	@tags header, navigation, layout, scroll, glass, ghost
-->
<script lang="ts">
	import { Container, type ComponentProps } from '@layerd/ui';
	import type { Snippet } from 'svelte';

	interface HeaderProps extends ComponentProps {
		fixed?: boolean;
		sticky?: boolean;
		left?: string | Snippet;
		center?: string | Snippet;
		right?: string | Snippet;
		scroll?: boolean;
	}

	let {
		fixed = false,
		sticky = false,
		left,
		center,
		right,
		children = undefined,
		scroll = false,
		...props
	}: HeaderProps = $props();

	// Position classes for header element
	const positionClasses = $state(
		[fixed ? 'fixed left-0 right-0 top-0 z-50' : '', sticky ? 'sticky top-0 z-50' : '']
			.filter(Boolean)
			.join(' ')
	);
</script>

<header class="header {positionClasses} px-4 py-6">
	<Container {...props} class={props.class}>
		{#if children}
			{@render children()}
		{/if}
	</Container>
</header>
