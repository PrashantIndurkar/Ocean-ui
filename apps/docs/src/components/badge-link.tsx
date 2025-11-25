import { cn } from "@ocean-ui/utils";
import { ExternalLinkIcon } from "lucide-react";

interface BadgeLinkProps {
  /**
   * The API/library name to display (e.g., "@ark-ui/react/accordion")
   */
  name: string;
  /**
   * The URL to link to (e.g., "https://ark-ui.com/docs/components/accordion")
   */
  href: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * A badge component that displays an API/library link with an external link icon.
 * Used in documentation to show which underlying library/API a component uses.
 */
export function BadgeLink({ name, href, className }: BadgeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex border border-border bg-brand-100 dark:bg-brand-900 items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-display text-muted-foreground hover:bg-muted/80 transition-colors no-underline",
        className
      )}
      aria-label={`View ${name} documentation (opens in new tab)`}
    >
      <span className="font-display text-brand-500 dark:text-brand-400 font-normal text-xs ">
        {name}
      </span>
      <ExternalLinkIcon className="size-3.5 shrink-0 text-brand-400 dark:text-brand-300" />
    </a>
  );
}
