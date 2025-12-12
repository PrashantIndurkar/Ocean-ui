"use client";

import { cn } from "@/lib/utils";
import { Tabs, type TabItem } from "./ui/tabs";
import { Eye, Code as CodeIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { ReactJsIcon } from "./icons/react-icon";
import { SolidJsIcon } from "./icons/solidjs-icon";
import { VueJsIcon } from "./icons/vue-icon";
import { SvelteJSIcon } from "./icons/svelte-icon";
import { useFramework } from "@/contexts/framework-context";

const frameworks = [
  { value: "react", icon: ReactJsIcon },
  { value: "solid", icon: SolidJsIcon },
  { value: "vue", icon: VueJsIcon },
  { value: "svelte", icon: SvelteJSIcon },
] as const;

interface ComponentPreviewTabsProps {
  Component: () => ReactElement;
  frameworkCodeBlocks: Array<{
    value: string;
    codeBlock: ReactNode;
  }>;
  center?: boolean;
  constrainHeight?: boolean;
}

export function ComponentPreviewTabs({
  Component,
  frameworkCodeBlocks,
  center = true,
  constrainHeight = true,
}: ComponentPreviewTabsProps) {
  const { framework, setFramework } = useFramework();

  // Calculate active framework tab value based on framework hook
  // Fallback to first available if selected framework not available
  const activeFramework =
    frameworkCodeBlocks.find((block) => block.value === framework)?.value ||
    frameworkCodeBlocks.find((block) => block.value === "react")?.value ||
    frameworkCodeBlocks[0]?.value ||
    "react";

  // Handle framework tab change - update hook when user manually switches tabs
  const handleFrameworkChange = (value: string) => {
    setFramework(value as "react" | "solid" | "vue" | "svelte");
  };

  // Create framework tabs content
  const codeContent =
    frameworkCodeBlocks.length > 0 ? (
      <CodeBlockWrapper className="px-2 pt-3 my-2 pb-1">
        <div className="[&_figure]:mt-0">
          <Tabs
            items={frameworkCodeBlocks.map(({ value, codeBlock }) => {
              const framework = frameworks.find((fw) => fw.value === value);
              const Icon = framework?.icon;
              return {
                value,
                label: value,
                icon: Icon ? <Icon className="size-4" /> : undefined,
                content: (
                  <div className="overflow-x-auto pt-3">{codeBlock}</div>
                ),
              };
            })}
            value={activeFramework}
            onValueChange={handleFrameworkChange}
            variant="bordered"
            className="[&_figure]:mt-0"
          />
        </div>
      </CodeBlockWrapper>
    ) : (
      <CodeBlockWrapper className="p-3 py-0">
        <div className="overflow-x-auto">No code available</div>
      </CodeBlockWrapper>
    );

  const tabs: TabItem[] = [
    {
      value: "preview",
      label: "Preview",
      icon: <Eye className="size-4 text-brand-400 dark:text-brand-300" />,
      content: (
        <div
          className={cn(
            "border rounded-3xl p-2 min-h-[400px] flex overflow-y-auto",
            center ? "items-center justify-center" : "items-start",
            constrainHeight ? "max-h-[400px]" : "py-10"
          )}
        >
          <div
            className={cn(
              "lg:w-2/3 lg:px-0 mx-auto md:w-full md:px-12",
              constrainHeight && !center && "pt-4"
            )}
          >
            <Component />
          </div>
        </div>
      ),
    },
    {
      value: "code",
      label: "Code",
      icon: <CodeIcon className="size-4 text-brand-400 dark:text-brand-300" />,
      content: codeContent,
      triggerClassName: "rounded-md data-selected:shadow-sm",
    },
  ];

  return (
    <div className="not-prose">
      <Tabs items={tabs} defaultValue="preview" contentClassName="mt-2" />
    </div>
  );
}
