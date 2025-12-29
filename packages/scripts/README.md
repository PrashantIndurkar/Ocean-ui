# @ocean-ui/scripts

Build scripts for Ocean UI registry generation and maintenance.

## Overview

This package contains scripts for generating the component registry JSON files that are served by the docs app and consumed by the CLI.

## Usage

### Generate Registry Files

Generate registry JSON files for all components:

```bash
pnpm registry:generate
```

Or from the monorepo root:

```bash
pnpm --filter @ocean-ui/scripts registry:generate
```

This will:
1. Read component sources from `packages/ui-react` and `packages/ui-solid`
2. Extract dependencies and metadata
3. Generate JSON files in `apps/website/public/registry/`
4. Create index files for each framework

### Output Structure

```
apps/website/public/registry/
├── react/
│   ├── index.json          # List of all React components
│   ├── accordion.json      # Individual component registry file
│   └── ...
└── solid/
    ├── index.json          # List of all SolidJS components
    ├── accordion.json      # Individual component registry file
    └── ...
```

## Registry Format

Each component registry file (`accordion.json`) contains:

- `$schema`: JSON schema URL
- `name`: Component slug (e.g., "accordion")
- `type`: Registry type (e.g., "registry:ui")
- `dependencies`: Array of npm package dependencies
- `files`: Array of file objects with content and metadata
- `cssVars`: Optional CSS variables
- `css`: Optional CSS keyframes/animations

## Development

### Adding New Components

1. Add component files to `packages/ui-react/src/components/base/` or `packages/ui-solid/src/components/base/`
2. Run `pnpm registry:generate` to regenerate registry files
3. The new component will automatically be included in the registry

### Modifying Component Metadata

The registry generator automatically extracts:
- Dependencies from import statements
- Component content
- File paths

To add CSS variables or animations, update the component source files - these will be extracted automatically if present.

## Integration

The registry generation is automatically run before building the docs app:

```json
{
  "scripts": {
    "prebuild": "pnpm --filter @ocean-ui/scripts registry:generate"
  }
}
```

This ensures registry files are always up-to-date when deploying the docs site.

