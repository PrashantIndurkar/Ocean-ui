import { readFile, access } from "fs/promises";
import { join } from "path";
import type { ComponentRegistry, ComponentExample } from "./registry";
import { components } from "./components";
import { loadComponentManifest } from "./registry.utils";

/**
 * Server-only function to get source code for a specific framework
 * @param slug The component slug
 * @param exampleName The example name
 * @param framework The framework (react, solid)
 * @param category The component category (fundamentals, base, blocks, templates) - defaults to "base"
 * @returns The source code as a string or null if not found
 */
export async function getComponentSource(
  slug: string,
  exampleName: string,
  framework: string,
  category: string = "base"
): Promise<string | null> {
  try {
    // Both React and Solid use .tsx extension
    const extension = "tsx";

    // Construct file path relative to the app directory
    // In Next.js, process.cwd() is the project root (apps/docs)
    const filePath = join(
      process.cwd(),
      "src",
      "registry",
      framework,
      category,
      slug,
      `${exampleName}.${extension}`
    );

    // Check if file exists before reading
    try {
      await access(filePath);
    } catch {
      console.warn(`File not found: ${filePath}`);
      return null;
    }

    // Read the file content
    const sourceCode = await readFile(filePath, "utf-8");
    return sourceCode;
  } catch (error) {
    console.error(
      `Failed to read source for ${framework}/${slug}/${exampleName}:`,
      error
    );
    return null;
  }
}

/**
 * Server-only function to dynamically import all examples for a component
 * @param slug The component slug
 * @param framework The framework (react, solid) - defaults to "react"
 * @returns The component registry or null if not found
 */
export async function getComponentRegistry(
  slug: string,
  framework: string = "react"
): Promise<ComponentRegistry | null> {
  try {
    // Find the component metadata
    const componentMeta = components.find((c) => c.slug === slug);
    if (!componentMeta) {
      return null;
    }

    // Get component category from metadata
    const componentCategory = componentMeta.category || "base";

    // Load shared manifest using centralized function
    const manifest = await loadComponentManifest(slug, componentCategory);
    if (!manifest) {
      return null;
    }

    // Load examples based on manifest (order is determined by array position)
    // Always render React components in the UI, regardless of selected framework
    const examples: ComponentExample[] = [];
    const frameworks = ["react", "solid"];

    for (const exampleMeta of manifest.examples) {
      try {
        // Always import from React directory for rendering
        const exampleModule = await import(
          `@/registry/react/${componentCategory}/${slug}/${exampleMeta.name}.tsx`
        );

        // Fetch source code for all frameworks using server-side function
        const sourceCode: { [framework: string]: string | null } = {};
        for (const fw of frameworks) {
          sourceCode[fw] = await getComponentSource(
            slug,
            exampleMeta.name,
            fw,
            componentCategory
          );
        }

        examples.push({
          id: exampleMeta.name,
          title: exampleMeta.title,
          span: exampleMeta.span,
          component: exampleModule.default,
          sourceCode,
        });
      } catch (error) {
        console.warn(
          `Failed to load example ${exampleMeta.name} for ${slug}:`,
          error
        );
      }
    }

    return {
      title: componentMeta.name,
      description: `A growing collection of ${
        examples.length
      } ${componentMeta.name.toLowerCase()} components built with ${
        framework.charAt(0).toUpperCase() + framework.slice(1)
      }.`,
      count: examples.length,
      examples,
    };
  } catch (error) {
    console.error("Error loading component registry:", error);
    return null;
  }
}

