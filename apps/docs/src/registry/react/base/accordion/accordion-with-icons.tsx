"use client";

import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import { Plus, Minus, ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Accordion, AccordionContent, AccordionItem } from "@ocean-ui/react";
import { cn } from "@/lib/utils";

function AccordionTriggerWithIcons({
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
        // Hide Plus icon when parent is open
        "[&[data-state=open]>.accordion-plus-icon]:hidden",
        // Hide Minus icon when parent is closed
        "[&[data-state=closed]>.accordion-minus-icon]:hidden",
        "data-[state=closed]:text-primary/60 data-[state=closed]:hover:text-primary data-[state=open]:text-primary",
        className
      )}
      {...props}
    >
      <Plus
        className={cn(
          "accordion-plus-icon size-5 shrink-0 transition-opacity duration-200",
          "text-secondary"
        )}
      />
      <Minus
        className={cn(
          "accordion-minus-icon size-5 shrink-0 transition-opacity duration-200",
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
    title: "How do I update my account information?",
    content:
      'You can update your account information by navigating to your profile settings. Click on your profile icon in the top right corner, then select "Account Settings" from the dropdown menu. From there, you can edit your name, email, password, and other personal details.',
  },
  {
    value: "item-2",
    title: "What payment methods are accepted?",
    content:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted payment gateway to ensure your financial information is protected.",
  },
  {
    value: "item-3",
    title: "How can I track my order?",
    content:
      "Once your order has been shipped, you'll receive a tracking number via email. You can use this tracking number on our website's tracking page or on the carrier's website to monitor your package's journey in real-time. You'll receive updates at each stage of the delivery process.",
  },
];

export default function AccordionWithIcons() {
  return (
    <Accordion
      className="w-full max-w-lg mx-auto"
      defaultValue={[accordionItems[1].value]}
      collapsible
    >
      {accordionItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTriggerWithIcons>{item.title}</AccordionTriggerWithIcons>
          <AccordionContent className="pl-5 text-tertiary">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
