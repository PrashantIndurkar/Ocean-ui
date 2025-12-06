/**
 * Dependency Extractor Utility
 *
 * Extracts dependencies from component source code
 * Reuses logic from apps/docs/src/components/code-block-command.tsx
 */

import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lucideMap: Record<string, string> = {
  react: "lucide-react",
  solid: "lucide-solid",
};

/**
 * Extract dependencies from component source code
 */
export async function extractDependencies(
  componentSlug: string,
  framework: "react" | "solid"
): Promise<string[]> {
  const dependencies: string[] = [];

  try {
    // Read component source from bundled components directory
    const componentPath = join(
      __dirname,
      "..",
      "..",
      "components",
      framework,
      "base",
      `${componentSlug}.tsx`
    );

    const content = await readFile(componentPath, "utf-8");

    // Extract @ark-ui imports
    // Ark UI uses subpath exports, so we install the main package @ark-ui/react
    // not individual subpaths like @ark-ui/react/accordion
    const arkMatches = content.match(
      /from ["']@ark-ui\/(react|solid)\/([^"']+)["']/g
    );
    if (arkMatches) {
      const frameworkPackages = new Set<string>();
      arkMatches.forEach((match) => {
        const depMatch = match.match(/@ark-ui\/(react|solid)\//);
        if (depMatch) {
          const [, fw] = depMatch;
          // Install main package, not subpath
          frameworkPackages.add(`@ark-ui/${fw}`);
        }
      });
      dependencies.push(...Array.from(frameworkPackages));
    }

    // Extract lucide imports
    if (content.includes("lucide-")) {
      const lucidePackage = lucideMap[framework];
      if (lucidePackage && !dependencies.includes(lucidePackage)) {
        dependencies.push(lucidePackage);
      }
    }

    // Check for @ocean-ui/tokens
    if (
      content.includes("@ocean-ui/tokens") &&
      !dependencies.includes("@ocean-ui/tokens")
    ) {
      dependencies.push("@ocean-ui/tokens");
    }

    return dependencies;
  } catch (error) {
    // Fallback: return common dependencies for known components
    // Install main @ark-ui/react package, not subpath
    const fallbackDeps = [`@ark-ui/${framework}`, lucideMap[framework]].filter(
      Boolean
    ) as string[];

    if (componentSlug === "accordion") {
      return fallbackDeps;
    }

    // Default dependencies (empty - utils file will be created by CLI)
    return [];
  }
}
