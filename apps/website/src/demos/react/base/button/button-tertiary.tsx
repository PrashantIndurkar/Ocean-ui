"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonTertiary() {
  return (
    <div>
      <div className="mb-4 flex gap-8">
        <Button variant="tertiary" size="sm">
          Button CTA
        </Button>
        <Button variant="tertiary" size="md">
          Button CTA
        </Button>
        <Button variant="tertiary" size="lg">
          Button CTA
        </Button>
        <Button variant="tertiary" size="xl">
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="tertiary" size="sm" disabled>
          Button CTA
        </Button>
        <Button variant="tertiary" size="md" disabled>
          Button CTA
        </Button>
        <Button variant="tertiary" size="lg" disabled>
          Button CTA
        </Button>
        <Button variant="tertiary" size="xl" disabled>
          Button CTA
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button variant="tertiary" loading showTextWhileLoading size="sm">
          Submitting...
        </Button>
        <Button variant="tertiary" loading showTextWhileLoading size="md">
          Submitting...
        </Button>
        <Button variant="tertiary" loading showTextWhileLoading size="lg">
          Submitting...
        </Button>
        <Button variant="tertiary" loading showTextWhileLoading size="xl">
          Submitting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button
          variant="tertiary"
          size="sm"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
          size="md"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
          size="lg"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Button CTA
        </Button>
        <Button
          variant="tertiary"
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
          variant="tertiary"
          loading
          showTextWhileLoading
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="tertiary"
          loading
          showTextWhileLoading
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="tertiary"
          loading
          showTextWhileLoading
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Submitting...
        </Button>
        <Button
          variant="tertiary"
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
        <Button variant="tertiary" size="sm" iconLeading={<Circle />} />
        <Button variant="tertiary" size="md" iconLeading={<Circle />} />
        <Button variant="tertiary" size="lg" iconLeading={<Circle />} />
        <Button variant="tertiary" size="xl" iconLeading={<Circle />} />
      </div>
      <div className="flex gap-8">
        <Button variant="tertiary" size="sm" disabled iconLeading={<Circle />} />
        <Button variant="tertiary" size="md" disabled iconLeading={<Circle />} />
        <Button variant="tertiary" size="lg" disabled iconLeading={<Circle />} />
        <Button variant="tertiary" size="xl" disabled iconLeading={<Circle />} />
      </div>
      <div className="mb-4 flex gap-8">
        <Button
          variant="tertiary"
          loading
          size="sm"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="tertiary"
          loading
          size="md"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="tertiary"
          loading
          size="lg"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="tertiary"
          loading
          size="xl"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
      </div>
    </div>
  );
}
