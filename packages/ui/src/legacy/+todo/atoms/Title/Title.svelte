<script>
	import { observer } from '$lib/utils/observer.svelte.js';
	/* Default Props
	 *************************/
	let {
		nostyle = false,
		title = null,
		subtitle = null,
		subheader = null,
		subheading = null,
		tagline = null,
		children = null,
		...props
	} = $props();

	/* Private Variables
	 *************************/
	let _class = `w-full not-prose`;
</script>

<div {...props} use:observer class="title {_class} {!subheader || !subheading ? 'py-20' : ''} {props.class}">
	{#if title || subtitle || subheader || subheading || tagline}
		<!-- Title -->
		{#if title}
			<h1
				class="{nostyle
					? ''
					: 'text-neutral-950-50'} text-center text-6xl font-black tracking-tight md:text-[14vw] lg:text-[12vw] xl:text-[8vw]"
			>
				{title}
			</h1>
		{/if}

		<!-- Subtitle -->
		{#if subtitle}
			<h2 class="{nostyle ? '' : 'text-neutral-950-50'} text-center text-5xl font-extrabold tracking-tight md:text-6xl">
				{subtitle}
			</h2>
		{/if}

		<!-- Subtitle -->
		{#if subheader || subheading}
			<h3 class="{nostyle ? '' : 'text-neutral-950-50'} text-3xl font-medium tracking-tight">
				{subheader || subheading}
			</h3>
		{/if}

		<!-- Tagline -->
		{#if tagline}
			<p
				class={`text-neutral-500-300 mt-4 text-pretty text-center text-lg font-medium md:text-xl ${props.class}`}
				style={`${props.style}`}
			>
				{tagline}
			</p>
		{/if}
	{:else}
		<h2 class="{nostyle ? '' : 'text-neutral-950-50'} text-center text-5xl font-extrabold tracking-tight md:text-6xl">
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
