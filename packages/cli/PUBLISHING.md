# Publishing @ocean-ui/cli to npm

Complete step-by-step guide to publish the CLI package to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **npm CLI**: Make sure npm is installed (comes with Node.js)
3. **Authentication**: Login to npm from your terminal

## Step 1: Login to npm

```bash
npm login
```

Enter your:

- Username
- Password
- Email address
- One-time password (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 2: Verify Package Configuration

Check that `packages/cli/package.json` has:

- ✅ Correct package name: `@ocean-ui/cli`
- ✅ Version number: `0.1.0` (or your desired version)
- ✅ `bin` field pointing to `./dist/index.js`
- ✅ `files` array includes `dist` and `components`

## Step 3: Build the Package

From the monorepo root:

```bash
# Install dependencies (if not already done)
pnpm install

# Build the CLI package
pnpm --filter @ocean-ui/cli build
```

This will:

1. Compile TypeScript to JavaScript in `dist/`
2. Copy component sources to `components/` directory

Verify the build output:

```bash
ls packages/cli/dist/
ls packages/cli/components/
```

You should see:

- `dist/index.js` (main entry point)
- `dist/index.d.ts` (TypeScript definitions)
- `components/react/base/` (React components)
- `components/solid/base/` (Solid components, if any)

## Step 4: Test Locally (Optional but Recommended)

Before publishing, test the CLI locally:

### Option A: Test with pnpm exec

```bash
# Create a test project
mkdir test-ocean-ui-cli
cd test-ocean-ui-cli
pnpm init

# Test the CLI
cd ../..  # Go back to monorepo root
pnpm exec --filter @ocean-ui/cli ocean-ui add accordion --dir test-ocean-ui-cli/components/ui
```

### Option B: Test with npm link

```bash
# From packages/cli directory
cd packages/cli
npm link

# In your test project
cd /path/to/test-project
npm link @ocean-ui/cli
npx ocean-ui add accordion
```

## Step 5: Check Package Contents

Verify what will be published:

```bash
cd packages/cli
npm pack --dry-run
```

This shows what files will be included in the published package. Should include:

- `dist/` directory
- `components/` directory
- `package.json`
- `README.md` (if you want it published)

## Step 6: Check for Existing Package

Verify the package name is available (or check if you own it):

```bash
npm view @ocean-ui/cli
```

If it doesn't exist, you're good to go. If it exists, you'll need to:

- Use a different version number, or
- Make sure you're the owner of the package

## Step 7: Set Package Access (Scoped Packages)

Since `@ocean-ui/cli` is a scoped package, you need to set access:

```bash
cd packages/cli
npm publish --access public
```

Or add to `package.json`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

## Step 8: Publish to npm

From the `packages/cli` directory:

```bash
cd packages/cli
npm publish --access public
```

Or from monorepo root:

```bash
pnpm --filter @ocean-ui/cli publish --access public
```

**First time publishing:**

- npm will ask you to confirm
- You may need to verify your email if it's your first publish

## Step 9: Verify Publication

Check that the package is published:

```bash
npm view @ocean-ui/cli
```

Visit on npm website:

```
https://www.npmjs.com/package/@ocean-ui/cli
```

## Step 10: Test the Published Package

In a fresh project (not your monorepo):

```bash
# Create a test project
mkdir test-published-cli
cd test-published-cli
npm init -y

# Test the published CLI
npx @ocean-ui/cli add accordion
```

## Step 11: Update Version for Future Releases

When you need to publish updates:

```bash
cd packages/cli

# Option 1: Manual version bump
# Edit package.json: "version": "0.1.1"

# Option 2: Use npm version command
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0

# Then rebuild and publish
pnpm build
npm publish --access public
```

## Troubleshooting

### Error: "You do not have permission to publish"

**Solution:**

- Make sure you're logged in: `npm whoami`
- Check if the package name is taken by someone else
- If it's a scoped package, use `--access public`

### Error: "Package name already exists"

**Solution:**

- The package name is taken. Either:
  - Use a different name
  - Contact the owner
  - Use a different scope (e.g., `@your-org/ocean-ui-cli`)

### Error: "Invalid package name"

**Solution:**

- Package names must be lowercase
- No spaces or special characters (except `-` and `_`)
- Scoped packages: `@scope/package-name`

### Error: "File not found" during build

**Solution:**

- Make sure component source files exist in `packages/ui-react/src/components/base/`
- Run `pnpm install` to ensure all dependencies are installed

### Components not found after publishing

**Solution:**

- Verify `components/` directory is in the `files` array in `package.json`
- Check that `scripts/copy-components.js` ran successfully during build
- Verify `components/` directory exists in published package: `npm pack --dry-run`

## Quick Reference Commands

```bash
# Full publishing workflow
cd packages/cli
pnpm install
pnpm build
npm publish --access public

# Check what will be published
npm pack --dry-run

# View published package
npm view @ocean-ui/cli

# Test published package
npx @ocean-ui/cli add accordion
```

## Post-Publishing Checklist

- [ ] Package is visible on npmjs.com
- [ ] `npx @ocean-ui/cli` works in a fresh project
- [ ] Components are copied correctly
- [ ] Dependencies are installed correctly
- [ ] Update documentation with published package name
- [ ] Announce the release (if applicable)

## Notes

- The package is currently set to `"private": false` (or not set), which allows publishing
- Scoped packages (`@ocean-ui/cli`) require `--access public` unless you have a paid npm account
- First publish may take a few minutes to appear on npmjs.com
- Always test locally before publishing to avoid broken releases
