"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-border-primary bg-bg-primary/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-sm text-text-tertiary">
        {/* Left: Navigation Links */}
        <nav className="flex items-center gap-2" aria-label="Footer navigation">
          <Link
            href="/components"
            className="hover:text-fg-primary transition-colors"
            aria-label="Components"
          >
            /Components
          </Link>
        </nav>

        {/* Center: Vercel Info */}
        {/* Center: Copyright & License Info */}
        {/* Center: Copyright & License Info */}
        <div className="flex items-center gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-fg-primary"
            aria-hidden="true"
          >
            <path d="M8 2L14 14H2L8 2Z" fill="currentColor" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs leading-tight">
              © {currentYear} Ocean UI. MIT License
            </span>
            <span className="text-xs leading-tight text-text-tertiary">
              Deployed on Vercel
            </span>
          </div>
        </div>

        {/* Right: Twitter/X Link */}
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-tertiary"
            aria-hidden="true"
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xs">
            built for you by{" "}
            <Link
              href="https://x.com/prashant2weet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-brand-primary hover:text-text-brand-primary/80 underline transition-colors"
              aria-label="Prashant's Twitter profile"
            >
              Prashant
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
