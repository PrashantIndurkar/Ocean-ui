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

export default function AccordionWithIcons() {
  return (
    <Accordion
      className="w-full max-w-lg mx-auto"
      defaultValue={["item-2"]}
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTriggerWithIcons>
          How do I update my account information?
        </AccordionTriggerWithIcons>
        <AccordionContent hasIcon>
          You can update your account information by navigating to your profile
          settings. Click on your profile icon in the top right corner, then
          select &quot;Account Settings&quot; from the dropdown menu. From
          there, you can edit your name, email, password, and other personal
          details.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTriggerWithIcons>
          What payment methods are accepted?
        </AccordionTriggerWithIcons>
        <AccordionContent hasIcon>
          We accept all major credit cards (Visa, Mastercard, American Express),
          debit cards, PayPal, Apple Pay, and Google Pay. All transactions are
          processed securely through our encrypted payment gateway to ensure
          your financial information is protected.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTriggerWithIcons>
          How can I track my order?
        </AccordionTriggerWithIcons>
        <AccordionContent hasIcon>
          Once your order has been shipped, you&apos;ll receive a tracking
          number via email. You can use this tracking number on our
          website&apos;s tracking page or on the carrier&apos;s website to
          monitor your package&apos;s journey in real-time. You&apos;ll receive
          updates at each stage of the delivery process.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
