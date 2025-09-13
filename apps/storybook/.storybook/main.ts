import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte|svelte.js|svelte.ts)",
  ],
  staticDirs: ["../../../packages/ui/static"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
};
export default config;
