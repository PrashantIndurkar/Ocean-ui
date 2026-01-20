"use client";

import { Button } from "@/components/library/react/base/button";

export default function ButtonShapes() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="rounded-none">Rectangular</Button>
      <Button>Square</Button>
      <Button className="rounded-full">Rounded</Button>
    </div>
  );
}
