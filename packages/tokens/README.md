# @ocean-ui/tokens

Design tokens package for Ocean-ui. Contains all CSS custom properties (variables) for colors, spacing, typography, shadows, and other design system values.

## Usage

### In CSS Files

Import the theme CSS in your application's main CSS file (e.g., `globals.css`):

```css
@import "@ocean-ui/tokens/tokens.css";
```

### In Package Dependencies

Add `@ocean-ui/tokens` to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@ocean-ui/tokens": "workspace:*"
  }
}
```

## Structure

```
packages/tokens/
├── tokens.css    # All design tokens (CSS variables)
└── package.json
```

## What's Included

The `tokens.css` file contains:

- **Colors**: Brand, semantic (error, warning, success), grays, and utility colors
- **Typography**: Font families, sizes, line heights, letter spacing
- **Spacing**: Base spacing unit and calculations
- **Shadows**: Multiple shadow variants (xs, sm, md, lg, xl, 2xl, 3xl)
- **Border Radius**: All radius variants
- **Animations**: Keyframe definitions and animation variables
- **Dark Mode**: Complete dark mode overrides via `.dark` class

All tokens use CSS custom properties (CSS variables) and are compatible with Tailwind CSS v4's `@theme` directive.

## Framework Compatibility

This package is framework-agnostic and works with:

- React (via `@ocean-ui/react`)
- SolidJS (via `@ocean-ui/solid`)
- Any framework that supports CSS imports

## Best Practices

1. **Single Source of Truth**: All design tokens live in this package
2. **Import Once**: Import `tokens.css` once in your app's root CSS file
3. **Use CSS Variables**: Access tokens via CSS variables (e.g., `var(--color-brand-500)`)
4. **Tailwind Integration**: Tokens are automatically available in Tailwind utilities
