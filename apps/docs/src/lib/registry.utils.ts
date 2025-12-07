import type { ComponentManifest } from "./registry";

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
