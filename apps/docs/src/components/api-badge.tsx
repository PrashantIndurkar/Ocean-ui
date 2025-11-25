import { cn } from "@ocean-ui/utils";

interface ApiBadgeProps {
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
export function ApiBadge({ name, href, className }: ApiBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex border border-border bg-brand-100 items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-mono text-muted-foreground hover:bg-muted/80 transition-colors no-underline",
        className
      )}
      aria-label={`View ${name} documentation (opens in new tab)`}
    >
      <span className="font-normal text-brand-500 text-xs ">{name}</span>
      <svg
        className="size-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}
