<script>
	let {
		header = '{#snippet header()}header{/snippet}',
		main = '{#snippet main()}main{/snippet}',
		leftside = '{#snippet leftside()}leftside{/snippet}',
		rightside = '{#snippet rightside()}rightside{/snippet}',
		footer = '{#snippet footer()}footer{/snippet}',
		children = null,
		...props
	} = $props();
</script>

<!-- 
<div
	{...props}
	class="grid-container grid min-h-[100dvh] p-4 gap-[var(--grid-gap,1rem)] transition-all duration-500 relative {props.class}"> -->

<div
	{...props}
	class="grid-container relative grid min-h-[100dvh] transition-all duration-500 {props.class}"
>
	{#if children}
		{@render children()}
	{:else}
		<header class="header z-20 [grid-area:header]">
			{#if typeof header === 'function'}{@render header()}{:else}{header}{/if}
		</header>
		<main class="main relative z-10 [grid-area:main]">
			{#if typeof main === 'function'}{@render main()}{:else}{main}{/if}
		</main>

		<!-- 
		<aside class="leftside [grid-area:leftside]">
			{#if typeof leftside === 'function'}{@render leftside()}{:else}{leftside}{/if}
		</aside>
		<aside class="rightside [grid-area:rightside]">
			{#if typeof rightside === 'function'}{@render rightside()}{:else}{rightside}{/if}
		</aside> -->

		<footer class="footer [grid-area:footer]">
			{#if typeof footer === 'function'}{@render footer()}{:else}{footer}{/if}
		</footer>
	{/if}
</div>

<style>
	.grid-container {
		grid-template-rows: var(--header, 0) var(--main, 1fr) var(--footer, auto);
		grid-template-areas:
			'header'
			'main'
			'footer';
	}
	/* 
	.grid-container > * {
		@apply bg-white p-4;
	}

	.grid-container > * > * {
		@apply transition-all duration-500;
	} */

	/* Desktop */
	@media (min-width: 1024px) {
		.grid-container {
			/* grid-template-columns: var(--leftside, 300px) var(--main, 1fr) var(--rightside, 300px); */
			grid-template-rows: var(--header, 0) var(--main, 1fr) var(--footer, auto);
			grid-template-areas:
				'header header header'
				/* 'leftside main rightside' */
				'main main main'
				'footer footer footer';
		}
		/* 
		.grid-container:hover {
			--leftside: 0dvw;
			--rightside: 0dvw;
			--grid-gap: 1rem 0;
			--grid-gap-x: 1rem 0;
			--grid-gap-y: 1rem 0;
		}

		.grid-container:hover .leftside > * {
			transform: translateX(-300px);
		} */
	}
</style>
