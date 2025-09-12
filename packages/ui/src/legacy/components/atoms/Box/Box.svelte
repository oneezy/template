<script>
	let {
		primary = false,
		secondary = false,
		accent = false,
		neutral = true,
		padding = false,
		total = 1,
		children = null,
		...props
	} = $props();

	// Ensure total is a number
	total = Number(total) || 1;

	let classNeutral = 'text-neutral-950-50 bg-neutral-200';
	let classPrimary = 'text-primary-950-50 bg-primary-200';
	let classSecondary = 'text-secondary-950-50 bg-secondary-200';
	let classAccent = 'text-accent-950-50 bg-accent-200';
	let classDefault = 'text-neutral-950-50 bg-neutral-200';

	let classPadding = 'p-4';

	// Determine the class based on the props
	let classList = [];

	if (primary) classList.push(classPrimary);
	else if (secondary) classList.push(classSecondary);
	else if (accent) classList.push(classAccent);
	else if (neutral) classList.push(classNeutral);
	else classList.push(classDefault);

	if (padding) classList.push(classPadding);

	let classes = classList.join(' ');
</script>

{#snippet content()}
	Box
{/snippet}

{#each Array(total).fill(0) as _, index}
	<div {...props} class="{classes} {props.class}">
		{#if children}
			{@render children()}
		{:else}
			{@render content()}
		{/if}
	</div>
{/each}
