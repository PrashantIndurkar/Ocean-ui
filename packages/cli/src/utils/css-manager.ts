import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import type { RegistryItem } from "./registry-client.js";

const CSS_PATHS = [
  "src/index.css",
  "src/app/globals.css",
  "src/styles/globals.css",
  "app/globals.css",
  "styles/globals.css",
  "src/global.css",
  "src/globals.css",
];

export function findGlobalCss(): string | null {
  const cwd = process.cwd();
  for (const path of CSS_PATHS) {
    const fullPath = join(cwd, path);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

export function objectToCss(selector: string, styles: any, indent = 2): string {
  const spaces = " ".repeat(indent);
  let css = `${spaces}${selector} {\n`;
  for (const [prop, value] of Object.entries(styles)) {
    if (typeof value === "object") {
      css += objectToCss(prop, value, indent + 2);
    } else {
      css += `${spaces}  ${prop}: ${value};\n`;
    }
  }
  css += `${spaces}}\n`;
  return css;
}

export async function updateCssVariables(component: RegistryItem): Promise<boolean> {
  if (!component.cssVars && !component.css) {
    return false;
  }

  const cssPath = findGlobalCss();
  if (!cssPath) {
    console.warn(
      chalk.yellow("⚠ Could not find global CSS file. Skipped CSS injection.")
    );
    return false;
  }

  let content = readFileSync(cssPath, "utf-8");
  let newContent = content;

  // Generate CSS content to inject
  let injectedCss = "";

  // 1. Handle CSS Variables (usually in cssVars.theme)
  if (component.cssVars?.theme) {
    for (const [key, value] of Object.entries(component.cssVars.theme)) {
      // Check if already exists to avoid duplication
      if (!content.includes(key)) {
        injectedCss += `  ${key}: ${value};\n`;
      }
    }
  }

  // 2. Handle Keyframes and other CSS (in css)
  if (component.css) {
    for (const [key, value] of Object.entries(component.css)) {
      // Naive check for existence
      if (!content.includes(key)) {
        const cssString = objectToCss(key, value);
        injectedCss += cssString;
      }
    }
  }

  if (!injectedCss.trim()) {
    return true; // Nothing new to add
  }

  // Check if we have a @theme block (Tailwind v4)
  const hasThemeBlock = content.includes("@theme {") || content.includes("@theme{");

  if (hasThemeBlock) {
    // Insert into existing @theme block
    // We replace the first opening brace of @theme with brace + injected CSS
    newContent = newContent.replace(/@theme\s*\{/, `@theme {\n${injectedCss}`);
  } else {
    // Append new @theme block
    newContent += `\n\n@theme {\n${injectedCss}}`;
  }

  if (newContent !== content) {
    writeFileSync(cssPath, newContent, "utf-8");
    console.log(chalk.green(`✓ Updated CSS in ${cssPath}`));
    return true;
  }

  return true;
}

