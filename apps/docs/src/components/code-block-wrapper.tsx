import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CodeBlockWrapper({
  children,
  className,
  ...rest
}: CodeBlockWrapperProps) {
  return (
    <div
      className={cn("bg-brand-100 dark:bg-brand-800 rounded-3xl", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
