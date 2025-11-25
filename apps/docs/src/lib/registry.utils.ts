import { components } from "./components";
import type { ComponentManifest } from "./registry";

/**
 * Gets the base URL for the registry based on the environment
 */
export function getRegistryBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return "https://components.prashantindurkar.in";
  }
  return "http://localhost:3000";
}

/**
 * Framework code mapping
 * Maps framework names to short codes for URLs
 */
const frameworkMap: Record<string, string> = {
  react: "r",
  solid: "s",
};

/**
 * Reverse framework mapping
 * Maps short codes back to framework names
 */
const reverseFrameworkMap: Record<string, string> = {
  r: "react",
  s: "solid",
};

/**
 * Loads the manifest for a component
 * @param slug The component slug
 * @param category The component category (fundamentals, base, blocks, templates) - defaults to "base"
 * @returns The component manifest or null if not found
 */
export async function loadComponentManifest(
  slug: string,
  category: string = "base"
): Promise<ComponentManifest | null> {
  try {
    const manifestModule = await import(
      `@/registry/manifest/${category}/${slug}.ts`
    );
    return manifestModule.default;
  } catch {
    console.warn(`Failed to load manifest for ${category}/${slug}.`);
    return null;
  }
}

/**
 * Gets the example name by its index in a component manifest
 * @param slug The component slug
 * @param index The index of the example in the manifest
 * @returns The example name or null if not found
 */
export async function getExampleNameByIndex(
  slug: string,
  index: number
): Promise<string | null> {
  const manifest = await loadComponentManifest(slug);
  if (!manifest || index < 0 || index >= manifest.examples.length) {
    return null;
  }

  return manifest.examples[index].name;
}

/**
 * Constructs a registry URL for a specific component example using example index
 * @param framework The framework (react, solid)
 * @param slug The component slug
 * @param exampleIndex The example index in the manifest
 * @returns The complete registry URL
 */
export function getRegistryUrlByIndex(
  framework: string,
  slug: string,
  exampleIndex: number
): string {
  const baseUrl = getRegistryBaseUrl();
  const f = frameworkMap[framework];
  const componentIndex = components.findIndex((c) => c.slug === slug);

  return `${baseUrl}/r/${f}/${componentIndex}/${exampleIndex}.json`;
}

/**
 * Parses registry URL parameters and returns the actual values
 * @param params The URL parameters with encoded values
 * @returns Object with full framework name, component slug, and example name
 */
export async function getRegistryParams(params: {
  frameworkCode: string; // Short framework code: r, s
  componentIndex: string; // Component index number in registry
  exampleIndex: string; // Example index number in component
}): Promise<{
  framework: string; // Full framework name: react, solid
  slug: string; // Actual component slug: accordion, button, etc.
  example: string; // Actual example name: basic, with-icon, etc.
} | null> {
  const { frameworkCode, componentIndex, exampleIndex } = params;

  // Convert framework short form to full name
  const fullFramework = reverseFrameworkMap[frameworkCode];
  if (!fullFramework) {
    return null;
  }

  // Convert component index to slug
  const componentIndexNum = parseInt(componentIndex, 10);
  if (
    isNaN(componentIndexNum) ||
    componentIndexNum < 0 ||
    componentIndexNum >= components.length
  ) {
    return null;
  }
  const componentSlug = components[componentIndexNum].slug;

  // Convert example index to name
  const exampleIndexNum = parseInt(exampleIndex, 10);
  if (isNaN(exampleIndexNum)) {
    return null;
  }
  const exampleName = await getExampleNameByIndex(
    componentSlug,
    exampleIndexNum
  );
  if (!exampleName) {
    return null;
  }

  return {
    framework: fullFramework,
    slug: componentSlug,
    example: exampleName,
  };
}
