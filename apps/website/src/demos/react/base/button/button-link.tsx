"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonLink() {
  return (
    <div>
      <div className="mb-4 flex gap-8">
        <Button variant="link" size="sm">
          Learn more
        </Button>
        <Button variant="link" size="md">
          Learn more
        </Button>
        <Button variant="link" size="lg">
          Learn more
        </Button>
        <Button variant="link" size="xl">
          Learn more
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button variant="link" size="sm" disabled>
          Learn more
        </Button>
        <Button variant="link" size="md" disabled>
          Learn more
        </Button>
        <Button variant="link" size="lg" disabled>
          Learn more
        </Button>
        <Button variant="link" size="xl" disabled>
          Learn more
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button
          variant="link"
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button
          variant="link"
          size="sm"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="md"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="lg"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
        <Button
          variant="link"
          size="xl"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
