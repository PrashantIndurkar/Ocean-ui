"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-col gap-8">
      {/* Secondary Disabled */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Secondary</h3>
        <div className="flex gap-4">
          <Button variant="secondary" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="secondary" size="md" disabled>
            Button md
          </Button>
          <Button variant="secondary" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="secondary" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>

      {/* Outline Disabled */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Outline</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="outline" size="md" disabled>
            Button md
          </Button>
          <Button variant="outline" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="outline" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>

      {/* Ghost Disabled */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Ghost</h3>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" disabled>
            Button sm
          </Button>
          <Button variant="ghost" size="md" disabled>
            Button md
          </Button>
          <Button variant="ghost" size="lg" disabled>
            Button lg
          </Button>
          <Button variant="ghost" size="xl" disabled>
            Button xl
          </Button>
        </div>
      </div>
    </div>
  );
}

