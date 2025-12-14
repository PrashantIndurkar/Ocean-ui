/**
 * Dependency Extractor Utility
 *
 * Extracts dependencies from registry JSON
 */

import { defaultRegistryClient } from "./registry-client.js";
import { getRegistryURL } from "./config.js";

/**
 * Extract dependencies from registry JSON
 *
 * @param componentSlug - Component slug (e.g., "accordion")
 * @param framework - Framework name (e.g., "react", "solid")
 * @returns Array of dependency package names
 */
export async function extractDependencies(
  componentSlug: string,
  framework: "react" | "solid"
): Promise<string[]> {
  try {
    // Set registry URL from config
    const registryURL = await getRegistryURL();
    defaultRegistryClient.setBaseURL(registryURL);

    // Fetch component from registry
    const registryItem = await defaultRegistryClient.fetchComponent(
      framework,
      componentSlug
    );

    // Return dependencies from registry JSON
    // Filter out "react" or "solid" as they're typically peer dependencies
    const dependencies = registryItem.dependencies.filter(
      (dep) => dep !== "react" && dep !== "solid"
    );

    return dependencies;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to extract dependencies: ${error.message}`
      );
    }
    throw error;
  }
}
