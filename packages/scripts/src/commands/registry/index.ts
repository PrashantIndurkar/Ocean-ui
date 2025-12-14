/**
 * Registry Command
 *
 * Manages registry generation for Ocean UI components
 */

import { Command } from "commander";
import { generateRegistry } from "./generate-registry.js";
import { validateRegistry } from "./validate-registry.js";

export const registryCommand = new Command("registry")
  .description("manage registry files for Ocean UI components")
  .addCommand(
    new Command("generate")
      .description("generate registry JSON files from component sources")
      .action(async () => {
        await generateRegistry();
      })
  )
  .addCommand(
    new Command("build")
      .description("build registry files (alias for generate)")
      .action(async () => {
        await generateRegistry();
      })
  )
  .addCommand(
    new Command("validate")
      .description("validate registry JSON files against schemas")
      .action(async () => {
        const isValid = await validateRegistry();
        process.exit(isValid ? 0 : 1);
      })
  );
