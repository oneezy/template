import devtoolsJson from "vite-plugin-devtools-json";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
	],
	server: {
		fs: {
			// Allow serving files from the monorepo root
			allow: [".."],
		},
		watch: {
			// Better symlink handling
			followSymlinks: true,
			// Ignore common problematic patterns
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
	},
	resolve: {
		// Preserve symlinks for better HMR
		preserveSymlinks: false,
	},
});
