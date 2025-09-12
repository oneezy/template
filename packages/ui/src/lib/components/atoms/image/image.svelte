<script lang="ts">
	/**
	 * @tags media, image
	 */
	import { Component, type ComponentProps } from '@layerd/ui';

	export interface ImageProps extends ComponentProps {
		/** Image source URL */
		src?: string;
		/** Alternative text for accessibility */
		alt?: string;
		/** Image aspect ratio */
		ratio?: string;
		/** Background image mode - true for absolute positioning, "fixed" for fixed attachment */
		bg?: boolean | 'fixed';
		/** Mask image URL for applying SVG masks, or true for default mask */
		mask?: string | boolean;
		/** Pattern image URL for background patterns, or true for default pattern */
		pattern?: string | boolean;
		/** Classes applied to the img element */
		image?: string;
		/** Classes applied to the overlay div, or true for default overlay */
		overlay?: string | boolean;
		/** Classes applied to the foreground div */
		foreground?: string;
		/** Classes applied to the background div */
		background?: string;

		/** Content children */
		children?: any;
	}

	let {
		src,
		alt = 'Placeholder Image',
		ratio = '1/1',
		bg = false,
		mask,
		pattern,
		image,
		overlay,
		foreground,
		background,
		children,
		...props
	}: ImageProps = $props();

	// Derived state
	let hasVisualProps = $derived(mask || pattern || overlay || foreground || background);
	let imageSrc = $derived(
		src || (!hasVisualProps && !children ? 'https://picsum.photos/id/420/1920/1080' : '')
	);
	let showImage = $derived(!!imageSrc);
	let useDiv = $derived(!!children);

	// Computed styles
	let maskStyle = $derived.by(() => {
		if (!mask) return '';
		const maskUrl = mask === true ? '/masks/rounded.svg' : mask;
		return `mask-image: url(${maskUrl}); -webkit-mask-image: url(${maskUrl}); mask-size: contain; -webkit-mask-size: contain; mask-position: center; -webkit-mask-position: center; mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat;`;
	});

	let patternStyle = $derived.by(() => {
		if (!pattern) return '';
		const patternUrl = pattern === true ? '/patterns/dots.svg' : pattern;
		return `background-image: url(${patternUrl});`;
	});

	let overlayClasses = $derived.by(() => {
		if (!overlay) return '';
		return overlay === true ? 'bg-radial -from-black to-black to-70% opacity-80' : overlay;
	});
</script>

<!-- ⬜ default ⬛ prop 🟪 snippet 🟦 children -->

<!-- Core Snippets
::::::::::::::::::::::::::::::::::::::::::::: -->
<!-- Background Layer -->
{#snippet backgroundLayer()}
	{#if background}
		<div
			class="absolute inset-0 {background}"
			style={patternStyle}
		></div>
	{/if}
{/snippet}

<!-- Main Image Element -->
{#snippet imageElement(src: string, alt: string)}
	<img
		{src}
		{alt}
		class="{bg
			? 'absolute inset-0 h-full w-full object-cover'
			: 'h-full w-full object-cover'} {image || ''}"
	/>
{/snippet}

<!-- Fixed Background Image -->
{#snippet fixedBackgroundImage(src: string, alt: string)}
	<div
		class="absolute inset-0 h-full w-full bg-cover bg-fixed bg-bottom bg-no-repeat {image || ''}"
		style="background-image: url({src});"
		role="img"
		aria-label={alt}
	></div>
{/snippet}

<!-- Main Image Layer -->
{#snippet imageLayer()}
	{#if showImage}
		{#if bg === 'fixed'}
			{@render fixedBackgroundImage(imageSrc, alt)}
		{:else}
			{@render imageElement(imageSrc, alt)}
		{/if}
	{/if}
{/snippet}

<!-- Overlay Layer -->
{#snippet overlayLayer()}
	{#if overlay}
		<div class="pointer-events-none absolute inset-0 {overlayClasses}"></div>
	{/if}
{/snippet}

<!-- Foreground Layer -->
{#snippet foregroundLayer()}
	{#if foreground}
		<div class="absolute inset-0 {foreground}"></div>
	{/if}
{/snippet}

<!-- Children Content -->
{#snippet childrenContent()}
	{#if children}
		<div class="relative z-10">
			{@render children()}
		</div>
	{/if}
{/snippet}

<!-- Container Variants
::::::::::::::::::::::::::::::::::::::::::::: -->
<!-- Div Container (with children) -->
{#snippet divContainer(containerProps: any)}
	<div
		{...containerProps}
		class="{bg ? '-z-1 absolute inset-0 ' : 'relative w-full'} {containerProps.class}"
		style={maskStyle}
	>
		{@render backgroundLayer()}
		{@render imageLayer()}
		{@render overlayLayer()}
		{@render foregroundLayer()}
		{@render childrenContent()}
	</div>
{/snippet}

<!-- Figure Container (image only) -->
{#snippet figureContainer(containerProps: any)}
	<figure
		{...containerProps}
		class="{bg ? '-z-1 absolute inset-0 ' : 'relative w-full'} {containerProps.class}"
		style={maskStyle}
	>
		{@render backgroundLayer()}
		{@render imageLayer()}
		{@render overlayLayer()}
		{@render foregroundLayer()}
	</figure>
{/snippet}

<!-- Template
::::::::::::::::::::::::::::::::::::::::::::: -->
<Component
	{...props}
	class="image {props.class}"
>
	{#snippet component({ props })}
		{#if useDiv}
			{@render divContainer(props)}
		{:else}
			{@render figureContainer(props)}
		{/if}
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";
</style>
