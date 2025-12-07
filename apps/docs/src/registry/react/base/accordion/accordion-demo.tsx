"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ocean-ui/react";

export default function AccordionDemo() {
  return (
    <Accordion
      className="w-full max-w-sm mx-auto"
      defaultValue={[]}
      multiple={false}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          How do I update my account information?
        </AccordionTrigger>
        <AccordionContent>
          You can update your account information by navigating to your profile
          settings. Click on your profile icon in the top right corner, then
          select &quot;Account Settings&quot; from the dropdown menu. From
          there, you can edit your name, email, password, and other personal
          details.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
        <AccordionContent>
          We accept all major credit cards (Visa, Mastercard, American Express),
          debit cards, PayPal, Apple Pay, and Google Pay. All transactions are
          processed securely through our encrypted payment gateway to ensure
          your financial information is protected.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I track my order?</AccordionTrigger>
        <AccordionContent>
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
