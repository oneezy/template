<script>
	let {
		// title
		title = 'Title',
		titleX = 3,
		titleY = 2,
		// value
		value = '40%',
		valueX = 2,
		valueY = 2,
		// description
		description = '', // provide a default value if needed
		descriptionX = 3,
		descriptionY = 2,
		// icon
		icon = '📊',
		iconX = 2,
		iconY = 1,
		// position
		left = false,
		right = false,
		top = false,
		bottom = false,
		children = null,
		// styles
		primary = false,
		secondary = false,
		neutral = true,
		...props
	} = $props();

	const getGridStyles = (X, Y) => `grid-row-start: ${X}; grid-column-start: ${Y};`;

	// Use $state rune
	let primaryState = $state(primary);
	let secondaryState = $state(secondary);
	let neutralState = $state(neutral);

	const getTextClass = () => {
		if (primaryState) return 'text-primary-600-200';
		if (secondaryState) return 'text-secondary-600-200';
		if (neutralState) return 'text-neutral-600-200';
		return 'text-neutral-600-200';
	};

	const getValueClass = () => {
		if (primaryState) return 'text-primary-950-50';
		if (secondaryState) return 'text-secondary-950-50';
		if (neutralState) return 'text-neutral-950-50';
		return 'text-neutral-950-50';
	};
</script>

{#snippet stats(
	title,
	titleX,
	titleY,
	value,
	valueX,
	valueY,
	description,
	descriptionX,
	descriptionY,
	icon,
	iconX,
	iconY
)}
	<section class="grid items-center justify-center gap-x-4 gap-y-1">
		<span class={getTextClass(primary, secondary, neutral)} style={getGridStyles(titleX, titleY)}>{title}</span>
		<span class="{getValueClass(primary, secondary, neutral)} text-4xl font-bold" style={getGridStyles(valueX, valueY)}
			>{value}</span
		>
		<span class="{getTextClass(primary, secondary, neutral)} text-sm" style={getGridStyles(descriptionX, descriptionY)}
			>{description}</span
		>
		<span class="text-4xl" style={getGridStyles(iconX, iconY)}>
			{#if children}
				{@render children()} <!-- Render children if provided -->
			{:else}
				{icon} <!-- Render the default icon snippet -->
			{/if}
		</span>
	</section>
{/snippet}

{#if left}
	{@render stats(
		title,
		3, // titleX
		2, // titleY
		value,
		2, // valueX
		2, // valueY
		description,
		3, // descriptionX
		2, // descriptionY
		icon,
		2, // iconX
		1 // iconY
	)}
{:else if right}
	{@render stats(
		title,
		3, // titleX
		1, // titleY
		value,
		2, // valueX
		1, // valueY
		description,
		3, // descriptionX
		1, // descriptionY
		icon,
		2, // iconX
		2 // iconY
	)}
{:else}
	{@render stats(
		title,
		titleX,
		titleY,
		value,
		valueX,
		valueY,
		description,
		descriptionX,
		descriptionY,
		icon,
		iconX,
		iconY
	)}
{/if}
