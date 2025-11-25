"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ocean-ui/react";
import { UserCog, HelpCircle, MapPin, Plus, Minus } from "lucide-react";

export default function AccordionBasic() {
  return (
    <Accordion
      className="w-full max-w-sm mx-auto flex flex-col gap-3"
      defaultValue={[]}
    >
      <AccordionItem value="item-1" className="rounded-lg bg-tertiary border-0">
        <AccordionTrigger className="px-4 py-3 hover:no-underline group data-[state=open]:bg-tertiary data-[state=closed]:bg-tertiary rounded-lg [&>svg]:hidden">
          <div className="flex items-center gap-3 flex-1">
            <UserCog className="size-5 text-fg-tertiary shrink-0" />
            <span className="text-sm font-medium text-fg-primary">
              How do I update my account information?
            </span>
          </div>
          <div className="relative size-4 shrink-0 flex items-center justify-center">
            <Plus className="absolute size-4 text-fg-tertiary group-data-[state=open]:hidden" />
            <Minus className="absolute size-4 text-fg-tertiary group-data-[state=closed]:hidden" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 pt-0">
          <p className="text-sm text-fg-secondary">
            You can update your account information by navigating to your
            profile settings. Click on your profile icon in the top right
            corner, then select &quot;Account Settings&quot; from the dropdown
            menu. From there, you can edit your name, email, password, and other
            personal details.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="rounded-lg bg-tertiary border-0">
        <AccordionTrigger className="px-4 py-3 hover:no-underline group data-[state=open]:bg-tertiary data-[state=closed]:bg-tertiary rounded-lg [&>svg]:hidden">
          <div className="flex items-center gap-3 flex-1">
            <HelpCircle className="size-5 text-fg-tertiary shrink-0" />
            <span className="text-sm font-medium text-fg-primary">
              What payment methods are accepted?
            </span>
          </div>
          <div className="relative size-4 shrink-0 flex items-center justify-center">
            <Plus className="absolute size-4 text-fg-tertiary group-data-[state=open]:hidden" />
            <Minus className="absolute size-4 text-fg-tertiary group-data-[state=closed]:hidden" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 pt-0">
          <p className="text-sm text-fg-secondary">
            We accept all major credit cards (Visa, Mastercard, American
            Express), debit cards, PayPal, Apple Pay, and Google Pay. All
            transactions are processed securely through our encrypted payment
            gateway to ensure your financial information is protected.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="rounded-lg bg-tertiary border-0">
        <AccordionTrigger className="px-4 py-3 hover:no-underline group data-[state=open]:bg-tertiary data-[state=closed]:bg-tertiary rounded-lg [&>svg]:hidden ">
          <div className="flex items-center gap-3 flex-1">
            <MapPin className="size-5 text-fg-tertiary shrink-0" />
            <span className="text-sm font-medium text-fg-primary">
              How can I track my order?
            </span>
          </div>
          <div className="relative size-4 shrink-0 flex items-center justify-center">
            <Plus className="absolute size-4 text-fg-tertiary group-data-[state=open]:hidden" />
            <Minus className="absolute size-4 text-fg-tertiary group-data-[state=closed]:hidden" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 pt-0">
          <p className="text-sm text-fg-secondary">
            Once your order has been shipped, you&apos;ll receive a tracking
            number via email. You can use this tracking number on our
            website&apos;s tracking page or on the carrier&apos;s website to
            monitor your package&apos;s journey in real-time. You&apos;ll
            receive updates at each stage of the delivery process.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
