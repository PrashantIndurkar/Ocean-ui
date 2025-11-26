import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import * as stepComponents from "fumadocs-ui/components/steps";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { BadgeLink } from "./components/badge-link";
import { CodeBlockCommand } from "./components/code-block-command";
import ComponentPreview from "./components/component-preview";
import { Description } from "./components/description";
import { Divider } from "./components/divider";
import { DocText } from "./components/doc-text";
import { MDXCodeBlockClient } from "./components/mdx-code-block-client";
import { TechStackCard } from "./components/tech-stack-card";
import { ArkUiIcon } from "./components/icons/ark-ui-icon";
import { ZagIcon } from "./components/icons/zag-icon";
import { TailwindCssIcon } from "./components/icons/tailwind-css-icon";
import { TypeScriptIcon } from "./components/icons/typescript-icon";
import { ReactJsIcon } from "./components/icons/react-icon";
import { SolidJsIcon } from "./components/icons/solidjs-icon";
import { cn } from "@ocean-ui/utils";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    pre: ({ ref: _ref, className, ...props }) => (
      <MDXCodeBlockClient>
        <CodeBlock
          data-line-numbers
          className={cn(
            "p-0", // figure
            "[&>div:has(figcaption)]:ps-5.5 [&>div:has(figcaption)]:pe-1", // Header with title and copy button
            "[&>div:has(figcaption)+div]:border-t [&>div:has(figcaption)+div]:rounded-t-none", // pre container when the header is visible
            "[&>div:has(pre)]:py-4 [&>div:has(pre)]:border-0 [&>div:has(pre)]:max-h-[400px]", // pre container
            "[&>div:not(:has(pre)):not(:has(figcaption))]:hidden", // Hide copy button container div
            "[&>button]:hidden", // Hide default Fumadocs copy button
            "[&_button]:hidden", // Hide nested buttons
            "[&_button[aria-label='Copy Text']]:hidden", // Hide button with Copy Text aria-label
            "mdx-code-block" // Add class for CSS targeting
          )}
          {...props}
        >
          <Pre className={cn("text-sm leading-[1.75] font-mono", className)}>
            {props.children}
          </Pre>
        </CodeBlock>
      </MDXCodeBlockClient>
    ),
    code: ({ ref: _ref, className, ...props }) => (
      <code
        className={cn("border-border/50 py-0.5 font-mono", className)}
        {...props}
      />
    ),
    a: ({ ref: _ref, className, ...props }) => (
      <a className={cn("has-[code]:decoration-dotted", className)} {...props} />
    ),
    BadgeLink,
    CodeBlockCommand,
    ComponentPreview,
    Description,
    Divider,
    DocText,
    TechStackCard,
    ArkUiIcon,
    ZagIcon,
    TailwindCssIcon,
    TypeScriptIcon,
    ReactJsIcon,
    SolidJsIcon,
    ...stepComponents,
  };
}
