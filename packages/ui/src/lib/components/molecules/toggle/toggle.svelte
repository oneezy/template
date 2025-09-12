<script lang="ts">
	import { Component, Button, navigationState } from '@layerd/ui';
	import { type ComponentProps, type ButtonProps } from '@layerd/ui';
	import { useEventListener } from 'runed';

	export interface ToggleProps extends Omit<ComponentProps, 'position'> {
		// Button configuration (composition approach)
		button?: Partial<ButtonProps>;

		// Toggle-specific behavior (renamed from 'type' to 'variant')
		variant?: 'panel' | 'tooltip' | 'menu' | 'dialog' | 'sheet' | 'toast';

		// Toggle-specific props
		/** Whether to auto-close other toggles when this one opens */
		autoClose?: boolean;
		/** How the toggle is triggered */
		trigger?: 'click' | 'hover';
		/** CSS positioning context for the toggle content */
		position?: 'relative' | 'absolute' | 'fixed';
		/** Animation type for toggle/hide */
		animation?: 'fade' | 'slide' | 'scale';
		/** Where the content appears relative to the trigger */
		align?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'center'
			| 'inline'
			| 'bottom-right'
			| 'bottom-left'
			| 'top-right'
			| 'top-left';
		/** Whether to close on outside click */
		closeOnOutsideClick?: boolean;
		/** Whether to close on escape key */
		closeOnEscape?: boolean;
		/** Detached mode - render only the trigger, content positioned separately */
		detached?: boolean;
		/** Custom class for trigger when detached */
		triggerClass?: string;
		/** Custom class for content when detached */
		contentClass?: string;
		/** Navigation section ID for scroll tracking and indicator positioning */
		navId?: string;

		// Content separation
		/** Text/content for the trigger button */
		label?: string;
		/** Snippet for custom trigger content */
		trigger_content?: import('svelte').Snippet;
		/** Snippet for the toggle content that appears when opened */
		content?: import('svelte').Snippet;

		// Basic HTML props
		class?: string;
		id?: string;
		onclick?: (event: Event) => void;
		[key: string]: any;
	}

	let {
		// Toggle-specific props
		variant = 'panel',
		button = {},
		autoClose = true,
		trigger = 'click',
		position = 'relative',
		animation = undefined,
		align = undefined,
		closeOnOutsideClick = undefined,
		closeOnEscape = undefined,
		detached = false,
		triggerClass = '',
		contentClass = '',
		navId = undefined,
		label = undefined,
		trigger_content = undefined,
		content = undefined,
		children = undefined,
		...props
	}: ToggleProps = $props();

	// Apply variant presets - these override individual prop values
	const config = $derived.by(() => {
		switch (variant) {
			case 'tooltip':
				return {
					trigger: 'hover',
					position: 'absolute' as const,
					align: align ?? ('top' as const),
					animation: animation ?? ('fade' as const),
					closeOnOutsideClick: false,
					closeOnEscape: false,
					autoClose: true
				};
			case 'menu':
				return {
					trigger: trigger ?? ('hover' as const),
					position: 'absolute' as const,
					align: align ?? ('bottom-right' as const),
					animation: animation ?? ('fade' as const),
					closeOnOutsideClick: closeOnOutsideClick !== undefined ? closeOnOutsideClick : true,
					closeOnEscape: closeOnEscape !== undefined ? closeOnEscape : true,
					autoClose: autoClose ?? false
				};
			case 'dialog':
				return {
					trigger: trigger ?? ('click' as const),
					position: 'fixed' as const,
					align: 'center' as const,
					animation: animation ?? ('scale' as const),
					closeOnOutsideClick: closeOnOutsideClick !== undefined ? closeOnOutsideClick : true,
					closeOnEscape: closeOnEscape !== undefined ? closeOnEscape : true,
					autoClose: autoClose ?? true
				};
			case 'sheet':
				return {
					trigger: trigger ?? ('click' as const),
					position: 'fixed' as const,
					align: align ?? ('center' as const),
					animation: animation ?? ('slide' as const),
					closeOnOutsideClick: closeOnOutsideClick !== undefined ? closeOnOutsideClick : true,
					closeOnEscape: closeOnEscape !== undefined ? closeOnEscape : true,
					autoClose: autoClose ?? true
				};
			case 'toast':
				return {
					trigger: trigger ?? ('click' as const),
					position: 'fixed' as const,
					align: align ?? ('top' as const),
					animation: animation ?? ('slide' as const),
					closeOnOutsideClick: false,
					closeOnEscape: false,
					autoClose: false
				};
			case 'panel':
			default:
				return {
					trigger: trigger ?? ('click' as const),
					position: position ?? ('relative' as const),
					align: align ?? ('inline' as const),
					animation: animation ?? ('slide' as const),
					closeOnOutsideClick: closeOnOutsideClick !== undefined ? closeOnOutsideClick : false,
					closeOnEscape: closeOnEscape !== undefined ? closeOnEscape : false,
					autoClose: autoClose ?? true
				};
		}
	});

	// Generate unique toggle ID and reactive input configuration
	const toggleId = `toggle-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
	// Remove checkbox approach - use simple state instead
	const inputType = undefined;
	const groupName = undefined;

	// Navigation functionality for toggles that should participate in navigation
	const isNavToggle = $derived(!!navId);
	const shouldRegisterNav = $derived(isNavToggle && !!props.href?.startsWith('#'));

	// Register this toggle with the navigation state if it has a navId and href
	$effect(() => {
		if (shouldRegisterNav && navId) {
			navigationState.registerLink(navId);

			// Cleanup when component is destroyed
			return () => {
				navigationState.unregisterLink(navId);
			};
		}
	});

	// Check if this toggle should be active based on navigation state
	const isNavActive = $derived.by(() => {
		if (!isNavToggle || !navId) return false;

		// Force reactivity by accessing navigation state properties
		const currentHash = navigationState.currentHash;
		const activeSection = navigationState.activeSection;
		const stickyActiveSection = navigationState.stickyActiveSection;

		// Use sticky active section - this persists until a new section becomes visible or hash changes
		const result = stickyActiveSection === navId;
		return result;
	});

	// Element references and state
	let toggleElement = $state<HTMLElement>();
	let contentElement = $state<HTMLElement>();
	let isToggleOpen = $state(false);

	// Use useEventListener for comprehensive click handling and nested toggle management
	useEventListener(
		() => document,
		'click',
		(event) => {
			const target = event.target as Element;
			if (!target || !toggleElement) return;

			// Only handle click triggers, hover triggers are handled via CSS
			if (config.trigger !== 'click') return;

			// Check if this click is specifically for OUR toggle button
			const clickedButton = target.closest('[data-toggle-button]') as HTMLButtonElement;
			const ourButton = toggleElement.querySelector('[data-toggle-button]') as HTMLButtonElement;

			// CRITICAL: Only handle if the clicked button is EXACTLY our button
			// and the click originated from within our toggle element
			const isClickWithinOurToggle = toggleElement.contains(target);
			const isOurButtonClick = clickedButton === ourButton && isClickWithinOurToggle;

			// If the clicked button is specifically ours, handle the toggle
			if (isOurButtonClick) {
				event.preventDefault();
				event.stopPropagation();

				const wasOpen = isToggleOpen;
				isToggleOpen = !isToggleOpen;

				// Handle auto-close behavior for sibling toggles
				if (config.autoClose && isToggleOpen && !wasOpen && toggleElement) {
					// Find sibling toggles at the same level (not nested children)
					const directParent = toggleElement.parentElement;

					if (directParent) {
						// Get only direct child toggles of the same parent (true siblings)
						const siblingToggles = Array.from(directParent.children).filter(
							(child) => child !== toggleElement && child.classList.contains('toggle')
						);

						// Close sibling toggles by triggering their state change
						siblingToggles.forEach((sibling) => {
							if (sibling.getAttribute('data-toggle-open') === 'true') {
								sibling.setAttribute('data-toggle-open', 'false');
								// Also update the internal state of sibling toggles by dispatching a custom event
								sibling.dispatchEvent(new CustomEvent('toggle-force-close'));
							}
						});
					}
				}

				// Update our toggle element's open state
				toggleElement.setAttribute('data-toggle-open', isToggleOpen.toString());

				// Call any existing onclick handler
				if (props.onclick) {
					props.onclick(event);
				}
				return;
			}

			// Handle click outside detection for non-panel types
			if (variant !== 'panel' && contentElement && config.closeOnOutsideClick && isToggleOpen) {
				let isClickOutside = false;

				if (detached) {
					// In detached mode, check both trigger and content containers
					const triggerContainer = document.querySelector('.toggle-trigger-container');
					const contentContainer = document.querySelector('.toggle-content-container');

					isClickOutside =
						(!contentContainer || !contentContainer.contains(target)) &&
						(!triggerContainer || !triggerContainer.contains(target));
				} else {
					// In normal mode, check both content and toggle elements
					isClickOutside = !contentElement.contains(target) && !toggleElement.contains(target);
				}

				// Also check if the click is on a nested toggle - if so, don't close this one
				const clickedToggle = target.closest('.toggle');
				const isNestedToggleClick =
					clickedToggle &&
					clickedToggle !== toggleElement &&
					contentElement.contains(clickedToggle);

				if (isClickOutside && !isNestedToggleClick) {
					isToggleOpen = false;
					toggleElement.setAttribute('data-toggle-open', 'false');
				}
			}
		},
		{ capture: true } // Use capture to ensure we handle clicks before they bubble
	);

	// Listen for force-close events from sibling toggles
	useEventListener(
		() => toggleElement,
		'toggle-force-close',
		() => {
			isToggleOpen = false;
		}
	);

	// Initialize toggle state and maintain data attribute sync
	$effect(() => {
		if (toggleElement) {
			toggleElement.setAttribute('data-toggle-open', isToggleOpen.toString());
		}
	});

	// Detect if this is a nested menu (for future use if needed)
	const isNestedMenu = $derived(variant === 'menu');

	// Content classes based on align and animation using Tailwind
	const contentClasses = $derived.by(() => {
		let classes = 'toggle-content ';

		// Add variant-specific classes
		classes += ` toggle-content--${variant}`;

		// Add specific transitions based on animation type
		if (config.animation !== undefined) {
			switch (config.animation) {
				case 'fade':
					classes += ' transition-opacity duration-300 ease-in-out';
					break;
				case 'slide':
					if (config.align === undefined || config.align === 'inline') {
						classes += ' transition-[grid-template-rows] duration-300 ease-in-out';
					} else {
						classes += ' transition-[transform,opacity] duration-300 ease-in-out';
					}
					break;
				case 'scale':
					// Scale animation with proper transform origin
					const originClass =
						config.align === 'top'
							? ' animate--scale-origin-top'
							: config.align === 'bottom'
								? ' animate--scale-origin-bottom'
								: config.align === 'left'
									? ' animate--scale-origin-left'
									: config.align === 'right'
										? ' animate--scale-origin-right'
										: config.align === 'top-left'
											? ' animate--scale-origin-top-left'
											: config.align === 'top-right'
												? ' animate--scale-origin-top-right'
												: config.align === 'bottom-left'
													? ' animate--scale-origin-bottom-left'
													: config.align === 'bottom-right'
														? ' animate--scale-origin-bottom-right'
														: ' animate--scale-origin-center';
					classes += ' animate--scale' + originClass;
					break;
			}
		}

		// Positioning classes
		if (config.align !== undefined && config.align !== 'inline') {
			// Use the position prop for positioning context
			// Menus get higher z-index for proper layering
			let zIndex = variant === 'menu' ? 'z-50' : 'z-40';
			classes += ` ${config.position} ${zIndex}`;

			// Special positioning for different types
			switch (variant) {
				case 'dialog':
					classes += ' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
					break;
				case 'sheet':
					switch (config.align) {
						case 'top':
							classes += ' top-0 left-0 right-0 w-full';
							break;
						case 'bottom':
							classes += ' bottom-0 left-0 right-0 w-full';
							break;
						case 'left':
							classes += ' top-0 bottom-0 left-0 h-full';
							break;
						case 'right':
							classes += ' top-0 bottom-0 right-0 h-full';
							break;
						case 'center':
						default:
							classes += ' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
							break;
					}
					break;
				case 'toast':
					switch (config.align) {
						case 'top':
							classes += ' top-4 left-1/2 -translate-x-1/2';
							break;
						case 'bottom':
							classes += ' bottom-4 left-1/2 -translate-x-1/2';
							break;
						case 'left':
							classes += ' top-4 left-4';
							break;
						case 'right':
							classes += ' top-4 right-4';
							break;
					}
					break;
				default:
					// Standard positioning for tooltip, menu, etc.
					switch (config.align) {
						case 'top':
							classes += ' bottom-full left-1/2 -translate-x-1/2 pb-2';
							break;
						case 'bottom':
							classes += ' top-full left-1/2 -translate-x-1/2 pt-2';
							break;
						case 'left':
							classes += ' right-full top-1/2 -translate-y-1/2 pr-2';
							break;
						case 'right':
							classes += ' left-full top-1/2 -translate-y-1/2 pl-2';
							break;
						case 'bottom-right':
							classes += ' top-full right-0 pt-2';
							break;
						case 'bottom-left':
							classes += ' top-full left-0 pt-2';
							break;
						case 'top-right':
							classes += ' bottom-full right-0 pb-2';
							break;
						case 'top-left':
							classes += ' bottom-full left-0 pb-2';
							break;
						case 'center':
							if (config.position === 'fixed') {
								classes += ' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
							} else {
								classes += ' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
							}
							break;
					}
					break;
			}
		}

		// Animation classes - hidden by default, shown when input is checked
		if (config.animation !== undefined) {
			switch (config.animation) {
				case 'fade':
					classes += ' animate--fade';
					break;
				case 'slide':
					if (config.align === undefined || config.align === 'inline') {
						// Inline slide - use CSS Grid rows for smooth animation
						classes += ' animate--slide-inline';
					} else {
						// Positioned slide - use transform + opacity
						const slideClass =
							config.align === 'top'
								? ' animate--slide-top'
								: config.align === 'bottom'
									? ' animate--slide-bottom'
									: config.align === 'left'
										? ' animate--slide-left'
										: config.align === 'right'
											? ' animate--slide-right'
											: config.align === 'top-left' || config.align === 'top-right'
												? ' animate--slide-top'
												: config.align === 'bottom-left' || config.align === 'bottom-right'
													? ' animate--slide-bottom'
													: ' animate--slide-bottom';
						classes += slideClass;
					}
					break;
				case 'scale':
					const scaleClass =
						config.align === 'top'
							? ' animate--scale-bottom'
							: config.align === 'bottom'
								? ' animate--scale-top'
								: config.align === 'left'
									? ' animate--scale-right'
									: config.align === 'right'
										? ' animate--scale-left'
										: config.align === 'top-left'
											? ' animate--scale-bottom-right'
											: config.align === 'top-right'
												? ' animate--scale-bottom-left'
												: config.align === 'bottom-left'
													? ' animate--scale-top-right'
													: config.align === 'bottom-right'
														? ' animate--scale-top-left'
														: ' animate--scale-center';
					classes += scaleClass;
					break;
			}
		} else {
			// No animation - just hide/show
			classes += ' animate--none';
		}

		// Add custom contentClass if provided
		if (contentClass) {
			classes += ` ${contentClass}`;
		}

		return classes;
	});

	// Trigger classes with optional triggerClass prop and navigation active state
	const triggerClasses = $derived.by(() => {
		let classes = 'toggle-trigger';

		// Add variant-specific classes
		if (variant === 'panel') {
			classes += ' toggle-trigger--panel';
		}

		// Add link class for navigation integration
		classes += ' link';

		// Add active class if this toggle is navigation-active
		if (isNavActive) {
			classes += ' active';
		}

		// Add custom triggerClass if provided
		if (triggerClass) {
			classes += ` ${triggerClass}`;
		}

		return classes;
	});

	// Create button props by merging defaults with user-provided button config
	const buttonProps = $derived(() => {
		const combinedClass = `${triggerClasses}`.trim();

		// Default button configuration
		const defaultButtonProps: Partial<ButtonProps> = {
			variant: 'text',
			class: combinedClass,
			// Use the label prop as button label, or fall back to button.label
			label: label || button.label
		};

		// Merge with user-provided button config, with user config taking priority
		return {
			...defaultButtonProps,
			...button,
			// Always ensure class includes trigger classes
			class: `${button.class || ''} ${combinedClass}`.trim(),
			// Ensure label is properly set (button.label takes priority over prop label)
			label: button.label || label
		};
	});

	// Wrapper classes combining variant-specific classes
	const wrapperClasses = $derived.by(() => {
		let classes = `toggle toggle--${variant}`;

		// Add positioning classes
		classes += ` relative ${config.position === 'absolute' ? 'inline-block' : ''}`;

		// Add hover class for hover triggers
		if (config.trigger === 'hover') {
			classes += ' toggle--hover';
		}

		return classes;
	});
</script>

{#snippet triggerButton()}
	{#if config.trigger === 'click'}
		{#if trigger_content}
			<Button
				{...buttonProps()}
				data-toggle-button="true"
				onclick={(e: Event) => {
					// The useEventListener should handle this, but let's ensure it gets triggered
				}}
			>
				{@render trigger_content()}
			</Button>
		{:else}
			<Button
				{...buttonProps()}
				data-toggle-button="true"
				onclick={(e: Event) => {
					// The useEventListener should handle this, but let's ensure it gets triggered
				}}
			/>
		{/if}
	{:else}
		<!-- Hover trigger uses a regular button without state management -->
		{#if trigger_content}
			<Button
				{...buttonProps()}
				data-toggle-button="true"
				onclick={(e: Event) => {
					// Prevent event from bubbling to parent toggles
					e.stopPropagation();
					// Call any existing onclick handler
					if (props.onclick) {
						props.onclick(e);
					}
				}}
			>
				{@render trigger_content()}
			</Button>
		{:else}
			<Button
				{...buttonProps()}
				data-toggle-button="true"
				onclick={(e: Event) => {
					// Prevent event from bubbling to parent toggles
					e.stopPropagation();
					// Call any existing onclick handler
					if (props.onclick) {
						props.onclick(e);
					}
				}}
			/>
		{/if}
	{/if}
{/snippet}

{#snippet toggleContent()}
	{#if config.animation === 'slide' && (config.align === undefined || config.align === 'inline')}
		<!-- Grid-based slide animation needs a wrapper -->
		<div
			bind:this={contentElement}
			class={contentClasses}
		>
			<div class="min-h-0">
				{#if content}
					{@render content()}
				{:else if children}
					{@render children()}
				{/if}
			</div>
		</div>
	{:else}
		<div
			bind:this={contentElement}
			class={contentClasses}
		>
			{#if content}
				{@render content()}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
{/snippet}

<!-- Template 
::::::::::::::::::::::::::::::::::::::::::::: -->
{#snippet toggleComponent()}
	{#if detached}
		<!-- Detached mode: render trigger and content as separate sibling elements -->
		<div
			bind:this={toggleElement}
			class="toggle-trigger-container {triggerClass}"
		>
			{@render triggerButton()}
		</div>
		<div class="toggle-content-container {contentClass}">
			{@render toggleContent()}
		</div>
	{:else}
		<!-- Normal mode: wrapper with trigger and content -->
		<div
			bind:this={toggleElement}
			class="toggle {props.class} {wrapperClasses}"
		>
			{@render triggerButton()}
			{@render toggleContent()}
		</div>
	{/if}
{/snippet}

<Component
	component={toggleComponent}
	{...props}
/>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	/* Base toggle content styles - all animations start hidden and inactive */
	.toggle-content {
		@apply pointer-events-none duration-300 ease-in-out;

		/* Default hidden state for no animation */
		&:where(.animate--none) {
			@apply hidden;
		}

		/* Fade animation */
		&:where(.animate--fade) {
			@apply opacity-0 transition-opacity;
		}

		/* Slide animation - inline (CSS Grid) */
		&:where(.animate--slide-inline) {
			@apply grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out;
		}

		/* Slide animation - positioned directions */
		&:where(.animate--slide-top) {
			@apply translate-y-2 transition-[transform,opacity];
		}
		&:where(.animate--slide-bottom) {
			@apply -translate-y-2 transition-[transform,opacity];
		}
		&:where(.animate--slide-left) {
			@apply translate-x-2 transition-[transform,opacity];
		}
		&:where(.animate--slide-right) {
			@apply -translate-x-2 transition-[transform,opacity];
		}

		/* Sheet-specific slide animations - start from off-screen */
		&:where(.toggle-content--sheet.animate--slide-top) {
			@apply -translate-y-full;
		}
		&:where(.toggle-content--sheet.animate--slide-bottom) {
			@apply translate-y-full;
		}
		&:where(.toggle-content--sheet.animate--slide-left) {
			@apply -translate-x-full;
		}
		&:where(.toggle-content--sheet.animate--slide-right) {
			@apply translate-x-full;
		}

		/* Scale animation - different origins */
		&:where(.animate--scale-top) {
			@apply origin-top scale-95 opacity-0 transition-[transform,opacity];
		}
		&:where(.animate--scale-bottom) {
			@apply origin-bottom scale-95 opacity-0 transition-[transform,opacity];
		}
		&:where(.animate--scale-left) {
			@apply origin-left scale-95 opacity-0 transition-[transform,opacity];
		}
		&:where(.animate--scale-right) {
			@apply origin-right scale-95 opacity-0 transition-[transform,opacity];
		}
		&:where(.animate--scale-center) {
			@apply origin-center scale-95 opacity-0 transition-[transform,opacity];
		}
	}

	/* Type-specific styles */
	.toggle-content--tooltip {
		@apply bg-base-300 text-base-700 max-w-xs rounded-md px-3 py-2 text-sm shadow-lg;
	}

	.toggle-content--menu {
		@apply min-w-48 rounded-md p-1;

		/* Nested menu items should have some visual indication */
		.toggle-trigger {
			@apply w-full justify-start rounded-sm px-3 py-2 text-left text-sm;
		}
	}

	.toggle-content--dialog {
		@apply max-w-md rounded-lg p-6 shadow-xl;
	}

	.toggle-content--sheet {
		@apply bg-primary p-6 shadow-xl transition duration-300 ease-in-out;
	}

	.toggle-content--toast {
		@apply max-w-sm rounded-lg p-4;
	}

	.toggle-content--panel {
		/* Panel styling is minimal - just the content */
	}

	/* Active states for click triggers - uses data attributes instead of checkboxes */
	:global(.toggle[data-toggle-open='true'] > .toggle-content) {
		@apply pointer-events-auto;

		&:where(.animate--none) {
			@apply block;
		}
		&:where(.animate--fade) {
			@apply opacity-100;
		}
		&:where(.animate--slide-inline) {
			@apply grid-rows-[1fr];
		}
		&:where(.animate--slide-top, .animate--slide-bottom) {
			@apply translate-y-0 opacity-100;
		}
		&:where(.animate--slide-left, .animate--slide-right) {
			@apply translate-x-0 opacity-100;
		}
		&:where([class*='animate--scale']) {
			@apply scale-100 opacity-100;
		}

		/* Sheet-specific active states - slide to final position */
		&:where(.toggle-content--sheet.animate--slide-top),
		&:where(.toggle-content--sheet.animate--slide-bottom),
		&:where(.toggle-content--sheet.animate--slide-left),
		&:where(.toggle-content--sheet.animate--slide-right) {
			@apply translate-x-0 translate-y-0;
		}

		/* Keep tooltips with pointer-events-none even when active via click */
		&:where(.toggle-content--tooltip) {
			@apply pointer-events-none;
		}
	}

	/* Active states for hover triggers - works with Component wrapper */
	:global(.toggle--hover:hover .toggle-content) {
		@apply pointer-events-auto;

		&:where(.animate--none) {
			@apply block;
		}
		&:where(.animate--fade) {
			@apply opacity-100;
		}
		&:where(.animate--slide-inline) {
			@apply grid-rows-[1fr];
		}
		&:where(.animate--slide-top, .animate--slide-bottom) {
			@apply translate-y-0 opacity-100;
		}
		&:where(.animate--slide-left, .animate--slide-right) {
			@apply translate-x-0 opacity-100;
		}
		&:where([class*='animate--scale']) {
			@apply scale-100 opacity-100;
		}

		/* Sheet-specific active states - slide to final position */
		&:where(.toggle-content--sheet.animate--slide-top),
		&:where(.toggle-content--sheet.animate--slide-bottom),
		&:where(.toggle-content--sheet.animate--slide-left),
		&:where(.toggle-content--sheet.animate--slide-right) {
			@apply translate-x-0 translate-y-0;
		}

		/* Keep tooltips with pointer-events-none so they disappear when not hovering trigger */
		&:where(.toggle-content--tooltip) {
			@apply pointer-events-none;
		}
	}

	/* Special handling for nested menus - works with Component wrapper */
	:global(.toggle--menu.toggle--hover:hover .toggle-content--menu) {
		/* Allow pointer events on menu content so you can hover over submenus */
		@apply pointer-events-auto;
	}

	/* Nested menus inside menu content should position to the right */
	:global(.toggle-content--menu .toggle .toggle-content--menu) {
		@apply left-full top-0 ml-1 pt-0;
		@apply -translate-x-0 -translate-y-0;
	}

	/* Panel toggle triggers should be full width with block labels */
	:global(.toggle-trigger--panel) {
		@apply block w-full;

		/* Make the label block and full width for panel toggles */
		:global(.btn-label) {
			@apply block w-full;
		}
	}

	/* Specifically target label elements with panel class */
	:global(label.toggle-trigger--panel) {
		@apply block w-full;
	}
</style>
