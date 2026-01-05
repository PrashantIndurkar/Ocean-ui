---
name: Migrate Ocean UI tokens from UntitledUI to basecn
overview: Replace Ocean UI's complex UntitledUI-style tokens with basecn's minimalist tokens, update accordion components to use basecn token names, and ensure all animations work correctly. Organized into clear phases.
todos:
  - id: phase1-backup
    content: "Phase 1.1: Backup current tokens file (optional)"
    status: completed
  - id: phase1-replace-tokens
    content: "Phase 1.2: Replace Ocean-ui/packages/tokens/tokens.css with basecn's tokens"
    status: completed
    dependencies:
      - phase1-backup
  - id: phase1-verify-import
    content: "Phase 1.3: Verify token import in globals.css"
    status: completed
    dependencies:
      - phase1-replace-tokens
  - id: phase2-update-solid-accordion
    content: "Phase 2.1: Update SolidJS accordion to use 'border-border'"
    status: pending
    dependencies:
      - phase1-verify-import
  - id: phase2-update-react-accordion
    content: "Phase 2.2: Update React accordion to use 'border-border'"
    status: pending
    dependencies:
      - phase1-verify-import
  - id: phase2-scan-other-components
    content: "Phase 2.3: Scan for other components using old tokens"
    status: pending
    dependencies:
      - phase2-update-solid-accordion
      - phase2-update-react-accordion
  - id: phase3-update-solid-registry
    content: "Phase 3.1: Update SolidJS registry JSON files"
    status: pending
    dependencies:
      - phase2-scan-other-components
  - id: phase3-update-react-registry
    content: "Phase 3.2: Update React registry JSON files"
    status: pending
    dependencies:
      - phase2-scan-other-components
  - id: phase4-build-verification
    content: "Phase 4.1: Run build and check for errors"
    status: pending
    dependencies:
      - phase3-update-solid-registry
      - phase3-update-react-registry
  - id: phase4-visual-testing
    content: "Phase 4.2: Test accordion animations, colors, and dark mode"
    status: pending
    dependencies:
      - phase4-build-verification
  - id: phase4-console-verification
    content: "Phase 4.3: Check console for errors and verify animations"
    status: pending
    dependencies:
      - phase4-visual-testing
---

# Migrate Ocean UI Tokens from UntitledUI to basecn

## Overview

Replace the complex UntitledUI-style tokens (1414 lines) in Ocean UI with basecn's minimalist approach (~201 lines). Update all components to use basecn's semantic token naming and ensure accordion animations work correctly.

## Phase 1: Token Migration ✅ COMPLETED

### Step 1.1: Backup Current Tokens ✅

- ✅ Created backup of `Ocean-ui/packages/tokens/tokens.css` → `tokens.css.backup`
- ✅ Documented any custom tokens that might be needed later

### Step 1.2: Replace Tokens File ✅

- ✅ **File**: `Ocean-ui/packages/tokens/tokens.css`
- ✅ **Action**: Replaced entire file with basecn's tokens
- ✅ **Source**: Copied from `basecn/src/app/global.css`
- ✅ **Changes**:
- ✅ Copied basecn's `@theme inline` block (lines 8-68) - includes accordion animations
- ✅ Copied basecn's `:root` variables (lines 70-108) - semantic color tokens
- ✅ Copied basecn's `.dark` overrides (lines 110-148) - dark mode support
- ✅ Copied basecn's `@layer base` styles (lines 150-165) - base styles
- ✅ Removed all UntitledUI-specific tokens:
  - All `--color-*-*` color scales (gray-25 through gray-950, brand, error, etc.)
  - All `--color-utility-*` mappings
  - All `--color-text-*`, `--color-bg-*`, `--color-border-*` semantic mappings
  - All component-specific tokens
  - Typography tokens (if not needed)
  - Shadow tokens (if not needed)

**Result**: Reduced from 1414 lines to ~148 lines

### Step 1.3: Verify Token Import ✅

- ✅ **File**: `Ocean-ui/apps/website/src/app/styles/globals.css`
- ✅ **Action**: Verified `@import "@ocean-ui/tokens/tokens.css";` is present (line 7)
- ✅ **Check**: Confirmed no other token imports exist

## Phase 2: Component Updates

### Step 2.1: Update SolidJS Accordion Component

- **File**: `Ocean-ui/packages/ui-solid/src/components/base/accordion.tsx`
- **Changes**:
- Line 37: Change `border-border-secondary` → `border-border`
- Verify other token classes are compatible:
  - `text-primary` ✓ (maps to `--primary`)
  - `text-muted-foreground` ✓ (maps to `--muted-foreground`)
  - `ring-ring` ✓ (maps to `--ring`)
- Accordion animations already use `animate-accordion-collapse` and `animate-accordion-expand` ✓

### Step 2.2: Update React Accordion Component

- **File**: `Ocean-ui/apps/website/src/components/library/react/base/accordion.tsx`
- **Changes**:
- Line 25: Change `border-border-secondary` → `border-border`
- All other token classes are compatible ✓

### Step 2.3: Scan for Other Components Using Old Tokens

- **Action**: Search codebase for `border-border-secondary` or other UntitledUI-specific tokens
- **Files to check**:
- All component files in `Ocean-ui/packages/ui-solid/src/components/`
- All component files in `Ocean-ui/apps/website/src/components/`
- **Update**: Replace any found instances with basecn equivalents

## Phase 3: Registry Updates

### Step 3.1: Update SolidJS Registry JSON

- **Files**:
- `Ocean-ui/apps/website/public/registry/solid/accordion.json`
- `Ocean-ui/apps/docs/public/registry/solid/accordion.json`
- **Action**: Update accordion component code in JSON to use `border-border` instead of `border-border-secondary`

### Step 3.2: Update React Registry JSON

- **Files**:
- `Ocean-ui/apps/website/public/registry/react/accordion.json`
- `Ocean-ui/apps/docs/public/registry/react/accordion.json`
- **Action**: Update accordion component code in JSON to use `border-border` instead of `border-border-secondary`

## Phase 4: Testing & Verification

### Step 4.1: Build Verification

- **Action**: Run build command to verify no errors
- **Check**: Look for missing CSS variable errors
- **Fix**: Address any token reference issues

### Step 4.2: Visual Testing

- **Test**: Accordion animations work (collapse/expand)
- **Test**: Colors match basecn style (borders, text, backgrounds)
- **Test**: Dark mode works correctly
- **Test**: Both SolidJS and React accordion components render correctly

### Step 4.3: Console Verification

- **Check**: No console errors about missing CSS variables
- **Check**: No TypeScript/build errors
- **Check**: All animations trigger correctly

## Token Mapping Reference

### basecn Semantic Tokens (what we're using):

- `--background` → Tailwind: `bg-background`
- `--foreground` → Tailwind: `text-foreground`
- `--primary` → Tailwind: `text-primary`, `bg-primary`
- `--muted` → Tailwind: `bg-muted`
- `--muted-foreground` → Tailwind: `text-muted-foreground`
- `--border` → Tailwind: `border-border`
- `--ring` → Tailwind: `ring-ring`
- `--radius` → Tailwind: `rounded-lg` (via `--radius-lg`)

### Removed (UntitledUI tokens we're deleting):

- All `--color-*-*` color scales (gray-25 through gray-950, brand, error, etc.)
- All `--color-utility-*` mappings
- All `--color-text-*`, `--color-bg-*`, `--color-border-*` semantic mappings
- All component-specific tokens

## Key Differences to Handle

1. **Border Token**:

- Old: `border-border-secondary`
- New: `border-border` (basecn only has one border color)

2. **Animation Variables**:

- basecn uses `--accordion-panel-height` variable in keyframes
- Ocean UI accordion already uses `animate-accordion-collapse` and `animate-accordion-expand` which basecn provides

3. **Dark Mode**:

- basecn uses `.dark` class (same as Ocean UI)
- All dark mode overrides are included in basecn tokens

## Potential Issues to Watch For

1. **Missing `border-border-secondary`**: Changed to `border-border` - verify visual appearance matches expectations
2. **Tailwind v4 Compatibility**: basecn uses `@theme inline` which is Tailwind v4 syntax - ensure Ocean UI uses Tailwind v4
3. **Animation Timing**: basecn uses `100ms` for collapse and `200ms` for expand - verify these feel right
4. **Color Values**: basecn uses different color values than UntitledUI - verify contrast and accessibility

## Notes

- basecn's tokens are much simpler (~148 lines vs 1414 lines)
- All accordion-specific animations are included in basecn tokens
- The migration maintains backward compatibility for most Tailwind classes used in components

## Progress Summary

- ✅ **Phase 1**: Token Migration - COMPLETED
  - ✅ Backup created
  - ✅ Tokens replaced (1414 → 148 lines)
  - ✅ Import verified
- ⏳ **Phase 2**: Component Updates - PENDING
- ⏳ **Phase 3**: Registry Updates - PENDING
- ⏳ **Phase 4**: Testing & Verification - PENDING
