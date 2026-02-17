import { cva, type VariantProps } from "class-variance-authority";
import type { JSX, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-border bg-transparent text-foreground [a&]:hover:bg-muted [a&]:hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: ParentComponent<BadgeProps> = (props) => {
  const [local, rest] = splitProps(props, ["variant", "class"]);
  return (
    <span
      data-slot="badge"
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

export { badgeVariants };
