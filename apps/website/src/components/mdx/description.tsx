import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DescriptionProps {
  /**
   * The description content (text or JSX)
   */
  children: ReactNode;
  /**
   * Text color variant - uses Tailwind text color classes
   * @default "text-brand-400"
   */
  color?: string;
  /**
   * Text size variant
   * @default "base"
   */
  size?: "md" | "lg" | "xl";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to render as a paragraph or div
   * @default "div" (safer for MDX to avoid nested paragraph issues)
   */
  as?: "p" | "div";
}

const sizeMap = {
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

/**
 * A flexible description component for displaying component descriptions in documentation.
 * Used to provide contextual information about components in MDX files.
 */
export function Description({
  children,
  color = "text-brand-400",
  size = "lg",
  className,
  as = "div",
}: DescriptionProps) {
  const Component = as;
  const sizeClass = sizeMap[size];

  // Handle color class - if it already starts with "text-", use as-is
  // Otherwise, prepend "text-" to the color value
  const colorClass = color.startsWith("text-") ? color : `text-${color}`;

  return (
    <Component
      className={cn(colorClass, sizeClass, className)}
      role="note"
      aria-label="Component description"
    >
      {children}
    </Component>
  );
}
