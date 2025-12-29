"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

interface TechStackCardProps {
  icon: ReactNode;
  name: string;
  version: string;
  link: string;
}

export function TechStackCard({
  icon,
  name,
  version,
  link,
}: TechStackCardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-4 rounded-2xl border border-border bg-muted hover:bg-muted/80 transition-all duration-200 hover:border-brand-300 dark:hover:border-gray-700 hover:shadow-md no-underline"
      aria-label={`${name} ${version} - Opens in new tab`}
    >
      {/* External link icon */}
      <div className="absolute top-3 right-3">
        <ExternalLinkIcon
          size={16}
          className="text-brand-300 dark:text-brand-500 group-hover:text-foreground"
        />
      </div>

      {/* Icon */}
      <div className="mb-3 h-8 flex items-center">
        <div className="h-8 w-auto text-foreground">{icon}</div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>

      {/* Version */}
      <p className="text-sm text-muted-foreground">{version}</p>
    </Link>
  );
}
