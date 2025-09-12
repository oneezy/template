import type { Preview } from "@storybook/sveltekit";
import DualTheme from "$lib/DualTheme.svelte";
import { applyTheme, getStorybookThemeItems } from "@layerd/ui";
import "../src/app.css";

// Store cleanup functions outside of window to avoid TypeScript issues
let themeCleanup: (() => void)[] = [];

// Helper function to disable argTypes in Storybook
const disableArgTypes = (props: string[]) => {
  return props.reduce((acc, prop) => {
    acc[prop] = { table: { disable: true } };
    return acc;
  }, {} as Record<string, any>);
};

// Default themes for Storybook (can be customized per story)
const defaultThemes = "default,dracula,retro,corporate,cyberpunk";

const preview: Preview = {
  tags: ["autodocs"],
  // argTypes: {
  //   // Events
  //   onclick: {
  //     table: { category: "Events" },
  //     action: "click",
  //     description: "Click handler",
  //   },
  //   // Styles
  //   unstyled: {
  //     control: "boolean",
  //     table: { category: "Styles" },
  //     description: "Remove all default styling",
  //   },
  //   styled: {
  //     control: "inline-radio",
  //     options: [
  //       "base",
  //       "primary",
  //       "secondary",
  //       "accent",
  //       "neutral",
  //     ],
  //     table: { category: "Styles" },
  //     description: "Styles",
  //   },
  //   variant: {
  //     control: "inline-radio",
  //     options: [
  //       "heavy",
  //       "lite",
  //       "outline",
  //       "ghost",
  //       "glass",
  //     ],
  //     table: { category: "Styles" },
  //     description: "Styles",
  //   },
  //   invert: {
  //     control: "boolean",
  //     table: { category: "Styles" },
  //     description: "Invert style - reversed color scheme",
  //   },
  //   // Controls
  //   total: {
  //     control: "number",
  //     table: { category: "Controls" },
  //     description: "Total number of items",
  //   },
  //   // Layout
  //   size: {
  //     control: "inline-radio",
  //     options: ["xs", "sm", "md", "lg", "xl"],
  //     table: { category: "Layout" },
  //     description: "Component size",
  //   },
  //   position: {
  //     control: "inline-radio",
  //     options: ["left", "center", "right"],
  //     table: { category: "Layout" },
  //     description: "Content alignment position",
  //   },
  //   // States
  //   disabled: {
  //     control: "boolean",
  //     table: { category: "States" },
  //     description: "Disable component interaction",
  //   },

  //   /* Disabled props
  //   ::::::::::::::::::::::::::::::::: */
  //   ...disableArgTypes([
  //     // styled
  //     "base",
  //     "primary",
  //     "secondary",
  //     "neutral",
  //     "accent",
  //     // variants
  //     "filled",
  //     "outline",
  //     "tonal",
  //     "ghost",
  //     "glass",
  //     // sizes
  //     "xs",
  //     "sm",
  //     "md",
  //     "lg",
  //     "xl",
  //     // positions
  //     "left",
  //     "center",
  //     "right",
  //   ]),
  // },
  parameters: {
    docs: {
      controls: {
        sort: "alpha",
      },
    },
    controls: {
      sort: "alpha",
      expanded: false,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
    // Disable the backgrounds addon toolbar button since we use our own theme system
    backgrounds: {
      disable: true,
    },
    // Also disable other conflicting toolbar items
    toolbar: {
      "storybook/background": { hidden: true },
    },
  },

  decorators: [
    // Dual theme decorator using proper Svelte component
    (Story, context) => {
      const { dualTheme } = context.globals;

      // If dual theme is enabled, use the DualTheme component
      if (dualTheme === true) {
        // Merge story-level parameter globals with context globals
        const mergedGlobals = {
          ...context.globals,
          ...(context.parameters?.globals || {}),
        };

        return {
          Component: DualTheme,
          props: {
            children: Story,
            globals: mergedGlobals, // Pass merged globals to the component
          },
        };
      }

      // Otherwise, just return the story normally
      return Story();
    },

    // Color theme decorator (only for non-dual theme mode)
    (Story, context) => {
      const { dualTheme, themes } = context.globals;
      const colorTheme = themes || "default";

      // Only apply color theme if not in dual theme mode (DualTheme handles it)
      if (
        dualTheme !== true && typeof window !== "undefined" && window.document
      ) {
        console.log("Preview applying color theme (non-dual):", colorTheme);
        // Apply the color theme using our utility
        applyTheme(colorTheme);
      }

      return Story();
    },

    // Theme decorator with system preference support
    (Story, context) => {
      const theme = context.globals.theme || "system";

      if (typeof window !== "undefined" && window.document) {
        const html = window.document.documentElement;

        // Function to apply theme to match your CSS selectors exactly
        const applyTheme = (isDark: boolean) => {
          const body = window.document.body;

          if (isDark) {
            html.classList.add("dark");
            // Use setAttribute to match your CSS selector exactly: html[style='color-scheme: dark;']
            html.setAttribute("style", "color-scheme: dark;");
            html.setAttribute("data-theme", "default");
            // Also apply to body for iframe compatibility
            if (body) {
              body.classList.add("dark");
            }
          } else {
            html.classList.remove("dark");
            // Use setAttribute to match your CSS selector exactly: html[style='color-scheme: light;']
            html.setAttribute("style", "color-scheme: light;");
            html.setAttribute("data-theme", "default");
            // Also apply to body for iframe compatibility
            if (body) {
              body.classList.remove("dark");
            }
          }
        };

        // Clean up any existing listeners first
        themeCleanup.forEach((cleanup) => cleanup());
        themeCleanup = [];

        if (theme === "system") {
          // Get the media query
          const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

          // Apply initial theme based on current system preference
          applyTheme(mediaQuery.matches);

          // Create listener for system changes
          const handleChange = (e: MediaQueryListEvent) => {
            console.log(
              `[Storybook Theme] System preference changed to: ${
                e.matches ? "dark" : "light"
              }`,
            );
            applyTheme(e.matches);
          };

          // Add listener for real-time updates
          mediaQuery.addEventListener("change", handleChange);

          // Store cleanup function
          themeCleanup.push(() => {
            mediaQuery.removeEventListener("change", handleChange);
          });
        } else if (theme === "dark") {
          applyTheme(true);
        } else {
          // light mode
          applyTheme(false);
        }
      }

      return Story();
    },
  ],

  // Toggle switches: Theme mode + Dual theme mode
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Toggle between system, light and dark mode",
      defaultValue: "system",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "system", icon: "browser", title: "System" },
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    themes: {
      name: "Color Theme",
      description: "Toggle between color themes",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: getStorybookThemeItems(defaultThemes),
        showName: false,
        dynamicTitle: true,
      },
    },
    dualTheme: {
      name: "Dual Theme",
      description: "Show component in both light and dark modes side-by-side",
      defaultValue: true,
      toolbar: {
        icon: "contrast",
        items: [
          { value: false, icon: "contrast", title: "Single" },
          { value: true, icon: "contrast", title: "Double" },
        ],
        showName: false,
        dynamicTitle: false,
      },
    },

    dualLayout: {
      name: "Layout",
      description: "Layout direction for dual theme mode",
      defaultValue: "vertical",
      toolbar: {
        items: [
          { value: "vertical", icon: "arrowdown", title: "Vertical" },
          { value: "horizontal", icon: "arrowright", title: "Horizontal" },
        ],
        showName: false,
        dynamicTitle: false,
      },
    },
    dualBackground: {
      name: "Background",
      description: "Background overlay for dual theme mode",
      defaultValue: "none",
      toolbar: {
        icon: "",
        items: [
          { value: "none", icon: "eye", title: "None" },
          { value: "grid", icon: "grid", title: "Grid" },
          { value: "checker", icon: "component", title: "Checker" },
        ],
        showName: false,
        dynamicTitle: false,
      },
    },
  },
};

export default preview;
