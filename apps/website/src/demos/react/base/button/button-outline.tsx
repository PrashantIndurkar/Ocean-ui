"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonOutline() {
  return (
    <div>
      <div className="mb-4 flex gap-8">
        <Button variant="outline" size="sm">
          Button CTA
        </Button>
        <Button variant="outline" size="md">
          Button CTA
        </Button>
        <Button variant="outline" size="lg">
          Button CTA
        </Button>
        <Button variant="outline" size="xl">
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="outline" size="sm" disabled>
          Button CTA
        </Button>
        <Button variant="outline" size="md" disabled>
          Button CTA
        </Button>
        <Button variant="outline" size="lg" disabled>
          Button CTA
        </Button>
        <Button variant="outline" size="xl" disabled>
          Button CTA
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button variant="outline" loading showTextWhileLoading size="sm">
          Submitting...
        </Button>
        <Button variant="outline" loading showTextWhileLoading size="md">
          Submitting...
        </Button>
        <Button variant="outline" loading showTextWhileLoading size="lg">
          Submitting...
        </Button>
        <Button variant="outline" loading showTextWhileLoading size="xl">
          Submitting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button
          variant="outline"
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button
          variant="outline"
          size="sm"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="md"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="lg"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="outline"
          size="xl"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button variant="outline" size="sm" iconLeading={<Circle />} />
        <Button variant="outline" size="md" iconLeading={<Circle />} />
        <Button variant="outline" size="lg" iconLeading={<Circle />} />
        <Button variant="outline" size="xl" iconLeading={<Circle />} />
      </div>
      <div className="flex gap-8">
        <Button variant="outline" size="sm" disabled iconLeading={<Circle />} />
        <Button variant="outline" size="md" disabled iconLeading={<Circle />} />
        <Button variant="outline" size="lg" disabled iconLeading={<Circle />} />
        <Button variant="outline" size="xl" disabled iconLeading={<Circle />} />
      </div>
    </div>
  );
}
