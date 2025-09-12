<script lang="ts">
	/**
	 * @tags icon, iconify, theme
	 * @type multi
	 * @layout horizontal
	 */

	export interface IconProps {
		name?:
			| 'home'
			| 'user'
			| 'settings'
			| 'menu'
			| 'close'
			| 'search'
			| 'edit'
			| 'delete'
			| 'add'
			| 'check'
			| 'arrow-right'
			| 'arrow-left'
			| 'arrow-up'
			| 'arrow-down'
			| 'chevron-right'
			| 'chevron-left'
			| 'chevron-up'
			| 'chevron-down'
			| string;
		/** Override the global icon theme for this specific icon */
		theme?: 'mdi' | 'heroicons' | 'carbon' | 'solar' | string;
		/** Show all available icons */
		all?: boolean;
		/** Show remote icons (requires icons prop to be provided) */
		remote?: boolean;
		/** Array of icon names to display when all=true or remote=true */
		icons?: string[];
		class?: string;
		role?: string;
		'aria-hidden'?: boolean | 'true' | 'false';
		'aria-label'?: string;
	}

	let {
		name = 'home',
		theme,
		all = false,
		remote = false,
		icons = [],
		class: className = '',
		role = 'img',
		'aria-hidden': ariaHidden = true,
		'aria-label': ariaLabel,
		...props
	}: IconProps = $props();

	// Fallback icons only for 'all' mode, not for 'remote' mode
	const fallbackIcons = [
		'home',
		'user',
		'settings',
		'menu',
		'close',
		'search',
		'edit',
		'delete',
		'add',
		'check',
		'arrow-right',
		'arrow-left',
		'arrow-up',
		'arrow-down',
		'chevron-right',
		'chevron-left',
		'chevron-up',
		'chevron-down'
	];

	// For 'all' mode: use provided icons or fallback
	// For 'remote' mode: only use provided icons (no fallback to prevent FOUC)
	const iconsToDisplay = remote ? icons : icons.length > 0 ? icons : fallbackIcons;
</script>

{#if all}
	<div class="flex flex-wrap items-start gap-4">
		{#each iconsToDisplay as iconName}
			<i
				class="icon icon-{iconName}"
				data-icon-theme={theme}
				role="img"
				aria-hidden="true"
				title={iconName}
			></i>
		{/each}
	</div>
{:else}
	<i
		class="icon icon-{name} {className}"
		data-icon-theme={theme}
		{role}
		aria-hidden={ariaHidden}
		aria-label={ariaLabel}
		{...props}
	></i>
{/if}
