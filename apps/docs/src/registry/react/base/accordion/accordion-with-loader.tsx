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
        // Style Loader when parent is open: animate and change color, use slower spin
        "[&[data-state=open]>.accordion-loader]:animate-spin [&[data-state=open]>.accordion-loader]:[animation-duration:1.5s]",
        "[&[data-state=open]>.accordion-loader]:text-brand-primary",
        // Style Loader when parent is closed: muted color, no animation
        "[&[data-state=closed]>.accordion-loader]:text-brand-quaternary/60",
        "data-[state=closed]:text-primary/60 data-[state=closed]:hover:text-primary data-[state=open]:text-primary",
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

const accordionItems = [
  {
    value: "item-1",
    title: "Set up shipping options",
    content:
      "Configure multiple shipping methods to meet your customers' needs. Set up local and international delivery options, define shipping zones, and create flexible pricing rules. Integrate with popular carriers for real-time rates and tracking capabilities.",
  },
  {
    value: "item-2",
    title: "Configure tax settings",
    content:
      "Set up tax calculations for different regions and product categories. Configure automatic tax calculation based on customer location, manage tax exemptions, and integrate with tax services for accurate compliance.",
  },
  {
    value: "item-3",
    title: "Manage payment methods",
    content:
      "Enable and configure various payment gateways including credit cards, digital wallets, and bank transfers. Set up payment processing rules, handle refunds, and manage payment security settings.",
  },
];

export default function AccordionWithLoader() {
  return (
    <Accordion
      className="w-full max-w-lg mx-auto"
      defaultValue={[accordionItems[0].value]}
      collapsible
    >
      {accordionItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTriggerWithLoader>{item.title}</AccordionTriggerWithLoader>
          <AccordionContent className="pl-5 text-tertiary">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
