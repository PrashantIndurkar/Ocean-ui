"use client";

import { cn } from "@/lib/utils";
import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
import type { ReactNode } from "react";
import type { TabsValueChangeDetails } from "@ark-ui/react/tabs";

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  /**
   * Optional className for this specific trigger
   */
  triggerClassName?: string;
  /**
   * Optional className for this specific content
   */
  contentClassName?: string;
}

interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];
  /**
   * Default selected tab value (uncontrolled mode)
   */
  defaultValue?: string;
  /**
   * Controlled selected tab value (controlled mode)
   */
  value?: string;
  /**
   * Callback fired when tab value changes (controlled mode)
   */
  onValueChange?: (value: string) => void;
  /**
   * List container className
   */
  listClassName?: string;
  /**
   * Trigger base className (applied to all triggers)
   */
  triggerClassName?: string;
  /**
   * Content container className (applied to all content)
   */
  contentClassName?: string;
  /**
   * Root container className
   */
  className?: string;
  /**
   * Variant style
   * @default "default"
   */
  variant?: "default" | "bordered";
}

const defaultListClasses = {
  default:
    "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground font-mono gap-x-2",
  bordered:
    "inline-flex h-9 items-center border-b border-border bg-muted px-1.5 pt-1.5 pb-3 text-muted-foreground font-mono gap-x-2 w-full",
};

const defaultTriggerClasses =
  "inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 px-2.5 text-sm font-normal w-fit border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:border-brand-300 dark:data-selected:border-gray-700";

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  listClassName,
  triggerClassName,
  contentClassName,
  className,
  variant = "default",
}: TabsProps) {
  const firstValue = items[0]?.value;

  // Controlled mode: use value prop if provided
  // Uncontrolled mode: use defaultValue or fallback to first item
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : defaultValue || firstValue;

  return (
    <ArkTabs.Root
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : selectedValue}
      onValueChange={
        onValueChange
          ? (details: TabsValueChangeDetails) => {
              // Ark UI passes TabsValueChangeDetails object with value property
              onValueChange(details.value);
            }
          : undefined
      }
      className={className}
    >
      <ArkTabs.List className={cn(defaultListClasses[variant], listClassName)}>
        {items.map((item) => (
          <ArkTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              defaultTriggerClasses,
              variant === "default" &&
                "py-1 rounded-lg data-selected:shadow-md",
              variant === "bordered" &&
                "py-3 rounded-lg data-selected:shadow-md",
              triggerClassName,
              item.triggerClassName
            )}
          >
            {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
            {item.label}
          </ArkTabs.Trigger>
        ))}
      </ArkTabs.List>

      {items.map((item) => (
        <ArkTabs.Content
          key={item.value}
          value={item.value}
          className={cn(contentClassName, item.contentClassName)}
        >
          {item.content}
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  );
}
