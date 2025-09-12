<script lang="ts">
	/**
	 * @tags navigation, link, anchor
	 */
	import { Component, Button, type ComponentProps, navigationState } from '@layerd/ui';

	interface LinkProps extends ComponentProps {
		/** Link destination URL */
		href?: string;
		/** Link text content */
		text?: string;
		/** Link target attribute */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/** Link rel attribute */
		rel?: string;
		/** External link indicator */
		external?: boolean;
		/** Use button styling and capabilities */
		type?: 'link' | 'button' | string;
		/** Button icon (when button=true) */
		icon?: 'home' | 'menu' | 'arrow-right' | string;
		/** Button label (when button=true) */
		label?: string;
		/** Whether to reverse the icon and text order (when button=true) */
		reverse?: boolean;
		/** Icon to show when button is clicked/toggled (when button=true) */
		iconToggle?: 'home' | 'menu' | 'arrow-right' | string;
		/** Icon to show on hover (when button=true) */
		iconHover?: 'home' | 'menu' | 'arrow-right' | string;
		/** Whether the button is currently in toggled state (when button=true) */
		toggled?: boolean;
		/** Callback when toggle state changes (when button=true) */
		onToggle?: (toggled: boolean) => void;

		/** Content children */
		children?: any;
	}

	let {
		href = '/',
		text = 'Sample Link',
		target,
		rel,
		external = false,
		button = false,
		icon,
		label,
		type = 'link',
		reverse = false,
		iconToggle,
		iconHover,
		toggled,
		onToggle,
		children,
		...props
	}: LinkProps = $props();

	// Auto-set target and rel for external links
	const finalTarget = $derived(external ? '_blank' : target);
	const finalRel = $derived(external ? 'noopener noreferrer' : rel);

	// Check if this is a navigation link (hash link) and if it's active
	const isNavLink = $derived(href.startsWith('#'));
	const sectionId = $derived(href.startsWith('#') ? href.slice(1) : '');

	// Register this link with the navigation state and start observing the target element
	$effect(() => {
		if (isNavLink && sectionId) {
			navigationState.registerLink(sectionId);

			// Cleanup when component is destroyed
			return () => {
				navigationState.unregisterLink(sectionId);
			};
		}
	});

	const isActive = $derived.by(() => {
		if (!isNavLink) return false;

		// Force reactivity by accessing navigation state properties
		const currentHash = navigationState.currentHash;
		const activeSection = navigationState.activeSection;
		const stickyActiveSection = navigationState.stickyActiveSection;

		// Use sticky active section - this persists until a new section becomes visible or hash changes
		const result = stickyActiveSection === sectionId;
		return result;
	});
</script>

{#if type === 'button'}
	<Button
		{href}
		{icon}
		label={label || text}
		{reverse}
		{iconToggle}
		{iconHover}
		{toggled}
		{onToggle}
		{...props}
		class="link {isActive ? 'active' : ''} {props.class}"
		{children}
	/>
{:else}
	<Component
		{...props}
		class="link {isActive ? 'active' : ''} {props.class}"
		{children}
	>
		{#snippet component({ props, content })}
			<a
				{href}
				target={finalTarget}
				rel={finalRel}
				{...props}
			>
				{@render content(text)}
			</a>
		{/snippet}
	</Component>
{/if}

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.link:not(.logo) {
		@apply relative flex items-center transition duration-200 ease-in-out;
		@apply rounded-full px-12 py-3 lg:bg-[transparent] lg:px-[unset] lg:py-[unset];
	}
	/* 
	:global {
		.header .theme-glass-invert .link.active::after {
			@apply -z-1 from-primary bg-radial absolute inset-0 isolate block to-transparent content-[''];
		}
	} */
</style>
