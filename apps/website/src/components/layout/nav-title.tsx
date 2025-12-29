"use client";

import { WavesIcon } from "@/components/icons/waves-icon";

export function NavTitle() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <WavesIcon size={25} className="text-fg-primary" />
      <span className="text-md font-medium text-fg-primary tracking-tight">
        Ocean UI
      </span>
    </div>
  );
}
