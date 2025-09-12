<script lang="ts">
	/**
	 * @tags icon-theme, settings, icon selector
	 */
	import { Component, type ComponentProps } from '@layerd/ui';
	import { sync } from '@layerd/ui';

	interface IconThemeProps extends ComponentProps {
		/** Controlled value (e.g. Storybook); when provided, disables sync updates */
		iconTheme?: 'mdi' | 'heroicons' | 'carbon';
		/** UI style variant */
		variant?: 'dropdown';
	}

	const ICON_THEMES = ['mdi', 'heroicons', 'carbon'] as const;
	type IconTheme = (typeof ICON_THEMES)[number];
	const DEFAULT_ICON_THEME: IconTheme = ICON_THEMES[0];

	/** Validate theme name */
	function isValidIconTheme(themeName: string): themeName is IconTheme {
		return ICON_THEMES.includes(themeName as IconTheme);
	}

	// Use the sync utility for consistent attribute management
	const iconThemeSync = sync({
		target: 'html',
		attribute: 'data-icons',
		defaultValue: DEFAULT_ICON_THEME,
		syncTabs: true,
		storage: 'local'
	});

	// Simple reactive state - initialize from sync
	let iconThemeState = $state<IconTheme>(
		(() => {
			const current = iconThemeSync.current;
			return isValidIconTheme(current) ? (current as IconTheme) : DEFAULT_ICON_THEME;
		})()
	);

	// Update sync when component state changes
	$effect(() => {
		iconThemeSync.current = iconThemeState;
	});

	// Update component state when sync changes (cross-tab updates)
	$effect(() => {
		const syncValue = iconThemeSync.current;
		if (isValidIconTheme(syncValue) && syncValue !== iconThemeState) {
			iconThemeState = syncValue as IconTheme;
		}
	});

	let { iconTheme, variant = 'dropdown', ...props }: IconThemeProps = $props();

	// Controlled prop takes priority, otherwise use internal state
	const currentIconTheme = $derived(iconTheme ?? iconThemeState);

	function handleIconThemeChange(next: IconTheme) {
		// Only update global state when uncontrolled
		if (!iconTheme) {
			iconThemeState = next;
		}
	}

	function handleIconThemeSelectChange(e: Event) {
		const value = (e.currentTarget as HTMLSelectElement).value;
		if (isValidIconTheme(value)) {
			handleIconThemeChange(value);
		}
	}
</script>

<svelte:head>
	<script>
		// Simple FOUC prevention - apply stored values immediately
		(function () {
			function applyStoredValues() {
				try {
					const parse = (k) => JSON.parse(localStorage.getItem(k) || 'null');
					const icons = parse('sync-attr:html:data-icons');
					const theme = parse('sync-attr:html:data-theme');
					const dark = parse('sync-attr:html:class-dark');

					const de = document.documentElement;

					// Apply to DOM attributes immediately
					if (icons) de.setAttribute('data-icons', icons);
					if (theme) de.setAttribute('data-theme', theme);
					if (dark !== null) {
						de.classList.toggle('dark', dark === '1');
						de.style.colorScheme = dark === '1' ? 'dark' : 'light';
					}

					// Apply to select boxes to prevent FOUC
					if (icons && ['mdi', 'heroicons', 'carbon'].includes(icons)) {
						const selects = document.querySelectorAll('select[title="Icon Theme"]');
						selects.forEach((select) => {
							select.value = icons;
						});
					}
				} catch (e) {
					console.warn('[FOUC prevention] Failed:', e);
				}
			}

			// Apply immediately
			applyStoredValues();

			// Also apply when DOM is ready (for components that render later)
			if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', applyStoredValues);
			}
		})();
	</script>
</svelte:head>

<Component
	{...props}
	class="{props.class} icon-theme-switcher"
>
	{#snippet component({ props, content })}
		<div {...props}>
			{#if variant === 'dropdown'}
				<div class="flex items-center gap-2">
					<select
						value={currentIconTheme}
						onchange={handleIconThemeSelectChange}
						class="rounded border p-1 text-sm"
						title="Icon Theme"
						aria-label="Icon Theme"
					>
						{#each ICON_THEMES as opt}
							<option value={opt}>{opt}</option>
						{/each}
					</select>
				</div>
			{/if}
		</div>
	{/snippet}
</Component>
