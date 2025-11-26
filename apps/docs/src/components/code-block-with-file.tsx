import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import { type HTMLAttributes } from "react";
import { cn } from "@ocean-ui/utils";
import { CopyButton } from "./copy-button";
import { CodeBlockWrapper } from "./code-block-wrapper";

interface CodeBlockWithFileProps extends HTMLAttributes<HTMLElement> {
  code: string;
  lang: string;
  filename?: string;
  showLineNumbers?: boolean;
  codeClassName?: string;
}

export async function CodeBlockWithFile({
  code,
  lang,
  filename,
  showLineNumbers = true,
  className,
  codeClassName,
  ...rest
}: CodeBlockWithFileProps) {
  const rendered = await highlight(code, {
    lang,
    components: {
      pre: ({ className: preClassName, ...props }) => (
        <Base.Pre
          className={cn(
            "text-sm bg-white dark:bg-transparent",
            codeClassName,
            preClassName
          )}
          {...props}
        />
      ),
      code: ({ className: codeElementClassName, ...props }) => (
        <code
          className={cn(
            "font-mono bg-white dark:bg-transparent rounded-2xl",
            codeElementClassName
          )}
          {...props}
        />
      ),
    },
  });

  return (
    <div className={cn("relative overflow-hidden ", className)} {...rest}>
      <CodeBlockWrapper className="px-1">
        {filename && (
          <div className="flex items-center justify-between">
            <span className="font-inter font-light text-sm text-brand-400 dark:text-brand-300 pl-2 py-5">
              {filename}
            </span>
            <CopyButton
              code={code}
              size={15}
              className="text-brand-400 dark:text-brand-300"
            />
          </div>
        )}
        <div
          className={cn(
            "overflow-auto",
            "[&_pre]:bg-transparent [&_pre]:px-3",
            "[&_code]:block [&_code]:w-full"
          )}
        >
          {showLineNumbers ? (
            <Base.CodeBlock data-line-numbers>{rendered}</Base.CodeBlock>
          ) : (
            rendered
          )}
        </div>
      </CodeBlockWrapper>
    </div>
  );
}
