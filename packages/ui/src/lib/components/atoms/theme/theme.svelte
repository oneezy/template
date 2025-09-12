<script lang="ts">
	/**
	 * @tags theme, settings, dark mode, theme selector
	 */
	import { Component, type ComponentProps } from '@layerd/ui';
	import { Button, parseThemes, applyTheme as applyColorTheme } from '@layerd/ui';
	import { untrack } from 'svelte';
	import {
		ModeWatcher,
		mode,
		userPrefersMode,
		theme,
		setMode,
		setTheme,
		toggleMode,
		resetMode
	} from 'mode-watcher';

	type ThemeName = 'default' | 'dracula' | 'retro' | 'corporate' | 'cyberpunk';

	interface ThemeProps extends ComponentProps {
		showModeToggle?: boolean;
		showThemeSelector?: boolean;
		themes?: ThemeName; // For Storybook controls (overrides internal state)
		variant?: 'buttons' | 'dropdown' | 'compact' | 'full';
		// ModeWatcher configuration
		defaultMode?: 'system' | 'light' | 'dark';
		defaultTheme?: string;
		track?: boolean;
	}

	let {
		showModeToggle = true,
		showThemeSelector = true,
		themes, // Optional - when provided, overrides internal state (Storybook mode)
		variant = 'compact', // Default to compact variant
		// ModeWatcher defaults
		defaultMode = 'system',
		defaultTheme,
		track = true,
		invert, // Extract invert prop explicitly
		...props
	}: ThemeProps = $props();

	// For the theme selector, we'll show all available themes
	const availableThemes: ThemeName[] = ['default', 'dracula', 'retro', 'corporate', 'cyberpunk'];

	// Internal theme state (for normal component usage)
	let internalTheme = $state<ThemeName>('default');

	// Get current mode and theme values
	const currentMode = $derived(mode.current);
	const currentUserPreference = $derived(userPrefersMode.current);

	// Use external theme (Storybook) or internal theme (normal usage)
	const currentTheme = $derived(themes || internalTheme);

	// Track the last applied theme to prevent infinite loops
	let lastAppliedTheme: ThemeName = $state('default');

	// Apply theme when it changes (either from props or internal state)
	$effect(() => {
		// Only apply if the theme actually changed
		if (currentTheme && currentTheme !== lastAppliedTheme) {
			lastAppliedTheme = currentTheme;

			// Use untrack to prevent reactive loops
			untrack(() => {
				// Set theme in mode-watcher (for consistency with existing API)
				setTheme(currentTheme);
				// Also apply color theme directly to document
				applyColorTheme(currentTheme);
			});
		}
	});

	function handleModeChange(newMode: 'light' | 'dark' | 'system') {
		setMode(newMode);
	}

	function isValidTheme(value: string): value is ThemeName {
		return availableThemes.includes(value as ThemeName);
	}

	function handleThemeChange(newTheme: ThemeName) {
		// If not controlled by props (normal usage), update internal state
		if (!themes) {
			internalTheme = newTheme;
		}
		// Note: When controlled by props (Storybook), the effect will handle the application
		// When not controlled, the effect will react to internalTheme change
	}

	function handleThemeSelectChange(e: Event) {
		const target = e.currentTarget as HTMLSelectElement;
		const value = target.value;
		if (isValidTheme(value)) {
			handleThemeChange(value);
		}
	}
</script>

<!-- ModeWatcher setup - handles the actual mode/theme management -->
<ModeWatcher
	{defaultMode}
	{defaultTheme}
	{track}
	darkClassNames={['dark']}
	lightClassNames={[]}
/>

<Component
	{...props}
	class="{props.class} theme-switcher"
>
	{#snippet component({ props, content })}
		<div {...props}>
			{#if variant === 'compact'}
				<!-- Compact variant: just toggle buttons -->
				<div class="flex items-center gap-2">
					{#if showModeToggle}
						<Button
							ghost
							{invert}
							onclick={toggleMode}
							title="Toggle theme"
							icon="light-mode"
							iconToggle="dark-mode"
							toggled={currentMode === 'dark'}
						/>
					{/if}
					<!-- 
					{#if showThemeSelector && availableThemes.length > 0}
						<select
							value={currentTheme || availableThemes[0]}
							onchange={handleThemeSelectChange}
							class="border p-1 text-sm"
						>
							{#each availableThemes as themeOption}
								<option value={themeOption}>{themeOption}</option>
							{/each}
						</select>
					{/if} -->
				</div>
			{:else if variant === 'dropdown'}
				<!-- Dropdown variant: select elements -->
				<div class="flex flex-col gap-2">
					{#if showModeToggle}
						<div class="flex items-center gap-2">
							<label
								for="mode-select"
								class="text-sm font-medium">Mode:</label
							>
							<select
								id="mode-select"
								value={currentUserPreference}
								onchange={(e) =>
									handleModeChange(e.currentTarget.value as 'light' | 'dark' | 'system')}
								class="bg-background rounded border p-2"
							>
								<option value="system">System</option>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
							</select>
						</div>
					{/if}

					{#if showThemeSelector && availableThemes.length > 0}
						<div class="flex items-center gap-2">
							<label
								for="theme-select"
								class="text-sm font-medium">Theme:</label
							>
							<select
								id="theme-select"
								value={currentTheme || availableThemes[0]}
								onchange={handleThemeSelectChange}
								class="bg-background rounded border p-2"
							>
								{#each availableThemes as themeOption}
									<option value={themeOption}>{themeOption}</option>
								{/each}
							</select>
						</div>
					{/if}
				</div>
			{:else if variant === 'buttons'}
				<!-- Button variant: all options as buttons -->
				<div class="flex flex-col gap-4">
					{#if showModeToggle}
						<div class="flex flex-col gap-2">
							<span class="text-sm font-medium">Mode:</span>
							<div class="flex gap-2">
								<button
									onclick={() => handleModeChange('system')}
									class="rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'system'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									System
								</button>
								<button
									onclick={() => handleModeChange('light')}
									class="rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'light'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									Light
								</button>
								<button
									onclick={() => handleModeChange('dark')}
									class="rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'dark'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									Dark
								</button>
							</div>
						</div>
					{/if}

					{#if showThemeSelector && availableThemes.length > 0}
						<div class="flex flex-col gap-2">
							<span class="text-sm font-medium">Theme:</span>
							<div class="flex flex-wrap gap-2">
								{#each availableThemes as themeOption}
									<button
										onclick={() => handleThemeChange(themeOption)}
										class="rounded border px-3 py-2 capitalize transition-colors {currentTheme ===
										themeOption
											? 'bg-primary text-primary-foreground'
											: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
									>
										{themeOption}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<!-- Full variant: comprehensive display -->
				<div class="flex flex-col gap-4 rounded-lg border p-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Theme Settings</h3>
						<button
							onclick={toggleMode}
							class="rounded border p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
							title="Quick toggle"
						>
							{#if currentMode === 'dark'}
								🌙
							{:else}
								☀️
							{/if}
						</button>
					</div>

					{#if showModeToggle}
						<div class="flex flex-col gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Color Mode:</span>
								<span class="text-muted-foreground text-xs">Currently: {currentMode}</span>
							</div>
							<div class="flex gap-2">
								<button
									onclick={() => handleModeChange('system')}
									class="flex-1 rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'system'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									🖥️ System
								</button>
								<button
									onclick={() => handleModeChange('light')}
									class="flex-1 rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'light'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									☀️ Light
								</button>
								<button
									onclick={() => handleModeChange('dark')}
									class="flex-1 rounded border px-3 py-2 transition-colors {currentUserPreference ===
									'dark'
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
								>
									🌙 Dark
								</button>
							</div>
						</div>
					{/if}

					{#if showThemeSelector && availableThemes.length > 0}
						<div class="flex flex-col gap-2">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Theme:</span>
								<span class="text-muted-foreground text-xs"
									>Currently: {currentTheme || availableThemes[0]}</span
								>
							</div>
							<div class="grid grid-cols-2 gap-2">
								{#each availableThemes as themeOption}
									<button
										onclick={() => handleThemeChange(themeOption)}
										class="rounded border px-3 py-2 capitalize transition-colors {currentTheme ===
										themeOption
											? 'bg-primary text-primary-foreground'
											: 'hover:bg-gray-100 dark:hover:bg-gray-800'}"
									>
										{themeOption}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Debug info -->
					<details class="text-muted-foreground text-xs">
						<summary class="hover:text-foreground cursor-pointer">Debug Info</summary>
						<div class="bg-muted mt-2 rounded p-2 font-mono text-xs">
							<div>Mode: {currentMode}</div>
							<div>User Preference: {currentUserPreference}</div>
							<div>Theme: {currentTheme}</div>
						</div>
					</details>
				</div>
			{/if}
		</div>
	{/snippet}
</Component>
