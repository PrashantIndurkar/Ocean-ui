# Component Demos Structure

This directory contains component demos and examples for Ocean-ui, organized for maximum developer experience and maintainability.

**Note**: This directory (`src/demos/`) contains demo/example components. The actual registry JSON files are in `public/registry/`.

## Directory Structure

```
demos/
├── manifest/              # Component manifests (shared across all frameworks)
│   ├── base/
│   │   ├── accordion.ts   # Example definitions
│   │   ├── button.ts
│   │   └── ...
│   └── ...
├── react/                 # React component examples
│   ├── base/
│   │   ├── accordion/
│   │   │   ├── accordion-demo.tsx
│   │   │   └── accordion-with-icons.tsx
│   │   └── ...
│   └── ...
└── solid/                 # SolidJS component examples (future)
    ├── base/
    │   ├── accordion/
    │   │   ├── basic.tsx
    │   │   └── with-icon.tsx
    │   └── ...
    └── ...
```

## How It Works

### 1. Shared Manifests

- **Location**: `manifest/{category}/{component}.ts`
- **Purpose**: Define examples, titles, and ordering for ALL frameworks
- **Benefit**: Single source of truth, no duplication

### 2. Framework Implementations

- **Location**: `{framework}/{category}/{component}/{example-name}.tsx`
- **Purpose**: Actual component code for each framework
- **Benefit**: Same examples available in all frameworks

### 3. Visual Display

- **Renders**: Always uses React components for consistent UI
- **Copy**: Framework-specific code based on user selection

## Adding New Components

### 1. Create Manifest

```typescript
// manifest/base/new-component.ts
import type { ComponentManifest } from "@/lib/registry/registry";

const manifest: ComponentManifest = {
  examples: [
    {
      name: "basic-example",
      title: "Basic Example",
    },
    // ... more examples
  ],
};

export default manifest;
```

### 2. Create Framework Implementations

```
react/base/new-component/basic-example.tsx
solid/base/new-component/basic-example.tsx
```

### 3. Component Auto-Discovery

The registry automatically:

- Loads the manifest
- Finds all framework implementations
- Renders React components in UI
- Provides framework-specific code for copying

## Registry API

The registry API provides shadcn-compatible JSON format:

- **URL Format**: `/r/{frameworkCode}/{componentIndex}/{exampleIndex}.json`
- **Framework Codes**: `r` = React, `s` = SolidJS
- **Example**: `/r/r/0/0.json` → React, first component, first example

## Benefits

✅ **Clean Organization**: All manifests in one place
✅ **No Duplication**: Shared manifest across frameworks
✅ **Consistent Structure**: `{framework}/{component}/{example}`
✅ **Easy Maintenance**: Add once, works everywhere
✅ **Great DX**: Intuitive file organization
