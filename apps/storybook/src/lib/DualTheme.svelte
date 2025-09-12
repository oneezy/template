<script>
  import { applyTheme } from "@layerd/ui";

  let { children, globals = {} } = $props();

  // Check background type using $derived rune
  const background = $derived(globals.dualBackground || "none");
  const layout = $derived(globals.dualLayout);
  const colorTheme = $derived(globals.themes || "default");
  const showGrid = $derived(background === "grid");
  const showCheckers = $derived(background === "checker");
  const isSideBySide = $derived(layout === "horizontal");

  // Apply color theme when it changes
  $effect(() => {
    if (typeof window !== "undefined" && window.document) {
      console.log("DualTheme applying color theme:", colorTheme);
      console.log("DualTheme layout:", layout, "isSideBySide:", isSideBySide);
      console.log("DualTheme globals:", globals);
      applyTheme(colorTheme);
    }
  });

  // Observer for scale attribute changes
  $effect(() => {
    if (typeof window !== "undefined" && window.document) {
      // Function to update scale-based widths
      const updateScaleWidths = () => {
        const scaleElements = document.querySelectorAll(".docs-story [scale]");

        scaleElements.forEach((element) => {
          const scaleValue = element.getAttribute("scale");
          if (scaleValue) {
            const scaleNumber = parseFloat(scaleValue);
            if (!isNaN(scaleNumber)) {
              element.style.width = `calc(100% * ${scaleNumber})`;
            }
          }
        });
      };

      // Initial update
      updateScaleWidths();

      // Create a MutationObserver to watch for changes
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
          // Check if scale attribute was modified
          if (mutation.type === "attributes" && mutation.attributeName === "scale") {
            shouldUpdate = true;
          }
          // Check if new elements with scale attribute were added
          else if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (element.hasAttribute("scale") || element.querySelector("[scale]")) {
                  shouldUpdate = true;
                }
              }
            });
          }
        });

        if (shouldUpdate) {
          updateScaleWidths();
        }
      });

      // Start observing the document for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["scale"],
      });

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }
  });
</script>

<div class="dual-theme-wrapper overflow-hidden {isSideBySide ? 'grid grid-cols-2' : 'grid'} gap-5 {showGrid ? 'bg-grid' : ''} {showCheckers ? 'bg-checkers' : ''}">
  <section class="light p-5 flex items-center justify-center">
    {@render children()}
  </section>

  <section class="dark p-5 flex items-center justify-center">
    {@render children()}
  </section>
</div>

<style>
  :global(.docs-story *) {
    scrollbar-width: none;
  }
  :global(.docs-story *::-webkit-scrollbar) {
    display: none;
  }
  .dual-theme-wrapper {
    --gridLight: rgba(0, 0, 0, 0.25);
    --gridLighter: rgba(0, 0, 0, 0.15);
    --gridDark: rgba(255, 255, 255, 0.35);
    --gridDarker: rgba(255, 255, 255, 0.25);

    --checkerLight: rgba(0, 0, 0, 0.15);
    --checkerDark: rgba(255, 255, 255, 0.2);
  }

  .dual-theme-wrapper > section {
    min-height: 140px;
    position: relative;
  }

  /* Show grid when bg-grid class is present */
  .dual-theme-wrapper.bg-grid > section {
    background-size:
      100px 100px,
      100px 100px,
      20px 20px,
      20px 20px !important;
    background-position:
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px !important;
  }

  .dual-theme-wrapper.bg-grid .light {
    background-image: linear-gradient(var(--gridLight) 1px, transparent 1px), linear-gradient(90deg, var(--gridLight) 1px, transparent 1px), linear-gradient(var(--gridLighter) 1px, transparent 1px), linear-gradient(90deg, var(--gridLighter) 1px, transparent 1px) !important;
  }

  .dual-theme-wrapper.bg-grid .dark {
    background-image: linear-gradient(var(--gridDark) 1px, transparent 1px), linear-gradient(90deg, var(--gridDark) 1px, transparent 1px), linear-gradient(var(--gridDarker) 1px, transparent 1px), linear-gradient(90deg, var(--gridDarker) 1px, transparent 1px) !important;
  }

  .dual-theme-wrapper.bg-checkers .light {
    background-image: repeating-conic-gradient(var(--checkerLight) 0 25%, transparent 0 50%);
    background-size: 20px 20px;
  }
  .dual-theme-wrapper.bg-checkers .dark {
    background-image: repeating-conic-gradient(var(--checkerDark) 0 25%, transparent 0 50%);
    background-size: 20px 20px;
  }

  :global(.sb-anchor) {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
  }
  :global(.sbdocs.sbdocs-content) {
    max-width: unset;
  }
  :global(.sbdocs.sbdocs-preview),
  :global(.docblock-argstable *) {
    box-shadow: unset !important;
    filter: unset !important;
  }
</style>
