<script>
	import { onMount } from 'svelte';
	import { Button } from '$lib';

	let {
		slides = [],
		autoplay = false,
		arrows = false,
		indicators = false,
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

	// Add active class to current slide
	function addActiveClass() {
		if (slideContainerEl) {
			const slides = slideContainerEl.children;
			Array.from(slides).forEach((slide, index) => {
				if (index === currentSlide) {
					slide.classList.add('active');
				} else {
					slide.classList.remove('active');
				}
			});
		}
	}

	/*
	 * Controls
	 * ========================================================================================== */
	// Start Autoplay
	function startAutoplay() {
		if (autoplay) {
			autoplayInterval = setInterval(nextSlide, duration);
		}
	}

	// Pause Autoplay
	function pauseAutoplay() {
		clearInterval(autoplayInterval);
	}

	// Stop Autoplay
	function stopAutoplay() {
		clearInterval(autoplayInterval);
		autoplay = false;
	}

	// Update Scroll
	function updateScroll() {
		slideContainerEl.scrollTo({
			left: currentSlide * (slideWidth + 10),
			behavior: 'smooth'
		});
	}

	/*
	 * Event Handlers
	 * ========================================================================================== */
	// Resize
	function handleResize() {
		if (slideContainerEl) {
			const firstSlide = slideContainerEl.children[0];
			if (firstSlide) {
				slideWidth = firstSlide.offsetWidth;
			}
		}
	}

	// Mouse Over
	function handleMouseOver() {
		if (autoplay) {
			pauseAutoplay();
		}
	}

	// Mouse Out
	function handleMouseOut() {
		if (autoplay) {
			startAutoplay();
		}
	}

	// Next Arrow Click
	function nextClick() {
		handleMouseOver();
		nextSlide();
	}

	// Prev Arrow Click
	function prevClick() {
		handleMouseOver();
		prevSlide();
	}

	/*
	 * Slide Navigation
	 * ========================================================================================== */
	// Next Slide
	function nextSlide() {
		currentSlide = (currentSlide + 1) % (slides.length || slideContainerEl.children.length);
		addActiveClass();
		updateScroll();
	}

	// Previous Slide
	function prevSlide() {
		currentSlide =
			(currentSlide - 1 + (slides.length || slideContainerEl.children.length)) %
			(slides.length || slideContainerEl.children.length);
		addActiveClass();
		updateScroll();
	}

	// Go to Slide
	function goToSlide(index) {
		currentSlide = index;
		addActiveClass();
		updateScroll();
	}

	$effect.pre(() => {
		addActiveClass();
	});

	$effect(() => {
		handleResize();
		startAutoplay();
		return stopAutoplay;
	});

	onMount(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<!-- Slider
============================================================================== -->
<!-- Slides -->
{#snippet slidesEl()}
	<div class="flex-shrink-0 relative h-full w-full min-w-full snap-center">
		<img src={slide.url} alt="Slide" class="h-full w-full object-cover" />
	</div>
{/snippet}

{#snippet arrowIcon(rotate)}
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 12 12" style="rotate: {rotate}deg;"
		><path
			fill="currentColor"
			d="M4.7 10c-.2 0-.4-.1-.5-.2c-.3-.3-.3-.8 0-1.1L6.9 6L4.2 3.3c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7q-.3.3-.6.3"
		/></svg
	>
{/snippet}
<!-- Arrows -->
{#snippet arrowsEl()}
	<Button
		icon
		onclick={prevClick}
		aria-label="Previous slide"
		class="arrow back bg-opacity-50 text-primary-50-50 hover:bg-primary-500 hover:text-primary-950 absolute top-2/5 left-10 rounded-full bg-black p-2"
	>
		{@render arrowIcon(180)}
	</Button>
	<Button
		icon
		onclick={nextClick}
		aria-label="Next slide"
		class="arrow forward bg-opacity-50 text-primary-50-50 hover:bg-primary-500 hover:text-primary-950 absolute top-2/5 right-10 rounded-full bg-black p-2"
	>
		{@render arrowIcon()}
	</Button>
{/snippet}

<!-- Indicators -->
{#snippet indicatorsEl(index)}
	<div class="slide-indicators absolute bottom-10 left-1/2 flex -translate-x-1/2 transform space-x-2">
		{#each Array(slides.length || slideContainerEl?.children.length || 0) as _, index}
			<button
				onclick={() => goToSlide(index)}
				aria-label="Go to slide {index + 1}"
				class="slide-indicator size-4 cursor-pointer rounded-full {index === currentSlide
					? 'bg-accent-500'
					: 'bg-neutral-200/50'}"
			></button>
		{/each}
	</div>
{/snippet}

<div
	class="relative mx-auto flex h-[50vh] w-full min-w-full flex-col overflow-hidden {props.class}"
	onmouseover={handleMouseOver}
	onfocus={handleMouseOver}
	onmouseout={handleMouseOut}
	onblur={handleMouseOut}
	role="button"
	tabindex="0"
>
	<div
		bind:this={slideContainerEl}
		class="absolute inset-0 flex h-full snap-x snap-mandatory overflow-x-scroll {showScrollbar
			? 'scrollbar-auto'
			: 'scrollbar-hidden'} {props.class}"
		role="button"
		tabindex="0"
	>
		{#if slides.length > 0}
			{#each slides as slide, index}
				<div class="relative h-full w-full min-w-full snap-center">
					<img src={slide.url} alt="Slide" class="h-full w-full object-cover" />
				</div>
			{/each}
		{:else}
			{@render children()}
		{/if}
	</div>

	<!-- Arrow? -->
	{#if arrows}
		{@render arrowsEl()}
	{/if}

	<!-- Indicators? -->
	{#if indicators}
		{@render indicatorsEl()}
	{/if}
</div>

<style>
	.scrollbar-hidden::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hidden {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
