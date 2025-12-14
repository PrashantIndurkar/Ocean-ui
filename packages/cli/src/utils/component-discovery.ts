/**
 * Component Discovery Utility
 *
 * Fetches component list from registry API and provides validation
 */

import { defaultRegistryClient, type RegistryIndex } from "./registry-client.js";
import { getRegistryURL } from "./config.js";

// Cache for component lists per framework
const componentCache = new Map<string, string[]>();

/**
 * Get all available component slugs for a framework from registry
 *
 * @param framework - Framework name (e.g., "react", "solid")
 * @returns Array of component slugs
 */
export async function getAvailableComponents(
  framework: string = "react"
): Promise<string[]> {
  // Check cache first
  if (componentCache.has(framework)) {
    return componentCache.get(framework)!;
  }

  try {
    // Set registry URL from config
    const registryURL = await getRegistryURL();
    defaultRegistryClient.setBaseURL(registryURL);

    // Fetch index from registry
    const index: RegistryIndex = await defaultRegistryClient.fetchIndex(
      framework
    );

    // Extract component slugs from index
    const componentSlugs = index.items.map((item) => item.name);

    // Cache the result
    componentCache.set(framework, componentSlugs);

    return componentSlugs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch component list: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Validate that a component exists in the registry
 *
 * @param slug - Component slug to validate
 * @param framework - Framework name (e.g., "react", "solid")
 * @returns True if component exists
 */
export async function validateComponent(
  slug: string,
  framework: string = "react"
): Promise<boolean> {
  try {
    const availableComponents = await getAvailableComponents(framework);
    return availableComponents.includes(slug);
  } catch (error) {
    // If we can't fetch the list, return false
    return false;
  }
}

/**
 * Find a component by slug (for backward compatibility)
 * Note: This now returns a simple object with name and slug
 *
 * @param slug - Component slug
 * @returns Component object or undefined
 */
export function findComponent(slug: string): { name: string; slug: string } | undefined {
  // Convert slug to title case for display name
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return { name, slug };
}
