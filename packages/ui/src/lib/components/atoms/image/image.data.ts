/**
 * Sample data for Image component with mask examples
 */

export const sampleImages = {
	basic: {
		src: "https://picsum.photos/id/420/1920/1080",
		alt: "Basic Image",
	},

	background: {
		src: "https://picsum.photos/id/1025/1920/1080",
		alt: "Background Image - fills positioned parent",
		bg: true,
	},

	defaultMask: {
		src: "https://picsum.photos/id/237/1920/1080",
		alt: "Default Masked Image",
		mask: true,
	},

	customMask: {
		src: "https://picsum.photos/id/237/1920/1080",
		alt: "Custom Masked Image",
		mask: "/masks/rounded.svg",
	},

	starMask: {
		src: "https://picsum.photos/id/1080/1920/1080",
		alt: "Star Masked Image",
		mask: "/masks/star.svg",
		ratio: "16/9",
	},

	backgroundWithMask: {
		src: "https://picsum.photos/id/500/1920/1080",
		alt: "Background with Mask - fills positioned parent",
		bg: true,
		mask: "/masks/star.svg",
	},

	backgroundWithOverlay: {
		src: "https://picsum.photos/id/1025/1920/1080",
		alt: "Background with Overlay - perfect for hero sections",
		bg: true,
		overlay: true,
	},

	maskedWithOverlay: {
		src: "https://picsum.photos/id/237/1920/1080",
		alt: "Masked image with overlay",
		mask: true,
		overlay: true,
	},
};

export const availableMasks = [
	"/masks/rounded.svg",
	"/masks/star.svg",
] as const;
