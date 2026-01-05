"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonSecondary() {
  return (
    <div>
      <div className="mb-4 flex gap-8">
        <Button variant="secondary" size="sm">
          Button CTA
        </Button>
        <Button variant="secondary" size="md">
          Button CTA
        </Button>
        <Button variant="secondary" size="lg">
          Button CTA
        </Button>
        <Button variant="secondary" size="xl">
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="secondary" size="sm" disabled>
          Button CTA
        </Button>
        <Button variant="secondary" size="md" disabled>
          Button CTA
        </Button>
        <Button variant="secondary" size="lg" disabled>
          Button CTA
        </Button>
        <Button variant="secondary" size="xl" disabled>
          Button CTA
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button variant="secondary" loading showTextWhileLoading size="sm">
          Submitting...
        </Button>
        <Button variant="secondary" loading showTextWhileLoading size="md">
          Submitting...
        </Button>
        <Button variant="secondary" loading showTextWhileLoading size="lg">
          Submitting...
        </Button>
        <Button variant="secondary" loading showTextWhileLoading size="xl">
          Submitting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button
          variant="secondary"
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button
          variant="secondary"
          size="sm"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="md"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="lg"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="secondary"
          size="xl"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button
          variant="secondary"
          loading
          showTextWhileLoading
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="secondary"
          loading
          showTextWhileLoading
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="secondary"
          loading
          showTextWhileLoading
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="secondary"
          loading
          showTextWhileLoading
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button variant="secondary" size="sm" iconLeading={<Circle />} />
        <Button variant="secondary" size="md" iconLeading={<Circle />} />
        <Button variant="secondary" size="lg" iconLeading={<Circle />} />
        <Button variant="secondary" size="xl" iconLeading={<Circle />} />
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="secondary" size="sm" disabled iconLeading={<Circle />} />
        <Button variant="secondary" size="md" disabled iconLeading={<Circle />} />
        <Button variant="secondary" size="lg" disabled iconLeading={<Circle />} />
        <Button variant="secondary" size="xl" disabled iconLeading={<Circle />} />
      </div>
      <div className="flex gap-8">
        <Button
          variant="secondary"
          loading
          size="sm"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="secondary"
          loading
          size="md"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="secondary"
          loading
          size="lg"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="secondary"
          loading
          size="xl"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
      </div>
    </div>
  );
}
