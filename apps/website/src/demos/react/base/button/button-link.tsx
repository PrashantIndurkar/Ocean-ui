"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonLink() {
  return (
    <div className="flex gap-4">
      <Button variant="link" size="sm">Link sm</Button>
      <Button variant="link" size="md">Link md</Button>
      <Button variant="link" size="lg">Link lg</Button>
      <Button variant="link" size="xl">Link xl</Button>
    </div>
  );
}
