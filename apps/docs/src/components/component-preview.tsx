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
  const code = exampleData.sourceCode.react || "";

  // Update imports to use @ocean-ui/react
  // Remove "use client" directive if present
  let codeWithUpdatedImports = code.replace(/^"use client";\n?/gm, "");

  // Replace imports from @ocean-ui/react to show the correct import path
  codeWithUpdatedImports = codeWithUpdatedImports.replace(
    /from ["']@ocean-ui\/react["']/g,
    'from "@ocean-ui/react"'
  );

  // Pre-render the CodeBlock in the server component
  const codeBlockElement = await CodeBlock({
    code: codeWithUpdatedImports,
    lang: "tsx",
    showLineNumbers: true,
    className: cn(
      "bg-background p-0 overflow-hidden rounded-3xl",
      "[&_pre]:text-sm [&_pre]:font-normal [&_pre_span]:leading-[1.75]",
      "[&>div:not(:has(pre))]:top-0 [&>div:not(:has(pre))]:right-0 [&>div:not(:has(pre))]:size-8",
      "[&>div:has(pre)]:rounded-3xl [&>div:has(pre)]:py-3 [&>div:has(pre)]:px-2 [&>div:has(pre)]:border-none [&>div:has(pre)]:min-h-[400px] my-0",
      {
        "[&>div:has(pre)]:max-h-[400px]": constrainHeight,
      }
    ),
  });

  return (
    <ComponentPreviewTabs
      Component={Component}
      codeBlock={codeBlockElement}
      center={center}
      constrainHeight={constrainHeight}
    />
  );
}
