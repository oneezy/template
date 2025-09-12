<script>
	import { Link } from '$lib';
	let {
		icon = null,
		// type
		button = 'button',
		href = null,
		// states
		disabled = false,
		neutral = false,
		// styles
		primary = false,
		secondary = false,
		accent = false,
		tonal = false,
		outline = false,
		ghost = false,
		glass = false,
		link = false,
		invert = false,
		// position
		left = false,
		right = false,
		// sizes
		xs = false,
		sm = false,
		md = false,
		lg = false,
		xl = false,
		// other
		children,
		...props
	} = $props();

	let baseClass = 'btn overflow-hidden';
	let classNames = [baseClass];

	const getClassNames = () => {
		const styles = [
			// outline
			{ condition: primary && outline, className: 'preset-outline-primary' },
			{
				condition: secondary && outline,
				className: 'preset-outline-secondary'
			},
			{ condition: accent && outline, className: 'preset-outline-accent' },
			{ condition: neutral && outline, className: 'preset-outline-neutral' },
			{ condition: outline, className: 'preset-outline' },
			// tonal
			{ condition: primary && tonal, className: 'preset-tonal-primary' },
			{ condition: secondary && tonal, className: 'preset-tonal-secondary' },
			{ condition: tonal, className: 'preset-tonal' },
			// ghost
			{ condition: primary && ghost, className: 'preset-ghost-primary' },
			{ condition: secondary && ghost, className: 'preset-ghost-secondary' },
			{ condition: ghost, className: 'preset-ghost' },
			// glass
			{ condition: glass && invert, className: 'preset-glass-invert' },
			{ condition: glass, className: 'preset-glass' },
			// filled
			{ condition: primary, className: 'preset-filled-primary' },
			{ condition: secondary, className: 'preset-filled-secondary' },
			{ condition: accent, className: 'preset-filled-accent' },
			{ condition: neutral, className: 'preset-filled-neutral' },
			// default
			{ condition: true, className: '' } // Default case
		];

		const matchedStyle = styles.find((style) => style.condition);
		return matchedStyle ? matchedStyle.className : '';
	};

	classNames.push(getClassNames());

	// states
	if (disabled) {
		classNames.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
	}

	// icon
	if (icon) {
		classNames.push('btn-icon');
	}

	// sizes
	if (xs) {
		classNames.push('btn-xs');
	} else if (sm) {
		classNames.push('btn-sm');
	} else if (md) {
		classNames.push('btn-md');
	} else if (lg) {
		classNames.push('btn-lg');
	} else if (xl) {
		classNames.push('btn-xl');
	}

	const finalClass = `${classNames.join(' ')} text-wrap`;
</script>

{#if href}
	<Link {...props} {href} class="{finalClass} {props.class}" aria-disabled={disabled}>
		{#if icon}
			{@render children()}
		{:else}
			<span class="btn-container">
				{@render children()}
			</span>
		{/if}
	</Link>
{:else}
	<button {...props} class="{finalClass} {props.class}" {disabled}>
		{#if icon}
			{@render children()}
		{:else}
			<span class="btn-container">
				{@render children()}
			</span>
		{/if}
	</button>
{/if}

<style>
	.btn {
		transition-duration: 200ms;
		transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
		transition-property: color, background-color, border-color, opacity, box-shadow, transform;
	}
	@media (prefers-reduced-motion: no-preference) {
		.btn {
			animation: button-pop var(--animation-btn, 0.25s) ease-out;
		}
	}
	.btn:active:hover,
	.btn:active:focus {
		animation: button-pop 0s ease-out;
		transform: scale(var(--btn-focus-scale, 0.97));
	}
	.btn:focus-visible {
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}
</style>
