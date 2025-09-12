export const logoData = {
	// Basic usage with defaults
	default: {
		href: "/",
		name: "Trident Cubed",
	},

	// Icon only
	iconOnly: {
		href: "/",
		name: "Trident Cubed",
		type: "icon",
	},

	// Logo text only
	logoOnly: {
		href: "/",
		name: "Trident Cubed",
		type: "logo",
	},

	// Custom image source
	customImage: {
		href: "/",
		src: "/logo.svg",
		name: "Custom Logo",
		type: "both",
	},

	// Dark color scheme
	darkScheme: {
		href: "/",
		name: "Trident Cubed",
		color: "dark",
		type: "both",
	},

	// Light color scheme
	lightScheme: {
		href: "/",
		name: "Trident Cubed",
		color: "light",
		type: "both",
	},

	// Using boolean shortcuts
	booleanShortcuts: {
		href: "/",
		name: "Trident Cubed",
		light: true,
		icon: true,
	},

	// Custom styling
	customStyling: {
		href: "/",
		name: "Trident Cubed",
		class: "size-14 hover:opacity-80 transition-opacity",
	},
};
