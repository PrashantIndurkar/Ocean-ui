import { readFile, access } from "fs/promises";
import { join } from "path";
import type { ComponentRegistry, ComponentExample } from "./registry";
import { components } from "../components";
import { loadComponentManifest } from "./registry.utils";

/**
 * Maps kebab-case example file names to PascalCase export names
 */
const EXAMPLE_NAME_MAP: Record<string, string> = {
  "accordion-demo": "AccordionDemo",
  "accordion-multiple": "AccordionMultiple",
  "accordion-collapsible": "AccordionCollapsible",
  "accordion-with-loader": "AccordionWithLoader",
  "accordion-with-icons": "AccordionWithIcons",
  "accordion-faq": "AccordionFAQ",
  "button-demo": "ButtonDemo",
  "badge-demo": "BadgeDemo",
  "badge-variants": "BadgeVariants",
  "badge-status": "BadgeStatus",
  "badge-image": "BadgeImage",
  "badge-indicator": "BadgeIndicator",
};

/**
 * Server-only function to get source code for a specific framework
 * @param slug The component slug
 * @param exampleName The example name
 * @param framework The framework (react, solid, vue, svelte)
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
    // Determine file extension based on framework
    const extension =
      framework === "vue" ? "vue" : framework === "svelte" ? "svelte" : "tsx";

    // For SolidJS, check package path first
    if (framework === "solid") {
      // Resolve path relative to the workspace root
      // process.cwd() in Next.js is apps/website, so we go up two levels to Ocean-ui root
      const packagePath = join(
        process.cwd(),
        "..",
        "..",
        "packages",
        "ui-solid",
        "src",
        "examples",
        category,
        slug,
        `${exampleName}.${extension}`
      );

      try {
        await access(packagePath);
        const sourceCode = await readFile(packagePath, "utf-8");
        return sourceCode;
      } catch (error) {
        // Log error for debugging
        console.warn(
          `Failed to read SolidJS source from package path ${packagePath}:`,
          error instanceof Error ? error.message : String(error)
        );
        // Return null instead of falling through to docs path (which won't exist for SolidJS)
        return null;
      }
    }

    // Construct file path relative to the app directory
    // In Next.js, process.cwd() is the project root (apps/website)
    const filePath = join(
      process.cwd(),
      "src",
      "demos",
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
    const examples: ComponentExample[] = [];
    const frameworks = ["react", "solid", "vue", "svelte"];

    for (const exampleMeta of manifest.examples) {
      try {
        let exampleModule;

        // For SolidJS framework, skip component import (can't render SolidJS in React/Next.js server)
        // Only provide source code - components will be rendered client-side if needed
        if (framework === "solid") {
          // Use React component as placeholder since SolidJS can't be rendered server-side
          // The source code is still provided for display in code blocks
          exampleModule = await import(
            `@/demos/react/${componentCategory}/${slug}/${exampleMeta.name}.tsx`
          );
        } else {
          // For other frameworks, import from React directory for rendering
          exampleModule = await import(
            `@/demos/react/${componentCategory}/${slug}/${exampleMeta.name}.tsx`
          );
        }

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
