<script>
	let { children = null, date = new Date().getFullYear(), ...props } = $props();
</script>

<div {...props} class="flex items-center justify-center text-center py-4 {props.class}">
	<span class="text--dim">
		{#snippet content()}
			Oneezy, Inc.
		{/snippet}
		&#169; Copyright {date},

		{#if children}
			{@render children()}
		{:else}
			{@render content()}
		{/if}
	</span>
</div>
