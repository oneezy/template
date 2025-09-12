<script lang="ts">
	/**
	 * @tags divider, separator, section, shape, svg
	 */
	import { Component, type ComponentProps } from '@layerd/ui';

	type ShapeType = 'waves' | 'curve' | 'tilt' | 'triangle' | 'arrow' | string;

	export interface DividerProps extends ComponentProps {
		bleed?: boolean;
		height?: string;
		width?: string;
		shape?: 'waves' | 'curve' | 'tilt' | 'triangle' | 'arrow' | string;
		/** Position alignment: top, bottom, or both */
		align?: 'top' | 'bottom' | 'both';
		/** Position outside the container */
		outside?: boolean;
		/** Flip direction: x, y, xy */
		flip?: 'x' | 'y' | 'xy';
		invert?: boolean;
		negative?: boolean;
		/** Classes applied to the SVG element */
		svg?: string;
		children?: any;
		// Override color props to use simple text colors instead of theme presets
		primary?: boolean;
		secondary?: boolean;
		accent?: boolean;
		base?: boolean;
		neutral?: boolean;
		// Legacy props for backward compatibility
		top?: boolean;
		bottom?: boolean;
		flipX?: boolean;
		flipY?: boolean;
		flipXY?: boolean;
	}

	let {
		// shape
		shape = 'waves',
		// size
		height = '120px',
		width = '100%',
		// style
		flip = undefined,
		invert = false,
		negative = false,
		// position
		align = undefined,
		outside = false,
		// layout
		bleed = true,
		// classes
		svg = undefined,
		// content
		children = undefined,
		// Extract color props to override base behavior
		primary = false,
		secondary = false,
		accent = false,
		base = false,
		neutral = false,
		// Legacy props for backward compatibility
		top = false,
		bottom = false,
		flipX = false,
		flipY = false,
		flipXY = false,
		...props
	}: DividerProps = $props();

	// Convert legacy props to new format
	const normalizedAlign = $derived(() => {
		if (align) return align;
		if (top && bottom) return 'both';
		if (top) return 'top';
		if (bottom) return 'bottom';
		return undefined;
	});

	const normalizedFlip = $derived(() => {
		if (flip) return flip;
		if (flipXY) return 'xy';
		if (flipX) return 'x';
		if (flipY) return 'y';
		return undefined;
	});

	// Helper functions to determine which dividers to show
	const showTop = $derived(normalizedAlign() === 'top' || normalizedAlign() === 'both');
	const showBottom = $derived(normalizedAlign() === 'bottom' || normalizedAlign() === 'both');

	// Convert color props to simple text color classes (override base theme behavior)
	let colorClass = $derived(() => {
		if (primary) return 'text-primary-500-500';
		if (secondary) return 'text-secondary-500-500';
		if (accent) return 'text-accent-500-500';
		if (base) return 'text-base-500-500';
		if (neutral) return 'text-neutral-500-500';
		return '';
	});

	// For inner content: keep original color props to get full theme treatment
	let contentProps = $derived(() => {
		// Only include color props if we have children (inner content)
		if (!children) return {};

		return {
			primary,
			secondary,
			accent,
			base,
			neutral,
			invert
		};
	});

	// Remove color props from being passed to Component to prevent theme application on outer container
	let componentProps = $derived(() => {
		const { primary: _, secondary: __, accent: ___, base: ____, neutral: _____, ...rest } = props;
		return rest;
	});

	// Create flip transform classes based on flip prop
	let flipTransform = $derived(() => {
		if (normalizedFlip() === 'xy') return 'scale-x-[-1] scale-y-[-1]';
		if (normalizedFlip() === 'x') return 'scale-x-[-1]';
		if (normalizedFlip() === 'y') return 'scale-y-[-1]';
		return '';
	});

	let containerClass = $derived(
		`w-full pointer-events-none overflow-hidden z-10 ${colorClass()} ${bleed ? 'bleed' : ''}`
	);

	let topDividerClass = $derived(`${containerClass} ${flipTransform()}`);

	let bottomDividerClass = $derived(`${containerClass} ${flipTransform()}`);

	let singleDividerClass = $derived(() => {
		// For grid-based layouts, just use the container class with flip transforms
		return `${containerClass} ${flipTransform()}`;
	});

	// Remove old svgClass since transforms are now handled by container
	let svgClass = $derived('');

	// Only dynamic styles that can't be handled by Tailwind
	let dynamicSvgStyle = $derived(
		`--divider-height: ${height}; --divider-height-mobile: calc(${height} * 0.5); height: var(--divider-height); width: ${width}; fill: currentColor;`
	);
</script>

<!-- SVG Shapes -->
{#snippet waves()}
	<path
		class="top {negative ? '' : 'opacity-0'}"
		d="M578.87,30.29C757.11,83.34,1019.24,105.03,1200,0H0v120C41,68.89,288.87-55.15,578.87,30.29Z"
	/>
	<path
		class="bottom {negative ? 'opacity-0' : ''}"
		d="M1200,0v120H0C41,68.89,288.87-55.15,578.87,30.29c178.24,53.05,440.37,74.74,621.13-30.29Z"
	/>
{/snippet}

{#snippet curve()}
	<path
		class="top {negative ? 'opacity-0' : ''}"
		d="M1200 0C1200 21.93 1186.4 113.83 741 110.23C291 111.43 0 21.57 0 0H1200Z"
	/>
	<path
		class="bottom {negative ? '' : 'opacity-0'}"
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
{#snippet path(shape: ShapeType)}
	{#if shape === 'curve'}
		{@render curve()}
	{:else if shape === 'tilt'}
		{@render tilt()}
	{:else if shape === 'triangle'}
		{@render triangle()}
	{:else if shape === 'arrow'}
		{@render arrow()}
	{:else if shape === 'waves'}
		{@render waves()}
	{:else}
		{@render waves()}
	{/if}
{/snippet}

<!-- SVG Divider Snippet -->
{#snippet svgDivider(dividerClass = '', svgClasses = '', isFlipped = false, { ...props })}
	<div class="{dividerClass} {props.class}">
		<svg
			class="h-[var(--divider-height)] w-full fill-current {svg ||
				'text-base-50-950'} {svgClasses} {isFlipped ? 'rotate-180' : ''}"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
			style={dynamicSvgStyle}
		>
			{@render path(shape)}
		</svg>
	</div>
{/snippet}

<!-- Component -->
<Component
	{...componentProps()}
	class={componentProps().class}
>
	{#snippet component({ props })}
		{#if children}
			<section {...props}>
				<!-- SVG Divider (top) -->
				{#if showTop}
					{@render svgDivider(topDividerClass, svgClass, false, {})}
				{/if}

				<!-- Children with full theme treatment -->
				<Component {...contentProps()}>
					{#snippet component({ props: contentProps })}
						<div
							{...contentProps}
							class="divider-content-wrapper relative {contentProps.class || ''}"
						>
							{@render children()}
						</div>
					{/snippet}
				</Component>

				<!-- SVG Divider (bottom) -->
				{#if showBottom}
					{@render svgDivider(bottomDividerClass, svgClass, true, {})}
				{/if}
			</section>
		{:else}
			<!-- SVG Divider -->
			{@render svgDivider(singleDividerClass(), svgClass, false, props)}
		{/if}
	{/snippet}
</Component>

<style lang="postcss">
	@reference '@layerd/ui/ui.css';

	svg {
		/* Desktop height */
		height: var(--divider-height);
	}

	/* Mobile breakpoint - adjust based on your design system */
	@media (max-width: 1024px) {
		svg {
			height: var(--divider-height-mobile) !important;
		}
	}
</style>
