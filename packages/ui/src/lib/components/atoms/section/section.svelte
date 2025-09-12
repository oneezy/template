<script lang="ts">
	/**
	 * @tags section, layout, container
	 */
	import { Component, Divider, Container } from '@layerd/ui';
	import { type ComponentProps, type DividerProps } from '@layerd/ui';

	interface SectionProps extends ComponentProps {
		/** Section title - displayed prominently */
		title?: string;
		/** Section tagline - displayed below title */
		tagline?: string;
		/** Unique identifier for the section */
		id?: string;
		/** Enable full-width bleed behavior */
		bleed?: boolean;
		/** Layout variant for container (e.g., 'grid-3x3', 'odd', 'even', etc.) */
		layout?: string;
		/** Additional classes for content area */
		container?: string;
		/** Include dividers: true (defaults to both), "top", "bottom", "both", or Partial<DividerProps> for full control */
		divider?: boolean | 'top' | 'bottom' | 'both' | Partial<DividerProps>;
		/** Override props for top divider only - string for class or object for full DividerProps */
		dividerTop?: string | Partial<DividerProps>;
		/** Override props for bottom divider only - string for class or object for full DividerProps */
		dividerBottom?: string | Partial<DividerProps>;
	}

	let {
		title = undefined,
		tagline = undefined,
		id = undefined,
		// layout
		bleed = true,
		layout = '',
		container = undefined,
		divider = undefined,
		dividerTop = undefined,
		dividerBottom = undefined,
		children = undefined,
		...props
	}: SectionProps = $props();

	// Generate ID if not provided
	const sectionId = $derived(id || (title ? title.toLowerCase().replace(/\s+/g, '-') : undefined));

	// Normalize divider prop to support string values and objects
	const dividerProps = $derived(() => {
		if (divider === false || divider === undefined || divider === null) {
			return { align: 'none' as const, style: '' };
		} else if (divider === true || divider === 'both') {
			return { align: 'both' as const, style: '' };
		} else if (divider === 'top') {
			return { align: 'top' as const, style: '' };
		} else if (divider === 'bottom') {
			return { align: 'bottom' as const, style: '' };
		} else if (typeof divider === 'object' && divider !== null) {
			// For object, default align to "both" if not specified
			return { align: 'both' as const, style: '', ...divider };
		}
		return { align: 'none' as const, style: '' };
	});

	// Always use auto 1fr auto for consistent spacing - dividers are always present
	const gridRows = $derived('auto 1fr auto');

	// Calculate opacity classes for top and bottom dividers based on align
	const topOpacityClass = $derived(() => {
		const divProps = dividerProps();
		return divProps.align === 'top' || divProps.align === 'both' ? 'opacity-100' : 'opacity-0';
	});

	const bottomOpacityClass = $derived(() => {
		const divProps = dividerProps();
		return divProps.align === 'bottom' || divProps.align === 'both' ? 'opacity-100' : 'opacity-0';
	});

	// Normalize dividerTop prop to support both string and object
	const topDividerProps = $derived(() => {
		if (typeof dividerTop === 'string') {
			return { class: `${topOpacityClass()} ${dividerTop}` };
		} else if (typeof dividerTop === 'object' && dividerTop !== null) {
			return {
				...dividerTop,
				class: `${topOpacityClass()} ${dividerTop.class || ''}`
			};
		}
		return { class: topOpacityClass() };
	});

	// Normalize dividerBottom prop to support both string and object
	const bottomDividerProps = $derived(() => {
		if (typeof dividerBottom === 'string') {
			return { class: `${bottomOpacityClass()} ${dividerBottom}` };
		} else if (typeof dividerBottom === 'object' && dividerBottom !== null) {
			return {
				...dividerBottom,
				class: `${bottomOpacityClass()} ${dividerBottom.class || ''}`
			};
		}
		return { class: bottomOpacityClass() };
	});
</script>

<Component
	observe
	{...props}
	class="section z-1 relative w-full {bleed ? 'bleed' : ''} {props.class}"
>
	{#snippet component({ props, content })}
		{@const divProps = dividerProps()}
		<section
			id={sectionId}
			{...props}
		>
			<Divider
				{...divProps}
				{...topDividerProps()}
				align="top"
				negative={true}
			/>

			<Container class="flex flex-col gap-20  py-20 {layout} {container}">
				{#if children}
					{@render children()}
				{:else}
					{@render content('Section')}
				{/if}
			</Container>

			<Divider
				{...divProps}
				{...bottomDividerProps()}
				align="bottom"
			/>
		</section>
	{/snippet}
</Component>

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.section {
		@apply grid transition duration-700 ease-in-out;
		grid-template-rows: auto 1fr auto;

		&:where(.active) {
			@apply opacity-100;
		}
	}
</style>
