# Contributing to Ocean UI

Thank you for your interest in contributing to Ocean UI! This guide will help you understand how to contribute components, fix bugs, and improve the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Adding New Components](#adding-new-components)
- [Registry System](#registry-system)
- [Testing](#testing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- TypeScript 5+
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/ocean-ui.git
   cd ocean-ui
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the project:
   ```bash
   pnpm build
   ```

## Adding New Components

### Step 1: Create Component Files

Create your component in the appropriate framework directory:

**For React:**

```
apps/website/src/components/library/react/base/[component-name].tsx
```

**For SolidJS:**

```
packages/ui-solid/src/components/[component-name].tsx
```

### Step 2: Component Structure

Your component should follow this structure:

```typescript
// Example: accordion.tsx
import { Accordion } from '@ark-ui/react/accordion'
import { cn } from '@/lib/utils'

export interface AccordionProps {
  // Component props
}

export function AccordionComponent(props: AccordionProps) {
  return (
    <Accordion.Root>
      {/* Component implementation */}
    </Accordion.Root>
  )
}
```

### Step 3: Component Requirements

- ✅ Built on Ark UI primitives
- ✅ Accessible (follows WAI-ARIA guidelines)
- ✅ Responsive design
- ✅ TypeScript types exported
- ✅ Uses Tailwind CSS for styling
- ✅ Uses `cn()` utility for class merging
- ✅ Follows existing component patterns

### Step 4: Add Component Metadata

When adding a new component, ensure it's included in the registry generation process. The registry generator will:

1. Scan component files
2. Extract dependencies from imports
3. Generate component metadata
4. Create registry JSON files

## Registry System

### How Registry Works

The registry system stores component metadata and source code in JSON format:

```json
{
  "name": "accordion",
  "type": "registry:ui",
  "title": "Accordion",
  "description": "A vertically stacked set of interactive headings...",
  "dependencies": ["@ark-ui/react", "lucide-react"],
  "files": [
    {
      "content": "import { Accordion } from '@ark-ui/react/accordion'...",
      "path": "accordion.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### Registry Generation Process

1. **Component Reader** (`packages/scripts/src/commands/registry/component-reader.ts`)

   - Reads component source files
   - Extracts dependencies from imports
   - Parses component metadata

2. **Registry Generator** (`packages/scripts/src/commands/registry/generate-registry.ts`)

   - Generates registry JSON files
   - Creates index files
   - Validates registry structure

3. **Registry Validator** (`packages/scripts/src/commands/registry/validate-registry.ts`)
   - Validates JSON schema
   - Checks for missing dependencies
   - Verifies component structure

### Testing Registry Changes

```bash
# Test component in docs (if running docs locally)
pnpm --filter @ocean-ui/website dev
# Visit: http://localhost:3000/docs/base-components/[component-name]
```

## Testing

### Component Testing

1. **Manual Testing**

   - Copy component code into a test project
   - Verify it works correctly
   - Check TypeScript types
   - Test accessibility with screen readers

2. **Visual Testing**
   - Test in different browsers
   - Verify responsive behavior
   - Check dark mode support (if applicable)

### Registry Testing

```bash
# Test component in docs (if running docs locally)
pnpm --filter @ocean-ui/website dev
# Visit: http://localhost:3000/docs/base-components/[component-name]
```

## Code Style

### TypeScript

- Use TypeScript strict mode
- Export types and interfaces
- Use meaningful type names
- Avoid `any` type

### Component Code

- Use functional components
- Follow React/SolidJS best practices
- Use semantic HTML elements
- Include proper accessibility attributes

### Import Organization

```typescript
// 1. External dependencies
import { Accordion } from "@ark-ui/react/accordion";

// 2. Internal utilities
import { cn } from "@/lib/utils";

// 3. Types
import type { AccordionProps } from "./types";
```

### Naming Conventions

- Components: PascalCase (`AccordionComponent`)
- Files: kebab-case (`accordion.tsx`)
- Functions: camelCase (`getComponentName`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

## Pull Request Process

### Before Submitting

1. ✅ Component follows structure guidelines
2. ✅ Component code is copy-paste ready
3. ✅ TypeScript types are correct
4. ✅ Accessibility tested
5. ✅ Code follows style guidelines

### PR Checklist

- [ ] Component works in both React and SolidJS (if applicable)
- [ ] Dependencies are correctly listed
- [ ] Documentation updated (if needed)
- [ ] Tests pass (if applicable)
- [ ] No TypeScript errors
- [ ] No linting errors

### PR Description

Include:

- Component name and description
- Framework support (React/SolidJS)
- Dependencies added
- Testing performed
- Screenshots (if visual changes)

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, PR will be merged
4. Changes will be available on the documentation website

## Common Issues

### Component Not Appearing in Documentation

- Ensure component file exists in correct location
- Check that component is listed in `src/lib/components.ts`
- Verify component name matches file name
- Ensure demo files are created in `src/demos/`

### Dependencies Not Detected

- Ensure imports are at top of file
- Use named imports (not default imports)
- Check dependency names match npm package names

### TypeScript Errors

- Run `pnpm type-check` to find errors
- Ensure all types are exported
- Check import paths are correct

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be descriptive in issue reports
- Include reproduction steps

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Memory Trick**: Contributing to Ocean UI is like adding a new fish to the ocean - make sure it follows the ecosystem's patterns (Ark UI, accessibility, TypeScript) and the registry will help it swim with the rest!

## Summary

This contributing guide covers how to add new components to Ocean UI, including creating component files, generating registry entries, testing components, and submitting pull requests. The registry system automatically extracts dependencies and metadata from components, making it easy to add new components. Follow the code style guidelines, test thoroughly, and ensure components are copy-paste ready before submitting PRs.
