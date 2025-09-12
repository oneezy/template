<script lang="ts">
	import { DebugClass } from './debug.svelte.ts';

	interface DebugProps {
		debug: DebugClass;
		index?: number;
		componentName?: string;
	}

	let { debug, index = 0, componentName = 'Component' }: DebugProps = $props();

	const position = $derived(debug.getOverlayPosition());
	const isEnabled = $derived(debug.isEnabled(position));
</script>

{#if isEnabled}
	<!-- Component debug styling -->
	<div
		class="debug debug-component-overlay"
		style="top: {position.centerY - position.height / 2}px; left: {position.centerX -
			position.width / 2}px; width: {position.width}px; height: {position.height}px;"
	></div>

	<!-- Crosshair lines -->
	<div
		class="debug debug-crosshair"
		style="top: {position.centerY - position.height / 2}px; left: {position.centerX -
			position.width / 2}px; width: {position.width}px; height: {position.height}px;"
	></div>

	<!-- Debug info -->
	<div class="debug debug-overlay" style="top: {position.top}px; left: {position.left}px; ">
		{Math.round(position.width)} × {Math.round(position.height)}
	</div>
{/if}

<style lang="postcss">
	@reference "@layerd/ui/ui.css";

	.debug {
		@apply pointer-events-none fixed isolate select-none;

		&:where(.debug-overlay) {
			@apply z-[9999] -translate-x-1/2 whitespace-nowrap rounded bg-pink-600/90 px-1.5 py-0.5 py-1 text-xs font-medium leading-tight text-white;
		}

		&:where(.debug-component-overlay) {
			@apply z-0 bg-pink-600/20 outline-1 outline-pink-600;
		}

		&:where(.debug-crosshair) {
			@apply z-1;

			&:before {
				@apply absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-pink-600 content-[''];
			}
			&:after {
				content: '';
				@apply absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-pink-600 content-[''];
			}
		}
	}
</style>
