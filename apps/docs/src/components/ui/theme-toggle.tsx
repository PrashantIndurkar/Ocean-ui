"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <button
        data-slot="button"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-primary focus-visible:ring-border-primary/50 focus-visible:ring-[3px] aria-invalid:ring-bg-error-solid/20 dark:aria-invalid:ring-bg-error-solid/40 aria-invalid:border-bg-error-solid hover:bg-bg-brand-primary hover:text-text-brand-primary dark:hover:bg-bg-brand-primary/50 group/toggle extend-touch-target size-8"
        title="Toggle theme"
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      data-slot="button"
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-primary focus-visible:ring-border-primary/50 focus-visible:ring-[3px] aria-invalid:ring-bg-error-solid/20 dark:aria-invalid:ring-bg-error-solid/40 aria-invalid:border-bg-error-solid hover:bg-bg-brand-primary hover:text-text-brand-primary dark:hover:bg-bg-brand-primary/50 group/toggle extend-touch-target size-8"
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}


