<script lang="ts">
	import { Component, Section, Divider, Container, type ComponentProps } from '@layerd/ui';
	import type { Snippet } from 'svelte';

	interface FooterProps extends ComponentProps {
		// content sections
		left?: string | Snippet;
		center?: string | Snippet;
		right?: string | Snippet;
	}

	let { left = undefined, center = undefined, right = undefined, ...props }: FooterProps = $props();
</script>

<Component
	{...props}
	class="{props.class} footer sticky top-[100svh] w-full"
>
	{#snippet component({ props })}
		<footer
			{...props}
			class={props.class}
		>
			<Divider
				negative
				svg="text-base-950"
			/>
			<Container class="grid grid-cols-[auto_1fr_auto] items-center pb-10">
				<!-- Left Section -->
				{#if left}
					<section class="justify-self-start">
						{#if typeof left === 'function'}
							{@render (left as Snippet)()}
						{:else}
							{left}
						{/if}
					</section>
				{/if}

				<!-- Center Section -->
				{#if center}
					<section class="justify-self-center">
						{#if typeof center === 'function'}
							{@render (center as Snippet)()}
						{:else}
							{center}
						{/if}
					</section>
				{/if}

				<!-- Right Section -->
				{#if right}
					<section class="justify-self-end">
						{#if typeof right === 'function'}
							{@render (right as Snippet)()}
						{:else}
							{right}
						{/if}
					</section>

					<!-- Right Section -->
				{:else}
					<section class="justify-self-end">hi mom</section>
				{/if}
			</Container>
		</footer>
	{/snippet}
</Component>

<style>
	/* Auto-distribute children using CSS */
	:global(.footer-left > *),
	:global(.footer-center > *),
	:global(.footer-right > *) {
		display: none;
	}

	:global(.footer-left > *:nth-child(1)) {
		display: block;
	}

	:global(.footer-center > *:nth-child(2)) {
		display: block;
	}

	:global(.footer-right > *:nth-child(3)) {
		display: block;
	}
</style>
