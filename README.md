# Ocean UI

A collection of beautiful, production-ready UI components built on top of Ark UI. Skip months of implementation work. We've transformed the entire Ocean UI design system into code blocks you can drop directly into your project. Get pixel-perfect, accessible components without sacrificing customization or control.

## 🌊 What is Ocean UI?

Ocean UI is a collection of production-ready UI components built on top of **Ark UI** and powered by **Zag.js**. It combines the flexibility of copy-paste components with the robustness of a headless UI foundation, giving you the best of both worlds.

Built with **Tailwind CSS v4**, **TypeScript**, and designed to work across multiple JavaScript frameworks, Ocean UI is the perfect starting point for any project. Everything you need to design and build modern, beautiful interfaces and websites is right here.

## ✨ Features

- 🎨 **Beautiful Design** - Carefully crafted components with attention to detail
- ♿ **Accessible** - Built on Ark UI for superior accessibility standards
- 🔧 **Framework Agnostic** - Supports React and SolidJS (with more coming)
- 📦 **Copy-Paste Philosophy** - Own your code, customize freely
- 🚀 **Lightweight CLI** - Small package size (~50KB) with remote registry
- 📱 **Responsive** - Mobile-first design approach
- 🎯 **TypeScript** - Full type safety out of the box
- 🎨 **Tailwind CSS v4** - Modern utility-first styling

## 🚀 Quick Start

### Installation

Install the Ocean UI CLI globally or locally:

```bash
# Global installation
npm install -g @ocean-ui/cli

# Or local installation (recommended)
npm install -D @ocean-ui/cli
```

### Add Components

```bash
# Add a component (defaults to React)
npx ocean-ui add accordion

# Specify framework
npx ocean-ui add accordion --framework solid

# Custom output directory
npx ocean-ui add accordion --dir src/components/ui
```

### Configuration

Create a `components.json` file in your project root:

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

## 📚 Documentation

- [Component Documentation](https://components.prashantindurkar.in) - Browse all available components
- [CLI Documentation](./packages/cli/README.md) - Complete CLI usage guide
- [Installation Guide](https://components.prashantindurkar.in/docs/documentation/how-to-install) - Detailed setup instructions

## 🏗️ Architecture

### Registry System

Ocean UI uses a remote registry system for component distribution. This approach provides several benefits:

- **Small Package Size**: CLI package is ~50KB vs ~500KB with bundled components (90% reduction)
- **Always Up-to-Date**: Components are fetched from a remote registry, so you always get the latest versions
- **Independent Updates**: Update components without republishing CLI
- **Framework Support**: Same CLI works for multiple frameworks

### Registry Structure

```
apps/website/public/registry/
├── react/
│   ├── index.json          # Component index
│   └── [component].json    # Individual component files
└── solid/
    ├── index.json
    └── [component].json
```

### Generating Registry

To generate registry files for components:

```bash
pnpm --filter @ocean-ui/scripts registry:generate
```

This command:

1. Scans component source files
2. Extracts dependencies and metadata
3. Generates JSON registry files in `apps/website/public/registry/`
4. Validates registry structure

## 🛠️ Development

### Prerequisites

- Node.js 18+ (for native `fetch` API)
- pnpm (recommended) or npm
- TypeScript 5+

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development server
pnpm --filter @ocean-ui/website dev

# Watch mode for CLI
pnpm --filter @ocean-ui/cli dev
```

### Project Structure

```
Ocean-ui/
├── apps/
│   └── website/           # Documentation site (Next.js)
│       ├── content/       # MDX documentation content
│       ├── public/        # Static assets & registry JSON files
│       └── src/           # Source code
│           ├── app/       # Next.js App Router (pages & API)
│           ├── components/# Website UI components
│           ├── demos/     # Component demo/example files
│           └── lib/       # Utilities & shared code
├── packages/
│   ├── cli/               # CLI tool for installing components
│   ├── scripts/           # Registry generation scripts
│   ├── tokens/            # Design tokens
│   ├── ui-react/          # React component implementations
│   └── ui-solid/          # SolidJS component implementations
└── README.md
```

📖 **For detailed folder structure documentation**, see [`apps/website/FOLDER_STRUCTURE.md`](./apps/website/FOLDER_STRUCTURE.md)

### Adding New Components

1. Create component files in `packages/ui-react/src/components/` or `packages/ui-solid/src/components/`
2. Add component metadata and dependencies
3. Generate registry: `pnpm --filter @ocean-ui/scripts registry:generate`
4. Test component installation: `npx ocean-ui add [component-name]`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## 📦 Packages

- **@ocean-ui/cli** - CLI tool for installing components
- **@ocean-ui/scripts** - Registry generation and build scripts
- **@ocean-ui/tokens** - Design tokens and CSS variables
- **@ocean-ui/ui-react** - React component implementations
- **@ocean-ui/ui-solid** - SolidJS component implementations

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- Adding new components
- Updating existing components
- Registry generation process
- Testing procedures
- Code style and conventions

## 🔄 Migration

If you're upgrading from an older version of the CLI, see [MIGRATION.md](./MIGRATION.md) for:

- Breaking changes
- Configuration updates
- Migration steps
- Troubleshooting

## 📄 License

See the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Documentation](https://components.prashantindurkar.in)
- [CLI README](./packages/cli/README.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Migration Guide](./MIGRATION.md)

## 🙏 Acknowledgments

Ocean UI is built on top of:

- [Ark UI](https://ark-ui.com) - Headless UI components
- [Zag.js](https://zagjs.com) - State machine primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

**Memory Trick**: Think of Ocean UI as an "ocean" of components - vast, accessible, and always flowing with updates through the registry system.

## Summary

Ocean UI is a modern component system built on Ark UI that provides copy-paste components for React and SolidJS. It uses a remote registry system to keep the CLI lightweight (~50KB) while providing always up-to-date components. The system supports multiple frameworks, includes a CLI tool for easy installation, and follows a copy-paste philosophy that gives developers full ownership of their code. Components are generated into a registry JSON format and served via API, making updates independent of CLI releases.
