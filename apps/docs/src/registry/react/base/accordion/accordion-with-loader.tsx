"use client";

import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import { Loader, ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Accordion, AccordionContent, AccordionItem } from "@ocean-ui/react";
import { cn } from "@/lib/utils";

function AccordionTriggerWithLoader({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.ItemTrigger>) {
  return (
    <AccordionPrimitive.ItemTrigger
      className={cn(
        "group flex w-full items-center gap-4 py-4 text-left cursor-pointer text-sm font-medium transition-all outline-none",
        "hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>.accordion-chevron]:rotate-180",
        // Style Loader when parent is open: animate and change color
        "[&[data-state=open]>.accordion-loader]:animate-spin",
        "[&[data-state=open]>.accordion-loader]:text-brand-primary",
        // Style Loader when parent is closed: muted color, no animation
        "[&[data-state=closed]>.accordion-loader]:text-brand-quaternary",
        className
      )}
      {...props}
    >
      <Loader
        className={cn(
          "accordion-loader size-5 shrink-0 transition-colors duration-200",
          // Default to muted when state is not yet determined
          "text-secondary"
        )}
      />
      <span className="flex-1">{children}</span>
      <ChevronDownIcon className="accordion-chevron text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 ml-auto" />
    </AccordionPrimitive.ItemTrigger>
  );
}

export default function AccordionWithLoader() {
  return (
    <Accordion
      className="w-full max-w-lg mx-auto"
      defaultValue={["item-1"]}
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTriggerWithLoader>
          Set up shipping options
        </AccordionTriggerWithLoader>
        <AccordionContent hasIcon>
          Configure multiple shipping methods to meet your customers&apos;
          needs. Set up local and international delivery options, define
          shipping zones, and create flexible pricing rules. Integrate with
          popular carriers for real-time rates and tracking capabilities.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTriggerWithLoader>
          Configure tax settings
        </AccordionTriggerWithLoader>
        <AccordionContent hasIcon>
          Set up tax calculations for different regions and product categories.
          Configure automatic tax calculation based on customer location, manage
          tax exemptions, and integrate with tax services for accurate
          compliance.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTriggerWithLoader>
          Manage payment methods
        </AccordionTriggerWithLoader>
        <AccordionContent hasIcon>
          Enable and configure various payment gateways including credit cards,
          digital wallets, and bank transfers. Set up payment processing rules,
          handle refunds, and manage payment security settings.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
