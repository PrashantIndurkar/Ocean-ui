import {
  UserRound,
  CreditCard,
  SquareArrowOutUpRight,
  Plus,
  Minus,
} from "lucide-solid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/base/accordion";
import { cn } from "../../../lib/utils";
import { For } from "solid-js";
import type { Component } from "solid-js";

interface AccordionItemIconProps {
  icon: Component<{ class?: string }>;
}

/**
 * Renders the left icon for an accordion item.
 *
 * @param icon - A Lucide icon component to display on the left.
 * @returns The icon component styled appropriately.
 */
function AccordionItemLeftIcon(props: AccordionItemIconProps) {
  const Icon = props.icon;
  return (
    <Icon class="size-5 shrink-0 text-primary/40 transition duration-200 [.group[data-state=closed]:hover_&]:text-primary [.group[data-state=open]_&]:text-primary" />
  );
}

/**
 * Shows a plus icon when the accordion is closed
 * and a minus icon when the accordion is open.
 *
 * @returns The toggle icon to display on the right of the trigger.
 */
function AccordionToggleRightIcon() {
  return (
    <>
      <Plus class="accordion-plus-icon size-5 shrink-0 text-secondary transition-opacity duration-200 [.group[data-state=open]_&]:hidden" />
      <Minus class="accordion-minus-icon size-5 shrink-0 text-secondary transition-opacity duration-200 [.group[data-state=closed]_&]:hidden" />
    </>
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
      class="w-full max-w-lg mx-auto rounded-2xl overflow-hidden border"
      defaultValue={[accordionItems[0].value]}
      collapsible
    >
      <For each={accordionItems}>
        {(item, index) => (
          <AccordionItem
            value={item.value}
            class={cn(
              "border-b",
              index() === accordionItems.length - 1 && "border-b-0"
            )}
          >
            <AccordionTrigger
              leftIcon={<AccordionItemLeftIcon icon={item.icon} />}
              rightIcon={<AccordionToggleRightIcon />}
              class={cn(
                "px-4 bg-muted data-[state=closed]:hover:bg-quaternary/40 data-[state=open]:bg-background",
                "data-[state=closed]:text-primary/60 data-[state=open]:text-primary data-[state=closed]:hover:text-primary"
              )}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent class="pl-7 pr-5 text-tertiary">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  );
}
