<script lang="ts">
	/**
	 * @tags navigation, indicator, anchor
	 */
	import { Component, type ComponentProps, navigationState } from '@layerd/ui';

	interface IndicatorProps extends ComponentProps {
		/** Container element that holds the navigation links */
		navContainer?: HTMLElement;
	}

	let { navContainer, ...props }: IndicatorProps = $props();

	let indicatorElement: any;
	let currentPosition = $state({ translateX: 0, width: 0 });

	// Calculate position based on active link
	$effect(() => {
		if (!navContainer || !indicatorElement) return;

		const activeSection = navigationState.stickyActiveSection;
		const currentHash = navigationState.currentHash;

		// Determine which section to highlight - prefer sticky active, fallback to current hash
		const targetSection = activeSection || currentHash;

		if (!targetSection) {
			// Hide indicator when no active section or hash
			currentPosition = { translateX: 0, width: 0 };
			return;
		}

		// Find the active link element - check both regular links and toggle buttons
		let activeElement = navContainer.querySelector(`a[href="#${targetSection}"]`) as HTMLElement;

		// If no regular link found, look for any element with href attribute matching the target
		if (!activeElement) {
			activeElement = navContainer.querySelector(`[href="#${targetSection}"]`) as HTMLElement;
		}

		// If still no element found, look for toggle elements and check their content
		if (!activeElement) {
			const toggleElements = navContainer.querySelectorAll('.toggle, [class*="toggle"]');
			for (const toggle of toggleElements) {
				const button = toggle.querySelector('button, label, a');
				if (button && button.getAttribute('href') === `#${targetSection}`) {
					activeElement = button as HTMLElement;
					break;
				}
			}
		}

		if (!activeElement) {
			// Hide indicator if we can't find the link element
			currentPosition = { translateX: 0, width: 0 };
			return;
		}

		// Get position relative to nav container
		const navRect = navContainer.getBoundingClientRect();
		const linkRect = activeElement.getBoundingClientRect();

		// Calculate position relative to the container's content area
		const offsetX = linkRect.left - navRect.left;

		currentPosition = {
			translateX: offsetX,
			width: linkRect.width
		};
	});
</script>

<Component
	bind:this={indicatorElement}
	{...props}
	primary
	class="duration-250 absolute left-0 top-full hidden h-[3.5px] rounded-full transition-all ease-in-out lg:block {props.class ||
		''}"
	style="transform: translateX({currentPosition.translateX}px); width: {currentPosition.width}px; opacity: {currentPosition.width >
	0
		? 1
		: 0};"
>
	{#snippet component({ props })}
		<b {...props}></b>
	{/snippet}
</Component>
