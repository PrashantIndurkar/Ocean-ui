import { NextRequest, NextResponse } from "next/server";
import { getComponentSource } from "@/lib/registry.server";
import { getRegistryParams, loadComponentManifest } from "@/lib/registry.utils";

interface RouteParams {
  params: Promise<{
    frameworkCode: string; // Short framework code: r, s
    componentIndex: string; // Component index number in registry
    exampleIndex: string; // Example index number in component
  }>;
}

/**
 * Registry API Route
 * 
 * Returns shadcn-compatible JSON format for component examples
 * 
 * URL format: /r/[frameworkCode]/[componentIndex]/[exampleIndex].json
 * 
 * Examples:
 * - /r/r/0/0.json → React, first component (accordion), first example (basic)
 * - /r/s/0/0.json → Solid, first component (accordion), first example (basic)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const registryParams = await getRegistryParams(await params);

    if (!registryParams) {
      return NextResponse.json(
        { error: "Invalid component parameters" },
        { status: 404 }
      );
    }

    const { framework, slug, example } = registryParams;

    // Remove .json extension if present
    const exampleName = example.replace(/\.json$/, "");

    // Get the source code for the specific framework and example
    const sourceCode = await getComponentSource(slug, exampleName, framework);

    if (!sourceCode) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    // Get dependencies for the framework
    const getDependencies = (fw: string): string[] => {
      const baseDeps = [
        `@ark-ui/${fw}`,
        `@ocean-ui/tokens`,
        `@ocean-ui/utils`,
      ];

      // Add framework-specific icon library
      const iconMap: Record<string, string> = {
        react: "lucide-react",
        solid: "lucide-solid",
      };

      const iconPackage = iconMap[fw];
      if (iconPackage) {
        baseDeps.push(iconPackage);
      }

      return baseDeps;
    };

    const fileExtension = "tsx";
    const fileName = `${exampleName}.${fileExtension}`;
    const dependencies = getDependencies(framework);

    // Load manifest to get CSS and CSS variables from the specific example
    const manifest = await loadComponentManifest(slug);
    const manifestExample = manifest?.examples.find(
      (ex) => ex.name === exampleName
    );
    const { css, cssVars } = manifestExample || {};

    // Create the shadcn-compatible registry response
    const registryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: slug,
      type: "registry:component",
      dependencies: dependencies,
      files: [
        {
          path: `components/registry/${framework}/${slug}/${fileName}`,
          target: `components/${slug}/${fileName}`,
          content: sourceCode,
          type: "registry:component",
        },
      ],
      meta: {
        tags: [slug, "ark-ui", "ocean-ui"],
        colSpan: 2,
      },
      ...(css && { css }), // Include css if present
      ...(cssVars && { cssVars }), // Include cssVars if present
    };

    return NextResponse.json(registryItem);
  } catch (error) {
    console.error("Error generating registry item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

