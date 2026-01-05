"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ark } from "@ark-ui/react/factory";
import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // Base styles
    "group relative inline-flex items-center justify-center whitespace-nowrap",
    "border-0 outline-none transition-all duration-100 ease-linear",
    "cursor-pointer", // Ensure pointer cursor for buttons
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    // Icon styles
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:transition-inherit-all",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground shadow-xs-skeumorphic",
          "hover:bg-primary/90 data-loading:bg-primary/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:bg-muted disabled:text-muted-foreground disabled:shadow-xs",
          // Icon styles
          "*:data-icon:text-primary-foreground/90 hover:*:data-icon:text-primary-foreground",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground shadow-xs",
          "hover:bg-secondary/80 hover:text-secondary-foreground data-loading:bg-secondary/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:bg-muted disabled:text-muted-foreground disabled:shadow-xs",
          // Icon styles
          "*:data-icon:text-muted-foreground hover:*:data-icon:text-secondary-foreground",
        ],
        tertiary: [
          "text-muted-foreground",
          "hover:bg-muted hover:text-foreground data-loading:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:text-muted-foreground",
          // Icon styles
          "*:data-icon:text-muted-foreground hover:*:data-icon:text-foreground",
        ],
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-muted hover:text-foreground data-loading:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:border-border/50 disabled:text-muted-foreground",
          // Icon styles
          "*:data-icon:text-muted-foreground hover:*:data-icon:text-foreground",
        ],
        ghost: [
          "text-foreground",
          "hover:bg-muted hover:text-foreground data-loading:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:text-muted-foreground",
          // Icon styles
          "*:data-icon:text-muted-foreground hover:*:data-icon:text-foreground",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground shadow-xs",
          "hover:bg-destructive/90 data-loading:bg-destructive/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:bg-muted disabled:text-muted-foreground disabled:shadow-xs",
          // Icon styles
          "*:data-icon:text-destructive-foreground/90 hover:*:data-icon:text-destructive-foreground",
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:text-muted-foreground disabled:no-underline",
          // Icon styles
          "*:data-icon:text-primary/80 hover:*:data-icon:text-primary",
        ],
      },
      size: {
        sm: "h-8 gap-1 rounded-lg px-3 py-2 text-sm font-semibold has-[>svg]:px-2.5 data-icon-only:p-2",
        md: "h-9 gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold has-[>svg]:px-3 data-icon-only:p-2.5",
        lg: "h-10 gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold has-[>svg]:px-3.5 data-icon-only:p-3",
        xl: "h-11 gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold has-[>svg]:px-4 data-icon-only:p-3.5",
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
      data-loading={loading ? true : undefined}
      data-icon-only={isIconOnly ? true : undefined}
      className={cn(
        buttonVariants({ variant, size }),
        // Loading state - hide content when loading (unless showTextWhileLoading)
        loading &&
          (showTextWhileLoading
            ? "[&>*:not([data-icon=loading]):not([data-text])]:hidden"
            : "[&>*:not([data-icon=loading])]:invisible"),
        // Pointer events disabled during loading
        loading && "pointer-events-none",
        // Ensure pointer cursor when not disabled or loading
        !isDisabled && "cursor-pointer",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {/* Leading Icon */}
      {iconLeading && !loading && (
        <span data-icon="leading" aria-hidden="true">
          {iconLeading}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Loader2
          data-icon="loading"
          className={cn(
            "animate-spin",
            !showTextWhileLoading &&
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
          aria-hidden="true"
        />
      )}

      {/* Button Text */}
      {children && (
        <span data-text className="transition-inherit-all">
          {loading && loadingText ? loadingText : children}
        </span>
      )}

      {/* Trailing Icon */}
      {iconTrailing && !loading && (
        <span data-icon="trailing" aria-hidden="true">
          {iconTrailing}
        </span>
      )}
    </ark.button>
  );
}

export { Button, buttonVariants };
