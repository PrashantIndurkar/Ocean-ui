import { cva, type VariantProps } from "class-variance-authority";
import { ark } from "@ark-ui/solid/factory";
import type { ComponentProps, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../../lib/utils";

const socialButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 px-6 whitespace-nowrap rounded-lg text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-background border border-border text-foreground hover:bg-muted",
        filled:
          "bg-primary text-primary-foreground border-0 shadow-xs hover:bg-primary/90",
        dark: "bg-black text-white border-0 shadow-xs hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
        "icon-only":
          "bg-white dark:bg-background border border-border text-foreground hover:bg-muted aspect-square",
      },
      size: {
        sm: "min-h-8 [&_svg]:size-4",
        md: "min-h-9 [&_svg]:size-5",
        lg: "min-h-10 [&_svg]:size-5",
        xl: "min-h-11 [&_svg]:size-5",
        "icon-sm": "h-8 w-8 [&_svg]:size-4",
        "icon-md": "h-10 w-10 [&_svg]:size-5",
        "icon-lg": "h-12 w-12 [&_svg]:size-6",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      fullWidth: false,
    },
  },
);

export interface SocialButtonProps
  extends ComponentProps<typeof ark.button>,
    VariantProps<typeof socialButtonVariants> {}

export const SocialButton: ParentComponent<SocialButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["variant", "size", "fullWidth", "class"]);

  // For icon-only variant, override size to use icon size variants
  const finalSize =
    local.variant === "icon-only" && local.size && !local.size.startsWith("icon-")
      ? (`icon-${local.size}` as "icon-sm" | "icon-md" | "icon-lg")
      : local.size;

  return (
    <ark.button
      type="button"
      data-slot="social-button"
      class={cn(
        socialButtonVariants({
          variant: local.variant,
          size: finalSize,
          fullWidth: local.fullWidth,
        }),
        local.class,
      )}
      {...rest}
    />
  );
};

export { socialButtonVariants };
