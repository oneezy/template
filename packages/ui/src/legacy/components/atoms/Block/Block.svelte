<script>
	let { children = null, ...props } = $props();
</script>

<div {...props} class="{props.class}">
	{#if children}
		{@render children()}
	{:else}
		{#if typeof someName === 'function'}
			{@render someName()}
		{:else}
			default
		{/if}
	{/if}
</div>