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
			slideWidth = slideContainerEl.querySelector('.slide').offsetWidth;
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
		currentSlide = (currentSlide + 1) % (slides.length || slideContainerEl?.children.length || 1);
		// currentSlide = (currentSlide + 1) % (slides.length || slideContainerEl.children.length);
		addActiveClass();
		updateScroll();
	}

	// Previous Slide
	function prevSlide() {
		currentSlide = currentSlide =
			(currentSlide - 1 + (slides.length || slideContainerEl?.children.length || 1)) %
			(slides.length || slideContainerEl?.children.length || 1);
		addActiveClass();
		updateScroll();
	}

	// Go to Slide
	function goToSlide(index) {
		currentSlide = index;
		addActiveClass();
		updateScroll();
	}

	$effect(() => {
		handleResize();
		startAutoplay();
		updateScroll();
		addActiveClass();
		return stopAutoplay;
	});

	onMount(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		addActiveClass();
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<!-- Slider
============================================================================== -->
<!-- Slides -->
{#snippet slidesEl(slide, index)}
	{#each slides as slide, index}
		<div
			class="slide flex-shrink-0 relative h-full w-full min-w-full snap-center {index === currentSlide ? 'active' : ''}"
		>
			<img src={slide.url} alt="Slide" class="h-full w-full object-cover" />
		</div>
	{/each}
{/snippet}

<!-- Arrows -->
{#snippet arrowsEl()}
	<button
		onclick={prevClick}
		class="arrow back bg-opacity-50 absolute top-2/5 left-10 rounded-full bg-black p-2 text-white"
		tabindex="0">←</button
	>
	<button
		onclick={nextClick}
		class="arrow forward bg-opacity-50 absolute top-2/5 right-10 rounded-full bg-black p-2 text-white"
		tabindex="0">→</button
	>
{/snippet}

<!-- Indicators -->
{#snippet indicatorsEl(index)}
	<div class="slide-indicators absolute bottom-10 left-1/2 flex -translate-x-1/2 transform space-x-2">
		{#each Array(slides.length || slideContainerEl?.children.length || 0) as _, index}
			<button
				onclick={() => goToSlide(index)}
				class="slide-indicator size-3 cursor-pointer rounded-full {index === currentSlide
					? 'bg-accent-500'
					: 'bg-neutral-200/50'}"
			></button>
		{/each}
	</div>
{/snippet}

<div
	class="relative mx-auto flex h-[50vh] w-full flex-col"
	onmouseover={handleMouseOver}
	onfocus={handleMouseOver}
	onmouseout={handleMouseOut}
	onblur={handleMouseOut}
	role="button"
	tabindex="0"
>
	<!-- Slides -->
	<div
		bind:this={slideContainerEl}
		class="flex h-full snap-x snap-mandatory overflow-x-scroll {showScrollbar ? 'scrollbar-auto' : 'scrollbar-hidden'}"
		role="button"
		tabindex="0"
	>
		{#if slides.length > 0}
			{@render slidesEl()}
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
