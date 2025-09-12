/**
 * Theme utilities for managing color themes across the application
 */

// Default themes that are always available
export const DEFAULT_THEMES = ["default"] as const;

// Extended theme options (can be customized)
export const EXTENDED_THEMES = [
	"dracula",
	"retro",
	"corporate",
	"cyberpunk",
] as const;

// All available themes
export const ALL_THEMES = [...DEFAULT_THEMES, ...EXTENDED_THEMES] as const;

export type ThemeName = typeof ALL_THEMES[number];

/**
 * Parse themes from various input formats
 * @param themes - Can be string (comma-separated), array, or undefined
 * @returns Array of theme names, always including 'default'
 */
export function parseThemes(themes?: string | string[]): string[] {
	let themeList: string[] = [];

	if (typeof themes === "string") {
		// Parse comma-separated string
		themeList = themes
			.split(",")
			.map((theme) => theme.trim())
			.filter(Boolean);
	} else if (Array.isArray(themes)) {
		themeList = themes;
	}

	// Always ensure 'default' is included and is first
	const uniqueThemes = new Set(["default", ...themeList]);
	return Array.from(uniqueThemes);
}

/**
 * Get theme items formatted for Storybook toolbar
 */
export function getStorybookThemeItems(themes?: string | string[]) {
	const themeList = parseThemes(themes);

	return themeList.map((theme) => ({
		value: theme,
		icon: "paintbrush",
		title: theme.charAt(0).toUpperCase() + theme.slice(1),
	}));
}

/**
 * Apply a theme to the document
 * @param themeName - Name of the theme to apply
 */
export function applyTheme(themeName: string) {
	if (typeof window !== "undefined" && window.document) {
		const html = window.document.documentElement;
		html.setAttribute("data-theme", themeName);
	}
}

/**
 * Get current theme from document
 */
export function getCurrentTheme(): string {
	if (typeof window !== "undefined" && window.document) {
		return window.document.documentElement.getAttribute("data-theme") ||
			"default";
	}
	return "default";
}

/**
 * Theme configuration for components
 */
export interface ThemeConfig {
	themes: string[];
	defaultTheme: string;
	currentTheme: string;
}

/**
 * Create a theme configuration object
 */
export function createThemeConfig(
	themes?: string | string[],
	defaultTheme: string = "default",
): ThemeConfig {
	const themeList = parseThemes(themes);

	return {
		themes: themeList,
		defaultTheme,
		currentTheme: getCurrentTheme(),
	};
}

/**
 * Validate if a theme name is valid
 */
export function isValidTheme(
	themeName: string,
	availableThemes: string[],
): boolean {
	return availableThemes.includes(themeName);
}

/**
 * Get the next theme in the list (useful for cycling)
 */
export function getNextTheme(
	currentTheme: string,
	availableThemes: string[],
): string {
	const currentIndex = availableThemes.indexOf(currentTheme);
	const nextIndex = (currentIndex + 1) % availableThemes.length;
	return availableThemes[nextIndex];
}

/**
 * Theme state management for Svelte components
 */
export class ThemeManager {
	private themes: string[];
	private currentTheme = $state("default");

	constructor(themes?: string | string[], defaultTheme: string = "default") {
		this.themes = parseThemes(themes);
		this.currentTheme = defaultTheme;
	}

	get current() {
		return this.currentTheme;
	}

	get available() {
		return this.themes;
	}

	setTheme(themeName: string) {
		if (this.isValid(themeName)) {
			this.currentTheme = themeName;
			applyTheme(themeName);
		}
	}

	isValid(themeName: string): boolean {
		return isValidTheme(themeName, this.themes);
	}

	next() {
		const nextTheme = getNextTheme(this.currentTheme, this.themes);
		this.setTheme(nextTheme);
	}
}
