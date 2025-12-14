# Ocean UI CLI

A lightweight command-line tool for installing Ocean UI components into your React or SolidJS projects. The CLI fetches components from a remote registry API, making it fast, small, and always up-to-date.

## 📋 Table of Contents

- [What is Ocean UI CLI?](#what-is-ocean-ui-cli)
- [Purpose](#purpose)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## What is Ocean UI CLI?

Ocean UI CLI is a Node.js command-line tool that simplifies adding Ocean UI components to your project. Instead of manually copying component code or installing large component libraries, the CLI:

- Fetches components from a remote registry API
- Automatically installs required dependencies
- Transforms imports to match your project structure
- Creates utility files when needed
- Handles file overwrites safely

## Purpose

The CLI was designed to solve several problems:

1. **Small Package Size**: Unlike traditional component libraries that bundle all components, this CLI is ~50KB (90% smaller) because components are fetched on-demand
2. **Always Up-to-Date**: Components are fetched from a remote registry, so you always get the latest versions without updating the CLI
3. **Framework Flexibility**: Supports multiple frameworks (React, SolidJS) from a single tool
4. **Zero Configuration**: Works out of the box with sensible defaults
5. **Developer Experience**: Handles dependency management, import transformations, and file creation automatically

## Features

- ✅ **Remote Registry**: Fetches components from `https://components.prashantindurkar.in/api/registry`
- ✅ **Multi-Framework**: Supports React and SolidJS
- ✅ **Auto Dependency Detection**: Automatically detects and installs required packages
- ✅ **Smart Import Transformation**: Converts component imports to match your project structure
- ✅ **Utils File Creation**: Automatically creates `src/lib/utils.ts` with `cn()` utility if needed
- ✅ **Package Manager Detection**: Auto-detects npm, pnpm, yarn, or bun
- ✅ **Safe File Handling**: Prevents accidental overwrites (use `--overwrite` flag to override)
- ✅ **Configurable**: Supports custom registry URLs and framework settings via `components.json`

## Architecture

### High-Level Flow

```
User runs: ocean-ui add accordion
    │
    ├─→ 1. Validates component exists (fetches registry index)
    │
    ├─→ 2. Fetches component from registry API
    │   └─→ GET /api/registry/react/accordion.json
    │
    ├─→ 3. Extracts dependencies from registry JSON
    │
    ├─→ 4. Creates utils file if needed (src/lib/utils.ts)
    │
    ├─→ 5. Installs dependencies via package manager
    │
    ├─→ 6. Transforms component imports
    │
    └─→ 7. Writes component to project
```

### Package Structure

```
packages/cli/
├── src/
│   ├── index.ts                    # Main CLI entry point
│   └── utils/
│       ├── registry-client.ts      # HTTP client for registry API
│       ├── config.ts                # Configuration management
│       ├── component-discovery.ts   # Component validation & listing
│       ├── dependency-extractor.ts  # Extract deps from registry JSON
│       ├── file-operations.ts       # Read/write components, transform imports
│       └── package-manager.ts       # Detect & install dependencies
├── dist/                            # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

### Key Design Decisions

1. **Remote Registry Pattern**: Components are not bundled in the npm package. Instead, they're fetched from a remote API, reducing package size by ~90%

2. **Thin Client Architecture**: The CLI is a thin client that orchestrates:

   - Registry API communication
   - Dependency installation
   - File operations
   - Import transformations

3. **Zero Runtime Dependencies**: Uses Node.js built-in `fetch` API (Node 18+) for HTTP requests

4. **Framework Agnostic**: Same CLI works for React and SolidJS by switching registry endpoints

## Installation

### Global Installation

```bash
npm install -g @ocean-ui/cli
# or
pnpm add -g @ocean-ui/cli
# or
yarn global add @ocean-ui/cli
```

### Local Installation (Recommended)

```bash
npm install -D @ocean-ui/cli
# or
pnpm add -D @ocean-ui/cli
# or
yarn add -D @ocean-ui/cli
```

Then use with `npx`:

```bash
npx ocean-ui add accordion
```

## Usage

### Basic Usage

```bash
# Add a component (defaults to React)
ocean-ui add accordion

# Specify framework
ocean-ui add accordion --framework solid

# Custom output directory
ocean-ui add accordion --dir src/components/ui

# Overwrite existing file
ocean-ui add accordion --overwrite

# Specify package manager
ocean-ui add accordion --pm pnpm
```

### Command Options

```bash
ocean-ui add <component> [options]

Options:
  -f, --framework <framework>  Framework (react|solid) [default: react]
  -p, --pm <pm>                Package manager (npm|pnpm|yarn|bun)
  -o, --overwrite              Overwrite existing files [default: false]
  -d, --dir <dir>              Target directory [default: components/ui]
  -h, --help                   Display help
```

### Examples

```bash
# Add React accordion component
ocean-ui add accordion

# Add SolidJS button component to custom directory
ocean-ui add button --framework solid --dir src/components

# Add component and overwrite if exists
ocean-ui add dialog --overwrite

# Use specific package manager
ocean-ui add input --pm yarn
```

## Configuration

### components.json

Create a `components.json` file in your project root to customize CLI behavior:

```json
{
  "framework": "react",
  "registry": {
    "url": "https://components.prashantindurkar.in/api/registry"
  },
  "aliases": {
    "components": "~/components",
    "lib": "~/lib",
    "ui": "~/components/ui"
  }
}
```

**Configuration Options:**

- `framework`: Default framework to use (react|solid)
- `registry.url`: Custom registry API URL (optional)
- `aliases`: Path alias configuration (for future use)

### Environment Variables

The CLI respects the following environment variables:

- `NPM_CONFIG_REGISTRY`: Custom npm registry (for dependency installation)
- Package manager detection via lock files (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`)

## How It Works

### Step-by-Step Process

When you run `ocean-ui add accordion`, here's what happens:

#### 1. Component Validation

```typescript
// Fetches registry index to validate component exists
const index = await registryClient.fetchIndex("react");
// index.items = [{ name: 'accordion', type: 'registry:ui' }, ...]
const isValid = index.items.some((item) => item.name === "accordion");
```

**API Call**: `GET /api/registry/react/index.json`

#### 2. Fetch Component from Registry

```typescript
// Fetches component JSON with source code and metadata
const registryItem = await registryClient.fetchComponent("react", "accordion");
// registryItem.files[0].content = component source code
// registryItem.dependencies = ['@ark-ui/react', 'lucide-react']
```

**API Call**: `GET /api/registry/react/accordion.json`

**Response Structure**:

```json
{
  "name": "accordion",
  "dependencies": ["@ark-ui/react", "lucide-react"],
  "files": [
    {
      "content": "import { Accordion } from '@ark-ui/react/accordion';\n...",
      "path": "accordion.tsx",
      "type": "registry:ui"
    }
  ]
}
```

#### 3. Extract Dependencies

```typescript
// Dependencies are already provided in registry JSON
const dependencies = registryItem.dependencies;
// Filters out framework peer dependencies (react, solid)
```

#### 4. Create Utils File (if needed)

```typescript
// Checks if src/lib/utils.ts or lib/utils.ts exists
// If not, creates src/lib/utils.ts with cn() utility
const utilsCreated = await ensureUtilsFile();
if (utilsCreated) {
  dependencies.push("clsx", "tailwind-merge");
}
```

**Created File** (`src/lib/utils.ts`):

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### 5. Install Dependencies

```typescript
// Detects package manager from lock files
const pm = detectPackageManager(); // 'npm' | 'pnpm' | 'yarn' | 'bun'
// Runs: npm install @ark-ui/react lucide-react clsx tailwind-merge
await installDependencies(pm, dependencies);
```

#### 6. Transform Imports

```typescript
// Transforms component source code imports
const transformed = transformComponentImports(content, "accordion");
// Before: import { cn } from '../../../lib/utils'
// After:  import { cn } from '@/lib/utils'
```

**Transformations Applied**:

- `../../../components/base/accordion` → `@/components/ui/accordion`
- `../../../lib/utils` → `@/lib/utils`
- `@ocean-ui/react` → `@/components/ui/accordion`
- `@ocean-ui/utils` → `@/lib/utils`

#### 7. Write Component File

```typescript
// Writes transformed component to project
await writeComponentWithOverwrite(
  "accordion",
  transformedContent,
  "components/ui",
  false // overwrite flag
);
// Creates: components/ui/accordion.tsx
```

### Registry API Integration

The CLI communicates with the registry API using the `RegistryClient` class:

```typescript
class RegistryClient {
  async fetchComponent(
    framework: string,
    component: string
  ): Promise<RegistryItem>;
  async fetchIndex(framework: string): Promise<RegistryIndex>;
  setBaseURL(url: string): void;
}
```

**Error Handling**:

- Network errors: Clear messages about internet connectivity
- 404 errors: Component not found in registry
- Timeout errors: 30-second default timeout with abort controller

### Import Transformation

The CLI automatically transforms imports to match your project structure:

**Before** (from registry):

```typescript
import { cn } from "../../../lib/utils";
import { Accordion } from "@ocean-ui/react";
```

**After** (written to your project):

```typescript
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
```

This ensures components work immediately without manual import fixes.

## Development

### Prerequisites

- Node.js 18+ (for native `fetch` API)
- TypeScript 5+
- pnpm (recommended) or npm

### Setup

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint
```

### Project Structure

```
src/
├── index.ts                    # CLI entry point, command definitions
└── utils/
    ├── registry-client.ts      # HTTP client for registry API
    ├── config.ts               # Read components.json config
    ├── component-discovery.ts  # Validate & list components
    ├── dependency-extractor.ts # Extract deps from registry JSON
    ├── file-operations.ts      # File I/O, import transformation
    └── package-manager.ts      # PM detection & installation
```

### Adding New Features

1. **New Command**: Add to `src/index.ts` using Commander.js
2. **New Utility**: Create in `src/utils/` and export
3. **Registry Changes**: Update `RegistryClient` interface in `registry-client.ts`

### Testing Locally

```bash
# Build the CLI
pnpm build

# Test in a sample project
cd /path/to/test-project
npx ../packages/cli/dist/src/index.js add accordion
```

### Publishing

See [PUBLISHING.md](./PUBLISHING.md) for detailed publishing instructions.

## Troubleshooting

### Component Not Found

**Error**: `Component "xyz" not found`

**Solutions**:

- Check available components: The CLI will list available components in the error message
- Verify framework: Use `--framework` flag if using SolidJS
- Check registry connectivity: Ensure you have internet connection

### Network Errors

**Error**: `Unable to connect to registry`

**Solutions**:

- Check internet connection
- Verify registry URL in `components.json` (if custom)
- Check firewall/proxy settings
- Try accessing registry URL in browser: `https://components.prashantindurkar.in/api/registry/react/index.json`

### Dependency Installation Fails

**Error**: `Failed to install dependencies`

**Solutions**:

- Check package manager: Use `--pm` flag to specify correct PM
- Verify lock file exists: Ensure `package-lock.json`, `pnpm-lock.yaml`, etc. exists
- Check npm/pnpm/yarn is installed
- Try installing manually: `npm install @ark-ui/react lucide-react`

### Import Errors After Installation

**Error**: `Cannot find module '@/lib/utils'`

**Solutions**:

- Ensure `tsconfig.json` has path alias configured:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```
- Verify `src/lib/utils.ts` exists (CLI should create it automatically)
- Check import paths match your project structure

### File Already Exists

**Error**: `File already exists: components/ui/accordion.tsx`

**Solutions**:

- Use `--overwrite` flag to replace existing file
- Manually delete the file before running CLI
- Use `--dir` flag to install to different directory

### TypeScript Errors

**Error**: Type errors in installed component

**Solutions**:

- Ensure TypeScript version is compatible (5+)
- Check that dependencies are installed correctly
- Verify path aliases in `tsconfig.json`
- Rebuild TypeScript: `npx tsc --noEmit`

## Architecture Benefits

### Why Remote Registry?

1. **Small Package Size**: CLI package is ~50KB vs ~500KB with bundled components (90% reduction)
2. **Independent Updates**: Update components without republishing CLI
3. **Version Flexibility**: Components versioned independently
4. **Scalability**: Easy to add new components without CLI updates
5. **Framework Support**: Same CLI works for multiple frameworks

### Trade-offs

- **Requires Internet**: CLI needs network access to fetch components
- **Network Dependency**: Offline usage not supported (by design)
- **Registry Availability**: Depends on registry API being accessible

## Contributing

When contributing to the CLI:

1. Keep the CLI lightweight - avoid heavy dependencies
2. Maintain backward compatibility with registry API
3. Add clear error messages for common issues
4. Test with both React and SolidJS frameworks
5. Update this README for new features

## License

See the main Ocean UI repository for license information.

## Related

- [Ocean UI Components](https://components.prashantindurkar.in) - Component documentation
- [Registry API](../docs/app/api/registry) - API documentation
- [Publishing Guide](./PUBLISHING.md) - How to publish the CLI

---

**Memory Trick**: Think of the CLI as a "component librarian" - it doesn't store all the books (components), it just knows how to fetch them from the library (registry API) when you need them.
