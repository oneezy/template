<script>
	import { Section } from '$lib';
	let {
		bg = 'bg-neutral-200-700',
		fill = 'fill-neutral-200-700',
		height = '120px',
		width = '100%',
		shape = 'waves',
		top = false,
		bottom = false,
		outside = false,
		flip = false,
		invert = false,
		reverse = false,
		classSvg = '',
		children,
		...props
	} = $props();

	let containerClass = $state(
		'w-full pointer-events-none overflow-hidden z-10'
	);

	let containerStyle = `
		${top ? 'position: absolute; top: -1px; left: 0; right: 0;' : ''}
		${top && outside ? 'position: absolute; bottom: calc(100% - 1px); left: 0; right: 0;' : ''}
		${bottom ? 'position: absolute; bottom: -1px; left: 0; right: 0;' : ''}
		${bottom && outside ? 'position: absolute; top: calc(100% - 1px); left: 0; right: 0;' : ''}
	`;

	let svgClass = $state('');
	svgClass += fill ? ` ${fill}` : 'fill-';
</script>

<!-- SVG Shapes -->
{#snippet waves()}
	<path
		d="M0,92.7V120h1200V24.2c-67.8-23.1-144.3-15.5-214.3,3C906.7,48,823.8,89,743.8,105.8 c-82.3,17.3-168.1,16.3-250.5-0.4c-57.8-11.7-114-31.1-172-41.9C213.6,43.7,102.5,53.8,0,92.7z"
	/>
{/snippet}

{#snippet curve()}
	<path
		d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
	/>
{/snippet}

{#snippet tilt()}
	<path d="M1200,120H0v-16.5L1200,0V120z" />
{/snippet}

{#snippet triangle()}
	<path d="M599,5.3L0,120h1200L599,5.3z" />
{/snippet}

{#snippet arrow()}
	<path
		d="M1184.7 85.1 629.5 2a245 245 0 0 0-61.7 0l-555 83.1C4.1 86.4 0 88.1 0 89.8V120l1200-.1V89.7c-2.8-1.6-7-3.3-15.5-4.6h.2z"
	/>
{/snippet}

<!-- SVG Logic -->
{#snippet path({ shape })}
	{#if shape == 'curve'}
		{@render curve()}
	{:else if shape == 'tilt'}
		{@render tilt()}
	{:else if shape == 'triangle'}
		{@render triangle()}
	{:else if shape == 'arrow'}
		{@render arrow()}
	{:else}
		{@render waves()}
	{/if}
{/snippet}

<!-- SVG -->
{#snippet divider({ shape, height, width, flip, invert, reverse })}
	<div
		{...props}
		class="{containerClass} {reverse ? 'scale-x-[-1]' : ''} {props.class}"
		style={containerStyle}
	>
		<svg
			class="{classSvg} {svgClass} {flip ? 'rotate-180' : ''} {invert
				? 'scale-y-[-1]'
				: ''}"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
			style="height: {height}; width: {width};"
		>
			{@render path({ shape })}
		</svg>
	</div>
{/snippet}

<!-- Component -->
{#if children}
	<Section {...props}>
		<!-- SVG Divider (top) -->
		{@render divider({
			shape,
			height,
			width,
			flip: false,
			invert,
			reverse,
			svgClass,
			classSvg
		})}
		<!-- Children -->
		<div class={bg}>
			{@render children()}
		</div>
		<!-- SVG Divider (bottom) -->
		{@render divider({
			shape,
			height,
			width,
			flip: true,
			invert,
			reverse,
			svgClass,
			classSvg
		})}
	</Section>
{:else}
	<!-- SVG Divider -->
	{@render divider({
		shape,
		height,
		width,
		flip: false,
		invert,
		reverse,
		svgClass,
		classSvg
	})}
{/if}
