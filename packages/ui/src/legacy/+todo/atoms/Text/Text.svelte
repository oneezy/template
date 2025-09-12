<script>
	let { text = 'Text', unstyled = false, children, ...props } = $props();
</script>

{#snippet textContent(content)}
	{content}
{/snippet}

<div {...props} class="{unstyled ? '' : 'bg-brand text-white'} {props.class}">
	{#if children}
		{@render children()}
	{:else if text.length}
		{@render textContent(text)}
	{:else}
		{@render textContent('hello, world!')}
	{/if}
</div>
