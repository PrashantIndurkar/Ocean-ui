"use client";

import { Button } from "@/components/library/react/base/button";
import { Check, ArrowRight } from "lucide-react";

export default function ButtonLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Basic Loading */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Basic Loading</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading size="md">
            Loading...
          </Button>
          <Button variant="secondary" loading size="md">
            Loading...
          </Button>
          <Button variant="outline" loading size="md">
            Loading...
          </Button>
          <Button variant="ghost" loading size="md">
            Loading...
          </Button>
        </div>
      </div>

      {/* Loading with Text Visible */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Loading with Text Visible
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button loading showTextWhileLoading size="md">
            Submitting...
          </Button>
          <Button variant="secondary" loading showTextWhileLoading size="md">
            Submitting...
          </Button>
          <Button variant="outline" loading showTextWhileLoading size="md">
            Submitting...
          </Button>
          <Button variant="ghost" loading showTextWhileLoading size="md">
            Submitting...
          </Button>
        </div>
      </div>

      {/* Loading with Custom Text */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Loading with Custom Text
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button loading loadingText="Processing..." size="md">
            Save
          </Button>
          <Button
            variant="secondary"
            loading
            loadingText="Saving..."
            size="md"
          >
            Save
          </Button>
          <Button variant="destructive" loading loadingText="Deleting..." size="md">
            Delete
          </Button>
        </div>
      </div>

      {/* Loading with Icons */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Loading with Icons
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button
            loading
            showTextWhileLoading
            iconLeading={<Check className="size-5" />}
            size="md"
          >
            Saving...
          </Button>
          <Button
            loading
            showTextWhileLoading
            iconTrailing={<ArrowRight className="size-5" />}
            size="md"
          >
            Submitting...
          </Button>
        </div>
      </div>

      {/* Loading Icon Only */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Loading Icon Only</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading size="sm" iconLeading={<Check className="size-5" />} aria-label="Loading" />
          <Button loading size="md" iconLeading={<Check className="size-5" />} aria-label="Loading" />
          <Button loading size="lg" iconLeading={<Check className="size-5" />} aria-label="Loading" />
          <Button loading size="xl" iconLeading={<Check className="size-5" />} aria-label="Loading" />
        </div>
      </div>

      {/* Different Sizes Loading */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Different Sizes Loading
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button loading showTextWhileLoading size="sm">
            Loading...
          </Button>
          <Button loading showTextWhileLoading size="md">
            Loading...
          </Button>
          <Button loading showTextWhileLoading size="lg">
            Loading...
          </Button>
          <Button loading showTextWhileLoading size="xl">
            Loading...
          </Button>
        </div>
      </div>
    </div>
  );
}

