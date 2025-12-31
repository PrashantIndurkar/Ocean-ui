/**
 * Import Transformation Utility
 *
 * Transforms @ocean-ui/react imports and relative imports to @/components/ui/{component} imports
 * for copy-paste ready code in documentation and CLI installation.
 */

/**
 * Transform relative component imports to @/components/ui/{componentSlug} imports
 * Handles patterns like: ../../../components/base/{component} → @/components/ui/{component}
 *
 * @param code - Source code to transform
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Transformed code with local component import paths
 *
 * @example
 * transformRelativeComponentImports(
 *   'import { Accordion } from "../../../components/base/accordion";',
 *   'accordion'
 * )
 * // Returns: 'import { Accordion } from "@/components/ui/accordion";'
 */
export function transformRelativeComponentImports(
  code: string,
  componentSlug: string
): string {
  // Pattern to match: from "../../../components/base/{component}" or similar relative paths
  // Handles both single and double quotes, and various relative path depths
  const importPattern = /from\s+["']\.\.\/.*?components\/base\/[\w-]+["']/g;

  // Replace with local component path
  const replacement = `from "@/components/ui/${componentSlug}"`;

  return code.replace(importPattern, replacement);
}

/**
 * Transform relative utils imports to @/lib/utils imports
 * Handles patterns like: ../../../lib/utils → @/lib/utils
 *
 * @param code - Source code to transform
 * @returns Transformed code with local utils import path
 *
 * @example
 * transformRelativeUtilsImports('import { cn } from "../../../lib/utils";')
 * // Returns: 'import { cn } from "@/lib/utils";'
 */
export function transformRelativeUtilsImports(code: string): string {
  // Pattern to match: from "../../../lib/utils" or similar relative paths
  // Handles both single and double quotes, and various relative path depths
  const importPattern = /from\s+["']\.\.\/.*?lib\/utils["']/g;

  // Replace with local utils path
  return code.replace(importPattern, 'from "@/lib/utils"');
}

/**
 * Transform @/components/library/react/base/{component} imports to @/components/ui/{componentSlug} imports
 * Handles patterns like: @/components/library/react/base/accordion → @/components/ui/accordion
 *
 * @param code - Source code to transform
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Transformed code with local component import paths
 */
function transformLibraryComponentImports(
  code: string,
  componentSlug: string
): string {
  // Pattern to match: from "@/components/library/react/base/{component}" or similar
  // Handles both single and double quotes
  const importPattern =
    /from\s+["']@\/components\/library\/react\/base\/[\w-]+["']/g;

  // Replace with local component path
  const replacement = `from "@/components/ui/${componentSlug}"`;

  return code.replace(importPattern, replacement);
}

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
  // First transform relative component imports
  let transformed = transformRelativeComponentImports(code, componentSlug);

  // Then transform @/components/library/react/base/ imports
  transformed = transformLibraryComponentImports(transformed, componentSlug);

  // Then transform relative utils imports
  transformed = transformRelativeUtilsImports(transformed);

  // Finally transform @ocean-ui/react imports
  // Pattern to match: from "@ocean-ui/react" or from '@ocean-ui/react'
  // Handles both single and double quotes
  const importPattern = /from\s+["']@ocean-ui\/react["']/g;

  // Replace with local component path
  const replacement = `from "@/components/ui/${componentSlug}"`;

  return transformed.replace(importPattern, replacement);
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
 * Combines relative imports, component imports, and utils transformations
 *
 * @param code - Source code to transform
 * @param componentSlug - Component slug (e.g., "accordion")
 * @returns Fully transformed code
 */
export function transformAllImports(
  code: string,
  componentSlug: string
): string {
  // transformImportsForDisplay already handles relative imports and @ocean-ui/react
  let transformed = transformImportsForDisplay(code, componentSlug);
  // Then transform @ocean-ui/utils imports
  transformed = transformUtilsImports(transformed);
  return transformed;
}
