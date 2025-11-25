import { readFile } from "fs/promises";
import { join } from "path";
import { Tabs } from "@ark-ui/react/tabs";
import { CodeBlock } from "./code-block";
import { CodeBlockWithFile } from "./code-block-with-file";
import { PnpmLogo, NPMLogo, YarnLogo, BunLogo } from "./icons/package-managers";
import { components } from "@/lib/components";

const packageManagers = [
  { value: "pnpm", icon: PnpmLogo },
  { value: "npm", icon: NPMLogo },
  { value: "yarn", icon: YarnLogo },
  { value: "bun", icon: BunLogo },
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

  // Pre-render component code block
  const componentCodeBlock = componentCode
    ? await CodeBlockWithFile({
        lang: "tsx",
        code: componentCode,
        filename: filePath,
        showLineNumbers: true,
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Step 1: Install dependencies */}
      {dependencies.length > 0 && (
        <div className="relative flex gap-4 pt-0 mt-0">
          <div className="flex flex-col items-center">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-brand-500 text-sm">
              1
            </span>
            <div className="h-full w-px border-border border" />
          </div>
          <div className="flex-1 min-w-0 pt-0 mt-0">
            <h3 className="text-base text-brand-500 font-normal leading-7 mt-0">
              Install the following dependencies:
            </h3>
            <div className="bg-brand-100 rounded-3xl px-2 pt-3 my-2 pb-1">
              <Tabs.Root defaultValue="pnpm" className="[&_figure]:mt-0">
                <Tabs.List className="inline-flex h-9 items-center border-b border-border bg-muted px-1.5 pt-1.5 pb-3 text-muted-foreground font-mono gap-x-2 w-full">
                  {installationCodeBlocks.map(({ value, icon: Icon }) => (
                    <Tabs.Trigger
                      key={value}
                      value={value}
                      className="inline-flex h-[calc(100%-2px)] items-center justify-center gap-1.5 rounded-lg px-2.5 py-3 text-sm font-normal leading-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow-md w-fit data-selected:border data-selected:border-brand-300 border border-transparent"
                    >
                      {Icon && <Icon className="size-4" />} {value}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                <div>
                  <p className="text-sm font-mono text-brand-400 font-light leading-7 my-6 pl-2">
                    Terminal
                  </p>
                </div>

                {installationCodeBlocks.map(({ value, codeBlock }) => (
                  <Tabs.Content key={value} value={value}>
                    {codeBlock}
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Create file and paste code */}
      {componentCodeBlock && (
        <div className="relative flex gap-4 pt-0 mt-0">
          <div className="flex flex-col items-center">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-brand-500 text-sm">
              2
            </span>
            <div className="mt-2 h-full w-px border-border border" />
          </div>
          <div className="flex-1 space-y-3 pb-8 min-w-0 pt-0 mt-0">
            <h3 className="text-base text-brand-500 font-normal leading-7 mt-0">
              Create a{" "}
              <code className="relative rounded-lg bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {filePath.split("/").pop()}
              </code>{" "}
              file and paste the following code into it.
            </h3>
            <div className="overflow-x-auto ">{componentCodeBlock}</div>
          </div>
        </div>
      )}

      {/* Step 3: Update import paths */}
      <div className="relative flex gap-4 pt-0 mt-0">
        <div className="flex flex-col items-center">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-primary-foreground text-sm font-semibold">
            3
          </span>
        </div>
        <div className="flex-1 pt-0 mt-0">
          <h3 className="text-base font-semibold leading-7 mt-0">
            Update the import paths to match your project setup.
          </h3>
        </div>
      </div>
    </div>
  );
}
