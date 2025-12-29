"use client";

import * as React from "react";
import { useFramework, type Framework } from "@/lib/contexts/framework-context";
import { ReactJsIcon } from "@/components/icons/react-icon";
import { SolidJsIcon } from "@/components/icons/solidjs-icon";
import { VueJsIcon } from "@/components/icons/vue-icon";
import { SvelteJSIcon } from "@/components/icons/svelte-icon";

const frameworks: Array<{
  value: Framework;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}> = [
  { value: "react", label: "React", icon: ReactJsIcon },
  { value: "solid", label: "Solid", icon: SolidJsIcon },
  { value: "vue", label: "Vue", icon: VueJsIcon, disabled: true },
  { value: "svelte", label: "Svelte", icon: SvelteJSIcon, disabled: true },
];

export function FrameworkSelector() {
  const { framework, setFramework } = useFramework();

  const selectedFramework = frameworks.find((fw) => fw.value === framework);
  const SelectedIcon = selectedFramework?.icon;

  return (
    <div className="relative inline-flex items-center gap-2 h-8 min-w-[100px] rounded-3xl border border-border-primary/50 bg-transparent px-2 transition-all hover:bg-bg-brand-primary hover:text-text-brand-primary dark:hover:bg-bg-brand-primary/50 focus-within:border-border-primary focus-within:ring-border-primary/50 focus-within:ring-[3px]">
      {SelectedIcon && <SelectedIcon className="size-4 shrink-0" />}
      <select
        value={framework}
        onChange={(e) => setFramework(e.target.value as Framework)}
        className="flex-1 bg-transparent text-sm font-medium outline-none cursor-pointer appearance-none pr-6"
        aria-label="Select framework"
        title="Select framework"
      >
        {frameworks.map((fw) => (
          <option key={fw.value} value={fw.value} disabled={fw.disabled}>
            {fw.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 size-4 pointer-events-none shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
