import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/base/accordion";
import { For } from "solid-js";

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

export default function AccordionDemo() {
  return (
    <Accordion class="w-full max-w-lg mx-auto" defaultValue={[]}>
      <For each={accordionItems}>
        {(item) => (
          <AccordionItem value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent class="text-tertiary">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  );
}
