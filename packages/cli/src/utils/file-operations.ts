/**
 * File Operations Utility
 *
 * Handles reading component sources and writing to user's project
 */

import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";
import chalk from "chalk";

/**
 * Transform component imports to use local paths
 * Replaces:
 * - Relative component imports (../../../components/base/{component}) → @/components/ui/{componentSlug}
 * - Relative utils imports (../../../lib/utils) → @/lib/utils
 * - @ocean-ui/react → @/components/ui/{componentSlug}
 * - @ocean-ui/utils → @/lib/utils
 *
 * @param content - Component source code
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Transformed code with local import paths
 */
export function transformComponentImports(
  content: string,
  componentSlug: string
): string {
  let transformed = content;

  // Transform relative component imports first (e.g., ../../../components/base/accordion)
  // Pattern handles various relative path depths and both quote types
  transformed = transformed.replace(
    /from\s+["']\.\.\/.*?components\/base\/[\w-]+["']/g,
    `from "@/components/ui/${componentSlug}"`
  );

  // Transform relative utils imports (e.g., ../../../lib/utils)
  transformed = transformed.replace(
    /from\s+["']\.\.\/.*?lib\/utils["']/g,
    'from "@/lib/utils"'
  );

  // Transform @ocean-ui/react to @/components/ui/{componentSlug}
  transformed = transformed.replace(
    /from\s+["']@ocean-ui\/react["']/g,
    `from "@/components/ui/${componentSlug}"`
  );

  // Transform @ocean-ui/utils to @/lib/utils
  transformed = transformed.replace(
    /from\s+["']@ocean-ui\/utils["']/g,
    'from "@/lib/utils"'
  );

  return transformed;
}

/**
 * Get utils dependencies that need to be installed
 */
export function getUtilsDependencies(): string[] {
  return ["clsx", "tailwind-merge"];
}

/**
 * Ensure utils file exists in user's project
 * Creates src/lib/utils.ts if it doesn't exist
 * Returns true if file was created, false if it already existed
 */
export async function ensureUtilsFile(): Promise<boolean> {
  const utilsPaths = [
    join(process.cwd(), "src", "lib", "utils.ts"),
    join(process.cwd(), "lib", "utils.ts"),
  ];

  // Check if utils file already exists
  for (const utilsPath of utilsPaths) {
    if (existsSync(utilsPath)) {
      return false; // File already exists
    }
  }

  // Create src/lib/utils.ts (most common location)
  const targetPath = join(process.cwd(), "src", "lib", "utils.ts");
  const targetDir = dirname(targetPath);

  // Create directory if it doesn't exist
  if (!existsSync(targetDir)) {
    await mkdir(targetDir, { recursive: true });
  }

  // Write utils file with standard cn utility
  const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

  await writeFile(targetPath, utilsContent, "utf-8");
  console.log(chalk.gray(`Created ${targetPath}`));
  return true; // File was created
}

/**
 * Read component source from registry API
 */
export async function readComponentSource(
  componentSlug: string,
  framework: "react" | "solid"
): Promise<string> {
  const { defaultRegistryClient } = await import("./registry-client.js");
  const { getRegistryURL } = await import("./config.js");

  try {
    // Set registry URL from config
    const registryURL = await getRegistryURL();
    defaultRegistryClient.setBaseURL(registryURL);

    // Fetch component from registry
    const registryItem = await defaultRegistryClient.fetchComponent(
      framework,
      componentSlug
    );

    // Get the first file's content (main component file)
    if (!registryItem.files || registryItem.files.length === 0) {
      throw new Error(`Component "${componentSlug}" has no files in registry`);
    }

    return registryItem.files[0].content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch component source: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Write component to user's project
 */
export async function writeComponent(
  componentSlug: string,
  content: string,
  targetDir: string = "components/ui"
): Promise<string> {
  const targetPath = join(process.cwd(), targetDir, `${componentSlug}.tsx`);

  // Create directory if it doesn't exist
  const dir = dirname(targetPath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(chalk.gray(`Created directory: ${targetDir}`));
  }

  // Check if file already exists
  if (existsSync(targetPath)) {
    throw new Error(
      `File already exists: ${targetPath}\nUse --overwrite flag to replace it.`
    );
  }

  await writeFile(targetPath, content, "utf-8");
  console.log(chalk.green(`✓ Created ${targetPath}`));

  return targetPath;
}

/**
 * Write component with overwrite option
 */
export async function writeComponentWithOverwrite(
  componentSlug: string,
  content: string,
  targetDir: string = "components/ui",
  overwrite: boolean = false
): Promise<string> {
  const targetPath = join(process.cwd(), targetDir, `${componentSlug}.tsx`);

  // Create directory if it doesn't exist
  const dir = dirname(targetPath);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(chalk.gray(`Created directory: ${targetDir}`));
  }

  // Check if file already exists
  if (existsSync(targetPath) && !overwrite) {
    throw new Error(
      `File already exists: ${targetPath}\nUse --overwrite flag to replace it.`
    );
  }

  if (existsSync(targetPath) && overwrite) {
    console.log(chalk.yellow(`⚠ Overwriting existing file: ${targetPath}`));
  }

  // Transform imports before writing (for copy-paste friendly components)
  const transformedContent = transformComponentImports(content, componentSlug);

  await writeFile(targetPath, transformedContent, "utf-8");
  console.log(
    chalk.green(`✓ ${overwrite ? "Updated" : "Created"} ${targetPath}`)
  );

  return targetPath;
}
