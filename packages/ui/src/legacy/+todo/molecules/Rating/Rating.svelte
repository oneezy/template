<script>
	let { rating = 5, classFill = 'fill-secondary', ...props } = $props();
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	const starPaths = {
		full: "<path class='{classFill}' fill='var(--color-secondary-500-500)' d='M12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z'/>",
		half: "<path class='{classFill}' fill='var(--color-neutral-200-700)' d='M12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z'/><path class='{classFill}' fill='var(--color-secondary-500-500)' d='M12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.'/>",
		empty:
			"<path class='{classFill}' fill='var(--color-neutral-200-700)' d='M12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z'/>"
	};
</script>

{#snippet star({ type, classFill })}
	<svg
		class={props.class}
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		{@html starPaths[type]}
	</svg>
{/snippet}

<div {...props} class="rating {props.class} flex">
	{#each Array(fullStars) as _}
		{@render star({ type: 'full', classFill })}
	{/each}

	{#if hasHalfStar}
		{@render star({ type: 'half', classFill })}
	{/if}

	{#each Array(emptyStars) as _}
		{@render star({ type: 'empty', classFill })}
	{/each}
</div>
