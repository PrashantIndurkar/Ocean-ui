"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonDestructive() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary Destructive */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Primary</h3>
        <div className="flex gap-4">
          <Button variant="destructive" size="sm">
            Button sm
          </Button>
          <Button variant="destructive" size="md">
            Button md
          </Button>
          <Button variant="destructive" size="lg">
            Button lg
          </Button>
          <Button variant="destructive" size="xl">
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline Destructive */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button sm
          </Button>
          <Button
            variant="outline"
            size="md"
            className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button md
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button lg
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button xl
          </Button>
        </div>
      </div>

      {/* Tertiary Destructive */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Tertiary</h3>
        <div className="flex gap-4">
          <Button
            variant="tertiary"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button sm
          </Button>
          <Button
            variant="tertiary"
            size="md"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button md
          </Button>
          <Button
            variant="tertiary"
            size="lg"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button lg
          </Button>
          <Button
            variant="tertiary"
            size="xl"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}
