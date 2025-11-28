/**
 * Build script to copy component sources into CLI package
 * This allows the CLI to access component files when published
 */

import { copyFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_ROOT = join(__dirname, "..");
const MONOREPO_ROOT = join(CLI_ROOT, "..", "..");
const COMPONENTS_DIR = join(CLI_ROOT, "components");

async function copyComponents() {
  console.log("Copying component sources...");

  // Create components directory structure
  const reactBaseDir = join(COMPONENTS_DIR, "react", "base");
  const solidBaseDir = join(COMPONENTS_DIR, "solid", "base");

  await mkdir(reactBaseDir, { recursive: true });
  await mkdir(solidBaseDir, { recursive: true });

  // Copy React components
  const reactSourceDir = join(
    MONOREPO_ROOT,
    "packages",
    "ui-react",
    "src",
    "components",
    "base"
  );

  if (existsSync(reactSourceDir)) {
    const files = await readdir(reactSourceDir);
    const tsxFiles = files.filter((f) => f.endsWith(".tsx"));

    for (const file of tsxFiles) {
      const source = join(reactSourceDir, file);
      const dest = join(reactBaseDir, file);
      await copyFile(source, dest);
      console.log(`  ✓ Copied React: ${file}`);
    }
  }

  // Copy Solid components (if they exist)
  const solidSourceDir = join(
    MONOREPO_ROOT,
    "packages",
    "ui-solid",
    "src",
    "components",
    "base"
  );

  if (existsSync(solidSourceDir)) {
    const files = await readdir(solidSourceDir);
    const tsxFiles = files.filter((f) => f.endsWith(".tsx"));

    for (const file of tsxFiles) {
      const source = join(solidSourceDir, file);
      const dest = join(solidBaseDir, file);
      await copyFile(source, dest);
      console.log(`  ✓ Copied Solid: ${file}`);
    }
  } else {
    console.log("  ⚠ No Solid components found (this is expected if not implemented yet)");
  }

  console.log("✓ Component copying complete");
}

copyComponents().catch((error) => {
  console.error("Error copying components:", error);
  process.exit(1);
});
