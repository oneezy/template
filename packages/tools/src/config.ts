export interface ToolsConfig {
	packages: {
		ui: {
			srcPath: string;
			libPath: string;
			barrelFile: string;
			componentsPath: string;
			staticPath: string;
		};
		storybook: {
			storiesPath: string;
			staticPath: string;
		};
		site: {
			staticPath: string;
		};
	};
	symlinks: {
		source: string;
		targets: string[];
	};
	logging: {
		level: "debug" | "info" | "warn" | "error";
	};
}

export const TOOLS_CONFIG: ToolsConfig = {
	packages: {
		ui: {
			srcPath: "packages/ui/src",
			libPath: "packages/ui/src/lib",
			barrelFile: "packages/ui/src/lib/index.ts",
			componentsPath: "packages/ui/src/lib/components",
			staticPath: "packages/ui/static",
		},
		storybook: {
			storiesPath: "apps/storybook/src/stories",
			staticPath: "apps/storybook/static",
		},
		site: {
			staticPath: "apps/site/static",
		},
	},
	symlinks: {
		source: "packages/ui/static",
		targets: [
			"apps/site/static",
			"apps/storybook/static",
		],
	},
	logging: {
		level: "info",
	},
};
