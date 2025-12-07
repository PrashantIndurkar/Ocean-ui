import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

interface RouteParams {
  params: Promise<{
    name: string;
  }>;
}

/**
 * Static Registry JSON Route Handler
 *
 * Serves static JSON files from the root public/r/ directory
 * This route matches requests like /r/registry.json and /r/accordion.json
 *
 * URL format: /r/{name}.json
 *
 * Examples:
 * - /r/registry.json → Returns registry index JSON
 * - /r/accordion.json → Returns accordion component JSON
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { name } = await params;

    // Ensure the name ends with .json
    const fileName = name.endsWith(".json") ? name : `${name}.json`;

    // Calculate path to apps/docs/public/r/ directory
    // process.cwd() is apps/docs/ during build/runtime
    // Next.js serves static files from apps/docs/public/ automatically
    const filePath = join(process.cwd(), "public", "r", fileName);

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: `File ${fileName} not found` },
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
    console.error("Error serving registry JSON file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
