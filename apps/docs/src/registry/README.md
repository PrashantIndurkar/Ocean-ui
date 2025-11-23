# Component Registry Structure

This directory contains the component registry for Ocean-ui, organized for maximum developer experience and maintainability.

## Directory Structure

```
registry/
├── manifest/              # Component manifests (shared across all frameworks)
│   ├── accordion.ts       # Example definitions
│   ├── button.ts
│   └── ...
├── react/                 # React component examples
│   ├── accordion/
│   │   ├── basic.tsx
│   │   └── with-icon.tsx
│   └── ...
└── solid/                 # SolidJS component examples
    ├── accordion/
    │   ├── basic.tsx
    │   └── with-icon.tsx
    └── ...
```

## How It Works

### 1. Shared Manifests

- **Location**: `manifest/{component}.ts`
- **Purpose**: Define examples, titles, and ordering for ALL frameworks
- **Benefit**: Single source of truth, no duplication

### 2. Framework Implementations

- **Location**: `{framework}/{component}/{example-name}.tsx`
- **Purpose**: Actual component code for each framework
- **Benefit**: Same examples available in both React and SolidJS

### 3. Visual Display

- **Renders**: Always uses React components for consistent UI
- **Copy**: Framework-specific code based on user selection

## Adding New Components

### 1. Create Manifest

```typescript
// manifest/new-component.ts
import type { ComponentManifest } from "@/lib/registry";

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
react/new-component/basic-example.tsx
solid/new-component/basic-example.tsx
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

