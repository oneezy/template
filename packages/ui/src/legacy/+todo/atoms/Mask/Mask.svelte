<script>
	import { Image } from '$lib';
	let {
		src = 'https://tympanus.net/codrops-playground/assets/photos/cssref/properties/mask-position/field.jpg',
		mask = 'https://tympanus.net/codrops-playground/assets/photos/cssref/properties/mask-position/mask-image.png',
		alt = 'Mask Image',
		position = 'center center',
		size = '100% 100%',
		full = false,
		repeat = false,
		invert = false,
		children = null,
		unstyled = false,
		ratio,
		bg,
		img,
		debug = false,
		...props
	} = $props();

	// Debug info
	if (debug) {
		console.log('Mask component props:', { src, mask, alt, position, size, ratio });
	}

	// Event handlers
	function handleLoad(event) {
		console.log('Mask image loaded:', event.target.src);
	}

	function handleError(event) {
		console.error('Mask image failed:', event.target.src);
	}
</script>

{#if bg}
	<div
		{...props}
		class="{bg} {props.class} {full ? 'w-full' : ''} max-w-full"
		style="
			-webkit-mask-image: url({mask});
			-webkit-mask-position: {position};
			-webkit-mask-repeat: {repeat ? 'repeat' : 'no-repeat'};
			-webkit-mask-size: {size};
			mask-image: url({mask});
			mask-position: {position};
			mask-repeat: {repeat ? 'repeat' : 'no-repeat'};
			mask-size: {size};"
	>
		{@render children()}
	</div>
{:else}
	<!-- Better cross-browser mask solution with Image component -->
	<div
		class="{props.class} {full ? 'w-full' : ''} relative max-w-full overflow-hidden"
		style="aspect-ratio: {ratio};"
	>
		<div
			class="absolute inset-0"
			style="
				-webkit-mask-image: url({mask});
				-webkit-mask-position: {position};
				-webkit-mask-repeat: {repeat ? 'repeat' : 'no-repeat'};
				-webkit-mask-size: {size};
				mask-image: url({mask});
				mask-position: {position};
				mask-repeat: {repeat ? 'repeat' : 'no-repeat'};
				mask-size: {size};"
		>
			<Image
				{src}
				{alt}
				cover
				class="h-full w-full"
			/>
		</div>
	</div>
{/if}
