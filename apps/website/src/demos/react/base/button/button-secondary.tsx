"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonSecondary() {
  return (
    <div className="flex gap-4">
      <Button variant="secondary" size="sm">
        Secondary sm
      </Button>
      <Button variant="secondary" size="md">
        Secondary md
      </Button>
      <Button variant="secondary" size="lg">
        Secondary lg
      </Button>
      <Button variant="secondary" size="xl">
        Secondary xl
      </Button>
    </div>
  );
}
