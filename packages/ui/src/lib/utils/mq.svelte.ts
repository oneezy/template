/**
 * Media Query Utilities - Tailwind CSS Breakpoints
 *
 * Provides reactive media query utilities that match Tailwind's breakpoint system:
 * - sm: 640px (40rem)
 * - md: 768px (48rem)
 * - lg: 1024px (64rem)
 * - xl: 1280px (80rem)
 * - portrait/vertical: Device orientation is portrait
 * - landscape/horizontal: Device orientation is landscape
 *
 * Usage:
 * ```svelte
 * <script>
 *   import { mq, useMediaQuery } from '@layerd/ui';
 *
 *   // Custom media query
 *   const isPortrait = useMediaQuery('(orientation: portrait)');
 * </script>
 *
 * {#if mq.sm}
 *   <p>Screen is >= 640px wide</p>
 * {/if}
 *
 * {#if mq.portrait}
 *   <p>Portrait orientation detected</p>
 * {/if}
 *
 * {#if mq.vertical}
 *   <p>Same as portrait - vertical orientation</p>
 * {/if}
 *
 * {#if isPortrait.matches}
 *   <p>Custom media query usage</p>
 * {/if}
 * ```
 */

import { useResizeObserver } from "runed";

/**
 * Creates a reactive media query state using runed's resize observer
 * This should only be called within component context for custom media queries
 */
export function useMediaQuery(query: string) {
	// If we're not in browser, return static false
	if (typeof window === "undefined") {
		return { matches: false };
	}

	let matches = $state(window.matchMedia(query).matches);

	// Use runed's useResizeObserver to watch for viewport changes
	useResizeObserver(
		() => document.documentElement,
		() => {
			matches = window.matchMedia(query).matches;
		},
	);

	return {
		get matches() {
			return matches;
		},
	};
}

/**
 * Simple reactive viewport state using native Svelte reactivity
 * No runed dependencies to avoid effect orphan issues
 */
class ViewportState {
	width = $state(typeof window !== "undefined" ? window.innerWidth : 0);
	height = $state(typeof window !== "undefined" ? window.innerHeight : 0);
	#listener: (() => void) | null = null;

	constructor() {
		// Set up native resize listener in constructor (safe for module level)
		if (typeof window !== "undefined") {
			this.#listener = () => {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			};
			window.addEventListener("resize", this.#listener);
		}
	}

	destroy() {
		if (this.#listener && typeof window !== "undefined") {
			window.removeEventListener("resize", this.#listener);
		}
	}
}

const viewport = new ViewportState();

/**
 * Tailwind CSS Breakpoints (in pixels for easier calculations)
 */
export const BREAKPOINTS = {
	sm: 640, // 40rem
	md: 768, // 48rem
	lg: 1024, // 64rem
	xl: 1280, // 80rem
} as const;

/**
 * Pre-configured media query utilities for Tailwind breakpoints
 * These can be used in templates: {#if mq.sm}
 * Uses native resize listener for reactivity
 */
export const mq = {
	get sm() {
		return viewport.width >= BREAKPOINTS.sm;
	},
	get md() {
		return viewport.width >= BREAKPOINTS.md;
	},
	get lg() {
		return viewport.width >= BREAKPOINTS.lg;
	},
	get xl() {
		return viewport.width >= BREAKPOINTS.xl;
	},
	get portrait() {
		return viewport.height > viewport.width;
	},
	get vertical() {
		return viewport.height > viewport.width; // Alias for portrait
	},
	get landscape() {
		return viewport.width > viewport.height;
	},
	get horizontal() {
		return viewport.width > viewport.height; // Alias for landscape
	},
};

// Individual exports for backwards compatibility
export const sm = {
	get matches() {
		return viewport.width >= BREAKPOINTS.sm;
	},
};
export const md = {
	get matches() {
		return viewport.width >= BREAKPOINTS.md;
	},
};
export const lg = {
	get matches() {
		return viewport.width >= BREAKPOINTS.lg;
	},
};
export const xl = {
	get matches() {
		return viewport.width >= BREAKPOINTS.xl;
	},
};

/**
 * Utility to check if screen is smaller than a breakpoint
 */
export const useMaxWidth = (breakpoint: keyof typeof BREAKPOINTS) => {
	return useMediaQuery(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`);
};

/**
 * Utility to check if screen is between two breakpoints
 */
export const useBetween = (
	min: keyof typeof BREAKPOINTS,
	max: keyof typeof BREAKPOINTS,
) => {
	const minWidth = BREAKPOINTS[min];
	const maxWidth = BREAKPOINTS[max] - 1;
	const combinedQuery =
		`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
	return useMediaQuery(combinedQuery);
};
