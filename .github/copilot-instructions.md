# Copilot Instructions for Template Monorepo

## Architecture Overview

This is a **monorepo** using **pnpm workspaces + Turborepo** with the following structure:
s

```
template/
├── apps/
│   ├── app/                        # Sveltekit (todo)
│   ├── docs/                       # Sveltekit (todo)
│   ├── site/                       # Sveltekit (public facing website)
│   └── storybook/                  # Sveltekit + Storybook (design system)
├── packages/
│   ├── config/                     # shared configs for all apps
│   │   ├── svelte/                   # (workspace)
│   │   ├── ts/                       # (workspace)
│   │   └── vite/                     # (workspace)
│   │── tools/                      # `@layerd/tools` workspace - custom tools and scripts
│   │   ├── barrels.js                # `pnpm barrels` script - automatically generates `index.ts` exports
│   │   ├── stories.js                # `pnpm stories` script - automatically generates stories `component.stories.svelte`
│   │   └── symlinks.js               # `pnpm symlinks` script - automatically generates `static` symlink folders for all apps
│   └── ui/                         # `@layerd/ui` workspace - shared components lib for all apps
│       ├── src/legacy/components     # old components that need to be upgraded to use the new design system and added to the `src/lib/components`
│       ├── src/lib/components        # atomic designed components
│       │   ├── atoms                   # single purpose components (button, input, image, content, link)
│       │   ├── molecules               # combination of atom components (search [button, input], card [image, text, link])
│       │   └── organisms               # consisting of atoms and molecules (header [logo, nav, links, button], hero [section, image, text, button])
│       └── static/                   # main "static" folder that is used for symlink creation in other apps
```

## 🔥 CRITICAL DEVELOPMENT WORKFLOW

### Primary Commands (ALWAYS FROM ROOT - NEVER `cd` into subdirectories)

```bash
# Start everything + auto-generation
 pnpm dev               # Handles EVERYTHING: dev servers, stories, barrel exports

# Individual app development (only if needed)
 pnpm site              # Site development only
 pnpm sb                # Storybook development only

# Production commands
 pnpm build             # Build everything for production
 pnpm preview:all       # Preview all apps

# Manual generation (ONLY when pnpm dev is NOT running)
 pnpm barrels           # Generate barrel exports manually
 pnpm stories           # Generate Storybook stories manually
```

### Package Management (From Root Only)

```bash
# Installing packages - ALWAYS use --filter from root
 pnpm --filter @layerd/ui add runed
 pnpm --filter @layerd/ui add -D typescript
 pnpm --filter site add some-package
 pnpm --filter storybook add some-addon
```

## Auto-Generation System

### Barrel Export Management

- **Never manually edit** `packages/ui/src/lib/index.ts` - it's auto-generated
- Add components to `packages/ui/src/lib/components/` → barrel exports update automatically during `pnpm dev`
- Automatically detects default vs named exports

### Story Generation System

- **Automatic during development**: Stories regenerate when components change during `pnpm dev`
- Scans `packages/ui/src/lib/components/` for `.svelte` files
- Creates `.stories.svelte` files in `apps/storybook/src/stories/`
- Uses proper folder structure (atoms/, molecules/, organisms/, templates/)

## Component Architecture

### UI Library Structure (`packages/ui/`)

```
packages/ui/src/lib/
├── index.ts                     # Auto-generated barrel exports
├── ui.css                       # Tailwind v4 + theming system
├── css/                         # Organized CSS architecture
│   ├── 1-theme/                 # Theme variables (colors, fonts, sizes)
│   ├── 2-base/                  # Base styles and resets
│   ├── 3-presets/               # Component presets and utilities
│   ├── 4-components/            # Component-specific styles
│   └── 5-themes/                # Color themes (default, dracula, retro, etc.)
├── components/
│   ├── atoms/                   # Basic building blocks + component utilities
│   │   └── component/           # Base component system (ComponentProps, etc.)
│   ├── molecules/               # Combined atoms
│   ├── organisms/               # Complex components
│   └── templates/               # Layout templates
└── utils/                       # Global utility functions (classes, media queries)
```

### Storybook Structure (`apps/storybook/`)

```
apps/storybook/src/stories/
├── atoms/                       # Generated from packages/ui/src/lib/components/atoms/
├── molecules/                   # Generated from packages/ui/src/lib/components/molecules/
├── organisms/                   # Generated from packages/ui/src/lib/components/organisms/
├── templates/                   # Generated from packages/ui/src/lib/components/templates/
├── assets/                      # Static assets for stories
├── Colors.mdx                   # Color system documentation
├── Configure.mdx                # Configuration guide
└── Typography.mdx               # Typography documentation
```

### Import Aliases

**ALWAYS** use `@layerd/ui` for imports within the UI package:

```svelte
// ✅ CORRECT - Use the configured alias
import { Component, type ComponentProps } from '@layerd/ui';

// ❌ WRONG - Never use relative imports
import { Component } from '../component/component.svelte.ts';
```

- `@layerd/ui` is configured as an alias in all Svelte configs
- This prevents circular dependency issues and maintains consistency
- Works for all exports

### ⚠️ Avoiding Circular Execution Dependencies

**CRITICAL**: When importing from `@layerd/ui` within the same package, **NEVER** call imported functions immediately at module level:

```typescript
// ❌ WRONG - Immediate execution causes circular dependency
import { sync } from '@layerd/ui';
export const mySync = sync({ ... }); // ← Called during module load

// ✅ CORRECT - Lazy initialization avoids circular dependency
import { sync } from '@layerd/ui';
let _mySync = null;
export const mySync = new Proxy({}, {
  get(target, prop) {
    if (!_mySync) _mySync = sync({ ... }); // ← Called when first accessed
    return _mySync[prop];
  }
});
```

**Why this happens:**

1. Your file imports from `@layerd/ui` (barrel export)
2. Barrel export tries to load your file (circular import)
3. Your file executes function call before function is fully loaded
4. Result: `function is not a function` runtime error

**Solution:** Use lazy initialization patterns (Proxy, getter functions, or conditional execution) instead of immediate module-level function calls.

## Component Development Philosophy

### Core Principles

1. **Base-First Architecture**: All components should use the `<Component>` base system
2. **Minimal Components**: Components only contain component-specific logic
3. **Everything via `<Component>`**: All props, styling, and behavior flow through the base system
4. **No Duplicate Code**: Extend the base system instead of adding new props to individual components
5. **Svelte 5 + TypeScript**: Use `$props()`, `$state()`, `$derived()` - never Svelte 4 patterns
6. **Runed Integration**: Leverage runed utilities to minimize boilerplate code

### Component Organization (Atomic Design)

- **Atoms** (`atoms/`): Basic building blocks that extend `<Component>` base system
- **Molecules** (`molecules/`): Compose atoms together without extending base system
- **Organisms** (`organisms/`): Complex sections combining atoms and molecules
- **Templates** (`templates/`): Layout patterns for page structure

### Development Patterns

- **Co-locate utilities**: `component.svelte.ts` for logic, `component.data.ts` for sample data
- **Always use `@layerd/ui` imports**: Never use relative imports
- **Auto-generation**: Barrel exports and stories generate automatically during `pnpm dev`
- **JSDoc tags required**: `@tags` comments enable story generation
- **Tailwind layout only**: No color utilities - colors come from base system

### Utility Module Naming Convention

- **File naming**: `utilityname.svelte.ts` (lowercase)
- **Class naming**: `UtilityNameClass` (PascalCase + "Class" suffix to avoid conflicts)
- **Component naming**: `UtilityName` (PascalCase, matches folder name)
- **Prop naming**: `utilityname` (lowercase, matches file name)
- **Folder organization**:
  - Utilities with ONLY `.svelte.ts` files → stay in root `utils/` directory
  - Utilities with BOTH `.svelte.ts` AND `.svelte` components → create dedicated `utils/utilityname/` folder
- **Import conventions**:
  - Components: Always import as `import { UtilityName } from '@layerd/ui';`
  - Utility classes: Always import as `import { UtilityNameClass } from '@layerd/ui';`
- **Examples**:
  - File: `utils/observe.svelte.ts` → Class: `ObserveClass` → Prop: `observe` (stays in root utils)
  - Folder: `utils/debug/` with `debug.svelte.ts` + `debug.svelte` → Class: `DebugClass` + Component: `Debug` → Prop: `debug` (gets own folder)
  - File: `utils/attachment.svelte.ts` → Class: `AttachmentClass` → Prop: `attachment` (stays in root utils)

## Color System & Theming Architecture

### Breakthrough Color System

This monorepo features a **revolutionary color theming system** that's years ahead of most design systems. The architecture combines automatic color scale generation, intelligent light/dark pairings, and modern CSS features to create a zero-config theming experience.

### Color System Architecture Flow

1. **You set**: `--theme-color-primary: var(--color-blue-500)` (or raw `red`, `blue`)
2. **UI generates**: Full OKLCH-based color scales (50-950) from that base
3. **UI creates**: Hundreds of light/dark pairings using `light-dark()`
4. **Mode-watcher**: Toggles `.dark` class on `<html>`
5. **CSS responds**: All `light-dark()` functions switch automatically

#### Mode Detection & CSS

```css
/* From ui.css */
:root {
	color-scheme: light;
}
:root.dark {
	color-scheme: dark;
}

/* Auto-generated pairings that switch based on color-scheme */
--color-primary-500-50: light-dark(var(--color-primary-500), var(--color-primary-50));
--color-primary-600-100: light-dark(var(--color-primary-600), var(--color-primary-100));
```

#### App-Level Theme Override

```css
[data-theme] {
	--theme-color-primary: var(--color-blue-500); /* ✅ Use 500 variants */
	--theme-color-secondary: var(--color-red-500); /* ✅ Balanced for both modes */
	--theme-color-accent: var(--color-green-500); /* ✅ Middle of the scale */
	/* Raw colors also work: red, blue, #ff0000 - converted to OKLCH automatically */
}
```

### Font System

- `@fontsource/inter` - Primary UI font
- `@fontsource-variable/jetbrains-mono` - Monospace font
- **Extend fonts**: Install additional fonts with ` pnpm --filter @layerd/ui add @fontsource/some-font`

```css
--font-inter: 'Inter', sans-serif;
--font-jetbrains: 'JetBrains Mono Variable', monospace;
--theme-font: var(--font-jetbrains); /* Current theme font */
--theme-scale: 1; /* Font size multiplier */
```

### Icon System

- **Use `<Icon name="" />` component** for all icons - never use raw CSS classes
- Icon collections: Carbon, Heroicons, MDI
- **Extend icons**: Install additional icon sets with ` pnpm --filter @layerd/ui add @iconify-json/some-icon-collection`
- Usage: `<Icon name="carbon:add" />` or `<Icon name="heroicons:home" />`

### Static Asset System

- The `static/` folder is **symlinked** from `packages/ui/static/` into every app
- Assets are shared globally across all apps instead of being copied
- Symlink management handled automatically by `packages/tools`

## Package Management & Build System

### Workspace Dependencies

- Use `workspace:*` for internal package references
- Keep build tools in `devDependencies`, not `dependencies`
- UI library exports both `/src` (development) and `/` (built) entry points

### Configuration Sharing

- Svelte config: Import from `@layerd/config-svelte`
- TypeScript config: Extend from `@layerd/config-ts`
- Vite config: Import plugins from `@layerd/config-vite`

### Turborepo Task Dependencies

- `build` depends on `^build` (topological)
- `storybook` depends on `^build` (needs built UI components)
- `barrel` tasks are never cached (always fresh generation)
- Watch tasks (`dev`, `story:watch`) are persistent

### Critical Build Notes

- **UI package**: Builds both components (`svelte-package`) and styles (`tailwindcss`) separately
- **Storybook**: Requires UI package to be built first
- **Site**: Can use UI package via hot-reload in development

## Testing & Quality

### Storybook Integration

- Stories use `.stories.svelte` pattern in `apps/storybook/src/stories/`
- **Stories are auto-generated during development** - any `.svelte` component automatically gets a story
- Storybook serves as both documentation and visual testing
- Static builds go to `storybook-static/` for deployment

### File Naming Conventions

- Components: `[name].svelte` in `components/[category]/[name]/` folders
- Stories: `[Name].stories.svelte` (PascalCase)
- Tools exclude patterns: `.test.`, `.spec.`, `__tests__/`, `.stories.`

## Common Pitfalls

1. **Don't edit barrel files manually** - use `pnpm dev` (auto-generates)
2. **Always use Svelte 5 syntax** - no `export let`, use `$props()`
3. **Build UI package before Storybook** - dependency chain requirement
4. **Use workspace protocol** - `workspace:*` not version numbers for internal deps
5. **CSS compilation timing** - Tailwind must build before components can reference classes

## Turborepo Task Dependency Issues (CRITICAL TO AVOID)

### ⚠️ **The Persistent Task Deadlock Problem**

**NEVER** make persistent tasks depend on non-persistent tasks in `turbo.json`:

```json
// ❌ WRONG - This will cause deadlocks in watch mode
"storybook#dev": {
  "dependsOn": ["sync", "^components", "story"], // ← "story" dependency breaks watch mode
  "persistent": true
}
```

```json
// ✅ CORRECT - Persistent tasks should only depend on other persistent/build tasks
"storybook#dev": {
  "dependsOn": ["sync", "^components"], // ← No non-persistent task dependencies
  "persistent": true
}
```

### 🎯 **The Solution: Watch Multiple Tasks**

Instead of making persistent tasks depend on non-persistent ones, watch them simultaneously:

```json
// package.json
"dev": "turbo watch dev story"  // ← Watch BOTH dev AND story tasks
```

### 🚨 **Why This Happens:**

1. **Persistent tasks** (like `dev`, `storybook`) run forever and never exit
2. **Non-persistent tasks** (like `story`, `barrel`) run once and exit
3. **In watch mode**: If a persistent task depends on a non-persistent task, the non-persistent task can never re-run because the persistent task never exits
4. **Result**: Tasks hang indefinitely waiting for dependencies that will never complete

### 🔧 **Debugging Tips:**

- If `pnpm dev` hangs but manual commands work, check for persistent → non-persistent dependencies
- Use `turbo run [task] --dry` to inspect task dependency chains
- Manual execution (`turbo run story`) will work fine - the issue only appears in watch mode

# Rules

## 🚨 CRITICAL RULES - FOLLOW THESE OR YOU'RE DOING IT WRONG 🚨

1. **NEVER RUN ANY TERMINAL COMMANDS** - NEVER use any `run_in_terminal` tool calls unless the user EXPLICITLY asks you to run a specific command. This includes: `pnpm dev`, `pnpm build`, `pnpm barrels`, `pnpm stories`, `pnpm sb`, or ANY other commands. ASK FIRST, ALWAYS.
2. **DEV SERVER IS ALWAYS RUNNING** - The development server auto-generates barrel exports, stories, and everything else. You should NEVER need to run these commands manually.
3. **NEVER CHANGE DIRECTORIES** - ALWAYS stay in root directory. NEVER use `cd` into apps or packages
4. **NEVER RUN BUILD COMMANDS** - Use ` pnpm dev` for everything during development. STOP running ` pnpm build` or ` pnpm turbo build`
5. **ASK PERMISSION FOR ALL TERMINAL ACTIONS** - Before running ANY terminal command, ask the user first. The dev server handles everything automatically.
6. **USE PACKAGE FILTERS** - Always use ` pnpm --filter [package-name] add [dependency]` from root (but ASK FIRST)
7. **TERMINAL COMMANDS** - ALWAYS add a space ` ` before commands when running in terminal (but ASK FIRST)

### ✅ CORRECT Terminal Usage:

```bash
 pnpm dev
 pnpm --filter @layerd/ui add runed
```

### ❌ WRONG Terminal Usage:

```bash
pnpm dev
pnpm --filter @layerd/ui add runed
```

## 🔥 DEVELOPMENT WORKFLOW - THIS IS THE ONLY WAY 🔥

- ` pnpm dev` - This handles EVERYTHING. Hot reload, building, watching, story generation, barrel exports, etc.
- ` pnpm site` - Site development only if needed
- ` pnpm sb` - Storybook development only if needed

### 🎭 **Automatic Everything**

When you run ` pnpm dev`:

1. **Create any `.svelte` component** in `packages/ui/src/lib/components/`
2. **Stories auto-generate** - no manual action required
3. **Barrel exports update** automatically
4. **CSS rebuilds** automatically
5. **Everything just works** ✨

### 🧪 **Testing Policy - CRITICAL**

**NEVER CREATE TEST COMPONENTS OR DO ANY TESTING**:

- **❌ NEVER**: Create test components, test files, or any testing code
- **❌ NEVER**: Modify components for testing purposes
- **❌ NEVER**: Run tests or validation commands
- **❌ NEVER**: Create examples or demonstrations
- **USER DOES ALL TESTING**: The user handles all testing, validation, and examples
- **YOU ONLY CODE**: Your role is strictly coding implementation only
- **NO EXCEPTIONS**: Never create components with names like `test.svelte`, `example.svelte`, `demo.svelte`, etc.

## ⛔ THINGS YOU MUST NEVER DO ⛔

- ❌ **RUNNING ANY TERMINAL COMMANDS** - NEVER use `run_in_terminal` for ANY command unless explicitly requested by user and permission is granted
- ❌ **RUNNING BARRELS, STORIES, OR BUILD SCRIPTS** - The dev server handles all auto-generation automatically
- ❌ `cd packages/ui` or `cd apps/site` - STAY IN ROOT
- ❌ ` pnpm build`, ` pnpm barrels`, ` pnpm stories`, ` pnpm turbo build` - ASK FIRST, dev server handles these automatically
- ❌ Running commands from inside subdirectories
- ❌ Manual building during development - dev server auto-builds everything
- ❌ Running ANY commands when dev server is running (which is always)
- ❌ Installing packages without asking permission first
- ❌ Writing boilerplate code instead of using runed utilities
- ❌ **CREATING ANY TEST COMPONENTS, EXAMPLES, OR DEMONSTRATIONS**
- ❌ **RUNNING ANY TESTING OR VALIDATION COMMANDS**
- ❌ **MODIFYING EXISTING COMPONENTS FOR TESTING PURPOSES**
- ❌ **NEVER USE NEW PACKAGES** - NEVER import, install, or suggest packages unless they are already installed or you have explicit permission from the user
