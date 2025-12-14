/**
 * Registry Schema Types
 * 
 * TypeScript types for Ocean UI registry format
 */

/**
 * Registry file entry
 */
export interface RegistryFile {
  content: string;
  path: string;
  type: "registry:ui" | "registry:recipe" | "registry:theme" | "registry:color";
  exports?: string;
  imports?: string;
}

/**
 * Registry item (component)
 */
export interface RegistryItem {
  $schema: string;
  name: string;
  type: "registry:ui" | "registry:recipe" | "registry:theme" | "registry:color";
  title?: string;
  description?: string;
  dependencies: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  cssVars?: {
    theme: Record<string, string>;
  };
  css?: Record<string, any>;
}

/**
 * Registry index item (for listing components)
 */
export interface RegistryIndexItem {
  name: string;
  type: string;
}

/**
 * Registry index (list of all components)
 */
export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}

/**
 * Framework type
 */
export type Framework = "react" | "solid";

/**
 * Component metadata for registry generation
 */
export interface ComponentMetadata {
  name: string;
  slug: string;
  framework: Framework;
  category: "base" | "fundamentals" | "blocks" | "templates";
  dependencies: string[];
  registryDependencies?: string[];
  content: string;
  cssVars?: {
    theme: Record<string, string>;
  };
  css?: Record<string, any>;
}

