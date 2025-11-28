/**
 * Component Discovery Utility
 * 
 * Provides component registry and validation
 */

export interface Component {
  name: string;
  slug: string;
  category: "fundamentals" | "base" | "blocks" | "templates";
  subcategory: string;
}

// Component registry - matches apps/docs/src/lib/components.ts
export const components: Component[] = [
  // Base Components - Disclosure
  {
    name: "Accordion",
    slug: "accordion",
    category: "base",
    subcategory: "Disclosure",
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    category: "base",
    subcategory: "Disclosure",
  },

  // Base Components - Form Controls
  {
    name: "Button",
    slug: "button",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Input",
    slug: "input",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Select",
    slug: "select",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Switch",
    slug: "switch",
    category: "base",
    subcategory: "Form",
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "base",
    subcategory: "Form",
  },

  // Base Components - Overlay
  {
    name: "Dialog",
    slug: "dialog",
    category: "base",
    subcategory: "Overlay",
  },
  {
    name: "Popover",
    slug: "popover",
    category: "base",
    subcategory: "Overlay",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "base",
    subcategory: "Overlay",
  },

  // Base Components - Data Display
  {
    name: "Card",
    slug: "card",
    category: "base",
    subcategory: "Data Display",
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "base",
    subcategory: "Data Display",
  },
  {
    name: "Badge",
    slug: "badge",
    category: "base",
    subcategory: "Data Display",
  },

  // Base Components - Navigation
  {
    name: "Tabs",
    slug: "tabs",
    category: "base",
    subcategory: "Navigation",
  },
  {
    name: "Menu",
    slug: "menu",
    category: "base",
    subcategory: "Navigation",
  },

  // Base Components - Feedback
  {
    name: "Progress",
    slug: "progress",
    category: "base",
    subcategory: "Feedback",
  },
  {
    name: "Toast",
    slug: "toast",
    category: "base",
    subcategory: "Feedback",
  },
];

/**
 * Find a component by slug
 */
export function findComponent(slug: string): Component | undefined {
  return components.find((c) => c.slug === slug);
}

/**
 * Validate that a component exists
 */
export function validateComponent(slug: string): boolean {
  return findComponent(slug) !== undefined;
}

/**
 * Get all available component slugs
 */
export function getAvailableComponents(): string[] {
  return components.map((c) => c.slug);
}
