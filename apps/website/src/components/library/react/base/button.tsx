"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ark } from "@ark-ui/react/factory";
import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        tertiary: "text-muted-foreground hover:bg-muted hover:text-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 py-2 has-[>svg]:px-2.5",
        md: "h-9 px-3.5 py-2.5 has-[>svg]:px-3",
        lg: "h-10 px-4 py-2.5 has-[>svg]:px-3.5",
        xl: "h-11 px-4.5 py-3 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ComponentProps<typeof ark.button>,
    VariantProps<typeof buttonVariants> {
  /**
   * Icon or element to display before the button text
   */
  iconLeading?: ReactNode;
  /**
   * Icon or element to display after the button text
   */
  iconTrailing?: ReactNode;
  /**
   * Show loading spinner and disable button
   * @default false
   */
  loading?: boolean;
  /**
   * The text to show while loading
   */
  loadingText?: ReactNode;
  /**
   * Keep text visible during loading state
   * @default false
   */
  showTextWhileLoading?: boolean;
}

function Button({
  variant,
  size,
  className,
  children,
  iconLeading,
  iconTrailing,
  loading = false,
  loadingText,
  showTextWhileLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isIconOnly = (iconLeading || iconTrailing) && !children;

  return (
    <ark.button
      type="button"
      className={cn(
        buttonVariants({ variant, size }),
        loading && !showTextWhileLoading && "relative",
        isIconOnly && size === "sm" && "p-2",
        isIconOnly && size === "md" && "p-2.5",
        isIconOnly && size === "lg" && "p-3",
        isIconOnly && size === "xl" && "p-3.5",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Loader2
          className={cn(
            "animate-spin",
            !showTextWhileLoading &&
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
          aria-hidden="true"
        />
      )}
      {iconLeading && !loading && iconLeading}
      {children && (
        <span className={loading && !showTextWhileLoading ? "invisible" : ""}>
          {loading && loadingText ? loadingText : children}
        </span>
      )}
      {iconTrailing && !loading && iconTrailing}
    </ark.button>
  );
}

export { Button, buttonVariants };
