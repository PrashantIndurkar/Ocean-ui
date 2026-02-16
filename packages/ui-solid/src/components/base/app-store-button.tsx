import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ParentComponent, JSX } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../../lib/utils";

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
  extends ComponentProps<"a">,
    VariantProps<typeof appStoreButtonVariants> {
  icon: JSX.Element;
  topText: string;
  bottomText: string;
}

export const AppStoreButton: ParentComponent<AppStoreButtonProps> = (props) => {
  const [local, rest] = splitProps(
    props,
    ["icon", "topText", "bottomText", "variant", "size", "class", "aria-label"],
  );

  // Generate aria-label from text if not provided
  const label = local["aria-label"] || `${local.topText} ${local.bottomText}`;

  return (
    <a
      aria-label={label}
      class={cn(
        appStoreButtonVariants({
          variant: local.variant,
          size: local.size,
        }),
        local.class,
      )}
      {...rest}
    >
      {/* Icon wrapper */}
      <div
        class={cn(
          "shrink-0 flex items-center justify-center [&_svg]:fill-current",
          local.size === "md"
            ? "w-5 h-5 [&_svg]:w-5 [&_svg]:h-5"
            : "w-6 h-6 [&_svg]:w-6 [&_svg]:h-6",
        )}
      >
        {local.icon}
      </div>

      {/* Text wrapper */}
      <div class="flex flex-col items-start justify-center leading-tight">
        <span
          class={cn(
            "font-normal uppercase tracking-wide",
            local.size === "md"
              ? "text-[7px] leading-tight"
              : "text-[8px] leading-tight",
          )}
        >
          {local.topText}
        </span>
        <span
          class={cn(
            "font-semibold leading-none",
            local.size === "md" ? "text-sm" : "text-base",
          )}
        >
          {local.bottomText}
        </span>
      </div>
    </a>
  );
};

export { appStoreButtonVariants };
