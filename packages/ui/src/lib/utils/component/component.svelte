<script lang="ts">
	import { browser } from '$app/environment';
	import { createAttachmentKey, type Attachment } from 'svelte/attachments';
	import { ElementSize } from 'runed';
	import type {
		ComponentProps,
		ComponentReturn,
		ComponentWrapperProps,
		ObserveOptions
	} from '@layerd/ui';
	import {
		createComponentWithStyles,
		Debug,
		DebugClass,
		ObserveClass,
		ScrollClass
	} from '@layerd/ui';

	// Constants
	const COMPONENT_DEFAULT_TEXT = 'Component';

	let {
		label = undefined,
		children = undefined,
		class: componentClass = undefined,
		component = undefined,
		debug = false,
		observe = false,
		scroll = false,
		...props
	}: ComponentWrapperProps = $props();

	// Component derived values
	const componentChildren = $derived(children || props.children);
	const componentLabel = $derived(label || props.label || null);
	const componentPropsWithoutChildren = $derived(() => {
		const { children: _, ...rest } = props;
		return { ...rest, debug, scroll };
	});

	// Component creation
	const { base, classes } = $derived(
		createComponentWithStyles(componentPropsWithoutChildren(), {
			defaults: {},
			componentClass,
			getComponentClasses: () => []
		})
	);

	// Element reference tracking using Svelte's {@attach} - the proper Svelte 5 way!
	let elementRefs = $state<(HTMLElement | null)[]>([]);

	// Create attachment for element tracking per instance
	const createTrackElement =
		(index: number): Attachment =>
		(element: Element) => {
			elementRefs[index] = element as HTMLElement;
			return () => {
				if (elementRefs[index] === element) {
					elementRefs[index] = null;
				}
			};
		};

	// Use elementRef for ElementSize - pure snippet-based system (for the first element for now)
	const elementSize = new ElementSize(() => elementRefs[0]);

	// Handle multiplication
	const componentTotal = $derived(Math.max(1, Math.floor(Number(props.total) || 1)));
	const componentTotals = $derived(Array.from({ length: componentTotal }, (_, i) => i));

	// Create utility instances for each component instance
	const debugInstances = $derived(
		Array.from(
			{ length: componentTotal },
			(_, i) => new DebugClass(() => elementRefs[i], { enabled: debug })
		)
	);

	const observeInstances = $derived(
		Array.from({ length: componentTotal }, (_, i) => {
			// Handle both boolean and ObserveOptions
			const observeOptions =
				typeof observe === 'object' ? { enabled: true, ...observe } : { enabled: observe };
			return new ObserveClass(() => elementRefs[i], observeOptions);
		})
	);

	const scrollInstances = $derived(
		Array.from(
			{ length: componentTotal },
			(_, i) => new ScrollClass(() => elementRefs[i], { enabled: scroll })
		)
	);

	// Create component props for specific instance
	const getComponentProps = (index: number) => ({
		...base,
		class:
			`${classes} ${observe && observeInstances[index]?.isIntersecting ? 'active' : ''} ${scroll && scrollInstances[index]?.hasScrolledDown ? 'scrolled' : ''}`.trim(),
		// Add attachment to track element reference when debug, observe, or scroll is enabled
		...(debug || observe || scroll ? { [createAttachmentKey()]: createTrackElement(index) } : {})
	});
</script>

<!-- 
⬜ default ⬛ prop 🟪 snippet 🟦 children
-->
{#snippet content(text: string = COMPONENT_DEFAULT_TEXT)}
	{#if componentChildren}
		{@render componentChildren()}
	{:else if componentLabel}
		{componentLabel}
	{:else}
		{text}
	{/if}
{/snippet}

{#each componentTotals as _, i}
	{#if component}
		<!-- PURE snippet-based system - ALWAYS clean output, no wrapper ever! -->
		{@render component({
			props: getComponentProps(i),
			content
		})}
	{/if}
{/each}

<!-- Debug overlays for all instances using Debug component -->
{#if browser && debug}
	{#each debugInstances as debugInstance, i}
		<Debug
			debug={debugInstance}
			index={i}
			componentName="Component"
		/>
	{/each}
{/if}
