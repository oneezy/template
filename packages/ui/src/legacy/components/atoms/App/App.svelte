<script>
	let { text = 'Component', unstyled = false, children = null, ...props } = $props();
</script>

{#snippet textContent(content)}
	{content}
{/snippet}

<div {...props} class="{unstyled ? '' : 'component'} {props.class}">
	{#if children}
		{@render children()}
	{:else if text.length}
		{@render textContent(text)}
	{:else}
		{@render textContent('hello, Component!')}
	{/if}
</div>

<div class="w-"></div>