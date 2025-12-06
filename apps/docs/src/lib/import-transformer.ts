/**
 * Import Transformation Utility
 *
 * Transforms @ocean-ui/react imports to @/components/ui/{component} imports
 * for copy-paste ready code in documentation and CLI installation.
 */

/**
 * Transform @ocean-ui/react imports to @/components/ui/{componentSlug} imports
 *
 * @param code - Source code to transform
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Transformed code with local import paths
 *
 * @example
 * transformImportsForDisplay(
 *   'import { Accordion } from "@ocean-ui/react";',
 *   'accordion'
 * )
 * // Returns: 'import { Accordion } from "@/components/ui/accordion";'
 */
export function transformImportsForDisplay(
  code: string,
  componentSlug: string
): string {
  // Pattern to match: from "@ocean-ui/react" or from '@ocean-ui/react'
  // Handles both single and double quotes
  const importPattern = /from\s+["']@ocean-ui\/react["']/g;

  // Replace with local component path
  const replacement = `from "@/components/ui/${componentSlug}"`;

  return code.replace(importPattern, replacement);
}

/**
 * Transform @ocean-ui/utils imports to @/lib/utils imports
 *
 * @param code - Source code to transform
 * @returns Transformed code with local utils path
 */
export function transformUtilsImports(code: string): string {
  return code.replace(/from\s+["']@ocean-ui\/utils["']/g, 'from "@/lib/utils"');
}

/**
 * Transform all Ocean UI imports for display/CLI
 * Combines both component and utils transformations
 *
 * @param code - Source code to transform
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Fully transformed code
 */
export function transformAllImports(
  code: string,
  componentSlug: string
): string {
  let transformed = transformImportsForDisplay(code, componentSlug);
  transformed = transformUtilsImports(transformed);
  return transformed;
}
