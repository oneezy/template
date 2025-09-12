<script>
	/* Default Props
	 *************************/
	export let title = null;
	export let subtitle = null;
	export let subheader = null;
	export let subheading = null;
	export let tagline = null;

	/* Private Variables
	 *************************/
	let _class = `w-full not-prose`;
</script>

<div class="{_class} {!subheader || !subheading ? 'py-20' : ''} {$$props.class || ''}">
	{#if title || subtitle || subheader || subheading || tagline}
		<!-- Title -->
		{#if title}
			<h1
				class="text-center text-6xl md:text-[14vw] lg:text-[12vw] xl:text-[8vw] tracking-tight font-black text--primary"
			>
				{title}
			</h1>
		{/if}

		<!-- Subtitle -->
		{#if subtitle}
			<h2 class="font-extrabold tracking-tight text-5xl md:text-6xl text-center text--primary">
				{subtitle}
			</h2>
		{/if}

		<!-- Subtitle -->
		{#if subheader || subheading}
			<h3 class="text-3xl tracking-tight font-medium text--primary">
				{subheader || subheading}
			</h3>
		{/if}

		<!-- Tagline -->
		{#if tagline}
			<p
				class={`mt-4 text-lg font-medium text--neutral md:text-xl text-center ${$$props.class || ''}`}
				style={`${$$props.style || ''}`}
			>
				{tagline}
			</p>
		{/if}
	{:else}
		<h2 class="font-extrabold tracking-tight text-5xl md:text-6xl text-center text--primary">
			<slot />
		</h2>
	{/if}
</div>
