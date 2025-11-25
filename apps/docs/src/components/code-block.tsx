import * as Base from "fumadocs-ui/components/codeblock";
import { highlight } from "fumadocs-core/highlight";
import { type HTMLAttributes } from "react";
import { cn } from "@ocean-ui/utils";
import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  lang,
  showLineNumbers = false,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  code: string;
  lang: string;
  showLineNumbers?: boolean;
}) {
  const rendered = await highlight(code, {
    lang,
    components: {
      pre: ({ className, ...props }) => (
        <Base.Pre className={cn("text-sm", className)} {...props} />
      ),
    },
  });

  return (
    <div className="relative group">
      <Base.CodeBlock
        className={cn(
          "[&>div:not(:has(pre)):not(:has(figcaption))]:hidden",
          "[&>button]:hidden",
          "[&_button]:hidden",
          rest.className
        )}
        data-line-numbers={showLineNumbers ? true : undefined}
        {...rest}
      >
        {rendered}
      </Base.CodeBlock>
      <div className="absolute top-2 right-2 z-10">
        <CopyButton
          code={code}
          size={15}
          className="text-brand-400 dark:text-brand-300"
        />
      </div>
    </div>
  );
}
