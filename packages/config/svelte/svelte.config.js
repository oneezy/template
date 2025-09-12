import { resolve } from "path";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// Detect if running in Storybook context
const isStorybook = !!process.env.STORYBOOK ||
	process.argv.some((a) => a.includes("storybook")) ||
	process.env.npm_lifecycle_script?.includes("storybook");

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			// Workspace packages - point to source for hot reloading in apps
			"@layerd/ui": resolve("../../packages/ui/src/lib"),
			"@layerd/tools": resolve("../../packages/tools/src"),
			"@layerd/config": resolve("../../packages/config"),

			// Root
			$root: resolve("../../../"),

			// Apps (plop added)
			$site: resolve("../../apps/site/src"),
			$storybook: resolve("../../apps/storybook/src"),

			// Default $lib for each app/package
			$lib: "./src/lib",
		},
		experimental: {
			remoteFunctions: true,
		},
	},
	compilerOptions: {
		experimental: {
			async: isStorybook ? false : true,
		},
	},
	vitePlugin: {
		inspector: true,
	},
};

export default config;
