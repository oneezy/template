export const sampleLinks = [
	{
		href: "/",
		text: "Home",
		description: "Basic home link",
	},
	{
		href: "/about",
		text: "About Us",
		description: "Internal navigation link",
	},
	{
		href: "https://example.com",
		text: "External Link",
		external: true,
		description: "External link with auto target and rel",
	},
	{
		href: "/contact",
		text: "Contact",
		target: "_self",
		description: "Link with explicit target",
	},
];

export const linkVariants = [
	"underline",
	"hover:underline",
	"text-blue-500",
	"text-primary-500 hover:text-primary-600",
	"font-semibold",
];
