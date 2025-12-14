/**
 * Configuration Utility
 *
 * Reads configuration from components.json or uses defaults
 */

import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export interface ComponentsConfig {
  framework?: string;
  registry?: {
    url?: string;
  };
  aliases?: {
    components?: string;
    lib?: string;
    ui?: string;
  };
}

const DEFAULT_REGISTRY_URL = "https://components.prashantindurkar.in/api/registry";

/**
 * Read components.json from the current working directory
 *
 * @returns Configuration object or null if file doesn't exist
 */
export async function readComponentsConfig(): Promise<ComponentsConfig | null> {
  const configPath = join(process.cwd(), "components.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const content = await readFile(configPath, "utf-8");
    const config = JSON.parse(content) as ComponentsConfig;
    return config;
  } catch (error) {
    // If file exists but can't be read/parsed, return null
    // CLI will use defaults
    return null;
  }
}

/**
 * Get registry URL from config or use default
 *
 * @returns Registry base URL
 */
export async function getRegistryURL(): Promise<string> {
  const config = await readComponentsConfig();
  return config?.registry?.url || DEFAULT_REGISTRY_URL;
}

/**
 * Get framework from config or use provided/default
 *
 * @param providedFramework - Framework provided via CLI flag
 * @returns Framework name
 */
export async function getFramework(
  providedFramework?: string
): Promise<string> {
  if (providedFramework) {
    return providedFramework;
  }

  const config = await readComponentsConfig();
  if (config?.framework) {
    return config.framework;
  }

  // Default to react if nothing specified
  return "react";
}

/**
 * Get path aliases from config
 *
 * @returns Path aliases object
 */
export async function getPathAliases(): Promise<ComponentsConfig["aliases"]> {
  const config = await readComponentsConfig();
  return config?.aliases;
}

