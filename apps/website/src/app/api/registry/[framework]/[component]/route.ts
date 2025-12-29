import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

interface RouteParams {
  params: Promise<{
    framework: string;
    component: string;
  }>;
}

/**
 * Component Registry API Route Handler
 *
 * Serves individual component registry JSON files from public/registry/{framework}/{component}.json
 *
 * URL format: /api/registry/{framework}/{component}.json
 *
 * Examples:
 * - /api/registry/react/accordion.json → Returns React accordion component JSON
 * - /api/registry/solid/accordion.json → Returns Solid accordion component JSON
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { framework, component } = await params;

    // Validate framework
    const validFrameworks = ["react", "solid"];
    if (!validFrameworks.includes(framework)) {
      return NextResponse.json(
        {
          error: `Framework '${framework}' not found. Supported: ${validFrameworks.join(", ")}`,
        },
        { status: 404 }
      );
    }

    // Remove .json extension if present (handle both /accordion and /accordion.json)
    const componentName = component.endsWith(".json")
      ? component.slice(0, -5)
      : component;

    // Validate component name (prevent path traversal)
    if (
      componentName.includes("..") ||
      componentName.includes("/") ||
      componentName.includes("\\")
    ) {
      return NextResponse.json(
        { error: "Invalid component name" },
        { status: 400 }
      );
    }

    // Calculate path to apps/website/public/registry/{framework}/{component}.json
    const filePath = join(
      process.cwd(),
      "public",
      "registry",
      framework,
      `${componentName}.json`
    );

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        {
          error: `Component '${componentName}' not found for framework '${framework}'`,
        },
        { status: 404 }
      );
    }

    // Read and parse JSON file
    const fileContent = await readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    // Return JSON with proper headers and caching
    return NextResponse.json(jsonData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error serving component registry JSON file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

