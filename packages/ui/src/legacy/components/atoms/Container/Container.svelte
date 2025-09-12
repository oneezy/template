<script>
	let {children = null, ...props} = $props();
</script>

<div {...props} class="container {props.class}">
	{#snippet content()}
		Container
	{/snippet}

	{#if children}
		{@render children()}
	{:else}
		{@render content()}
	{/if}
</div>
