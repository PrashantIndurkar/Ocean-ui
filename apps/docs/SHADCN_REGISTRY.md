# Ocean UI shadcn Registry Configuration

## Overview

Ocean UI provides a shadcn-compatible component registry that allows users to install components directly into their projects using the `shadcn` CLI.

## Registry Structure

### Registry File Location

The registry configuration is located at `apps/docs/registry.json`. This file serves as the single source of truth for all registry items.

### Registry URL Pattern

- **Namespace**: `@ocean-ui`
- **URL Pattern**: `https://components.prashantindurkar.in/r/{name}.json`
- **Example**: `https://components.prashantindurkar.in/r/accordion.json`

### Generated Files Location

When the registry build process runs, individual component JSON files are generated in:

- `apps/docs/public/r/{name}.json`

These files are served as static assets when the docs app is deployed.

## Registry Schema

### Top-Level Structure

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "@ocean-ui",
  "items": [...]
}
```

- **`$schema`**: Points to the shadcn registry schema for validation
- **`name`**: The registry namespace (`@ocean-ui`)
- **`items`**: Array of component registry items

### Item Model Schema

Each item in the `items` array follows this structure:

```json
{
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Title",
  "description": "Component description",
  "dependencies": ["package1", "package2"],
  "registryDependencies": [],
  "files": [
    {
      "path": "relative/path/to/component.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {}
  },
  "css": {}
}
```

#### Field Descriptions

- **`name`** (string, required): Kebab-case component identifier (e.g., `"accordion"`)
- **`type`** (string, required): Component type, typically `"registry:ui"` for UI components
- **`title`** (string, required): Human-friendly component name (e.g., `"Accordion"`)
- **`description`** (string, required): Brief description of the component's purpose
- **`dependencies`** (array, required): List of npm package names required by the component
  - **Important**: Only include npm packages. Do NOT include local path aliases like `@/lib/utils` as these are transformed by the shadcn CLI during installation
- **`registryDependencies`** (array, optional): Other components from this registry that this component depends on (e.g., `["@ocean-ui/button"]`)
- **`files`** (array, required): Array of file objects describing the component source
  - **`path`**: Relative path from `apps/docs/registry.json` to the component file
  - **`type`**: File type, typically `"registry:ui"`
- **`cssVars`** (object, required): CSS variables for the component
  - **`theme`**: Object containing CSS custom properties (e.g., `"--animate-accordion-collapse": "..."`)
- **`css`** (object, required): CSS keyframes and other styles
  - Contains `@keyframes` definitions and other component-specific CSS

### File Path Conventions

File paths in the `files` array are relative to `apps/docs/registry.json`. For example:

- Component at `packages/ui-react/src/components/base/accordion.tsx` → `"../../packages/ui-react/src/components/base/accordion.tsx"`

## Consumer Configuration

### Setting Up Ocean UI Registry

To use Ocean UI components in your project, add the registry configuration to your `components.json` file:

```json
{
  "registries": {
    "@ocean-ui": "https://components.prashantindurkar.in/r/{name}.json"
  }
}
```

### Installing Components

Once configured, install components using the shadcn CLI:

```bash
pnpm dlx shadcn@latest add @ocean-ui/accordion
```

Or using npm:

```bash
npx shadcn@latest add @ocean-ui/accordion
```

### What Happens During Installation

1. The shadcn CLI reads your `components.json` and finds the `@ocean-ui` registry
2. It resolves `@ocean-ui/accordion` to `https://components.prashantindurkar.in/r/accordion.json`
3. It fetches the JSON file from the registry URL
4. It extracts the component code from `files[].content`
5. It writes the component file to your project (typically `components/ui/accordion.tsx`)
6. It updates your global CSS file with CSS variables and keyframes from `cssVars` and `css`
7. It installs the required npm dependencies listed in `dependencies`

## Adding New Components

When adding a new component to the registry:

1. **Implement the component** in `packages/ui-react/src/components/base/{component-name}.tsx`
2. **Add CSS variables and keyframes** to `packages/tokens/tokens.css` if needed
3. **Add registry entry** to `apps/docs/registry.json`:
   - Point `files[].path` to the component file
   - Include all npm dependencies (not local path aliases)
   - Extract CSS variables and keyframes from `tokens.css` into `cssVars` and `css` fields
4. **Run registry build** (in a later phase) to generate `public/r/{component-name}.json`
5. **Add documentation** and demos (in a later phase)

## Example: Accordion Component

```json
{
  "name": "accordion",
  "type": "registry:ui",
  "title": "Accordion",
  "description": "A vertically stacked set of interactive headings that each reveal a section of content.",
  "dependencies": ["@ark-ui/react", "lucide-react"],
  "registryDependencies": [],
  "files": [
    {
      "path": "../../packages/ui-react/src/components/base/accordion.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {}
  },
  "css": {}
}
```

## Notes

- The component source files are the single source of truth - they are not duplicated in the registry
- CSS variables and keyframes are extracted from `packages/tokens/tokens.css` and included in the registry entry
- Local path aliases like `@/lib/utils` are automatically transformed by the shadcn CLI during installation
- The registry follows the shadcn registry schema for compatibility
