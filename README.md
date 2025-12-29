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
- 📱 **Responsive** - Mobile-first design approach
- 🎯 **TypeScript** - Full type safety out of the box
- 🎨 **Tailwind CSS v4** - Modern utility-first styling

## 📚 Documentation

- [Component Documentation](https://components.prashantindurkar.in) - Browse all available components

## 🏗️ Architecture

### Registry System

Ocean UI uses a registry system for component distribution. This approach provides several benefits:

- **Component Discovery**: Registry provides metadata and source code for all components
- **Framework Support**: Components available for multiple frameworks (React, SolidJS, and more)
- **Always Up-to-Date**: Components are served from the registry, ensuring you get the latest versions

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
│   ├── tokens/            # Design tokens
│   ├── ui-react/          # React component implementations
│   └── ui-solid/          # SolidJS component implementations
└── README.md
```

📖 **For detailed folder structure documentation**, see [`apps/website/FOLDER_STRUCTURE.md`](./apps/website/FOLDER_STRUCTURE.md)

### Adding New Components

1. Create component files in `packages/ui-react/src/components/` or `packages/ui-solid/src/components/`
2. Add component metadata and dependencies

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## 📦 Packages

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

## 📄 License

See the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Documentation](https://components.prashantindurkar.in)
- [Contributing Guide](./CONTRIBUTING.md)

## 🙏 Acknowledgments

Ocean UI is built on top of:

- [Ark UI](https://ark-ui.com) - Headless UI components
- [Zag.js](https://zagjs.com) - State machine primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

**Memory Trick**: Think of Ocean UI as an "ocean" of components - vast, accessible, and always flowing with updates through the registry system.

## Summary

Ocean UI is a modern component system built on Ark UI that provides copy-paste components for React and SolidJS. The system supports multiple frameworks and follows a copy-paste philosophy that gives developers full ownership of their code. Components are displayed on the documentation website with code blocks that can be copied directly into your project.
