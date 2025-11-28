/**
 * Package Manager Detection and Installation
 */

import { existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import chalk from "chalk";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

/**
 * Detect package manager from lock files
 */
export function detectPackageManager(): PackageManager {
  if (existsSync("pnpm-lock.yaml")) {
    return "pnpm";
  }
  if (existsSync("package-lock.json")) {
    return "npm";
  }
  if (existsSync("yarn.lock")) {
    return "yarn";
  }
  if (existsSync("bun.lockb")) {
    return "bun";
  }
  // Default to npm if none detected
  return "npm";
}

/**
 * Get install command for a package manager
 */
export function getInstallCommand(
  pm: PackageManager,
  dependencies: string[]
): string {
  const deps = dependencies.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${deps}`;
    case "npm":
      return `npm install ${deps}`;
    case "yarn":
      return `yarn add ${deps}`;
    case "bun":
      return `bun add ${deps}`;
  }
}

/**
 * Install dependencies using the specified package manager
 */
export async function installDependencies(
  pm: PackageManager,
  dependencies: string[]
): Promise<void> {
  if (dependencies.length === 0) {
    return;
  }

  const command = getInstallCommand(pm, dependencies);
  console.log(chalk.blue(`Installing dependencies: ${dependencies.join(", ")}`));
  console.log(chalk.gray(`Running: ${command}`));

  try {
    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    console.log(chalk.green("✓ Dependencies installed successfully"));
  } catch (error) {
    console.error(chalk.red("✗ Failed to install dependencies"));
    throw error;
  }
}

/**
 * Check if a package is installed in the project
 */
export function isPackageInstalled(packageName: string): boolean {
  try {
    const packageJsonPath = join(process.cwd(), "node_modules", packageName, "package.json");
    return existsSync(packageJsonPath);
  } catch {
    return false;
  }
}
