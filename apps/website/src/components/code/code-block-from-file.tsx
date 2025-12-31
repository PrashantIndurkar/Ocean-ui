import { readFile } from "fs/promises";
import { join } from "path";
import { CodeBlockWithFile } from "./code-block-with-file";

interface CodeBlockFromFileProps {
  filePath: string;
  filename?: string;
  lang?: string;
  showLineNumbers?: boolean;
}

/**
 * Server component that reads a file and displays it as a code block.
 * The file path should be relative to the website app root.
 */
export async function CodeBlockFromFile({
  filePath,
  filename,
  lang = "css",
  showLineNumbers = true,
}: CodeBlockFromFileProps) {
  try {
    const fullPath = join(process.cwd(), filePath);
    const code = await readFile(fullPath, "utf-8");
    const displayFilename = filename || filePath.split("/").pop() || "file";

    return (
      <CodeBlockWithFile
        code={code}
        lang={lang}
        filename={displayFilename}
        showLineNumbers={showLineNumbers}
      />
    );
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return (
      <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-950/20">
        <p className="text-red-600 dark:text-red-400">
          Error loading file: {filePath}
        </p>
      </div>
    );
  }
}

