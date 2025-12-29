import type { ReactElement } from "react";
import { loadComponentManifest } from "./registry.utils";

/**
 * Component Example Metadata
 * Defines the structure of an example in the manifest
 */
export interface ComponentExampleMeta {
  name: string;
  title: string;
  span?: number;
  cssVars?: Record<"theme", Record<string, string>>;
  css?: Record<string, Record<string, string | number>>;
}

/**
 * Component Manifest
 * Single source of truth for all examples of a component
 */
export interface ComponentManifest {
  examples: ComponentExampleMeta[];
}

/**
 * Component Example
 * Runtime representation of an example with source code
 */
export interface ComponentExample {
  id: string;
  title: string;
  span?: number;
  component: () => ReactElement;
  sourceCode: {
    [framework: string]: string | null;
  };
}

/**
 * Component Registry
 * Complete registry data for a component
 */
export interface ComponentRegistry {
  title: string;
  description: string;
  count: number;
  examples: ComponentExample[];
}

/**
 * Get the number of examples for a component
 */
export async function getComponentCount(slug: string): Promise<number> {
  try {
    const manifest = await loadComponentManifest(slug);
    if (!manifest) {
      return 0;
    }
    return manifest.examples.length;
  } catch (error) {
    console.warn(`Failed to load manifest for ${slug}:`, error);
    return 0;
  }
}

/**
 * Format component count for display
 */
export function formatComponentCount(count: number): string {
  return count === 1 ? "1 Component" : `${count} Components`;
}

/**
 * Get counts for all components at once
 */
export async function getAllComponentCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  const { components } = await import("../components");

  await Promise.all(
    components.map(async (component) => {
      counts[component.slug] = await getComponentCount(component.slug);
    })
  );

  return counts;
}

/**
 * Get total number of examples across all components
 */
export async function getTotalExampleCount(): Promise<number> {
  const counts = await getAllComponentCounts();
  return Object.values(counts).reduce((total, count) => total + count, 0);
}
