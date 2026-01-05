"use client";

import { Button } from "@/components/library/react/base/button";

const Circle = () => (
  <span className="size-5 rounded-full border-2 border-current" />
);

export default function ButtonDestructive() {
  return (
    <div>
      <div className="mb-4 flex gap-8">
        <Button variant="destructive" size="sm">
          Delete project
        </Button>
        <Button variant="destructive" size="md">
          Delete project
        </Button>
        <Button variant="destructive" size="lg">
          Delete project
        </Button>
        <Button variant="destructive" size="xl">
          Delete project
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="destructive" size="sm" disabled>
          Delete project
        </Button>
        <Button variant="destructive" size="md" disabled>
          Delete project
        </Button>
        <Button variant="destructive" size="lg" disabled>
          Delete project
        </Button>
        <Button variant="destructive" size="xl" disabled>
          Delete project
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button variant="destructive" loading showTextWhileLoading size="sm">
          Deleting...
        </Button>
        <Button variant="destructive" loading showTextWhileLoading size="md">
          Deleting...
        </Button>
        <Button variant="destructive" loading showTextWhileLoading size="lg">
          Deleting...
        </Button>
        <Button variant="destructive" loading showTextWhileLoading size="xl">
          Deleting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button
          variant="destructive"
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
      </div>
      <div className="mb-4 flex gap-8">
        <Button
          variant="destructive"
          size="sm"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="md"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="lg"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
        <Button
          variant="destructive"
          size="xl"
          disabled
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Delete project
        </Button>
      </div>
      <div className="mb-16 flex gap-8">
        <Button
          variant="destructive"
          loading
          showTextWhileLoading
          size="sm"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Deleting...
        </Button>
        <Button
          variant="destructive"
          loading
          showTextWhileLoading
          size="md"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Deleting...
        </Button>
        <Button
          variant="destructive"
          loading
          showTextWhileLoading
          size="lg"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Deleting...
        </Button>
        <Button
          variant="destructive"
          loading
          showTextWhileLoading
          size="xl"
          iconLeading={<Circle />}
          iconTrailing={<Circle />}
        >
          Deleting...
        </Button>
      </div>

      <div className="mb-4 flex gap-8">
        <Button variant="destructive" size="sm" iconLeading={<Circle />} />
        <Button variant="destructive" size="md" iconLeading={<Circle />} />
        <Button variant="destructive" size="lg" iconLeading={<Circle />} />
        <Button variant="destructive" size="xl" iconLeading={<Circle />} />
      </div>
      <div className="mb-4 flex gap-8">
        <Button variant="destructive" size="sm" disabled iconLeading={<Circle />} />
        <Button variant="destructive" size="md" disabled iconLeading={<Circle />} />
        <Button variant="destructive" size="lg" disabled iconLeading={<Circle />} />
        <Button variant="destructive" size="xl" disabled iconLeading={<Circle />} />
      </div>
      <div className="flex gap-8">
        <Button
          variant="destructive"
          loading
          size="sm"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="destructive"
          loading
          size="md"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="destructive"
          loading
          size="lg"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
        <Button
          variant="destructive"
          loading
          size="xl"
          iconLeading={<Circle />}
          aria-label="Loading"
        />
      </div>
    </div>
  );
}
