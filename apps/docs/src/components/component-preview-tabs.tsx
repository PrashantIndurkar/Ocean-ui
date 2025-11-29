"use client";

import { cn } from "@/lib/utils";
import { Tabs, type TabItem } from "./ui/tabs";
import { Eye, Code as CodeIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { CodeBlockWrapper } from "./code-block-wrapper";

interface ComponentPreviewTabsProps {
  Component: () => ReactElement;
  codeBlock: ReactNode;
  center?: boolean;
  constrainHeight?: boolean;
}

export function ComponentPreviewTabs({
  Component,
  codeBlock,
  center = true,
  constrainHeight = true,
}: ComponentPreviewTabsProps) {
  const tabs: TabItem[] = [
    {
      value: "preview",
      label: "Preview",
      icon: <Eye className="size-4 text-brand-400 dark:text-brand-300" />,
      content: (
        <div
          className={cn(
            "border rounded-3xl p-2 min-h-[400px] flex overflow-y-auto ",
            center && "items-center justify-center",
            constrainHeight ? "max-h-[400px]" : "py-10"
          )}
        >
          <div className="max-w-1/2 mx-auto">
            <Component />
          </div>
        </div>
      ),
    },
    {
      value: "code",
      label: "Code",
      icon: <CodeIcon className="size-4 text-brand-400 dark:text-brand-300" />,
      content: (
        <CodeBlockWrapper className="p-3 py-0">
          <div className="overflow-x-auto">{codeBlock}</div>
        </CodeBlockWrapper>
      ),
      triggerClassName: "rounded-md data-selected:shadow-sm",
    },
  ];

  return (
    <div className="not-prose">
      <Tabs items={tabs} defaultValue="preview" contentClassName="mt-2" />
    </div>
  );
}
