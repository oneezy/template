# 🛠️ tools Package

Shared build and development tools for the Storybook workspace.

## 🎯 Purpose

This package provides reusable tools for:
- **Automatic barrel file generation**
- **Dynamic package.json exports generation**
- **Development/Production mode switching**
- **Component discovery and export automation**

## 📦 Features

### **Smart Barrel Generation**
- Automatically scans all directories in `src/`
- Generates categorized exports (components, utils, styles, etc.)
- Excludes test files, configs, and other non-exportable files
- Updates in real-time with watch mode

### **Package.json Management**
- **Development Mode**: Direct `.ts`/`.svelte` imports for fast builds
- **Production Mode**: Compiled `dist/` output for npm publishing
- Auto-generates granular exports (by category and individual components)
- Manages dependencies and scripts based on mode

### **Hybrid Publishing Strategy**
- Start with internal development using direct source imports
- Switch to production mode when ready to publish to npm
- Zero configuration switching between modes

## 🚀 Usage

### **In Development (Current)**
```bash
# Generate barrel + update package.json for development
pnpm run barrel

# Watch mode for automatic regeneration
pnpm run barrel:watch

# From workspace root
pnpm barrels        # Run on all packages
pnpm ui:barrel      # Run on specific package
```

### **For NPM Publishing**
```bash
# Switch to production mode
pnpm run build:prod

# Build for publishing
pnpm run prepare:publish

# Publish (when ready)
npm publish
```

## 🔧 Generated Exports

### **Development Mode**
```json
{
  "exports": {
    ".": "./src/index.ts",
    "./components": "./src/components/index.ts",
    "./Button": {
      "types": "./src/components/Button/Button.svelte",
      "default": "./src/components/Button/Button.svelte"
    }
  }
}
```

### **Production Mode**
```json
{
  "exports": {
    ".": "./dist/index.js",
    "./components": "./dist/components/index.js", 
    "./Button": {
      "types": "./dist/components/Button/Button.svelte",
      "default": "./dist/components/Button/Button.svelte"
    }
  }
}
```

## 📁 File Structure

```
packages/
  tools/                 # This package
    src/
      barrel-generator.ts  # Core barrel generation logic
      package-generator.ts # Package.json management
      cli.ts              # Command line interface
  ui/                     # Example usage
    build.config.ts       # Build configuration
    src/                  # Source files
    package.json         # Auto-managed exports
```

## 🎨 Benefits

- **⚡ Fast Development**: Direct source imports, no compilation step
- **🎯 Production Ready**: Proper dist output when publishing
- **🔄 Automatic**: Zero manual maintenance of exports
- **🧠 Smart**: Adapts to any folder structure changes
- **🚀 Scalable**: Can be used across multiple packages
- **🔧 Flexible**: Easy to customize exclusion patterns

## 🔄 Workflow

1. **Development**: Work with direct source imports for speed
2. **Add Components**: Just create files, exports auto-generate
3. **Ready to Publish**: Switch to production mode
4. **Publish**: Standard npm publishing workflow

This approach gives you the best of both worlds - fast development iteration and proper npm package structure when needed!
