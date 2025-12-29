import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepItemProps {
  stepNumber: number | string;
  title: ReactNode;
  children?: ReactNode;
  isLast?: boolean;
  contentClassName?: string;
}

export function StepItem({
  stepNumber,
  title,
  children,
  isLast = false,
  contentClassName,
}: StepItemProps) {
  return (
    <div className="relative flex gap-4 pt-0 mt-0">
      <div className="flex flex-col items-center">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-brand-500 dark:text-brand-400 text-sm">
          {stepNumber}
        </span>
        {!isLast && (
          <div
            className={cn(
              "h-full w-px border-border border",
              stepNumber === 2 && "mt-2"
            )}
          />
        )}
      </div>
      <div
        className={cn(
          "flex-1 min-w-0 pt-0 mt-0",
          stepNumber === 2 && "space-y-3 pb-8",
          contentClassName
        )}
      >
        <h3 className="text-base text-brand-500 dark:text-brand-400 font-normal leading-7 mt-0">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
