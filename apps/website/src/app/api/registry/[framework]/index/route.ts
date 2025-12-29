import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

interface RouteParams {
  params: Promise<{
    framework: string;
  }>;
}

/**
 * Registry Index API Route Handler
 *
 * Serves component index JSON files listing all available components for a framework
 *
 * URL format: /api/registry/{framework}/index.json
 *
 * Examples:
 * - /api/registry/react/index.json → Returns React components index JSON
 * - /api/registry/solid/index.json → Returns Solid components index JSON
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { framework } = await params;

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

    // Calculate path to apps/website/public/registry/{framework}/index.json
    const filePath = join(
      process.cwd(),
      "public",
      "registry",
      framework,
      "index.json"
    );

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        {
          error: `Index not found for framework '${framework}'`,
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
    console.error("Error serving registry index JSON file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

