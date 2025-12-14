# Migration Guide

This guide helps you migrate from older versions of Ocean UI CLI to the new registry-based system.

## 📋 Table of Contents

- [What Changed](#what-changed)
- [Migration Steps](#migration-steps)
- [Breaking Changes](#breaking-changes)
- [Configuration Updates](#configuration-updates)
- [Troubleshooting](#troubleshooting)

## What Changed

### Old System (Pre-Registry)

- Components were bundled in the CLI npm package
- CLI package size was ~500KB+
- Components were updated only when CLI was updated
- Required CLI update to get new components

### New System (Registry-Based)

- Components are fetched from remote registry API
- CLI package size is ~50KB (90% reduction)
- Components are always up-to-date from registry
- CLI updates are independent of component updates
- Requires internet connection to fetch components

## Migration Steps

### Step 1: Update CLI

Update to the latest version of the CLI:

```bash
# Global installation
npm install -g @ocean-ui/cli@latest

# Or local installation
npm install -D @ocean-ui/cli@latest
```

### Step 2: Create Configuration File

Create a `components.json` file in your project root (if you don't have one):

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

### Step 3: Verify Installation

Test that the CLI works with the new registry:

```bash
# List available components
npx ocean-ui add --help

# Try installing a component
npx ocean-ui add accordion --framework react
```

### Step 4: Update Existing Components (Optional)

If you have existing components installed from the old CLI, you can:

1. **Keep them as-is** - They'll continue to work
2. **Reinstall them** - Use `--overwrite` flag to get latest versions:
   ```bash
   npx ocean-ui add accordion --overwrite
   ```

## Breaking Changes

### 1. Internet Connection Required

**Old**: CLI worked offline (components bundled)

**New**: CLI requires internet connection to fetch components

**Impact**: You cannot install components without internet access

**Workaround**: None - this is by design for the registry system

### 2. Component Source Location

**Old**: Components were bundled in CLI package

**New**: Components are fetched from remote registry

**Impact**: Component source is no longer in `node_modules/@ocean-ui/cli/components`

**Workaround**: Components are installed directly into your project

### 3. Registry URL Configuration

**Old**: No registry configuration needed

**New**: Registry URL can be configured in `components.json`

**Impact**: You may need to configure custom registry URL

**Workaround**: Default registry URL works out of the box

### 4. CLI Version Independence

**Old**: CLI version determined component versions

**New**: Component versions are independent of CLI version

**Impact**: You can get latest components without updating CLI

**Benefit**: Always up-to-date components

## Configuration Updates

### components.json

The new system uses `components.json` for configuration:

```json
{
  "framework": "react", // Default framework
  "registry": {
    "url": "https://..." // Custom registry URL (optional)
  },
  "aliases": {
    "components": "~/components", // Path aliases (for future use)
    "lib": "~/lib",
    "ui": "~/components/ui"
  }
}
```

### Environment Variables

The CLI respects these environment variables:

- `NPM_CONFIG_REGISTRY` - Custom npm registry for dependency installation
- Package manager detection via lock files

## Troubleshooting

### Network Errors

**Error**: `Unable to connect to registry`

**Solutions**:

1. Check internet connection
2. Verify registry URL in `components.json`
3. Check firewall/proxy settings
4. Try accessing registry URL in browser:
   ```
   https://components.prashantindurkar.in/api/registry/react/index.json
   ```

### Component Not Found

**Error**: `Component "xyz" not found`

**Solutions**:

1. Check component name spelling
2. Verify framework flag (`--framework react` or `--framework solid`)
3. Check available components in error message
4. Ensure registry is accessible

### Import Errors After Migration

**Error**: `Cannot find module '@/lib/utils'`

**Solutions**:

1. Ensure `tsconfig.json` has path alias:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```
2. Verify `src/lib/utils.ts` exists (CLI should create it)
3. Check import paths match your project structure

### Old Components Still Present

**Issue**: Old components from previous CLI version still in project

**Solutions**:

1. Keep them - they'll continue to work
2. Reinstall with `--overwrite` flag:
   ```bash
   npx ocean-ui add [component] --overwrite
   ```
3. Manually delete and reinstall if needed

### CLI Version Mismatch

**Issue**: Old CLI version doesn't support registry

**Solutions**:

1. Update CLI to latest version:
   ```bash
   npm install -g @ocean-ui/cli@latest
   ```
2. Clear npm cache if needed:
   ```bash
   npm cache clean --force
   ```

### Registry Timeout

**Error**: `Timeout while fetching component`

**Solutions**:

1. Check internet connection speed
2. Try again (may be temporary network issue)
3. Verify registry URL is correct
4. Check if registry is experiencing issues

## Rollback (If Needed)

If you need to rollback to the old system:

1. **Note**: Old CLI versions may no longer be available
2. Keep existing components - they'll continue to work
3. Don't update CLI if you need the old bundled system
4. Consider migrating gradually component by component

## Benefits of Migration

### Performance

- ✅ Smaller CLI package (~50KB vs ~500KB)
- ✅ Faster installation (no bundled components)
- ✅ Reduced npm package size

### Flexibility

- ✅ Always up-to-date components
- ✅ Independent component updates
- ✅ Custom registry support

### Developer Experience

- ✅ Same CLI interface
- ✅ Better error messages
- ✅ Improved component discovery

## FAQ

### Q: Do I need to reinstall all components?

**A**: No, existing components will continue to work. You can optionally reinstall them with `--overwrite` to get the latest versions.

### Q: Can I use both old and new CLI?

**A**: Not recommended. Update to the latest CLI version for the best experience.

### Q: What if the registry is down?

**A**: You won't be able to install new components, but existing components in your project will continue to work.

### Q: Can I use a custom registry?

**A**: Yes, configure the registry URL in `components.json`:

```json
{
  "registry": {
    "url": "https://your-custom-registry.com/api/registry"
  }
}
```

### Q: Will my existing components break?

**A**: No, existing components will continue to work. The migration only affects how new components are installed.

## Getting Help

If you encounter issues during migration:

1. Check this migration guide
2. Review [CLI README](./packages/cli/README.md)
3. Open an issue on GitHub
4. Check existing issues for similar problems

## Summary

The migration from the old bundled system to the new registry-based system is straightforward. Update the CLI, create a `components.json` file, and you're ready to go. The main change is that components are now fetched from a remote registry instead of being bundled in the CLI package. Existing components will continue to work, and you can optionally reinstall them to get the latest versions.

---

**Memory Trick**: Migrating to the registry system is like switching from carrying all your books (bundled components) to having a library card (registry API) - lighter, always up-to-date, but requires internet access!

## Summary

This migration guide covers moving from the old bundled CLI system to the new registry-based system. Key changes include components being fetched from a remote registry instead of being bundled, requiring internet connection, and allowing independent component updates. The migration process involves updating the CLI, creating a configuration file, and optionally reinstalling components. Breaking changes are minimal, and existing components will continue to work. The new system provides better performance, flexibility, and developer experience.
