import { Loader } from "lucide-solid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/base/accordion";
import { For } from "solid-js";

/**
 * Renders a loader icon that spins when the accordion is open.
 *
 * @returns The loader icon component styled appropriately for the left side of the trigger.
 */
function AccordionLoaderLeftIcon() {
  return (
    <Loader class="size-5 shrink-0 transition-colors duration-200 text-secondary [.group[data-state=open]_&]:animate-spin [.group[data-state=open]_&]:[animation-duration:1.5s] [.group[data-state=open]_&]:text-brand-primary [.group[data-state=closed]_&]:text-brand-quaternary/60" />
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
      class="w-full max-w-lg mx-auto"
      defaultValue={[accordionItems[0].value]}
      collapsible
    >
      <For each={accordionItems}>
        {(item) => (
          <AccordionItem value={item.value}>
            <AccordionTrigger leftIcon={<AccordionLoaderLeftIcon />}>
              {item.title}
            </AccordionTrigger>
            <AccordionContent class="pl-5 text-tertiary">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  );
}
