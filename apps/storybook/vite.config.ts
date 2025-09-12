import config from "@layerd/config-vite";
import { mergeConfig } from "vite";

export default mergeConfig(config, {
	optimizeDeps: {
		include: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"@mdx-js/react",
		],
		exclude: [
			"@storybook/svelte",
			"@storybook/sveltekit",
			"@storybook/addon-svelte-csf",
			"@chromatic-com/storybook",
			"@storybook/addon-docs",
			"@storybook/addon-themes",
		],
	},
	server: {
		fs: {
			allow: ["../.."],
		},
	},
});
