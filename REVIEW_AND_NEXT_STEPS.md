# Ocean-ui Project Review & Next Steps

## ✅ Completed Phases

### Phase 1: Monorepo Shell & Basic Structure ✅
- Monorepo structure with `pnpm-workspace.yaml`
- Turbo configuration for builds
- TypeScript base config with path aliases
- `apps/docs/` Next.js app moved from root
- `packages/utils/` with shared utilities (`cn` function)
- `packages/ui-react/` structure ready (currently only exports utils)

### Phase 2: Design Tokens & SolidJS Package ✅
- `packages/tokens/` package created with `tokens.css` (CSS variables)
- `packages/ui-solid/` package created with proper dependencies:
  - `@ark-ui/solid` - Headless UI primitives
  - `lucide-solid` - Icons
  - `@ocean-ui/tokens` - Design tokens
  - `@ocean-ui/utils` - Shared utilities
- All workspace dependencies linked correctly
- TypeScript compilation passes

---

## 🚧 Remaining Work

### Phase 3: Registry System (NOT STARTED)

**Purpose**: Create a shadcn-style registry system that allows users to copy component code for React or SolidJS.

**Required Files**:

1. **Registry Structure** (`apps/docs/src/registry/`):
   ```
   registry/
   ├── manifest/              # Shared manifests (single source of truth)
   │   └── accordion.ts       # Example definitions
   ├── react/                 # React component examples
   │   └── accordion/
   │       ├── basic.tsx
   │       └── with-icon.tsx
   └── solid/                 # SolidJS component examples
       └── accordion/
           ├── basic.tsx
           └── with-icon.tsx
   ```

2. **Registry Library Files** (`apps/docs/src/lib/`):
   - `components.ts` - Component list (single source of truth)
   - `registry.ts` - Type definitions (`ComponentManifest`, `ComponentRegistry`, etc.)
   - `registry.utils.ts` - Framework mapping, manifest loading, URL parsing
   - `registry.server.ts` - Server-side file reading, source code extraction

3. **Registry API Route** (`apps/docs/src/app/r/[frameworkCode]/[componentIndex]/[exampleIndex]/route.ts`):
   - URL format: `/r/r/0/0.json` → React, accordion (index 0), basic example (index 0)
   - URL format: `/r/s/0/0.json` → Solid, accordion (index 0), basic example (index 0)
   - Framework codes: `react` → `r`, `solid` → `s`
   - Returns shadcn-compatible JSON with:
     - Component source code
     - Dependencies
     - CSS variables
     - CSS styles

**Reference Implementation**: See `TarkUI/tarkui/lib/` for complete registry implementation.

---

### Phase 4: First Component Implementation (Accordion) (NOT STARTED)

**Purpose**: Implement a complete vertical slice - component in both frameworks + registry + docs.

**Tasks**:

1. **React Accordion** (`packages/ui-react/src/components/ui/accordion/accordion.tsx`):
   - Use `@ark-ui/react/accordion` as base
   - Follow Web Interface Guidelines (accessibility, keyboard navigation)
   - Export from `packages/ui-react/src/index.ts`

2. **SolidJS Accordion** (`packages/ui-solid/src/components/ui/accordion/accordion.tsx`):
   - Use `@ark-ui/solid/accordion` as base
   - Mirror React API (same prop names, variants)
   - Use SolidJS patterns (`<For>`, signals, `class` instead of `className`)
   - Export from `packages/ui-solid/src/index.ts`

3. **Registry Examples**:
   - Create `apps/docs/src/registry/manifest/accordion.ts`
   - Create React examples in `apps/docs/src/registry/react/accordion/`
   - Create Solid examples in `apps/docs/src/registry/solid/accordion/`

4. **Documentation**:
   - Create `apps/docs/content/docs/components/accordion.mdx`
   - Add component overview, API docs, accessibility notes
   - Add live preview component (using registry)
   - Add code tabs for React vs Solid
   - Update `apps/docs/content/docs/components/meta.json`

5. **Test Registry API**:
   - Verify `/r/r/0/0.json` returns React basic accordion
   - Verify `/r/s/0/0.json` returns Solid basic accordion
   - Verify JSON format matches shadcn schema

---

### Phase 5: Scale Components & Automation (NOT STARTED)

**Tasks**:

1. **Add More Core Components**:
   - Button (React + Solid)
   - Input (React + Solid)
   - Card (React + Solid)
   - Dialog (React + Solid)
   - (Continue with other components)

2. **Add `components.json`**:
   - Create root `components.json` (shadcn-style)
   - Configure Tailwind paths
   - Configure registry base URL
   - Configure aliases

3. **Clean Up Old Files**:
   - Remove old `src/` directory at root (duplicate of `apps/docs/src/`)
   - Remove old config files at root (if any)
   - Verify everything still works

4. **Documentation & Tooling**:
   - Update README with new structure
   - Add CONTRIBUTING.md with component development guide
   - Set up Changesets for versioning (optional)
   - Add CI/CD workflows (optional)

---

## Current Project Structure

```
Ocean-ui/
├── apps/
│   └── docs/                    ✅ Next.js docs app
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/
│       │   │   │   └── search/   ✅ Search API
│       │   │   └── r/            ❌ MISSING: Registry API route
│       │   ├── components/       ✅ Website-specific components
│       │   ├── lib/
│       │   │   ├── source.ts    ✅ Fumadocs source
│       │   │   └── ...           ❌ MISSING: Registry lib files
│       │   └── registry/         ❌ MISSING: Registry structure
│       └── content/
│           └── docs/
│               └── components/   ❌ MISSING: Component docs
├── packages/
│   ├── tokens/                  ✅ Design tokens (CSS variables)
│   ├── utils/                   ✅ Shared utilities
│   ├── ui-react/                ✅ Structure ready (no components yet)
│   │   └── src/
│   │       └── components/
│   │           └── ui/           ❌ EMPTY: No components
│   └── ui-solid/                ✅ Structure ready (no components yet)
│       └── src/
│           └── components/
│               └── ui/           ❌ EMPTY: No components
└── src/                         ⚠️ OLD: Should be removed (duplicate)
```

---

## Key Decisions & Patterns

### Design Tokens
- **Simplified approach**: Only `tokens.css` with CSS variables
- **Tailwind integration**: Tailwind automatically reads CSS variables and generates utilities
- **Usage**: Use Tailwind utilities directly (`bg-brand-500`, `rounded-md`) - no imports needed

### Component Structure
- **React**: Use `className`, `@ark-ui/react` primitives
- **SolidJS**: Use `class`, `@ark-ui/solid` primitives, `<For>`, `<Show>`, signals
- **Shared**: Both use `@ocean-ui/tokens` and `@ocean-ui/utils`

### Registry System
- **Manifest-first**: Single source of truth in `manifest/` folder
- **Framework-specific examples**: Separate folders for React and Solid
- **URL encoding**: Framework codes (`r` = react, `s` = solid) + indices
- **Shadcn-compatible**: Returns JSON format compatible with shadcn CLI

### Accessibility
- **Web Interface Guidelines**: All components must follow guidelines
- **Keyboard navigation**: Full keyboard support required
- **ARIA**: Proper ARIA attributes and roles
- **Focus management**: Proper focus trapping and management

---

## Immediate Next Steps

1. **Start Phase 3**: Build the registry system
   - Create registry folder structure
   - Implement registry library files (types, utils, server functions)
   - Create registry API route
   - Test with a simple example

2. **Implement Phase 4**: First component (Accordion)
   - Build React and SolidJS versions
   - Create registry examples
   - Write documentation
   - Test end-to-end

3. **Clean up**: Remove old `src/` directory at root

---

## Reference Implementations

- **TarkUI**: Complete registry system in `TarkUI/tarkui/lib/` and `TarkUI/tarkui/components/registry/`
- **basecn**: Component registry in `basecn-main/src/registry/`
- **HextaUI**: Registry system in `HextaUI-master/lib/`

---

**📋 See `IMPLEMENTATION_PLAN.md` for detailed task breakdown.**

