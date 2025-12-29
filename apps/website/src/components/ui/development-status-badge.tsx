import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface DevelopmentStatusBadgeProps {
  /**
   * The development status text to display (e.g., "Early Alpha", "Unstable", "Pre-alpha")
   */
  text: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * A badge component that displays development status with a Zap icon.
 * Used to indicate early development stages like "Early Alpha", "Unstable", or "Pre-alpha".
 */
export function DevelopmentStatusBadge({
  text,
  className,
}: DevelopmentStatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
        "border-[#D0E0FF] bg-[#F0F8FF] text-indigo-500",
        "dark:border-indigo-400/30 dark:bg-indigo-950/20 dark:text-indigo-300",
        className
      )}
      role="status"
      aria-label={`Development status: ${text}`}
    >
      <Zap className="size-3 shrink-0" aria-hidden="true" />
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
}
