#!/usr/bin/env node

/**
 * Ocean UI CLI
 *
 * CLI tool for installing Ocean UI components into projects
 */

import { Command } from "commander";
import chalk from "chalk";
import {
  findComponent,
  validateComponent,
  getAvailableComponents,
} from "./utils/component-discovery.js";
import { extractDependencies } from "./utils/dependency-extractor.js";
import {
  detectPackageManager,
  installDependencies,
  type PackageManager,
} from "./utils/package-manager.js";
import {
  readComponentSource,
  writeComponentWithOverwrite,
  ensureUtilsFile,
} from "./utils/file-operations.js";

const program = new Command();

program
  .name("ocean-ui")
  .description("CLI tool for installing Ocean UI components")
  .version("0.1.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component name (e.g., accordion, button)")
  .option("-f, --framework <framework>", "Framework (react|solid)", "react")
  .option(
    "-p, --pm <pm>",
    "Package manager (npm|pnpm|yarn|bun). Auto-detected if not specified"
  )
  .option("-o, --overwrite", "Overwrite existing files", false)
  .option("-d, --dir <dir>", "Target directory", "components/ui")
  .action(async (componentSlug: string, options) => {
    try {
      // Validate component
      if (!validateComponent(componentSlug)) {
        const available = getAvailableComponents().join(", ");
        console.error(
          chalk.red(
            `✗ Component "${componentSlug}" not found.\n\nAvailable components: ${available}`
          )
        );
        process.exit(1);
      }

      const component = findComponent(componentSlug);
      if (!component) {
        process.exit(1);
      }

      // Validate framework
      const framework = options.framework as "react" | "solid";
      if (framework !== "react" && framework !== "solid") {
        console.error(
          chalk.red(
            `✗ Invalid framework "${framework}". Supported: react, solid`
          )
        );
        process.exit(1);
      }

      console.log(
        chalk.blue(
          `\nAdding ${component.name} (${componentSlug}) for ${framework}...\n`
        )
      );

      // Detect or use specified package manager
      const pm: PackageManager = options.pm
        ? (options.pm as PackageManager)
        : detectPackageManager();

      console.log(chalk.gray(`Using package manager: ${pm}\n`));

      // Extract dependencies
      const dependencies = await extractDependencies(componentSlug, framework);

      // Install dependencies
      await installDependencies(pm, dependencies);

      // Ensure utils file exists (creates lib/utils.ts if needed)
      const utilsCreated = await ensureUtilsFile();
      if (utilsCreated) {
        console.log(
          chalk.gray(
            "Note: Created src/lib/utils.ts with cn utility function\n"
          )
        );
      }

      // Read component source
      const componentSource = await readComponentSource(
        componentSlug,
        framework
      );

      // Write component to project (imports will be transformed automatically)
      await writeComponentWithOverwrite(
        componentSlug,
        componentSource,
        options.dir,
        options.overwrite
      );

      console.log(chalk.green(`\n✓ Successfully added ${component.name}!\n`));
      console.log(
        chalk.gray(`Component file: ${options.dir}/${componentSlug}.tsx\n`)
      );
      if (utilsCreated) {
        console.log(
          chalk.gray(
            "Make sure your tsconfig.json has the @/* path alias configured.\n"
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`\n✗ Error: ${error.message}\n`));
      } else {
        console.error(chalk.red(`\n✗ An unexpected error occurred\n`));
      }
      process.exit(1);
    }
  });

program.parse();
