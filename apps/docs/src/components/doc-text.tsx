import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DocTextProps {
  /**
   * The text content
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to render as a paragraph or div
   * @default "div" (safer for MDX to avoid nested paragraph issues)
   */
  as?: "p" | "div" | "span";
}

/**
 * A reusable component for body/description text in documentation.
 * Uses a subtle gray color that works in both dark and light themes.
 */
export function DocText({ children, className, as = "div" }: DocTextProps) {
  const Component = as;

  return (
    <Component className={cn("text-brand-400 dark:text-brand-400", className)}>
      {children}
    </Component>
  );
}
