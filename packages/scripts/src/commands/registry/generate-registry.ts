/**
 * Registry Generator
 * 
 * Generates registry JSON files from component sources
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import color from "picocolors";
import type { RegistryItem, RegistryIndex, Framework } from "./registry-schema.js";
import {
  readComponentMetadata,
  getComponentSlugs,
  getExportStatement,
} from "./component-reader.js";
import { validateRegistryForFramework } from "./validate-registry.js";

/**
 * Component descriptions mapping
 */
const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  accordion: "A vertically stacked set of interactive headings that each reveal a section of content.",
  collapsible: "An interactive component that can expand and collapse to show or hide content.",
  button: "Displays a button or a component that looks like a button.",
  input: "Displays a form input field or a component that looks like an input field.",
  checkbox: "A control that allows the user to toggle between checked and not checked.",
  "radio-group": "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
  select: "Displays a list of options for the user to pick from—triggered by a button.",
  switch: "A control that allows the user to toggle between checked and not checked.",
  textarea: "Displays a form textarea or a component that looks like a textarea.",
  dialog: "A window overlaid on either the primary window or another dialog window.",
  popover: "Displays rich content in a portal, triggered by a button.",
  tooltip: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  card: "Displays a card with header, content, and footer.",
  avatar: "An image element with a fallback for representing the user.",
  badge: "Displays a badge or a component that looks like a badge.",
  tabs: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  menu: "Displays a menu to the user—such as a set of actions or functions—triggered by a button.",
  progress: "Displays an indicator showing the completion progress of a task.",
  toast: "A succinct message that is displayed temporarily.",
};

/**
 * Generate registry files for a specific framework
 */
export async function generateRegistryForFramework(
  framework: Framework
): Promise<void> {
  console.log(color.cyan(`\nGenerating registry for ${framework}...`));

  const monorepoRoot = join(process.cwd(), "../..");
  const outputDir = join(
    monorepoRoot,
    "apps",
    "docs",
    "public",
    "registry",
    framework
  );

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  // Get all component slugs
  const componentSlugs = await getComponentSlugs(framework, "base");
  
  if (componentSlugs.length === 0) {
    console.log(color.yellow(`No components found for ${framework}`));
    return;
  }

  const registryItems: RegistryItem[] = [];
  const indexItems: Array<{ name: string; type: string }> = [];

  // Process each component
  for (const slug of componentSlugs) {
    try {
      const metadata = await readComponentMetadata(slug, framework, "base");
      
      if (!metadata) {
        console.log(color.yellow(`⚠ Skipping ${slug} - metadata not found`));
        continue;
      }

      // Transform component content (replace relative imports with placeholders)
      const transformedContent = transformComponentContent(
        metadata.content,
        slug
      );

      // Generate export statement
      const exportStatement = getExportStatement(slug, transformedContent);

      // Get component description
      const description = COMPONENT_DESCRIPTIONS[slug] || `${metadata.name} component`;

      const registryItem: RegistryItem = {
        $schema: "https://components.prashantindurkar.in/schema/registry-item.json",
        name: slug,
        type: "registry:ui",
        title: metadata.name,
        description,
        dependencies: metadata.dependencies,
        files: [
          {
            content: transformedContent,
            path: `${slug}.tsx`,
            type: "registry:ui",
            exports: exportStatement,
          },
        ],
        ...(metadata.cssVars && { cssVars: metadata.cssVars }),
        ...(metadata.css && { css: metadata.css }),
      };

      registryItems.push(registryItem);
      indexItems.push({ name: slug, type: "registry:ui" });

      // Write individual component JSON file
      const componentPath = join(outputDir, `${slug}.json`);
      await writeFile(
        componentPath,
        `${JSON.stringify(registryItem, null, 2)}\n`,
        "utf-8"
      );

      console.log(color.green(`  ✓ Generated ${slug}.json`));
    } catch (error) {
      console.error(color.red(`  ✗ Failed to generate ${slug}:`), error);
    }
  }

  // Generate index.json
  const registryIndex: RegistryIndex = {
    $schema: "https://components.prashantindurkar.in/schema/registry.json",
    name: `@ocean-ui/${framework}`,
    homepage: "https://components.prashantindurkar.in",
    items: indexItems,
  };

  const indexPath = join(outputDir, "index.json");
  await writeFile(
    indexPath,
    `${JSON.stringify(registryIndex, null, 2)}\n`,
    "utf-8"
  );

  console.log(
    color.green(
      `\n✓ Generated ${registryItems.length} component files and index.json for ${framework}`
    )
  );

  // Validate generated files
  const isValid = await validateRegistryForFramework(framework);
  if (!isValid) {
    throw new Error(`Validation failed for ${framework} registry files`);
  }
}

/**
 * Transform component content to replace imports
 */
function transformComponentContent(content: string, componentSlug: string): string {
  let transformed = content;

  // Replace relative utils imports with @/lib/utils
  transformed = transformed.replace(
    /from\s+["']\.\.\/.*?lib\/utils["']/g,
    'from "@/lib/utils"'
  );

  // Replace relative component imports (if any)
  transformed = transformed.replace(
    /from\s+["']\.\.\/.*?components\/base\/([\w-]+)["']/g,
    (match, importedComponent) => {
      if (importedComponent === componentSlug) {
        return match; // Don't transform self-imports
      }
      return `from "@/components/ui/${importedComponent}"`;
    }
  );

  return transformed;
}

/**
 * Generate registry files for all frameworks
 */
export async function generateRegistry(): Promise<void> {
  console.log(color.bgCyan(color.black(" Ocean UI Registry Generator ")));
  console.log();

  const frameworks: Framework[] = ["react", "solid"];
  let allValid = true;

  for (const framework of frameworks) {
    try {
      await generateRegistryForFramework(framework);
    } catch (error) {
      console.error(
        color.red(`\n✗ Failed to generate registry for ${framework}:`),
        error
      );
      allValid = false;
    }
  }

  if (allValid) {
    console.log(color.green("\n✓ Registry generation and validation complete!\n"));
  } else {
    console.log(color.red("\n✗ Registry generation completed with errors!\n"));
    process.exit(1);
  }
}

// Run if executed directly (when using tsx)
if (import.meta.url.endsWith(process.argv[1]?.replace(process.cwd(), "") || "")) {
  generateRegistry().catch((error) => {
    console.error(color.red("Error generating registry:"), error);
    process.exit(1);
  });
}

