import { readFile } from "fs/promises";
import { join } from "path";
import { Tabs } from "../ui/tabs";
import { TabsWithLabel } from "../ui/tabs-with-label";
import { CodeBlock } from "./code-block";
import { CodeBlockWithFile } from "./code-block-with-file";
import {
  PnpmLogo,
  NPMLogo,
  YarnLogo,
  BunLogo,
} from "../icons/package-managers";
import { ReactJsIcon } from "../icons/react-icon";
import { SolidJsIcon } from "../icons/solidjs-icon";
import { VueJsIcon } from "../icons/vue-icon";
import { SvelteJSIcon } from "../icons/svelte-icon";
import { components } from "@/lib/components";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { StepItem } from "../mdx/step-item";

const packageManagers = [
  { value: "pnpm", icon: PnpmLogo },
  { value: "npm", icon: NPMLogo },
  { value: "yarn", icon: YarnLogo },
  { value: "bun", icon: BunLogo },
] as const;

const frameworks = [
  { value: "react", icon: ReactJsIcon },
  { value: "solid", icon: SolidJsIcon },
  { value: "vue", icon: VueJsIcon },
  { value: "svelte", icon: SvelteJSIcon },
] as const;

async function getComponentCode(componentSlug: string): Promise<string | null> {
  const componentMeta = components.find((c) => c.slug === componentSlug);
  if (!componentMeta) return null;

  const componentPath = join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui-react",
    "src",
    "components",
    componentMeta.category,
    `${componentSlug}.tsx`
  );

  try {
    const code = await readFile(componentPath, "utf-8");
    return code;
  } catch {
    return null;
  }
}

function getComponentFilePath(componentSlug: string): string {
  const componentMeta = components.find((c) => c.slug === componentSlug);
  if (!componentMeta) return "";

  return `/components/ui/${componentSlug}.tsx`;
}

export async function CodeBlockCommand({ component }: { component: string }) {
  const componentCode = await getComponentCode(component);
  const filePath = getComponentFilePath(component);

  // Dummy static commands for installation (to be replaced with real commands later)
  const getDummyInstallCommand = (packageManager: string) => {
    switch (packageManager) {
      case "pnpm":
        return "pnpm add example-package";
      case "npm":
        return "npm install example-package";
      case "yarn":
        return "yarn add example-package";
      case "bun":
        return "bun add example-package";
    }
  };

  // Pre-render dummy installation command code blocks
  const installationCodeBlocks = await Promise.all(
    packageManagers.map(async (pm) => {
      const command = getDummyInstallCommand(pm.value);
      const codeBlock = await CodeBlock({
        lang: "bash",
        code: command ?? "",
      });
      return {
        value: pm.value,
        icon: pm.icon,
        codeBlock,
      };
    })
  );

  // Pre-render component code blocks for each framework
  const frameworkCodeBlocks = componentCode
    ? await Promise.all(
        frameworks.map(async (framework) => {
          const codeBlock = await CodeBlockWithFile({
            lang:
              framework.value === "vue"
                ? "vue"
                : framework.value === "svelte"
                  ? "svelte"
                  : "tsx",
            code: componentCode,
            filename: filePath,
            showLineNumbers: true,
          });
          return {
            value: framework.value,
            icon: framework.icon,
            codeBlock,
          };
        })
      )
    : [];

  // Filter out null entries (frameworks without source code)
  const availableFrameworkCodeBlocks = frameworkCodeBlocks.filter(
    (block) => block !== null
  );

  return (
    <div className="space-y-6">
      {/* Step 1: Install dependencies */}
      <StepItem
        stepNumber={1}
        title="Install the following dependencies:"
        isLast={false}
      >
        <CodeBlockWrapper className="px-2 pt-3 my-2 pb-1">
          <div className="[&_figure]:mt-0">
            <TabsWithLabel
              items={installationCodeBlocks.map(
                ({ value, icon: Icon, codeBlock }) => ({
                  value,
                  label: value,
                  icon: Icon ? <Icon className="size-4" /> : undefined,
                  content: codeBlock,
                })
              )}
              defaultValue="pnpm"
              label="Terminal"
              variant="bordered"
              className="[&_figure]:mt-0"
            />
          </div>
        </CodeBlockWrapper>
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
              <Tabs
                items={availableFrameworkCodeBlocks.map(
                  ({ value, icon: Icon, codeBlock }) => ({
                    value,
                    label: value,
                    icon: Icon ? <Icon className="size-4" /> : undefined,
                    content: <div className="overflow-x-auto">{codeBlock}</div>,
                  })
                )}
                defaultValue="react"
                variant="bordered"
                className="[&_figure]:mt-0"
              />
            </div>
          </CodeBlockWrapper>
        </StepItem>
      )}

      {/* Step 3: Update import paths */}
      <StepItem
        stepNumber={3}
        title="Update the import paths to match your project setup."
        isLast={true}
      />
    </div>
  );
}
