"use client";

import { Plus, Minus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ocean-ui/react";

/**
 * Shows a plus icon when the accordion is closed
 * and a minus icon when the accordion is open.
 *
 * @returns The toggle icon to display on the left of the trigger.
 */
function AccordionToggleLeftIcon() {
  return (
    <>
      <Plus className="accordion-plus-icon size-5 shrink-0 text-secondary transition-opacity duration-200 [.group[data-state=open]_&]:hidden" />
      <Minus className="accordion-minus-icon size-5 shrink-0 text-secondary transition-opacity duration-200 [.group[data-state=closed]_&]:hidden" />
    </>
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
          <AccordionTrigger leftIcon={<AccordionToggleLeftIcon />}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="pl-5 text-tertiary">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
