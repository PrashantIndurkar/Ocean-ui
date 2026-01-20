import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import { BookOpenIcon, ExternalLinkIcon } from "lucide-react";
import { CodeBlockWithFile } from "./code-block-with-file";
import { ReactJsIcon } from "../icons/react-icon";
import { SolidJsIcon } from "../icons/solidjs-icon";
import { VueJsIcon } from "../icons/vue-icon";
import { SvelteJSIcon } from "../icons/svelte-icon";
import { components } from "@/lib/components";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { StepItem } from "../mdx/step-item";
import { cn } from "@/lib/utils";
import { FrameworkCodeTabs } from "./framework-code-tabs";

const frameworks = [
  { value: "react", icon: ReactJsIcon },
  { value: "solid", icon: SolidJsIcon },
  { value: "vue", icon: VueJsIcon },
  { value: "svelte", icon: SvelteJSIcon },
] as const;

async function getComponentCode(
  componentSlug: string,
  framework: string
): Promise<string | null> {
  const componentMeta = components.find((c) => c.slug === componentSlug);
  if (!componentMeta) return null;

  let componentPath: string;

  // For SolidJS, load from package
  if (framework === "solid") {
    componentPath = join(
      process.cwd(),
      "..",
      "..",
      "packages",
      "ui-solid",
      "src",
      "components",
      componentMeta.category,
      `${componentSlug}.tsx`
    );
  } else {
    // For React and other frameworks, load from library
    componentPath = join(
      process.cwd(),
      "src",
      "components",
      "library",
      "react",
      componentMeta.category,
      `${componentSlug}.tsx`
    );
  }

  try {
    const code = await readFile(componentPath, "utf-8");
    return code;
  } catch (error) {
    console.warn(
      `Failed to read ${framework} component code from ${componentPath}:`,
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

function getComponentFilePath(componentSlug: string): string {
  const componentMeta = components.find((c) => c.slug === componentSlug);
  if (!componentMeta) return "";

  return `/components/ui/${componentSlug}.tsx`;
}

export async function CodeBlockCommand({ component }: { component: string }) {
  const filePath = getComponentFilePath(component);

  // Pre-render component code blocks for each framework with framework-specific code
  const frameworkCodeBlocks = await Promise.all(
    frameworks.map(async (framework) => {
      const componentCode = await getComponentCode(component, framework.value);
      
      if (!componentCode) {
        return null;
      }

      // Remove "use client" directive for display
      let code = componentCode.replace(/^"use client";\n?/gm, "");

      // Transform imports for display (similar to component-preview.tsx)
      // For SolidJS, transform relative imports to @/components/ui/{component}
      if (framework.value === "solid") {
        // Transform relative component imports
        code = code.replace(
          /from\s+["']\.\.\/.*?components\/base\/[\w-]+["']/g,
          `from "@/components/ui/${component}"`
        );
        // Transform relative utils imports
        code = code.replace(
          /from\s+["']\.\.\/.*?lib\/utils["']/g,
          'from "@/lib/utils"'
        );
        // Transform @ocean-ui/solid imports
        code = code.replace(
          /from\s+["']@ocean-ui\/solid["']/g,
          `from "@/components/ui/${component}"`
        );
      } else {
        // For React, transform @/components/library/react/base/ imports
        code = code.replace(
          /from\s+["']@\/components\/library\/react\/base\/[\w-]+["']/g,
          `from "@/components/ui/${component}"`
        );
        // Transform @ocean-ui/react imports
        code = code.replace(
          /from\s+["']@ocean-ui\/react["']/g,
          `from "@/components/ui/${component}"`
        );
      }

      const codeBlock = await CodeBlockWithFile({
        lang:
          framework.value === "vue"
            ? "vue"
            : framework.value === "svelte"
              ? "svelte"
              : "tsx",
        code,
        filename: filePath,
        showLineNumbers: true,
      });
      return {
        value: framework.value,
        codeBlock,
      };
    })
  );

  // Filter out null entries (frameworks without source code)
  const availableFrameworkCodeBlocks = frameworkCodeBlocks.filter(
    (block) => block !== null
  );

  return (
    <div className="space-y-6">
      {/* Step 1: Manual Installation Link */}
      <StepItem
        stepNumber={1}
        title="Complete the manual installation setup"
        isLast={false}
      >
        <div>
          <div
            className={cn(
              "relative rounded-3xl border border-border/50 bg-muted/50  text-sm"
            )}
          >
            <div className="flex gap-4 px-4">
              <div className="shrink-0 mt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/20">
                  <BookOpenIcon className="h-5 w-5 text-brand-400 dark:text-brand-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className=" text-brand-500 dark:text-brand-400">
                  If you haven&apos;t already completed the first 4 steps of
                  the&nbsp;
                  <Link
                    href="/docs/documentation/manual-installation"
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium text-brand-500 dark:text-brand-300",
                      "hover:text-brand-500 dark:hover:text-brand-400 transition-colors",
                      "underline underline-offset-4 decoration-dotted",
                      "decoration-brand-300",
                      "dark:decoration-brand-200"
                    )}
                  >
                    manual installation guide
                    <ExternalLinkIcon className="size-3.5 shrink-0 text-brand-400 dark:text-brand-300" />
                  </Link>
                  , please do so before continuing to install these components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </StepItem>

      {/* Step 2: Create file and paste code */}
      {availableFrameworkCodeBlocks.length > 0 && (
        <StepItem
          stepNumber={2}
          title={
            <>
              Create a{" "}
              <code className="relative rounded-lg bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {filePath.split("/").pop()}
              </code>{" "}
              file and paste the following code into it.
            </>
          }
          isLast={false}
        >
          <CodeBlockWrapper className="px-2 pt-3 my-2 pb-1">
            <div className="[&_figure]:mt-0">
              <FrameworkCodeTabs frameworkCodeBlocks={availableFrameworkCodeBlocks} />
            </div>
          </CodeBlockWrapper>
        </StepItem>
      )}

      {/* Step 3: Copy example code */}
      <StepItem
        stepNumber={3}
        title={
          <>
            Finally, Choose any example you like and add it to your project.
            <br />
            For instance, create a new file at{" "}
            <code className="relative rounded-lg bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {"components/shared/{example-component-name}.tsx"}
            </code>
            , paste the example code into that file, and then import and use the
            component wherever you need it in your application.
          </>
        }
        isLast={true}
      />
    </div>
  );
}
