<script>
	let {
		// states
		disabled = false,
		// styles
		neutral = false,
		primary = false,
		secondary = false,
		accent = false,
		tonal = false,
		outline = false,
		ghost = false,
		glass = false,
		link = false,
		invert = false,
		// position
		left = false,
		right = false,
		// sizes
		xs = false,
		sm = false,
		md = false,
		lg = false,
		xl = false,
		// spacing
		padding = false,
		// function
		total = 1,
		// other
		children,
		...props
	} = $props();

	// totals
	total = Number(total) || 1;

	// styles
	let classNeutral = 'preset-filled-neutral';
	let classPrimary = 'preset-filled-primary';
	let classSecondary = 'preset-filled-secondary';
	let classAccent = 'preset-filled-accent';
	let classDefault = '';

	let classDisabled = 'opacity-50 cursor-not-allowed pointer-events-none';
	let classPadding = 'p-4';

	let classList = [];

	// states
	if (disabled) classList.push(classDisabled);

	// styles
	if (primary) classList.push(classPrimary);
	else if (secondary) classList.push(classSecondary);
	else if (accent) classList.push(classAccent);
	else if (neutral) classList.push(classNeutral);
	else classList.push(classDefault);

	// spacing
	if (padding) classList.push(classPadding);

	// sizes
	if (xs) classList.push('btn-xs');
	else if (sm) classList.push('btn-sm');
	else if (md) classList.push('btn-md');
	else if (lg) classList.push('btn-lg');
	else if (xl) classList.push('btn-xl');

	let classes = classList.join(' ');
</script>

{#snippet content()}
	Base
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
