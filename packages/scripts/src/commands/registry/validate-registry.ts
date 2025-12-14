/**
 * Registry Validation
 * 
 * Validates generated registry files against JSON schemas
 */

import { readFile, readdir } from "fs/promises";
import { join } from "path";
import color from "picocolors";
import type { Framework } from "./registry-schema.js";

/**
 * Validate a registry item file against the schema
 */
export async function validateRegistryItem(
  filePath: string
): Promise<{ valid: boolean; errors: string[] }> {
  try {
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    const errors: string[] = [];

    // Basic structure validation
    if (!data.$schema) {
      errors.push("Missing required field: $schema");
    }
    if (!data.name) {
      errors.push("Missing required field: name");
    }
    if (!data.type) {
      errors.push("Missing required field: type");
    }
    if (!Array.isArray(data.dependencies)) {
      errors.push("Missing or invalid field: dependencies (must be an array)");
    }
    if (!Array.isArray(data.files) || data.files.length === 0) {
      errors.push("Missing or invalid field: files (must be a non-empty array)");
    }

    // Validate files array
    if (Array.isArray(data.files)) {
      data.files.forEach((file: any, index: number) => {
        if (!file.content) {
          errors.push(`File[${index}]: Missing required field 'content'`);
        }
        if (!file.path) {
          errors.push(`File[${index}]: Missing required field 'path'`);
        }
        if (!file.type) {
          errors.push(`File[${index}]: Missing required field 'type'`);
        }
        const validTypes = [
          "registry:ui",
          "registry:recipe",
          "registry:theme",
          "registry:color",
        ];
        if (file.type && !validTypes.includes(file.type)) {
          errors.push(
            `File[${index}]: Invalid type '${file.type}'. Must be one of: ${validTypes.join(", ")}`
          );
        }
      });
    }

    // Validate type enum
    const validTypes = [
      "registry:ui",
      "registry:recipe",
      "registry:theme",
      "registry:color",
    ];
    if (data.type && !validTypes.includes(data.type)) {
      errors.push(
        `Invalid type '${data.type}'. Must be one of: ${validTypes.join(", ")}`
      );
    }

    // Validate cssVars structure if present
    if (data.cssVars !== undefined) {
      if (typeof data.cssVars !== "object" || data.cssVars === null) {
        errors.push("Invalid cssVars: must be an object");
      } else if (data.cssVars.theme !== undefined) {
        if (
          typeof data.cssVars.theme !== "object" ||
          data.cssVars.theme === null ||
          Array.isArray(data.cssVars.theme)
        ) {
          errors.push("Invalid cssVars.theme: must be an object");
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
}

/**
 * Validate a registry index file against the schema
 */
export async function validateRegistryIndex(
  filePath: string
): Promise<{ valid: boolean; errors: string[] }> {
  try {
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    const errors: string[] = [];

    // Basic structure validation
    if (!data.$schema) {
      errors.push("Missing required field: $schema");
    }
    if (!data.name) {
      errors.push("Missing required field: name");
    }
    if (!data.homepage) {
      errors.push("Missing required field: homepage");
    }
    if (!Array.isArray(data.items)) {
      errors.push("Missing or invalid field: items (must be an array)");
    }

    // Validate items array
    if (Array.isArray(data.items)) {
      data.items.forEach((item: any, index: number) => {
        if (!item.name) {
          errors.push(`Item[${index}]: Missing required field 'name'`);
        }
        if (!item.type) {
          errors.push(`Item[${index}]: Missing required field 'type'`);
        }
        const validTypes = [
          "registry:ui",
          "registry:recipe",
          "registry:theme",
          "registry:color",
        ];
        if (item.type && !validTypes.includes(item.type)) {
          errors.push(
            `Item[${index}]: Invalid type '${item.type}'. Must be one of: ${validTypes.join(", ")}`
          );
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
}

/**
 * Validate all registry files for a framework
 */
export async function validateRegistryForFramework(
  framework: Framework
): Promise<boolean> {
  console.log(color.cyan(`\nValidating registry for ${framework}...`));

  const monorepoRoot = join(process.cwd(), "../..");
  const registryDir = join(
    monorepoRoot,
    "apps",
    "docs",
    "public",
    "registry",
    framework
  );

  let allValid = true;
  let validatedCount = 0;
  let errorCount = 0;

  try {
    // Validate index.json
    const indexPath = join(registryDir, "index.json");
    const indexResult = await validateRegistryIndex(indexPath);
    validatedCount++;

    if (!indexResult.valid) {
      console.error(color.red(`  ✗ index.json validation failed:`));
      indexResult.errors.forEach((error) => {
        console.error(color.red(`    - ${error}`));
      });
      allValid = false;
      errorCount++;
    } else {
      console.log(color.green(`  ✓ index.json is valid`));
    }

    // Validate all component files
    const files = await readdir(registryDir);
    const componentFiles = files.filter(
      (file) => file.endsWith(".json") && file !== "index.json"
    );

    for (const file of componentFiles) {
      const filePath = join(registryDir, file);
      const result = await validateRegistryItem(filePath);
      validatedCount++;

      if (!result.valid) {
        console.error(color.red(`  ✗ ${file} validation failed:`));
        result.errors.forEach((error) => {
          console.error(color.red(`    - ${error}`));
        });
        allValid = false;
        errorCount++;
      } else {
        console.log(color.green(`  ✓ ${file} is valid`));
      }
    }

    console.log(
      color[allValid ? "green" : "red"](
        `\n${allValid ? "✓" : "✗"} Validated ${validatedCount} file(s), ${errorCount} error(s)`
      )
    );

    return allValid;
  } catch (error) {
    console.error(
      color.red(`Failed to validate registry for ${framework}:`),
      error
    );
    return false;
  }
}

/**
 * Validate all registry files for all frameworks
 */
export async function validateRegistry(): Promise<boolean> {
  console.log(color.bgCyan(color.black(" Ocean UI Registry Validation ")));
  console.log();

  const frameworks: Framework[] = ["react", "solid"];
  let allValid = true;

  for (const framework of frameworks) {
    const isValid = await validateRegistryForFramework(framework);
    if (!isValid) {
      allValid = false;
    }
  }

  if (allValid) {
    console.log(color.green("\n✓ All registry files are valid!\n"));
  } else {
    console.log(color.red("\n✗ Some registry files failed validation!\n"));
  }

  return allValid;
}

// Run if executed directly
if (import.meta.url.endsWith(process.argv[1]?.replace(process.cwd(), "") || "")) {
  validateRegistry()
    .then((valid) => {
      process.exit(valid ? 0 : 1);
    })
    .catch((error) => {
      console.error(color.red("Error validating registry:"), error);
      process.exit(1);
    });
}

