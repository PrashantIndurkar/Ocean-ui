# Ocean UI Website - Folder Structure Guide

This document explains the folder structure of the Ocean UI documentation website (`apps/website`). Use this guide to understand where files belong and why the project is organized this way.

## 📁 Overview

```
apps/website/
├── content/              # MDX documentation content
├── public/              # Static assets and registry JSON files
├── src/                 # Source code
│   ├── app/            # Next.js App Router (pages & API routes)
│   ├── components/     # React components for the website
│   ├── demos/         # Component demo/example files
│   └── lib/           # Utilities and shared code
└── source.config.ts    # Fumadocs configuration
```

---

## 📄 Root Files

### `source.config.ts`
**Purpose**: Fumadocs configuration for MDX content  
**What goes here**: Content source paths, MDX settings  
**When to edit**: When changing content structure or adding new content sources

---

## 📚 `content/` - Documentation Content

**Purpose**: Contains all MDX documentation files that render as pages

```
content/
└── docs/
    ├── base-components/    # Component documentation pages
    │   ├── accordion.mdx
    │   ├── button.mdx
    │   └── ...
    ├── documentation/      # General documentation pages
    │   ├── introduction.mdx
    │   ├── how-to-install.mdx
    │   └── ...
    └── meta.json          # Navigation metadata
```

### What goes here:
- **MDX files** (`.mdx`): Documentation pages written in Markdown + React
- **meta.json**: Navigation structure and page metadata

### When to add files:
- Adding new component documentation → `content/docs/base-components/{component}.mdx`
- Adding general docs → `content/docs/documentation/{page}.mdx`
- Updating navigation → Edit `meta.json` files

### Example MDX Structure:
```mdx
---
title: Accordion
description: A collapsible content component
---

# Accordion

<Description>
  Component description here
</Description>

<ComponentPreview name="accordion" />
```

---

## 🌐 `public/` - Static Assets

**Purpose**: Files served directly by Next.js (not processed)

```
public/
├── audio/              # Sound effects
├── images/            # Images (component screenshots, etc.)
├── registry/          # Generated registry JSON files
│   ├── react/
│   │   ├── index.json
│   │   └── accordion.json
│   └── solid/
└── schema/            # JSON schemas for validation
```

### What goes here:
- **Images**: Component screenshots, logos, etc.
- **Registry JSON**: Generated component registry files (auto-generated)
- **Audio**: UI sound effects
- **Schemas**: JSON schema files for validation

### When to add files:
- Adding images → `public/images/`
- Registry files are **auto-generated** (don't edit manually)
- Adding schemas → `public/schema/`

---

## 🎯 `src/app/` - Next.js App Router

**Purpose**: Next.js 13+ App Router directory (pages and API routes)

```
src/app/
├── api/                    # API routes
│   ├── registry/          # Registry API endpoints
│   └── search/            # Search API endpoint
├── docs/                   # Documentation pages route
│   ├── [[...slug]]/       # Dynamic catch-all route
│   └── layout.tsx         # Docs layout
├── layout.tsx             # Root layout
├── page.tsx               # Home page
└── styles/                # Global styles
    ├── globals.css
    └── docs.css
```

### What goes here:
- **API Routes**: Server-side API endpoints (`route.ts` files)
- **Pages**: React Server Components (`.tsx` files)
- **Layouts**: Layout components that wrap pages
- **Styles**: Global CSS files

### When to add files:
- Adding API endpoint → `src/app/api/{route}/route.ts`
- Adding new page → `src/app/{route}/page.tsx`
- Adding layout → `src/app/{route}/layout.tsx`

### Key Files:
- `src/app/layout.tsx`: Root layout (wraps entire app)
- `src/app/docs/[[...slug]]/page.tsx`: Dynamic docs pages (renders MDX content)
- `src/app/api/registry/`: Serves registry JSON files

---

## 🧩 `src/components/` - Website Components

**Purpose**: React components used to build the website UI

```
src/components/
├── code/              # Code block components
│   ├── code-block.tsx
│   ├── copy-button.tsx
│   └── ...
├── mdx/               # MDX-specific components
│   ├── badge-link.tsx
│   ├── description.tsx
│   ├── note.tsx
│   └── ...
├── preview/           # Component preview components
│   ├── component-preview.tsx
│   └── component-preview-tabs.tsx
├── layout/            # Layout components
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── ...
├── ui/                # Reusable UI components
│   ├── tabs.tsx
│   ├── theme-toggle.tsx
│   └── ...
├── icons/             # Icon components
│   ├── react-icon.tsx
│   └── ...
├── theme/             # Theme-related components
│   └── theme-provider.tsx
└── graphics/          # Graphics/animations
    └── glsl-hills.tsx
```

### Component Categories:

#### `code/` - Code Display Components
**Purpose**: Display and interact with code blocks  
**Examples**: Code highlighting, copy buttons, code block wrappers  
**When to add**: Creating new code display features

#### `mdx/` - MDX Components
**Purpose**: Custom components used in MDX documentation  
**Examples**: `<Note>`, `<Description>`, `<BadgeLink>`  
**When to add**: Adding new MDX components for docs

#### `preview/` - Component Previews
**Purpose**: Display live component demos  
**Examples**: Component preview tabs, framework switcher  
**When to add**: Enhancing component preview functionality

#### `layout/` - Layout Components
**Purpose**: Page structure components  
**Examples**: Navbar, footer, sidebar  
**When to add**: Adding/changing site layout

#### `ui/` - Reusable UI Components
**Purpose**: Generic UI components used throughout the site  
**Examples**: Tabs, buttons, tooltips  
**When to add**: Creating reusable UI elements

#### `icons/` - Icon Components
**Purpose**: SVG icon components  
**Examples**: Framework icons, brand icons  
**When to add**: Adding new icons

#### `theme/` - Theme Components
**Purpose**: Theme-related functionality  
**Examples**: Theme provider, theme toggle  
**When to add**: Theme-related features

#### `graphics/` - Graphics/Animations
**Purpose**: Visual effects and animations  
**Examples**: Background graphics, animations  
**When to add**: Adding visual effects

---

## 🎨 `src/demos/` - Component Demos

**Purpose**: Demo/example components shown in documentation

```
src/demos/
├── manifest/              # Component manifests (metadata)
│   └── base/
│       └── accordion.ts   # Defines examples for accordion
└── react/                 # React demo components
    └── base/
        └── accordion/
            ├── accordion-demo.tsx
            ├── accordion-multiple.tsx
            └── ...
```

### What goes here:
- **Manifests** (`manifest/`): Define which examples exist and their metadata
- **Demo Components** (`react/`, `solid/`, etc.): Actual demo component code

### When to add files:
- Adding new component demo → `src/demos/react/{category}/{component}/{example-name}.tsx`
- Adding manifest → `src/demos/manifest/{category}/{component}.ts`

### Example Manifest:
```typescript
// src/demos/manifest/base/accordion.ts
import type { ComponentManifest } from "@/lib/registry/registry";

const manifest: ComponentManifest = {
  examples: [
    { name: "accordion-demo", title: "Basic Accordion" },
    { name: "accordion-multiple", title: "Multiple Items" },
  ],
};

export default manifest;
```

### Example Demo Component:
```tsx
// src/demos/react/base/accordion/accordion-demo.tsx
"use client";

import { Accordion } from "@ocean-ui/react";

export default function AccordionDemo() {
  return (
    <Accordion>
      {/* Demo code */}
    </Accordion>
  );
}
```

---

## 🛠️ `src/lib/` - Utilities & Shared Code

**Purpose**: Shared utilities, types, and helper functions

```
src/lib/
├── utils.ts                    # General utilities (cn, etc.)
├── components.ts               # Component metadata list
├── source.ts                  # MDX source configuration
├── layout.shared.tsx          # Shared layout components
│
├── registry/                  # Registry-related utilities
│   ├── registry.ts           # Registry types
│   ├── registry.server.ts    # Server-side registry functions
│   ├── registry.utils.ts     # Registry utility functions
│   └── import-transformer.ts # Import transformation
│
├── mdx/                       # MDX-related utilities
│   └── components.tsx        # MDX component mappings
│
└── contexts/                  # React context providers
    └── framework-context.tsx  # Framework selection context
```

### What goes here:

#### Root Level (`lib/`)
- **`utils.ts`**: General utilities like `cn()` (className merge)
- **`components.ts`**: List of all available components
- **`source.ts`**: Fumadocs source configuration
- **`layout.shared.tsx`**: Shared layout components

#### `lib/registry/` - Registry Utilities
**Purpose**: Code for loading and processing component registry  
**Files**:
- `registry.ts`: TypeScript types for registry
- `registry.server.ts`: Server-side functions to load components
- `registry.utils.ts`: Helper functions for registry operations
- `import-transformer.ts`: Transforms imports in code blocks

**When to edit**: When modifying registry loading logic

#### `lib/mdx/` - MDX Utilities
**Purpose**: MDX component configuration  
**Files**:
- `components.tsx`: Maps MDX components to React components

**When to edit**: When adding/removing MDX components

#### `lib/contexts/` - Context Providers
**Purpose**: React context providers  
**Files**:
- `framework-context.tsx`: Manages framework selection state

**When to edit**: When adding new context providers

---

## 🔄 Data Flow

### How Documentation Works:

1. **MDX Files** (`content/docs/`) → Written by developers
2. **Fumadocs** (`source.config.ts`) → Processes MDX files
3. **App Router** (`src/app/docs/[[...slug]]/page.tsx`) → Renders pages
4. **MDX Components** (`src/lib/mdx/components.tsx`) → Maps custom components
5. **Components** (`src/components/`) → Render UI

### How Component Previews Work:

1. **Demo Components** (`src/demos/react/`) → Written by developers
2. **Manifests** (`src/demos/manifest/`) → Define which demos exist
3. **Registry Server** (`src/lib/registry/registry.server.ts`) → Loads demos
4. **Preview Component** (`src/components/preview/component-preview.tsx`) → Displays demos
5. **MDX** (`content/docs/base-components/{component}.mdx`) → Uses `<ComponentPreview>`

### How Component System Works:

1. **Component Source** (`packages/ui-react/`) → Actual component code
2. **Component Metadata** (`src/lib/components.ts`) → Component list and metadata
3. **Demo Components** (`src/demos/`) → Example implementations
4. **Manifests** (`src/demos/manifest/`) → Define available examples
5. **Documentation Website** → Displays components and code for copy-paste

---

## 📝 Quick Reference: Where to Put What

| What You're Adding | Where It Goes |
|---------------------|---------------|
| New component documentation page | `content/docs/base-components/{component}.mdx` |
| New demo component | `src/demos/react/{category}/{component}/{example}.tsx` |
| New MDX component (like `<Note>`) | `src/components/mdx/{component}.tsx` |
| New API endpoint | `src/app/api/{route}/route.ts` |
| New page | `src/app/{route}/page.tsx` |
| New layout component | `src/components/layout/{component}.tsx` |
| New utility function | `src/lib/utils.ts` or `src/lib/{category}/` |
| New icon | `src/components/icons/{icon}.tsx` |
| New image | `public/images/{image}.png` |

---

## 🎓 Best Practices

### File Naming
- **Components**: PascalCase (`ComponentName.tsx`)
- **Utilities**: camelCase (`utilityFunction.ts`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Routes**: lowercase with hyphens (`[framework]/route.ts`)

### Import Paths
- Use `@/` alias for `src/` directory
- Example: `import { cn } from "@/lib/utils"`
- Example: `import { Button } from "@/components/ui/button"`

### Component Organization
- Keep components small and focused
- Group related components in folders
- Use index files for clean imports (if needed)

### Documentation
- Write clear component descriptions
- Include usage examples
- Document props and types

---

## 🚀 Common Tasks

### Adding a New Component Documentation Page

1. Create MDX file: `content/docs/base-components/{component}.mdx`
2. Add to navigation: Edit `content/docs/base-components/meta.json`
3. Create demo: `src/demos/react/base/{component}/{component}-demo.tsx`
4. Create manifest: `src/demos/manifest/base/{component}.ts`
5. Add component to `src/lib/components.ts`

### Adding a New MDX Component

1. Create component: `src/components/mdx/{component}.tsx`
2. Export from: `src/lib/mdx/components.tsx`
3. Use in MDX: `<ComponentName>content</ComponentName>`

### Adding a New API Endpoint

1. Create route: `src/app/api/{route}/route.ts`
2. Export `GET`, `POST`, etc. functions
3. Return `NextResponse.json()`

---

## 📚 Related Documentation

- [Demos README](./src/demos/README.md) - Component demo structure
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines
- [README.md](../../README.md) - Project overview

---

## ❓ Questions?

If you're unsure where a file should go:

1. **Is it documentation content?** → `content/docs/`
2. **Is it a React component for the website?** → `src/components/`
3. **Is it a demo/example?** → `src/demos/`
4. **Is it a utility function?** → `src/lib/`
5. **Is it a static asset?** → `public/`
6. **Is it a page or API route?** → `src/app/`

When in doubt, check existing similar files to see where they're located!

