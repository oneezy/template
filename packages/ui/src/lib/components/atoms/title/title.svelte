<script lang="ts">
	import { Component, type ComponentProps, Icon } from '@layerd/ui';
	/* Default Props
	 *************************/
	let {
		nostyle = false,
		title = null,
		subtitle = null,
		icon = true,
		subheader = null,
		subheading = null,
		tagline = null,
		children = null,
		...props
	} = $props();

	/* Private Variables
	 *************************/
	let classes = `w-full not-prose`;
</script>

<div
	{...props}
	class="title flex flex-col items-center {classes} {!subheader || !subheading
		? ''
		: ''} {props.class}"
>
	{#if title || subtitle || subheader || subheading || tagline}
		<!-- Title -->
		{#if title}
			<!-- <h1
				class="text-center text-6xl font-black tracking-tight md:text-[14vw] lg:text-[12vw] xl:text-[8vw]"
			> -->
			<h1
				class="text-center text-5xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
			>
				{title}
			</h1>
		{/if}

		{#if icon}
			<svg
				class="current-color text-primary fill-primary w-18 my-4 h-5"
				preserveAspectRatio="none"
				id="water-swoosh"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 363.5 73.5"
			>
				<path
					id="trident"
					class="text-primary"
					fill="currentColor"
					d="M0,66S21.3,32,68.3,18.1s79.6-2.2,107.7,11.7c28.1,13.9,57.4,20.7,88.2,18s77.6-10.8,99.4-47.8c0,0-1.8,30-36.4,51.8s-96.9,33.3-156.9,4.6C110.3,27.7,72.5,21.5,0,66h0Z"
				/>
			</svg>
		{/if}

		<!-- Subtitle -->
		{#if subtitle}
			<h2 class="mt-4 text-pretty text-center text-lg font-medium opacity-50 md:text-xl">
				{subtitle}
			</h2>
		{/if}

		<!-- Subtitle -->
		{#if subheader || subheading}
			<h3 class="text-3xl font-medium tracking-tight">
				{subheader || subheading}
			</h3>
		{/if}
	{:else}
		<h2 class="text-center text-5xl font-extrabold tracking-tight md:text-6xl">
			{#snippet content()}
				Title
			{/snippet}

			{#if children}
				{@render children()}
			{:else}
				{@render content()}
			{/if}
		</h2>
	{/if}
</div>

<style lang="postcss">
	@reference '@layerd/ui/ui.css';
	/* 
	h1 {
		background: linear-gradient(
			to right,
			var(--color-primary) 27%,
			var(--color-primary-200) 40%,
			var(--color-primary) 78%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: #fff;
		position: relative;
		text-transform: uppercase;
		margin: 0;
	}

	h1::after {
		background: none;
		content: attr(data-heading) / '';
		left: 0;
		top: 0;
		z-index: -1;
		position: absolute;
		text-shadow:
			-1px 0 1px var(--color-primary-200),
			0 1px 1px var(--color-primary-200),
			5px 5px 10px rgba(0, 0, 0, 0.4),
			-5px -5px 10px rgba(0, 0, 0, 0.4);
	} */
</style>
