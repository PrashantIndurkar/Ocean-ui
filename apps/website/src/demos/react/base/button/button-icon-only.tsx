"use client";

import { Button } from "@/components/library/react/base/button";
import { Circle } from "lucide-react";

export default function ButtonIconOnly() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary Icon Only */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Primary</h3>
        <div className="flex gap-4">
          <Button size="sm" aria-label="Button sm">
            <Circle className="size-5" />
          </Button>
          <Button size="md" aria-label="Button md">
            <Circle className="size-5" />
          </Button>
          <Button size="lg" aria-label="Button lg">
            <Circle className="size-5" />
          </Button>
          <Button size="xl" aria-label="Button xl">
            <Circle className="size-5" />
          </Button>
        </div>
      </div>

      {/* Outline Icon Only */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" aria-label="Button sm">
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="md" aria-label="Button md">
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="lg" aria-label="Button lg">
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="xl" aria-label="Button xl">
            <Circle className="size-5" />
          </Button>
        </div>
      </div>

      {/* Ghost Icon Only */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Ghost</h3>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" aria-label="Button sm">
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="md" aria-label="Button md">
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="lg" aria-label="Button lg">
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="xl" aria-label="Button xl">
            <Circle className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

