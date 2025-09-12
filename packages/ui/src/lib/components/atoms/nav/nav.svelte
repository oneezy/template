<script lang="ts">
	import { Component, Button, Toggle, Indicator, type ComponentProps } from '@layerd/ui';
	import { useEventListener } from 'runed';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface NavProps extends ComponentProps {
		navOpen?: boolean;
	}

	let { children = undefined, navOpen = $bindable(false), ...props }: NavProps = $props();
	let navContainer = $state<HTMLElement>();
	let toggleButtonContainer = $state<HTMLElement>();

	// Close nav on any click when navOpen is true, except clicks on the toggle button
	useEventListener(
		() => document,
		'click',
		(event: MouseEvent) => {
			if (!navOpen) return;

			// Don't close if clicking the toggle button container or its children
			if (toggleButtonContainer && toggleButtonContainer.contains(event.target as Node)) {
				return;
			}

			const target = event.target as Element;

			// Check if we're clicking inside a Toggle component
			const toggleComponent = target.closest('.toggle');
			if (toggleComponent) {
				// Check if this is a hover-triggered toggle (desktop) vs click-triggered (mobile)
				const isHoverToggle = toggleComponent.classList.contains('toggle--hover');

				if (isHoverToggle) {
					// Desktop hover toggle - never close nav on any interaction
					return;
				} else {
					// Mobile click toggle - check what was clicked
					const clickedLink = target.closest('a[href]');
					const clickedToggleTrigger = target.closest('[data-toggle-button="true"]');

					if (clickedToggleTrigger) {
						// Clicked the toggle trigger itself - don't close nav, let toggle handle it
						return;
					} else if (clickedLink) {
						// Clicked a link inside toggle content - close nav (user is navigating)
						navOpen = false;
						return;
					} else {
						// Clicked something else inside toggle (like empty space) - don't close
						return;
					}
				}
			}

			// Check if clicking on a regular navigation link
			const clickedLink = target.closest('a[href]');
			if (clickedLink) {
				// Regular navigation link clicked - close nav
				navOpen = false;
				return;
			}

			// Close nav on any other click (outside navigation)
			navOpen = false;
		}
	);
</script>

<Component {...props} class={props.class}>
	{#snippet component({ props })}
		<nav {...props} class="nav {props.class}">
			{#if children}
				<!-- This works -->
				<div
					bind:this={toggleButtonContainer}
					class="col-start-2 row-start-1 translate-x-2 justify-self-end lg:!hidden"
				>
					<Button
						ghost
						invert
						icon="menu"
						iconToggle="close"
						toggled={navOpen}
						onToggle={(toggled) => (navOpen = toggled)}
					/>
				</div>

				<!-- Mobile nav with transition -->
				{#if navOpen}
					<div
						class="col-span-full row-start-2 grid gap-2 px-2 pb-4 lg:hidden"
						bind:this={navContainer}
						transition:slide={{ duration: 300 }}
					>
						{@render children()}
						<Indicator {navContainer} />
					</div>
				{/if}

				<!-- Desktop nav - always visible -->
				<div
					class="relative hidden h-full lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:justify-end lg:gap-4 lg:p-0"
					bind:this={navContainer}
				>
					{@render children()}
					<Indicator {navContainer} />
				</div>
			{/if}
		</nav>
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.nav {
		@apply contents lg:col-start-2 lg:row-start-1 lg:grid lg:translate-x-5 lg:grid-cols-[1fr_auto] lg:items-center;
	}
</style>
