"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-col gap-8">
      {/* Primary Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Primary</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      {/* Secondary Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Secondary</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="secondary" size="xl">
            Extra Large
          </Button>
        </div>
      </div>

      {/* Outline Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="md">
            Medium
          </Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
          <Button variant="outline" size="xl">
            Extra Large
          </Button>
        </div>
      </div>

      {/* Ghost Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Ghost</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="ghost" size="sm">
            Small
          </Button>
          <Button variant="ghost" size="md">
            Medium
          </Button>
          <Button variant="ghost" size="lg">
            Large
          </Button>
          <Button variant="ghost" size="xl">
            Extra Large
          </Button>
        </div>
      </div>

      {/* Destructive Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Destructive</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="destructive" size="sm">
            Small
          </Button>
          <Button variant="destructive" size="md">
            Medium
          </Button>
          <Button variant="destructive" size="lg">
            Large
          </Button>
          <Button variant="destructive" size="xl">
            Extra Large
          </Button>
        </div>
      </div>

      {/* Link Variant Sizes */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Link</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="link" size="sm">
            Small
          </Button>
          <Button variant="link" size="md">
            Medium
          </Button>
          <Button variant="link" size="lg">
            Large
          </Button>
          <Button variant="link" size="xl">
            Extra Large
          </Button>
        </div>
      </div>
    </div>
  );
}

