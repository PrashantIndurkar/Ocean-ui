# Component Registry System Guide

## Overview

The component registry system connects your component examples with the documentation. When you rename a component file, you need to update the manifest file to match.

## How It Works

### 1. **Manifest File** (Single Source of Truth)

**Location**: `src/registry/manifest/{category}/{component-name}.ts`

The manifest defines:

- Example names (must match filenames)
- Example titles (display names)
- Example ordering

**Example**:

```typescript
const manifest: ComponentManifest = {
  examples: [
    {
      name: "accordion-demo", // ← Must match filename (without .tsx)
      title: "Basic Accordion", // ← Display name in docs
    },
  ],
};
```

### 2. **Component Files** (Actual Code)

**Location**: `src/registry/react/{category}/{component-name}/{example-name}.tsx`

- File name must match the `name` in manifest
- Must export a default component
- Example: `accordion-demo.tsx` → `name: "accordion-demo"`

### 3. **Registry Server** (Loader)

**Location**: `src/lib/registry.server.ts`

This file:

- Reads the manifest
- Dynamically imports component files based on manifest `name` values
- Loads source code for all frameworks

**Key Code**:

```typescript
// Line 92: Imports file based on manifest name
const exampleModule = await import(
  `@/registry/react/${componentCategory}/${slug}/${exampleMeta.name}.tsx`
);
```

### 4. **ComponentPreview** (Display)

**Location**: `src/components/component-preview.tsx`

- Uses the registry to find examples
- Defaults to `example="basic"` but can be overridden
- Shows "Example not found" if manifest name doesn't match filename

## When Renaming a Component File

### Step-by-Step Process

1. **Rename the file**

   ```
   basic.tsx → accordion-demo.tsx
   ```

2. **Update the manifest** (`src/registry/manifest/{category}/{component}.ts`)

   ```typescript
   // Before
   {
     name: "basic",  // ❌ Old name
     title: "Basic Accordion",
   }

   // After
   {
     name: "accordion-demo",  // ✅ New name (matches filename)
     title: "Basic Accordion",
   }
   ```

3. **Check for other frameworks** (if applicable)

   - If you have SolidJS examples: `src/registry/solid/{category}/{component}/{example-name}.tsx`
   - Rename those files too and ensure manifest matches

4. **Verify the fix**
   - The registry server will now find: `accordion-demo.tsx`
   - ComponentPreview will display the component correctly

## File Structure Example

```
src/registry/
├── manifest/
│   └── base/
│       └── accordion.ts          ← Defines example names
├── react/
│   └── base/
│       └── accordion/
│           ├── accordion-demo.tsx    ← Must match manifest name
│           └── accordion-multiple.tsx
└── solid/                        ← Optional: SolidJS examples
    └── base/
        └── accordion/
            └── accordion-demo.tsx
```

## Common Issues & Solutions

### Issue: "Example not found"

**Cause**: Manifest `name` doesn't match filename

**Solution**: Update manifest to match filename

```typescript
// Manifest name must match filename (without extension)
name: "accordion-demo"; // ← Matches accordion-demo.tsx
```

### Issue: Component not rendering

**Cause**: File doesn't export default component

**Solution**: Ensure file has:

```typescript
export default function ComponentName() {
  return <div>...</div>;
}
```

### Issue: Multiple examples not showing

**Cause**: Manifest only has one example defined

**Solution**: Add all examples to manifest:

```typescript
const manifest: ComponentManifest = {
  examples: [
    {
      name: "accordion-demo",
      title: "Basic Accordion",
    },
    {
      name: "accordion-multiple", // ← Add this
      title: "Multiple Items",
    },
  ],
};
```

## Quick Reference Checklist

When renaming/adding a component example:

- [ ] Rename the file(s) in `src/registry/react/{category}/{component}/`
- [ ] Update `name` in `src/registry/manifest/{category}/{component}.ts`
- [ ] Ensure filename matches manifest `name` exactly (case-sensitive)
- [ ] Verify component exports `default`
- [ ] Check if SolidJS version exists and update if needed
- [ ] Test that ComponentPreview displays correctly

## Key Files to Remember

1. **Manifest**: `src/registry/manifest/{category}/{component}.ts`
2. **React Examples**: `src/registry/react/{category}/{component}/{example-name}.tsx`
3. **Registry Loader**: `src/lib/registry.server.ts` (line 92 - import path)
4. **Preview Component**: `src/components/component-preview.tsx` (line 10 - default example)

## Summary

**Golden Rule**: The `name` field in the manifest must exactly match the filename (without `.tsx` extension).

```
Manifest name: "accordion-demo"
         ↓
File name: accordion-demo.tsx ✅
```
