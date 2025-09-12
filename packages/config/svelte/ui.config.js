import { resolve } from "path";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			// For UI package, $lib points to its own lib directory
			$lib: "./src/lib",

			// Other workspace packages (from UI package perspective)
			"@layerd/tools": resolve("../tools/src"),
			"@layerd/config": resolve("../config"),

			// Root
			$root: resolve("../../"),

			// Apps (from packages perspective)
			$site: resolve("../apps/site/src"),
			$storybook: resolve("../apps/storybook/src"),
		},
	},
	vitePlugin: {
		inspector: true,
	},
};

export default config;
