import {
  AccordionRoot,
  AccordionItem as AccordionItemPrimitive,
  AccordionItemTrigger as AccordionItemTriggerPrimitive,
  AccordionItemContent as AccordionItemContentPrimitive,
  type AccordionRootProps,
  type AccordionItemProps,
  type AccordionItemTriggerProps,
  type AccordionItemContentProps,
} from "@ark-ui/solid/accordion";
import { ChevronDownIcon } from "lucide-solid";
import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../../lib/utils";

export interface AccordionProps extends AccordionRootProps {}

export const Accordion: ParentComponent<AccordionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionRoot class={cn("w-full", local.class)} {...rest}>
      {local.children}
    </AccordionRoot>
  );
};

export interface AccordionItemComponentProps extends AccordionItemProps {}

export const AccordionItemComponent: ParentComponent<
  AccordionItemComponentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionItemPrimitive
      class={cn("border-b border-border last:border-b-0", local.class)}
      {...rest}
    >
      {local.children}
    </AccordionItemPrimitive>
  );
};

export interface AccordionTriggerComponentProps
  extends AccordionItemTriggerProps {
  /**
   * Optional icon or content to display on the left side
   */
  leftIcon?: JSX.Element;
  /**
   * Optional icon or content to display on the right side
   * If not provided, defaults to ChevronDownIcon
   */
  rightIcon?: JSX.Element;
}

export const AccordionTriggerComponent: ParentComponent<
  AccordionTriggerComponentProps
> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "leftIcon",
    "rightIcon",
  ]);
  return (
    <AccordionItemTriggerPrimitive
      class={cn(
        "group flex w-full items-center gap-4 py-4 text-left cursor-pointer text-sm font-medium transition-all outline-none",
        "hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>.accordion-chevron]:rotate-180",
        "data-[state=closed]:text-primary/60 data-[state=closed]:hover:text-primary data-[state=open]:text-primary",
        local.class
      )}
      {...rest}
    >
      {/* Left Icon Slot */}
      {local.leftIcon}

      {/* Title/Content */}
      <span class="flex-1">{local.children}</span>

      {/* Right Icon Slot */}
      {local.rightIcon ? (
        <span class="ml-auto">{local.rightIcon}</span>
      ) : (
        <ChevronDownIcon class="accordion-chevron text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 ml-auto" />
      )}
    </AccordionItemTriggerPrimitive>
  );
};

export interface AccordionContentComponentProps
  extends AccordionItemContentProps {}

export const AccordionContentComponent: ParentComponent<
  AccordionContentComponentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionItemContentPrimitive
      class={cn(
        "overflow-hidden text-sm",
        // Ark UI recommended animations
        "data-[state=closed]:animate-accordion-collapse data-[state=open]:animate-accordion-expand",
        local.class
      )}
      {...rest}
    >
      <div class="pb-4">{local.children}</div>
    </AccordionItemContentPrimitive>
  );
};

// Export with cleaner names
export {
  AccordionItemComponent as AccordionItem,
  AccordionTriggerComponent as AccordionTrigger,
  AccordionContentComponent as AccordionContent,
};
