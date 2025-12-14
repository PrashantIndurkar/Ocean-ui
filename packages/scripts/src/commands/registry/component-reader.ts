/**
 * Component Reader Utility
 * 
 * Reads and parses component files from ui-react and ui-solid packages
 */

import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { ComponentMetadata, Framework } from "./registry-schema.js";

/**
 * Component metadata from components registry
 */
interface ComponentInfo {
  name: string;
  slug: string;
  category: string;
  subcategory: string;
}

/**
 * Read component source file
 */
export async function readComponentFile(
  componentSlug: string,
  framework: Framework,
  category: string = "base"
): Promise<string | null> {
  const monorepoRoot = join(process.cwd(), "../..");
  const componentPath = join(
    monorepoRoot,
    "packages",
    `ui-${framework}`,
    "src",
    "components",
    category,
    `${componentSlug}.tsx`
  );

  if (!existsSync(componentPath)) {
    return null;
  }

  try {
    return await readFile(componentPath, "utf-8");
  } catch (error) {
    console.error(`Failed to read component ${componentSlug} for ${framework}:`, error);
    return null;
  }
}

/**
 * Get all component slugs for a framework
 */
export async function getComponentSlugs(
  framework: Framework,
  category: string = "base"
): Promise<string[]> {
  const monorepoRoot = join(process.cwd(), "../..");
  const componentsDir = join(
    monorepoRoot,
    "packages",
    `ui-${framework}`,
    "src",
    "components",
    category
  );

  if (!existsSync(componentsDir)) {
    return [];
  }

  try {
    const files = await readdir(componentsDir);
    return files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""));
  } catch (error) {
    console.error(`Failed to read components directory for ${framework}:`, error);
    return [];
  }
}

/**
 * Read component metadata
 */
export async function readComponentMetadata(
  componentSlug: string,
  framework: Framework,
  category: string = "base"
): Promise<ComponentMetadata | null> {
  const content = await readComponentFile(componentSlug, framework, category);
  
  if (!content) {
    return null;
  }

  // Extract dependencies from imports
  const dependencies = extractDependencies(content, framework);

  // Get component info from registry
  const componentInfo = await getComponentInfo(componentSlug);

  // Read CSS vars/css from old registry (if exists)
  const oldMetadata = await readOldRegistryMetadata(componentSlug);

  return {
    name: componentInfo?.name || componentSlug.charAt(0).toUpperCase() + componentSlug.slice(1),
    slug: componentSlug,
    framework,
    category: (componentInfo?.category || category) as ComponentMetadata["category"],
    dependencies,
    content,
    ...oldMetadata,
  };
}

/**
 * Generate export statement for a component
 */
export function getExportStatement(slug: string, content: string): string {
  return generateExportStatement(slug, content);
}

/**
 * Get component info from components registry
 */
async function getComponentInfo(slug: string): Promise<ComponentInfo | null> {
  try {
    const monorepoRoot = join(process.cwd(), "../..");
    const componentsPath = join(
      monorepoRoot,
      "apps",
      "docs",
      "src",
      "lib",
      "components.ts"
    );

    if (!existsSync(componentsPath)) {
      return null;
    }

    const content = await readFile(componentsPath, "utf-8");
    
    // Extract component from the components array
    const componentMatch = content.match(
      new RegExp(`\\{\\s*name:\\s*"([^"]+)",\\s*slug:\\s*"${slug}"[^}]+\\}`, "s")
    );

    if (!componentMatch) {
      return null;
    }

    // Extract name, category, subcategory
    const nameMatch = componentMatch[0].match(/name:\s*"([^"]+)"/);
    const categoryMatch = componentMatch[0].match(/category:\s*"([^"]+)"/);
    const subcategoryMatch = componentMatch[0].match(/subcategory:\s*"([^"]+)"/);

    return {
      name: nameMatch?.[1] || slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      category: categoryMatch?.[1] || "base",
      subcategory: subcategoryMatch?.[1] || "",
    };
  } catch (error) {
    console.warn(`Failed to read component info for ${slug}:`, error);
    return null;
  }
}

/**
 * Read CSS vars and CSS from old registry file (if exists)
 */
async function readOldRegistryMetadata(
  slug: string
): Promise<{ cssVars?: ComponentMetadata["cssVars"]; css?: ComponentMetadata["css"] }> {
  try {
    const monorepoRoot = join(process.cwd(), "../..");
    const oldRegistryPath = join(
      monorepoRoot,
      "apps",
      "docs",
      "public",
      "r",
      `${slug}.json`
    );

    if (!existsSync(oldRegistryPath)) {
      return {};
    }

    const content = await readFile(oldRegistryPath, "utf-8");
    const registry = JSON.parse(content);

    return {
      ...(registry.cssVars && { cssVars: registry.cssVars }),
      ...(registry.css && { css: registry.css }),
    };
  } catch (error) {
    // Silently fail - old registry might not exist
    return {};
  }
}

/**
 * Extract dependencies from component source code
 */
function extractDependencies(content: string, framework: Framework): string[] {
  const dependencies = new Set<string>();

  // Add framework dependency
  dependencies.add(framework === "react" ? "react" : "solid-js");

  // Extract @ark-ui imports
  const arkMatches = content.match(/from\s+["']@ark-ui\/(react|solid)\/([^"']+)["']/g);
  if (arkMatches) {
    dependencies.add(`@ark-ui/${framework}`);
  }

  // Extract lucide imports
  const lucideMap: Record<Framework, string> = {
    react: "lucide-react",
    solid: "lucide-solid",
  };
  if (content.includes("lucide-")) {
    dependencies.add(lucideMap[framework]);
  }

  // Extract @ocean-ui/tokens if present
  if (content.includes("@ocean-ui/tokens")) {
    dependencies.add("@ocean-ui/tokens");
  }

  return Array.from(dependencies);
}

/**
 * Generate export statement for component
 */
function generateExportStatement(slug: string, content: string): string {
  // Extract exported names from the component file
  const exportMatches = content.match(/export\s+(?:const|function|interface|type|class)\s+(\w+)/g);
  const namedExports: string[] = [];

  if (exportMatches) {
    exportMatches.forEach((match) => {
      const nameMatch = match.match(/(\w+)$/);
      if (nameMatch) {
        namedExports.push(nameMatch[1]);
      }
    });
  }

  // Check for export { ... } pattern
  const exportBlockMatch = content.match(/export\s+\{([^}]+)\}/);
  if (exportBlockMatch) {
    const exports = exportBlockMatch[1]
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    namedExports.push(...exports);
  }

  if (namedExports.length > 0) {
    return `export { ${namedExports.join(", ")} } from './${slug}'`;
  }

  return `export * from './${slug}'`;
}

