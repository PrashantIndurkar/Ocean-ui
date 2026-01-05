"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonPrimary() {
  return (
    <div className="flex gap-4">
      <Button size="md">Button CTA</Button>
      <Button size="md" disabled>
        Button CTA
      </Button>
      <Button loading showTextWhileLoading size="md">
        Submitting...
      </Button>
      <Button size="md" iconLeading={<Circle />} iconTrailing={<Circle />}>
        Button CTA
      </Button>
    </div>
  );
}
