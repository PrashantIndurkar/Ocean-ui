/**
 * File Operations Utility
 *
 * Handles reading component sources and writing to user's project
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Transform component imports to use local paths
 * Replaces:
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
 * Read component source from bundled components
 */
export async function readComponentSource(
  componentSlug: string,
  framework: "react" | "solid"
): Promise<string> {
  // Find package root by looking for package.json
  // Start from current file location and walk up
  let currentDir = __dirname;
  let packageRoot: string | null = null;

  // Walk up directories to find package.json
  for (let i = 0; i < 10; i++) {
    const packageJsonPath = join(currentDir, "package.json");
    if (existsSync(packageJsonPath)) {
      packageRoot = currentDir;
      break;
    }
    const parentDir = join(currentDir, "..");
    if (parentDir === currentDir) break; // Reached filesystem root
    currentDir = parentDir;
  }

  if (!packageRoot) {
    throw new Error(`Could not find package root. Started from: ${__dirname}`);
  }

  // Components are at package root/components/{framework}/base/{component}.tsx
  const componentPath = join(
    packageRoot,
    "components",
    framework,
    "base",
    `${componentSlug}.tsx`
  );

  if (!existsSync(componentPath)) {
    throw new Error(
      `Component ${componentSlug} not found for framework ${framework}.\n` +
        `Expected at: ${componentPath}\n` +
        `Package root: ${packageRoot}`
    );
  }

  return await readFile(componentPath, "utf-8");
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
