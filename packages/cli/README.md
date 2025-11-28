# @ocean-ui/cli

CLI tool for installing Ocean UI components into your project.

## Usage

```bash
npx @ocean-ui/cli add <component>
```

## Options

- `--framework, -f`: Framework (react|solid) [default: react]
- `--pm, -p`: Package manager (npm|pnpm|yarn|bun) [default: auto-detect]
- `--overwrite, -o`: Overwrite existing files
- `--dir, -d`: Target directory [default: components/ui]

## Examples

```bash
# Install accordion component
npx @ocean-ui/cli add accordion

# Install Solid component
npx @ocean-ui/cli add accordion --framework solid

# Specify package manager
npx @ocean-ui/cli add accordion --pm pnpm

# Custom directory
npx @ocean-ui/cli add accordion --dir src/components

# Overwrite existing file
npx @ocean-ui/cli add accordion --overwrite
```

## Development

```bash
# Build the CLI
pnpm build

# Run in development mode
pnpm dev
```

## Publishing

When ready to publish:

1. Build the package: `pnpm build`
2. Publish to npm: `pnpm publish --access public`
