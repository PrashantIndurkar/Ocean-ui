"use client";

import { useFramework } from "@/lib/contexts/framework-context";
import { Tabs } from "../ui/tabs";
import { ReactJsIcon } from "../icons/react-icon";
import { SolidJsIcon } from "../icons/solidjs-icon";
import { VueJsIcon } from "../icons/vue-icon";
import { SvelteJSIcon } from "../icons/svelte-icon";
import type { ReactNode } from "react";

const frameworks = [
  { value: "react", icon: ReactJsIcon },
  { value: "solid", icon: SolidJsIcon },
  { value: "vue", icon: VueJsIcon },
  { value: "svelte", icon: SvelteJSIcon },
] as const;

interface FrameworkCodeTabsProps {
  frameworkCodeBlocks: Array<{
    value: string;
    codeBlock: ReactNode;
  }>;
}

export function FrameworkCodeTabs({
  frameworkCodeBlocks,
}: FrameworkCodeTabsProps) {
  const { framework, setFramework } = useFramework();

  // Calculate active framework tab value based on framework hook
  // Fallback to first available if selected framework not available or disabled
  // Prevent Vue and Svelte from being selected (they are disabled)
  const isFrameworkDisabled = framework === "vue" || framework === "svelte";
  const activeFramework =
    !isFrameworkDisabled &&
    frameworkCodeBlocks.find((block) => block.value === framework)?.value ||
    frameworkCodeBlocks.find((block) => block.value === "react")?.value ||
    frameworkCodeBlocks[0]?.value ||
    "react";

  // Handle framework tab change - update hook when user manually switches tabs
  const handleFrameworkChange = (value: string) => {
    if (value === "vue" || value === "svelte") {
      return; // Don't allow switching to disabled frameworks
    }
    setFramework(value as "react" | "solid" | "vue" | "svelte");
  };

  // Create framework tabs content
  // Show all frameworks, but disable Vue and Svelte
  const allFrameworkTabs = frameworks.map((framework) => {
    const codeBlock = frameworkCodeBlocks.find(
      (block) => block.value === framework.value
    );
    const isDisabled = framework.value === "vue" || framework.value === "svelte";
    const Icon = framework.icon;

    return {
      value: framework.value,
      label: framework.value,
      icon: Icon ? <Icon className="size-4" /> : undefined,
      disabled: isDisabled,
      content: codeBlock ? (
        <div className="overflow-x-auto">{codeBlock.codeBlock}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="text-sm text-muted-foreground">
            {isDisabled
              ? `${framework.value.charAt(0).toUpperCase() + framework.value.slice(1)} support is coming soon`
              : "No code available"}
          </div>
        </div>
      ),
    };
  });

  return (
    <Tabs
      items={allFrameworkTabs}
      value={activeFramework}
      onValueChange={handleFrameworkChange}
      variant="bordered"
      className="[&_figure]:mt-0"
    />
  );
}
