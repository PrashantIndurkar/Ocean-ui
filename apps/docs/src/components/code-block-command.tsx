import { readFile } from "fs/promises";
import { join } from "path";
import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
import { CodeBlock } from "./code-block";
import { CodeBlockWithFile } from "./code-block-with-file";
import { PnpmLogo, NPMLogo, YarnLogo, BunLogo } from "./icons/package-managers";
import { ReactJsIcon } from "./icons/react-icon";
import { SolidJsIcon } from "./icons/solidjs-icon";
import { VueJsIcon } from "./icons/vue-icon";
import { SvelteJSIcon } from "./icons/svelte-icon";
import { components } from "@/lib/components";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { StepItem } from "./step-item";
import { cn } from "@ocean-ui/utils";

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

const getInstallationCommand = (
  packageManager: string,
  dependencies: string[]
) => {
  const deps = dependencies.join(" ");
  switch (packageManager) {
    case "pnpm":
      return `pnpm add ${deps}`;
    case "npm":
      return `npm install ${deps}`;
    case "yarn":
      return `yarn add ${deps}`;
    case "bun":
      return `bun add ${deps}`;
  }
};

async function getComponentDependencies(
  componentSlug: string
): Promise<string[]> {
  // Extract dependencies from the component file
  // For now, return common dependencies - this can be enhanced later
  const componentMeta = components.find((c) => c.slug === componentSlug);
  if (!componentMeta) return [];

  // Read the component file to extract dependencies
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
    const content = await readFile(componentPath, "utf-8");
    const dependencies: string[] = [];

    // Extract @ark-ui imports
    const arkMatches = content.match(/from ["']@ark-ui\/react\/([^"']+)["']/g);
    if (arkMatches) {
      arkMatches.forEach((match) => {
        const dep = match.match(/@ark-ui\/react\/([^"']+)/)?.[1];
        if (dep) {
          dependencies.push(`@ark-ui/react/${dep}`);
        }
      });
    }

    // Extract other common dependencies
    if (content.includes("lucide-react")) {
      dependencies.push("lucide-react");
    }

    return dependencies;
  } catch {
    // Fallback dependencies for accordion
    if (componentSlug === "accordion") {
      return ["@ark-ui/react/accordion", "lucide-react"];
    }
    return [];
  }
}

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
  const dependencies = await getComponentDependencies(component);
  const componentCode = await getComponentCode(component);
  const filePath = getComponentFilePath(component);

  // Pre-render installation command code blocks
  const installationCodeBlocks = await Promise.all(
    packageManagers.map(async (pm) => {
      const command = getInstallationCommand(pm.value, dependencies) || "";
      const codeBlock = await CodeBlock({
        lang: "bash",
        code: command,
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
          // For now, show the same code for all frameworks (as example)
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

  return (
    <div className="space-y-6">
      {/* Step 1: Install dependencies */}
      {dependencies.length > 0 && (
        <StepItem
          stepNumber={1}
          title="Install the following dependencies:"
          isLast={false}
        >
          <CodeBlockWrapper className="px-2 pt-3 my-2 pb-1">
            <div className="[&_figure]:mt-0">
              <ArkTabs.Root defaultValue="pnpm" className="[&_figure]:mt-0">
                <ArkTabs.List className="inline-flex h-9 items-center border-b border-border bg-muted px-1.5 pt-1.5 pb-3 text-muted-foreground font-mono gap-x-2 w-full">
                  {installationCodeBlocks.map(({ value, icon: Icon }) => (
                    <ArkTabs.Trigger
                      key={value}
                      value={value}
                      className={cn(
                        "inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 px-2.5 py-3 text-sm font-normal w-fit border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:border-brand-300 dark:data-selected:border-gray-700 rounded-lg data-selected:shadow-md"
                      )}
                    >
                      {Icon && (
                        <span className="size-4 shrink-0">
                          <Icon className="size-4" />
                        </span>
                      )}
                      {value}
                    </ArkTabs.Trigger>
                  ))}
                </ArkTabs.List>
                <div>
                  <p className="text-sm font-mono text-brand-400 dark:text-brand-300 font-light leading-7 my-6 pl-2">
                    Terminal
                  </p>
                </div>
                {installationCodeBlocks.map(({ value, codeBlock }) => (
                  <ArkTabs.Content key={value} value={value}>
                    {codeBlock}
                  </ArkTabs.Content>
                ))}
              </ArkTabs.Root>
            </div>
          </CodeBlockWrapper>
        </StepItem>
      )}

      {/* Step 2: Create file and paste code */}
      {frameworkCodeBlocks.length > 0 && (
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
              <ArkTabs.Root defaultValue="react" className="[&_figure]:mt-0">
                <ArkTabs.List className="inline-flex h-9 items-center border-b border-border bg-muted px-1.5 pt-1.5 pb-3 text-muted-foreground font-mono gap-x-2 w-full">
                  {frameworkCodeBlocks.map(({ value, icon: Icon }) => (
                    <ArkTabs.Trigger
                      key={value}
                      value={value}
                      className={cn(
                        "inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 px-2.5 py-3 text-sm font-normal w-fit border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:border-brand-300 dark:data-selected:border-gray-700 rounded-lg data-selected:shadow-md"
                      )}
                    >
                      {Icon && (
                        <span className="size-4 shrink-0">
                          <Icon className="size-4" />
                        </span>
                      )}
                      {value}
                    </ArkTabs.Trigger>
                  ))}
                </ArkTabs.List>
                {frameworkCodeBlocks.map(({ value, codeBlock }) => (
                  <ArkTabs.Content key={value} value={value}>
                    <div className="overflow-x-auto">{codeBlock}</div>
                  </ArkTabs.Content>
                ))}
              </ArkTabs.Root>
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
