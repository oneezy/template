<script>
	import { onMount } from 'svelte';

	let {
		slides = [],
		autoplay = false,
		arrows = true,
		indicators = true,
		duration = 5000,
		showScrollbar = false,
		startSlide = 0,
		children = null,
		...props
	} = $props();

	let currentSlide = $state(startSlide);
	let autoplayInterval;
	let slideContainerEl = $state(null);
	let slideWidth = 0;

	const dummyData = [
		{ url: 'https://picsum.photos/id/1018/1200/600/' },
		{ url: 'https://picsum.photos/id/1015/1200/600/' },
		{ url: 'https://picsum.photos/id/1019/1200/600/' },
		{ url: 'https://picsum.photos/id/1020/1200/600/' },
		{ url: 'https://picsum.photos/id/1021/1200/600/' }
	];

	// Use dummy data if no props are provided
	if (slides.length === 0 && children === null) {
		slides = dummyData;
	}

	// Derived states for classes
	const slideClasses = $derived(() =>
		Array.from({ length: slides.length || slideContainerEl?.children.length || 0 }, (_, index) =>
			index === currentSlide ? 'active' : ''
		)
	);
	const indicatorClasses = $derived(() =>
		Array.from({ length: slides.length || slideContainerEl?.children.length || 0 }, (_, index) =>
			index === currentSlide ? 'bg-accent-500' : 'bg-neutral-200/50'
		)
	);

	function nextSlide() {
		currentSlide = (currentSlide + 1) % (slides.length || slideContainerEl.children.length);
	}

	function prevSlide() {
		currentSlide =
			(currentSlide - 1 + (slides.length || slideContainerEl.children.length)) %
			(slides.length || slideContainerEl.children.length);
	}

	function goToSlide(index) {
		currentSlide = index;
	}

	$effect(() => {
		if (slideContainerEl) {
			slideWidth = slideContainerEl.children[0]?.offsetWidth || 0;
			slideContainerEl.scrollTo({
				left: currentSlide * (slideWidth + 10),
				behavior: 'smooth'
			});
		}
	});

	onMount(() => {
		window.addEventListener('resize', () => (slideWidth = slideContainerEl.children[0]?.offsetWidth || 0));
		if (autoplay) {
			autoplayInterval = setInterval(nextSlide, duration);
			return () => clearInterval(autoplayInterval);
		}
	});
</script>

<div bind:this={slideContainerEl} class="slider">
	{#if slides.length > 0}
		{#each slides as slide, index}
			<div class="slide {slideClasses[index]}">
				<img src={slide.url} alt="Slide" />
			</div>
		{/each}
	{:else}
		{@render children()}
	{/if}
</div>

{#if arrows}
	<button
		onclick={prevClick}
		class="arrow back bg-opacity-50 absolute top-2/5 left-10 rounded-full bg-black p-2 text-white">←</button
	>
	<button
		onclick={nextClick}
		class="arrow forward bg-opacity-50 absolute top-2/5 right-10 rounded-full bg-black p-2 text-white">→</button
	>
{/if}

{#if indicators}
	<div class="slide-indicators absolute bottom-10 left-1/2 flex -translate-x-1/2 transform space-x-2">
		{#each Array(slides.length || slideContainerEl?.children.length || 0) as _, index}
			<button
				onclick={() => goToSlide(index)}
				class="slide-indicator size-4 cursor-pointer rounded-full {indicatorClasses[index]}"
			></button>
		{/each}
	</div>
{/if}

<style>
	.slider {
		display: flex;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.slider::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}

	.slide {
		min-width: 100%;
		scroll-snap-align: center;
	}

	.active {
		border: 10px solid lime;
	}

	.arrow {
		cursor: pointer;
	}

	.slide-indicators {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
	}

	.slide-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.bg-accent-500 {
		background-color: #ff3e00;
	}
	.bg-neutral-200\/50 {
		background-color: rgba(200, 200, 200, 0.5);
	}
</style>
