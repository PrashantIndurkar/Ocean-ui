"use client";

import { Button } from "@/components/library/react/base/button";
import { Circle } from "lucide-react";

export default function ButtonIconLeading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary with Icon Leading */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Primary</h3>
        <div className="flex gap-4">
          <Button size="sm">
            <Circle className="size-5" />
            Button sm
          </Button>
          <Button size="md">
            <Circle className="size-5" />
            Button md
          </Button>
          <Button size="lg">
            <Circle className="size-5" />
            Button lg
          </Button>
          <Button size="xl">
            <Circle className="size-5" />
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline with Icon Leading */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            <Circle className="size-5" />
            Button sm
          </Button>
          <Button variant="outline" size="md">
            <Circle className="size-5" />
            Button md
          </Button>
          <Button variant="outline" size="lg">
            <Circle className="size-5" />
            Button lg
          </Button>
          <Button variant="outline" size="xl">
            <Circle className="size-5" />
            Button xl
          </Button>
        </div>
      </div>

      {/* Ghost with Icon Leading */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Ghost</h3>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Circle className="size-5" />
            Button sm
          </Button>
          <Button variant="ghost" size="md">
            <Circle className="size-5" />
            Button md
          </Button>
          <Button variant="ghost" size="lg">
            <Circle className="size-5" />
            Button lg
          </Button>
          <Button variant="ghost" size="xl">
            <Circle className="size-5" />
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}
