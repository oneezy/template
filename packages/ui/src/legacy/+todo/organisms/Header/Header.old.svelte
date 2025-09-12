<script>
	import {Container} from '$lib';
	let {children, ...props} = $props();
	let _containerClass = `header-container flex items-center justify-between min-h-[64px]`;
</script>

<header {...props} class="header {props.class}">
	{#snippet left()}left{/snippet}
	{#snippet center()}center{/snippet}
	{#snippet right()}right{/snippet}
	{#snippet blur()}
		<div
			class="backdrop-blur-md pointer-events-none absolute z-[-1] h-full w-full bg-white/80 dark:bg-black/50"
		></div>
		blur
	{/snippet}
	{#if blur === true}
		{@render blur()}
	{/if}
	<Container class={_containerClass}>
		{#if !children}
			<section>{@render left()}</section>
			<section>{@render center()}</section>
			<section>{@render right()}</section>
		{:else if !children && (left || center || right)}
			<section>{@render left()}</section>
			<section>{@render center()}</section>
			<section>{@render right()}</section>
		{:else}
			{@render children()}
		{/if}
	</Container>
</header>
