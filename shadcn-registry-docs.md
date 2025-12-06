# Complete Component Flow: From Base UI to User Installation

This document traces the complete journey of a component (using Accordion as an example) from initial development using Base UI primitives to final installation in a user's project via shadcn CLI.

## Complete Flow Diagram

```mermaid
graph TB
    subgraph "PHASE 1: Component Development"
        A[Base UI Primitive<br/>@base-ui-components/react/accordion] --> B[Create Component Wrapper<br/>src/registry/components/ui/accordion.tsx]
        B --> C[Add Tailwind CSS Classes<br/>cn utility + Tailwind classes]
        C --> D[Define CSS Variables<br/>--animate-accordion-collapse<br/>--animate-accordion-expand]
        D --> E[Define Keyframes<br/>@keyframes accordion-collapse<br/>@keyframes accordion-expand]
        E --> F[Export Components<br/>Accordion, AccordionItem<br/>AccordionTrigger, AccordionContent]
    end

    subgraph "PHASE 2: Registry Configuration"
        F --> G[Add to registry.json<br/>Root level registry file]
        G --> H[Define Component Metadata<br/>name, type, title, description]
        H --> I[Specify Dependencies<br/>@base-ui-components/react<br/>lucide-react]
        I --> J[Define File Path<br/>src/registry/components/ui/accordion.tsx]
        J --> K[Add CSS Variables<br/>cssVars.theme object]
        K --> L[Add Keyframes<br/>css object with @keyframes]
    end

    subgraph "PHASE 3: Documentation & Demos"
        F --> M[Create Demo Component<br/>src/components/demo/accordion-demo.tsx]
        M --> N[Register Demo in Index<br/>src/registry/__index__.tsx<br/>accordion-demo entry]
        N --> O[Create MDX Documentation<br/>content/docs/components/accordion.mdx]
        O --> P[Add ComponentPreview<br/>&lt;ComponentPreview name='accordion-demo' /&gt;]
        P --> Q[Add Installation Code Block<br/>&lt;CodeBlockCommand component='accordion' /&gt;]
        Q --> R[Add Examples & Migration Guide<br/>Multiple ComponentPreview instances]
    end

    subgraph "PHASE 4: Build & Generate Registry"
        L --> S[Run Build Command<br/>pnpm registry:build]
        S --> T[shadcn build CLI<br/>Reads registry.json]
        T --> U[Read Source Files<br/>Reads accordion.tsx content]
        U --> V[Convert to JSON String<br/>Escapes quotes, newlines]
        V --> W[Generate Individual JSON<br/>public/r/accordion.json]
        W --> X[Include Full Component Code<br/>files[0].content string]
        X --> Y[Include CSS Variables<br/>cssVars object]
        Y --> Z[Include Keyframes<br/>css object]
        Z --> AA[Include Metadata<br/>name, dependencies, etc.]
    end

    subgraph "PHASE 5: CSS Integration"
        L --> AB[Add CSS to global.css<br/>src/app/global.css]
        AB --> AC[Add CSS Variables to @theme<br/>--animate-accordion-collapse<br/>--animate-accordion-expand]
        AC --> AD[Add Keyframes<br/>@keyframes accordion-collapse<br/>@keyframes accordion-expand]
        AD --> AE[Tailwind Processes CSS<br/>Makes animations available]
    end

    subgraph "PHASE 6: Deployment"
        AA --> AF[Deploy to Production<br/>basecn.dev]
        AF --> AG[Static Files Served<br/>public/r/accordion.json<br/>Available at:<br/>https://basecn.dev/r/accordion.json]
        AE --> AF
    end

    subgraph "PHASE 7: User Installation"
        AG --> AH[User Configures Registry<br/>components.json in their project]
        AH --> AI[Add Registry Entry<br/>'@basecn': 'https://basecn.dev/r/{name}.json']
        AI --> AJ[User Runs Install Command<br/>pnpm dlx shadcn@latest add @basecn/accordion]
        AJ --> AK[shadcn CLI Downloads<br/>Temporarily downloads from npm]
        AK --> AL[CLI Reads components.json<br/>Finds @basecn registry]
        AL --> AM[Resolves Registry URL<br/>@basecn/accordion →<br/>https://basecn.dev/r/accordion.json]
        AM --> AN[Fetches JSON from Server<br/>HTTP GET request to basecn.dev]
        AN --> AO[Parses JSON Response<br/>Extracts component data]
        AO --> AP[Reads Component Code<br/>files[0].content string]
        AP --> AQ[Reads CSS Variables<br/>cssVars.theme object]
        AQ --> AR[Reads Keyframes<br/>css object]
        AR --> AS[Writes Component File<br/>components/ui/accordion.tsx<br/>in user's project]
        AS --> AT[Updates Global CSS<br/>app/globals.css or src/app/global.css<br/>Appends CSS variables & keyframes]
        AT --> AU[Installs Dependencies<br/>npm install @base-ui-components/react<br/>npm install lucide-react]
        AU --> AV[Component Ready to Use<br/>User can import and use]
    end

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style G fill:#ffe1f5
    style M fill:#e1ffe1
    style S fill:#f5e1ff
    style AF fill:#ffe1e1
    style AJ fill:#e1ffff
    style AV fill:#e1ffe1
```

## Detailed Step-by-Step Flow

### Phase 1: Component Development

#### Step 1.1: Start with Base UI Primitive

```typescript
// Base UI provides unstyled, accessible primitives
import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
```

- **Location**: External package `@base-ui-components/react`
- **Purpose**: Provides accessibility, keyboard navigation, ARIA attributes
- **No styling**: Completely unstyled, just functionality

#### Step 1.2: Create Component Wrapper

```typescript
// src/registry/components/ui/accordion.tsx
function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root data-slot="accordion" keepMounted {...props} />
  );
}
```

- **File**: `src/registry/components/ui/accordion.tsx`
- **Purpose**: Wraps Base UI primitive with Tailwind styling
- **Pattern**: Each Base UI component gets a styled wrapper

#### Step 1.3: Add Tailwind CSS Classes

```typescript
className={cn(
  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-panel-open]>svg]:rotate-180",
  className
)}
```

- **Tool**: `cn()` utility (clsx + tailwind-merge)
- **Purpose**: Apply Tailwind classes for styling
- **Features**: Responsive, accessible, themeable

#### Step 1.4: Define CSS Variables

```typescript
// In registry.json
"cssVars": {
  "theme": {
    "--animate-accordion-collapse": "accordion-collapse var(--tw-duration, 200ms) ease-out",
    "--animate-accordion-expand": "accordion-expand var(--tw-duration, 200ms) ease-out"
  }
}
```

- **Location**: `registry.json` → component entry → `cssVars`
- **Purpose**: Define animation variables for Tailwind
- **Usage**: Referenced in component classes like `animate-accordion-collapse`

#### Step 1.5: Define Keyframes

```typescript
// In registry.json
"css": {
  "@keyframes accordion-collapse": {
    "from": { "height": "var(--accordion-panel-height, auto)" },
    "to": { "height": "0" }
  },
  "@keyframes accordion-expand": {
    "from": { "height": "0" },
    "to": { "height": "var(--accordion-panel-height, auto)" }
  }
}
```

- **Location**: `registry.json` → component entry → `css`
- **Purpose**: Define animation keyframes for expand/collapse
- **CSS Variables**: Uses `var(--accordion-panel-height, auto)` for dynamic height

#### Step 1.6: Export Components

```typescript
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

- **Purpose**: Make components available for import
- **Usage**: Used in demos, docs, and user projects

---

### Phase 2: Registry Configuration

#### Step 2.1: Add to registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "basecn",
  "items": [
    {
      "name": "accordion",
      "type": "registry:ui",
      ...
    }
  ]
}
```

- **File**: `registry.json` (root level)
- **Purpose**: Master registry of all components
- **Schema**: Validates against shadcn registry schema

#### Step 2.2: Define Component Metadata

```json
{
  "name": "accordion",
  "type": "registry:ui",
  "title": "Accordion",
  "description": "A set of collapsible panels with headings."
}
```

- **Fields**: name (kebab-case), type, title, description
- **Purpose**: Metadata for CLI and documentation

#### Step 2.3: Specify Dependencies

```json
{
  "dependencies": ["@base-ui-components/react", "lucide-react"],
  "registryDependencies": ["@basecn/input", "@basecn/button"]
}
```

- **dependencies**: npm packages required
- **registryDependencies**: Other components from this registry
- **Purpose**: CLI installs these automatically

#### Step 2.4: Define File Path

```json
{
  "files": [
    {
      "path": "src/registry/components/ui/accordion.tsx",
      "type": "registry:ui"
    }
  ]
}
```

- **path**: Relative to project root
- **type**: Component type (registry:ui, registry:hook, etc.)
- **Purpose**: Tells build tool where to find source

---

### Phase 3: Documentation & Demos

#### Step 3.1: Create Demo Component

```typescript
// src/components/demo/accordion-demo.tsx
import { Accordion, AccordionContent, ... } from "@/registry/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-sm mx-auto" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>...</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

- **File**: `src/components/demo/accordion-demo.tsx`
- **Purpose**: Live example for documentation
- **Usage**: Shows component in action

#### Step 3.2: Register Demo in Index

```typescript
// src/registry/__index__.tsx
export const components = {
  "accordion-demo": {
    component: React.lazy(() => import("@/components/demo/accordion-demo")),
    src: "src/components/demo/accordion-demo.tsx",
  },
  // ... more demos
};
```

- **File**: `src/registry/__index__.tsx`
- **Purpose**: Central registry of all demo components
- **Lazy Loading**: Uses React.lazy for code splitting

#### Step 3.3: Create MDX Documentation

```mdx
---
title: Accordion
description: A set of collapsible panels with headings.
---

<ComponentPreview name="accordion-demo" />

## Installation

<CodeBlockCommand component="accordion" />
```

- **File**: `content/docs/components/accordion.mdx`
- **Purpose**: Documentation page for component
- **Features**: Preview, installation, examples, migration guide

#### Step 3.4: Add ComponentPreview

```mdx
<ComponentPreview name="accordion-demo" />
```

- **Component**: `ComponentPreview` (from `src/components/component-preview.tsx`)
- **Purpose**: Renders demo with preview + code tabs
- **Features**: Live preview, source code display, copy button

#### Step 3.5: Add Installation Code Block

```mdx
<CodeBlockCommand component="accordion" />
```

- **Component**: `CodeBlockCommand` (from `src/components/code-block-command.tsx`)
- **Purpose**: Shows installation commands for different package managers
- **Output**: Generates commands like `pnpm dlx shadcn@latest add https://basecn.dev/r/accordion.json`

---

### Phase 4: Build & Generate Registry

#### Step 4.1: Run Build Command

```bash
pnpm registry:build
```

- **Script**: Defined in `package.json`
- **Command**: `shadcn build`
- **Purpose**: Generate registry JSON files

#### Step 4.2: shadcn build CLI

- **Package**: `shadcn` (version 3.5.0)
- **Location**: `node_modules/shadcn`
- **Action**: Reads `registry.json` from project root

#### Step 4.3: Read Source Files

- **Process**: For each component in `registry.json`
- **Action**: Reads file content from `files[].path`
- **Example**: Reads `src/registry/components/ui/accordion.tsx`

#### Step 4.4: Convert to JSON String

- **Process**: Escapes quotes, newlines, special characters
- **Result**: Component code becomes a string in JSON
- **Format**: `"content": "\"use client\";\n\nimport { ... }"`

#### Step 4.5: Generate Individual JSON

- **Output**: `public/r/accordion.json`
- **Structure**: Single component registry item
- **Schema**: Validates against `registry-item.json` schema

#### Step 4.6: Include Full Component Code

```json
{
  "files": [
    {
      "path": "src/registry/components/ui/accordion.tsx",
      "content": "\"use client\";\n\nimport { ... }",
      "type": "registry:ui"
    }
  ]
}
```

- **Purpose**: Complete source code for installation
- **Usage**: CLI writes this to user's project

#### Step 4.7: Include CSS Variables

```json
{
  "cssVars": {
    "theme": {
      "--animate-accordion-collapse": "accordion-collapse var(--tw-duration, 200ms) ease-out",
      "--animate-accordion-expand": "accordion-expand var(--tw-duration, 200ms) ease-out"
    }
  }
}
```

- **Purpose**: CSS variables for Tailwind animations
- **Usage**: CLI adds to user's global CSS

#### Step 4.8: Include Keyframes

```json
{
  "css": {
    "@keyframes accordion-collapse": { ... },
    "@keyframes accordion-expand": { ... }
  }
}
```

- **Purpose**: Animation keyframes
- **Usage**: CLI adds to user's global CSS

---

### Phase 5: CSS Integration

#### Step 5.1: Add CSS to global.css

- **File**: `src/app/global.css`
- **Purpose**: Make CSS available in your own project
- **Location**: Added to `@theme` block and root level

#### Step 5.2: Add CSS Variables to @theme

```css
@theme inline {
  --animate-accordion-collapse: accordion-collapse var(--tw-duration, 100ms)
    ease-out;
  --animate-accordion-expand: accordion-expand var(--tw-duration, 200ms)
    ease-out;
}
```

- **Purpose**: Tailwind CSS v4 theme variables
- **Usage**: Makes animations available as Tailwind utilities

#### Step 5.3: Add Keyframes

```css
@keyframes accordion-collapse {
  from {
    height: var(--accordion-panel-height, auto);
  }
  to {
    height: 0;
  }
}

@keyframes accordion-expand {
  from {
    height: 0;
  }
  to {
    height: var(--accordion-panel-height, auto);
  }
}
```

- **Purpose**: Define animation keyframes
- **Usage**: Referenced by CSS variables

#### Step 5.4: Tailwind Processes CSS

- **Process**: Tailwind CSS v4 processes `@theme` and `@keyframes`
- **Result**: Animations become available as utilities
- **Usage**: Classes like `animate-accordion-collapse` work

---

### Phase 6: Deployment

#### Step 6.1: Deploy to Production

- **Platform**: Deployed to `basecn.dev`
- **Process**: `public/` folder becomes static files
- **Result**: All JSON files accessible via HTTP

#### Step 6.2: Static Files Served

- **URL**: `https://basecn.dev/r/accordion.json`
- **Type**: Static JSON file
- **Access**: Public HTTP endpoint
- **No Auth**: No authentication required (public registry)

---

### Phase 7: User Installation

#### Step 7.1: User Configures Registry

```json
// User's project: components.json
{
  "registries": {
    "@basecn": "https://basecn.dev/r/{name}.json"
  }
}
```

- **File**: User creates `components.json` in their project
- **Purpose**: Tells shadcn CLI where to find components
- **Format**: Namespace → URL template

#### Step 7.2: User Runs Install Command

```bash
pnpm dlx shadcn@latest add @basecn/accordion
```

- **Command**: `pnpm dlx` downloads and runs `shadcn@latest`
- **Action**: `shadcn add @basecn/accordion`
- **Purpose**: Install component from your registry

#### Step 7.3: shadcn CLI Downloads

- **Process**: `pnpm dlx` temporarily downloads `shadcn` from npm
- **Location**: Not installed, just executed
- **Version**: Latest version (`@latest`)

#### Step 7.4: CLI Reads components.json

- **File**: User's `components.json`
- **Action**: Finds `@basecn` registry entry
- **Result**: Gets URL template `https://basecn.dev/r/{name}.json`

#### Step 7.5: Resolves Registry URL

- **Input**: `@basecn/accordion`
- **Process**: Replaces `{name}` with `accordion`
- **Output**: `https://basecn.dev/r/accordion.json`

#### Step 7.6: Fetches JSON from Server

- **Method**: HTTP GET request
- **URL**: `https://basecn.dev/r/accordion.json`
- **Response**: JSON file with component data

#### Step 7.7: Parses JSON Response

- **Process**: Validates against registry-item schema
- **Extracts**: Component code, CSS, dependencies, metadata
- **Validates**: Ensures all required fields present

#### Step 7.8: Reads Component Code

- **Source**: `files[0].content` (string)
- **Process**: Unescapes JSON string
- **Result**: Original TypeScript code

#### Step 7.9: Reads CSS Variables

- **Source**: `cssVars.theme` object
- **Process**: Extracts CSS variable definitions
- **Result**: CSS variable declarations

#### Step 7.10: Reads Keyframes

- **Source**: `css` object
- **Process**: Extracts keyframe definitions
- **Result**: `@keyframes` CSS rules

#### Step 7.11: Writes Component File

- **Location**: `components/ui/accordion.tsx` (user's project)
- **Content**: Component code from JSON
- **Process**: Creates file with proper imports

#### Step 7.12: Updates Global CSS

- **File**: `app/globals.css` or `src/app/global.css`
- **Action**: Appends CSS variables and keyframes
- **Format**: Adds to `@theme` block and root level

#### Step 7.13: Installs Dependencies

```bash
npm install @base-ui-components/react lucide-react
```

- **Process**: Reads `dependencies` from JSON
- **Action**: Runs package manager install
- **Result**: Dependencies available in user's project

#### Step 7.14: Component Ready to Use

```typescript
// User can now import and use
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
```

- **Status**: Component fully installed
- **Usage**: User imports and uses in their code
- **Styling**: CSS variables and keyframes active

---

## File Structure Reference

```
basecn-main/
├── src/
│   ├── registry/
│   │   ├── components/ui/
│   │   │   └── accordion.tsx          ← Component implementation
│   │   └── __index__.tsx              ← Demo component registry
│   ├── components/
│   │   ├── demo/
│   │   │   └── accordion-demo.tsx     ← Demo component
│   │   ├── component-preview.tsx      ← Preview component
│   │   └── code-block-command.tsx    ← Installation commands
│   └── app/
│       └── global.css                 ← CSS variables & keyframes
├── content/
│   └── docs/
│       └── components/
│           └── accordion.mdx          ← Documentation
├── registry.json                       ← Master registry
├── components.json                    ← shadcn config (for this project)
└── public/
    └── r/
        └── accordion.json             ← Generated registry file
```

## Key Technologies & Tools

- **Base UI**: `@base-ui-components/react` - Unstyled primitives
- **Tailwind CSS**: Styling utility classes
- **shadcn CLI**: Component installation tool
- **Next.js**: Framework for documentation site
- **MDX**: Markdown with React components
- **pnpm**: Package manager
- **JSON Schema**: Registry validation

## Important Notes

1. **No shadcn Team Involvement**: Your registry works independently. No need to contact shadcn team or add to their repo.

2. **Decentralized System**: Any registry following the schema works with shadcn CLI.

3. **Two Installation Methods**:

   - Direct URL: `shadcn add https://basecn.dev/r/accordion.json`
   - Namespaced: `shadcn add @basecn/accordion` (requires `components.json` config)

4. **CSS Processing**: Tailwind CSS v4 processes `@theme` and `@keyframes` automatically.

5. **Build Process**: `shadcn build` reads `registry.json` and generates individual JSON files in `public/r/`.

6. **Static Files**: Registry JSON files are just static files served via HTTP. No special server needed.
