import { prerender } from "$app/server";

interface IconData {
	icon: string;
	category: string;
}

export const getIcons = prerender(async () => {
	console.log("🔥 Fetching icons during prerender...");

	const response = await fetch(
		"https://sheetari.deno.dev/1F6j_yQLz6ozaa9HzeOp_6leCZCaIIZNCK1LbZCdxnBE/+icons",
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch icons: ${response.status}`);
	}

	const data: IconData[] = await response.json();

	// Return the full objects with icon and category properties
	const validIcons = data.filter((entry) =>
		entry.icon && typeof entry.icon === "string" &&
		entry.category && typeof entry.category === "string"
	);

	console.log("✅ Icons prerendered:", validIcons.length, "icons");
	return validIcons;
}, {
	// This is crucial for no-argument prerender functions
	inputs: () => [undefined],
});
