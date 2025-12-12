"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FrameworkSelector } from "./framework-selector";

export function SidebarFooter() {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <ThemeToggle />
      <FrameworkSelector />
    </div>
  );
}
