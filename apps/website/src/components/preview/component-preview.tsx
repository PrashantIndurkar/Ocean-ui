import React from "react";
import { getComponentRegistry } from "@/lib/registry/registry.server";
import { CodeBlock } from "../code/code-block";
import { cn } from "@/lib/utils";
import { ComponentPreviewTabs } from "./component-preview-tabs";
import { transformImportsForDisplay } from "@/lib/registry/import-transformer";

export default async function ComponentPreview({
  name,
  center = true,
  constrainHeight = true,
  example = "basic",
}: {
  name: string;
  center?: boolean;
  constrainHeight?: boolean;
  example?: string;
}) {
  const registry = await getComponentRegistry(name, "react");
  if (!registry) {
    return <div>Component not found</div>;
  }

  const exampleData =
    registry.examples.find((ex) => ex.id === example) || registry.examples[0];
  if (!exampleData) {
    return <div>Example not found</div>;
  }

  const Component = exampleData.component;

  // Framework configuration with icons and language settings
  const frameworks = [
    { value: "react", lang: "tsx" },
    { value: "solid", lang: "tsx" },
    { value: "vue", lang: "vue" },
    { value: "svelte", lang: "svelte" },
  ] as const;

  type FrameworkValue = (typeof frameworks)[number]["value"];

  // Generate code blocks for all available frameworks
  const frameworkCodeBlocks = await Promise.all(
    frameworks.map(
      async (
        framework
      ): Promise<{
        value: FrameworkValue;
        codeBlock: Awaited<ReturnType<typeof CodeBlock>>;
      } | null> => {
        const sourceCode = exampleData.sourceCode[framework.value];
        if (!sourceCode) {
          return null;
        }

        // Remove "use client" directive for display
        let code = sourceCode.replace(/^"use client";\n?/gm, "");

        // Transform imports for copy-paste ready code
        // Transform @ocean-ui/react to @/components/ui/{componentSlug}
        code = transformImportsForDisplay(code, name);

        const codeBlock = await CodeBlock({
          code,
          lang: framework.lang,
          showLineNumbers: true,
          className: cn(
            "bg-white dark:bg-transparent rounded-3xl overflow-hidden",
            "[&_pre]:text-sm [&_pre]:font-normal [&_pre]:bg-white [&_pre]:dark:bg-transparent [&_pre_span]:leading-[1.75]",
            "[&_code]:bg-white [&_code]:dark:bg-transparent",
            "[&>div:has(pre)]:rounded-3xl [&>div:has(pre)]:py-3 [&>div:has(pre)]:px-2 [&>div:has(pre)]:min-h-[400px]",
            constrainHeight && "[&>div:has(pre)]:max-h-[400px]"
          ),
        });

        return {
          value: framework.value,
          codeBlock,
        };
      }
    )
  );

  // Filter out null entries (frameworks without source code)
  const availableFrameworkCodeBlocks = frameworkCodeBlocks.filter(
    (
      block
    ): block is {
      value: FrameworkValue;
      codeBlock: Awaited<ReturnType<typeof CodeBlock>>;
    } => block !== null
  );

  return (
    <ComponentPreviewTabs
      Component={Component}
      frameworkCodeBlocks={availableFrameworkCodeBlocks}
      center={center}
      constrainHeight={constrainHeight}
    />
  );
}
