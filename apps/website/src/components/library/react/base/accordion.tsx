"use client";

import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root className={cn("w-full", className)} {...props} />
  );
}

function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-b border-border last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

interface AccordionTriggerProps
  extends ComponentProps<typeof AccordionPrimitive.ItemTrigger> {
  /**
   * Optional icon or content to display on the left side
   */
  leftIcon?: ReactNode;
  /**
   * Optional icon or content to display on the right side
   * If not provided, defaults to ChevronDownIcon
   */
  rightIcon?: ReactNode;
}

function AccordionTrigger({
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.ItemTrigger
      className={cn(
        "group flex w-full items-center gap-4 py-4 text-left cursor-pointer text-sm font-medium transition-all outline-none",
        "hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>.accordion-chevron]:rotate-180",
        "data-[state=closed]:text-primary/60 data-[state=closed]:hover:text-primary data-[state=open]:text-primary",
        className
      )}
      {...props}
    >
      {/* Left Icon Slot */}
      {leftIcon}

      {/* Title/Content */}
      <span className="flex-1">{children}</span>

      {/* Right Icon Slot */}
      {rightIcon ? (
        <span className="ml-auto">{rightIcon}</span>
      ) : (
        <ChevronDownIcon className="accordion-chevron text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 ml-auto" />
      )}
    </AccordionPrimitive.ItemTrigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.ItemContent>) {
  return (
    <AccordionPrimitive.ItemContent
      className={cn(
        "overflow-hidden text-sm",
        // Ark UI recommended animations
        "data-[state=closed]:animate-accordion-collapse data-[state=open]:animate-accordion-expand",
        className
      )}
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.ItemContent>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
