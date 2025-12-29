"use client";

import { Tabs, type TabItem } from "./tabs";
import type { ReactNode } from "react";

interface TabsWithLabelProps {
  /**
   * Array of tab items
   */
  items: TabItem[];
  /**
   * Default selected tab value
   */
  defaultValue?: string;
  /**
   * Label or title to display between tabs and content
   * Can be a string (for simple labels like "Terminal") or ReactNode (for complex content like file paths)
   */
  label?: ReactNode;
  /**
   * Label className for custom styling
   */
  labelClassName?: string;
  /**
   * Variant style
   * @default "bordered"
   */
  variant?: "default" | "bordered";
  /**
   * Root container className
   */
  className?: string;
  /**
   * Content container className
   */
  contentClassName?: string;
}

const defaultLabelClassName =
  "text-sm font-mono text-brand-400 dark:text-brand-300 font-light leading-7 my-6 pl-2";

export function TabsWithLabel({
  items,
  defaultValue,
  label,
  labelClassName,
  variant = "bordered",
  className,
  contentClassName,
}: TabsWithLabelProps) {
  // If no label provided, render tabs normally
  if (!label) {
    return (
      <Tabs
        items={items}
        defaultValue={defaultValue}
        variant={variant}
        className={className}
        contentClassName={contentClassName}
      />
    );
  }

  // Determine the final label className
  const finalLabelClassName = labelClassName
    ? labelClassName
    : defaultLabelClassName;

  // Wrap each item's content with the label
  const itemsWithLabel: TabItem[] = items.map((item) => ({
    ...item,
    content: (
      <>
        {typeof label === "string" ? (
          <p className={finalLabelClassName}>{label}</p>
        ) : (
          <div className={finalLabelClassName}>{label}</div>
        )}
        {item.content}
      </>
    ),
  }));

  return (
    <Tabs
      items={itemsWithLabel}
      defaultValue={defaultValue}
      variant={variant}
      className={className}
      contentClassName={contentClassName}
    />
  );
}
