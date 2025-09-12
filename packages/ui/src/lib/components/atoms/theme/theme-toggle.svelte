<script lang="ts">
	/**
	 * @tags theme, toggle, dark mode
	 */
	import { Component, type ComponentProps } from '@layerd/ui';
	import { ModeWatcher, mode, toggleMode, setTheme } from 'mode-watcher';

	interface ThemeToggleProps extends ComponentProps {
		// Quick presets
		preset?: 'simple' | 'icon-only' | 'theme-only' | 'full';
		// Or manual control
		showIcon?: boolean;
		showText?: boolean;
		theme?: string;
		// ModeWatcher config
		defaultMode?: 'system' | 'light' | 'dark';
		defaultTheme?: string;
	}

	let {
		preset = 'simple',
		showIcon = true,
		showText = false,
		theme,
		defaultMode = 'system',
		defaultTheme,
		...props
	}: ThemeToggleProps = $props();

	const currentMode = $derived(mode.current);

	// Apply preset configurations
	$effect(() => {
		if (preset === 'simple') {
			showIcon = true;
			showText = false;
		} else if (preset === 'icon-only') {
			showIcon = true;
			showText = false;
		} else if (preset === 'theme-only') {
			showIcon = false;
			showText = true;
		} else if (preset === 'full') {
			showIcon = true;
			showText = true;
		}
	});

	$effect(() => {
		if (theme) {
			setTheme(theme);
		}
	});
</script>

<!-- ModeWatcher setup -->
<ModeWatcher {defaultMode} {defaultTheme} darkClassNames={['dark']} lightClassNames={[]} />

<Component
	{...props}
	base
	class="{props.class} inline-flex items-center gap-2 rounded border px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
>
	{#snippet component({ props, content })}
		<button {...props} onclick={toggleMode} title="Toggle theme">
			{#if showIcon}
				{#if currentMode === 'dark'}
					🌙
				{:else}
					☀️
				{/if}
			{/if}

			{#if showText}
				<span class="capitalize">{currentMode} mode</span>
			{/if}

			{@render content('Toggle Theme')}
		</button>
	{/snippet}
</Component>
