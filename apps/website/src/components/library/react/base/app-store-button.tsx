"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const appStoreButtonVariants = cva(
  "inline-flex items-center gap-2.5 px-3 rounded-[7px] transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        outline:
          "bg-transparent border border-border text-foreground hover:bg-muted ring-1 ring-inset",
      },
      size: {
        md: "min-w-[135px] h-10",
        lg: "min-w-[149px] h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface AppStoreButtonProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof appStoreButtonVariants> {
  icon: ReactNode;
  topText: string;
  bottomText: string;
}

function AppStoreButton({
  icon,
  topText,
  bottomText,
  variant,
  size,
  className,
  "aria-label": ariaLabel,
  ...props
}: AppStoreButtonProps) {
  // Generate aria-label from text if not provided
  const label = ariaLabel || `${topText} ${bottomText}`;

  return (
    <a
      aria-label={label}
      className={cn(appStoreButtonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Icon wrapper */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center [&_svg]:fill-current",
          size === "md"
            ? "w-5 h-5 [&_svg]:w-5 [&_svg]:h-5"
            : "w-6 h-6 [&_svg]:w-6 [&_svg]:h-6",
        )}
      >
        {icon}
      </div>

      {/* Text wrapper */}
      <div className="flex flex-col items-start justify-center leading-tight">
        <span
          className={cn(
            "font-normal uppercase tracking-wide",
            size === "md"
              ? "text-[7px] leading-tight"
              : "text-[8px] leading-tight",
          )}
        >
          {topText}
        </span>
        <span
          className={cn(
            "font-semibold leading-none",
            size === "md" ? "text-sm" : "text-base",
          )}
        >
          {bottomText}
        </span>
      </div>
    </a>
  );
}

export { AppStoreButton, appStoreButtonVariants };
