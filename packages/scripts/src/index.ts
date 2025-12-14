#!/usr/bin/env node

/**
 * Ocean UI Scripts
 * 
 * CLI tool for running build scripts and registry generation
 */

import { Command } from "commander";
import { registryCommand } from "./commands/registry/index.js";

const program = new Command();

program
  .name("ocean-ui-scripts")
  .description("Build scripts for Ocean UI")
  .version("0.1.0");

program.addCommand(registryCommand);

program.parse();

