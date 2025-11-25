"use client";

import { cn } from "@ocean-ui/utils";
import { Tabs } from "@ark-ui/react/tabs";
import { Eye, Code as CodeIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

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
  return (
    <div className="not-prose">
      <Tabs.Root defaultValue="preview">
        <Tabs.List className="inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground font-mono gap-x-2">
          <Tabs.Trigger
            value="preview"
            className="inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-normal leading-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow-md w-fit data-selected:border data-selected:border-brand-300 border border-transparent"
          >
            <Eye className="size-4 text-brand-400" />
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="code"
            className="inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-normal leading-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm w-fit data-selected:border data-selected:border-brand-300 border border-transparent"
          >
            <CodeIcon className="size-4 text-brand-400" />
            Code
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="preview"
          className={cn(
            "mt-2 border rounded-3xl p-2 min-h-[400px] flex overflow-y-auto",
            {
              "items-center justify-center": center,
              "max-h-[400px]": constrainHeight,
              "py-10": !constrainHeight,
            }
          )}
        >
          <Component />
        </Tabs.Content>
        <Tabs.Content value="code" className="mt-2 rounded-3xl">
          {codeBlock}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
