import { getComponentRegistry } from "@/lib/registry.server";
import { CodeBlock } from "./code-block";
import { cn } from "@ocean-ui/utils";
import { ComponentPreviewTabs } from "./component-preview-tabs";

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
  const code = (exampleData.sourceCode.react || "").replace(
    /^"use client";\n?/gm,
    ""
  );

  const codeBlock = await CodeBlock({
    code,
    lang: "tsx",
    showLineNumbers: true,
    className: cn(
      "bg-white dark:bg-transparent rounded-3xl overflow-hidden",
      "[&_pre]:text-sm [&_pre]:font-normal [&_pre]:bg-white [&_pre]:dark:bg-transparent [&_pre_span]:leading-[1.75]",
      "[&_code]:bg-white [&_code]:dark:bg-transparent",
      "[&>div:has(pre)]:rounded-3xl [&>div:has(pre)]:py-3 [&>div:has(pre)]:px-2 [&>div:has(pre)]:min-h-[400px]",
      constrainHeight && "[&>div:has(pre)]:max-h-[400px]"
    ),
  });

  return (
    <ComponentPreviewTabs
      Component={Component}
      codeBlock={codeBlock}
      center={center}
      constrainHeight={constrainHeight}
    />
  );
}
