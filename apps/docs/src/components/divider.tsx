import { cn } from "@ocean-ui/utils";

type DividerOrientation = "horizontal" | "vertical";
type DividerStyle = "solid" | "dashed" | "dotted";

interface DividerProps {
  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Style of the border
   * @default "dashed"
   */
  style?: DividerStyle;
  /**
   * Thickness of the border (1-4)
   * @default 2
   */
  thickness?: 1 | 2 | 3 | 4;
  /**
   * Color variant - uses Tailwind border color classes (e.g., "border-border", "border-primary")
   * @default "border-border"
   */
  color?: string;
  /**
   * Spacing around the divider (margin)
   * @default "my-6"
   */
  spacing?: string;
  /**
   * Width of the divider (for horizontal) or height (for vertical)
   * @default "w-full" for horizontal, "h-full" for vertical
   */
  size?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const thicknessMap = {
  1: "border-t border-l",
  2: "border-t-2 border-l-2",
  3: "border-t-[3px] border-l-[3px]",
  4: "border-t-4 border-l-4",
};

const styleMap = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

/**
 * A flexible divider component for separating content sections.
 * Supports horizontal and vertical orientations with customizable styling.
 */
export function Divider({
  orientation = "horizontal",
  style = "dashed",
  thickness = 2,
  color = "border-border",
  spacing = "my-6",
  size,
  className,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";
  const borderThicknessClass = isHorizontal
    ? thicknessMap[thickness].split(" ")[0]
    : thicknessMap[thickness].split(" ")[1];

  const defaultSize = isHorizontal ? "w-full" : "h-full";
  const sizeClass = size ?? defaultSize;

  const dimensionClass = isHorizontal ? "h-px" : "w-px";

  // Handle color class - if it already starts with "border-", use as-is
  // Otherwise, prepend "border-" to the color value
  const colorClass = color.startsWith("border-") ? color : `border-${color}`;

  return (
    <div
      className={cn(
        dimensionClass,
        sizeClass,
        borderThicknessClass,
        styleMap[style],
        colorClass,
        spacing,
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
