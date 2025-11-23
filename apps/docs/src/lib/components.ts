/**
 * Component Registry - Single Source of Truth
 *
 * This file defines all available components in the Ocean-ui design system.
 * Components are organized by category for better discoverability.
 */

export interface Component {
  name: string;
  slug: string;
  category: string;
}

export const components: Component[] = [
  // Disclosure
  {
    name: "Accordion",
    slug: "accordion",
    category: "Disclosure",
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    category: "Disclosure",
  },

  // Form Controls
  {
    name: "Button",
    slug: "button",
    category: "Form",
  },
  {
    name: "Input",
    slug: "input",
    category: "Form",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "Form",
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    category: "Form",
  },
  {
    name: "Select",
    slug: "select",
    category: "Form",
  },
  {
    name: "Switch",
    slug: "switch",
    category: "Form",
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "Form",
  },

  // Overlay
  {
    name: "Dialog",
    slug: "dialog",
    category: "Overlay",
  },
  {
    name: "Popover",
    slug: "popover",
    category: "Overlay",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "Overlay",
  },

  // Data Display
  {
    name: "Card",
    slug: "card",
    category: "Data Display",
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "Data Display",
  },
  {
    name: "Badge",
    slug: "badge",
    category: "Data Display",
  },

  // Navigation
  {
    name: "Tabs",
    slug: "tabs",
    category: "Navigation",
  },
  {
    name: "Menu",
    slug: "menu",
    category: "Navigation",
  },

  // Feedback
  {
    name: "Progress",
    slug: "progress",
    category: "Feedback",
  },
  {
    name: "Toast",
    slug: "toast",
    category: "Feedback",
  },
];
