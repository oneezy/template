<script>
	import { Section, Container, Title, Divider, observer } from '$lib';
	let {
		classContainer = '',
		title = 'Title',
		titleOutside = false,
		tagline = 'Your awesome tagline goes here',
		dividerTop = false,
		dividerBottom = false,
		dividerFill = 'fill-neutral-50-800',
		dividerWidth = '150%',
		dividerHeight = '240px',
		dividerStuck = false,
		id = null,
		children,
		...props
	} = $props();
</script>

{#snippet titleEl()}
	<Title {...props} {id} {title} {tagline} class="text-center" />
{/snippet}

{#if titleOutside}
	{@render titleEl()}
{/if}

<section {...props} class="relative {props.class}" use:observer>
	{#if dividerTop}
		<Divider
			width={dividerWidth}
			height={dividerHeight}
			fill={dividerFill}
			top={dividerStuck ? true : false}
			invert
			reverse
		/>
	{/if}

	{#if !titleOutside}
		{@render titleEl()}
	{/if}

	<Container class="flex flex-col items-center justify-center {classContainer}">
		{#if children}
			{@render children()}
		{/if}
	</Container>

	{#if dividerBottom}
		<Divider width={dividerWidth} height={dividerHeight} fill={dividerFill} bottom={dividerStuck ? true : false} />
	{/if}
</section>
