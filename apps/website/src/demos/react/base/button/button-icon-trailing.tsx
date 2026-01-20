"use client";

import { Button } from "@/components/library/react/base/button";
import { Circle } from "lucide-react";

export default function ButtonIconTrailing() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary with Icon Trailing */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Primary</h3>
        <div className="flex gap-4">
          <Button size="sm">
            Button sm
            <Circle className="size-5" />
          </Button>
          <Button size="md">
            Button md
            <Circle className="size-5" />
          </Button>
          <Button size="lg">
            Button lg
            <Circle className="size-5" />
          </Button>
          <Button size="xl">
            Button xl
            <Circle className="size-5" />
          </Button>
        </div>
      </div>

      {/* Outline with Icon Trailing */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Button sm
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="md">
            Button md
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="lg">
            Button lg
            <Circle className="size-5" />
          </Button>
          <Button variant="outline" size="xl">
            Button xl
            <Circle className="size-5" />
          </Button>
        </div>
      </div>

      {/* Ghost with Icon Trailing */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Ghost</h3>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            Button sm
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="md">
            Button md
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="lg">
            Button lg
            <Circle className="size-5" />
          </Button>
          <Button variant="ghost" size="xl">
            Button xl
            <Circle className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

