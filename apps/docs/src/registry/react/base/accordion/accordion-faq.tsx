"use client";

import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import {
  UserRound,
  CreditCard,
  SquareArrowOutUpRight,
  Plus,
  Minus,
} from "lucide-react";
import type { ComponentProps } from "react";

import { Accordion, AccordionContent, AccordionItem } from "@ocean-ui/react";
import { cn } from "@/lib/utils";

function AccordionTriggerFAQ({
  className,
  children,
  icon: Icon,
  ...props
}: ComponentProps<typeof AccordionPrimitive.ItemTrigger> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <AccordionPrimitive.ItemTrigger
      className={cn(
        "group flex w-full items-center gap-4 py-4 px-4 text-left cursor-pointer text-sm font-medium transition-all duration-200 ease-out outline-none",
        "bg-muted data-[state=closed]:hover:bg-quaternary/40",
        "data-[state=open]:bg-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>.accordion-plus-icon]:hidden",
        "[&[data-state=closed]>.accordion-minus-icon]:hidden",
        "data-[state=closed]:hover:text-primary",
        className
      )}
      {...props}
    >
      <Icon className="size-5 shrink-0 text-primary/40 transition duration-200 [.group[data-state=closed]:hover_&]:text-primary [.group[data-state=open]_&]:text-primary" />
      <span className="flex-1">{children}</span>
      <Plus className="accordion-plus-icon size-5 shrink-0 text-secondary transition-opacity duration-200" />
      <Minus className="accordion-minus-icon size-5 shrink-0 text-secondary transition-opacity duration-200" />
    </AccordionPrimitive.ItemTrigger>
  );
}

const accordionItems = [
  {
    value: "item-1",
    title: "How do I update my account information?",
    content:
      "To update your account information, please log in to your account and navigate to the settings section. From there, you can update your personal details, contact information, and other relevant information.",
    icon: UserRound,
  },
  {
    value: "item-2",
    title: "What payment methods are accepted?",
    content:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted payment gateway to ensure your financial information is protected.",
    icon: CreditCard,
  },
  {
    value: "item-3",
    title: "How do I get a refund?",
    content:
      "To request a refund, please contact our customer support team within 30 days of your purchase. You can reach us through email, phone, or our support portal. Once your request is approved, the refund will be processed to your original payment method within 5-7 business days.",
    icon: SquareArrowOutUpRight,
  },
];

export default function AccordionFAQ() {
  return (
    <Accordion
      className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden border"
      defaultValue={[accordionItems[0].value]}
      collapsible
    >
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={cn(
            "border-b",
            index === accordionItems.length - 1 && "border-b-0"
          )}
        >
          <AccordionTriggerFAQ
            className={cn(
              "data-[state=closed]:text-primary/60 data-[state=open]:text-primary"
            )}
            icon={item.icon}
          >
            {item.title}
          </AccordionTriggerFAQ>
          <AccordionContent className="pl-7 pr-5 text-tertiary">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
