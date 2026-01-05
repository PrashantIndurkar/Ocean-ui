"use client";

import { Button } from "@/components/library/react/base/button";
import { Check, Edit, Trash2, ArrowRight, Download } from "lucide-react";

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-col gap-8">
      {/* Leading Icon */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Leading Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button iconLeading={<Check className="size-5" />} size="md">
            Save
          </Button>
          <Button variant="secondary" iconLeading={<Edit className="size-5" />} size="md">
            Edit
          </Button>
          <Button
            variant="destructive"
            iconLeading={<Trash2 className="size-5" />}
            size="md"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Trailing Icon */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Trailing Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button iconTrailing={<Check className="size-5" />} size="md">
            Save
          </Button>
          <Button
            variant="secondary"
            iconTrailing={<Edit className="size-5" />}
            size="md"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            iconTrailing={<Trash2 className="size-5" />}
            size="md"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Both Icons */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Leading & Trailing Icons
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button
            iconLeading={<Download className="size-5" />}
            iconTrailing={<ArrowRight className="size-5" />}
            size="md"
          >
            Download
          </Button>
          <Button
            variant="secondary"
            iconLeading={<Download className="size-5" />}
            iconTrailing={<ArrowRight className="size-5" />}
            size="md"
          >
            Download
          </Button>
          <Button
            variant="outline"
            iconLeading={<Download className="size-5" />}
            iconTrailing={<ArrowRight className="size-5" />}
            size="md"
          >
            Download
          </Button>
        </div>
      </div>

      {/* Icon Only */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Icon Only</h3>
        <div className="flex flex-wrap gap-4">
          <Button iconLeading={<Check className="size-5" />} size="md" />
          <Button
            variant="secondary"
            iconLeading={<Edit className="size-5" />}
            size="md"
          />
          <Button
            variant="destructive"
            iconLeading={<Trash2 className="size-5" />}
            size="md"
          />
        </div>
      </div>

      {/* Different Sizes with Icons */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Different Sizes with Icons
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button iconLeading={<Check className="size-5" />} size="sm">
            Small
          </Button>
          <Button iconLeading={<Check className="size-5" />} size="md">
            Medium
          </Button>
          <Button iconLeading={<Check className="size-5" />} size="lg">
            Large
          </Button>
          <Button iconLeading={<Check className="size-5" />} size="xl">
            Extra Large
          </Button>
        </div>
      </div>
    </div>
  );
}

