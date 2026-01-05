"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NextJsIcon } from "@/components/icons/nextjs-icon";
import { SolidJsLogo } from "@/components/icons/solidjs-logo";

type FrameworkIconName = "nextjs" | "solidjs";

const iconMap: Record<
  FrameworkIconName,
  React.ComponentType<{ className?: string }>
> = {
  nextjs: NextJsIcon,
  solidjs: SolidJsLogo,
};

interface FrameworkCardProps {
  name: string;
  image?: string;
  icon?: FrameworkIconName;
  description: string;
  href: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

export function FrameworkCard({
  name,
  image,
  icon,
  description,
  href,
  disabled = false,
}: FrameworkCardProps) {
  const Icon = icon ? iconMap[icon] : null;
  const content = (
    <div
      className={cn(
        "group relative flex flex-col p-4 rounded-2xl border transition-all duration-200 no-underline",
        disabled
          ? "border-border bg-muted/50 opacity-60 cursor-not-allowed "
          : "border-border hover:shadow-md bg-muted hover:bg-muted/80 transition-all duration-200 cursor-pointer"
      )}
      aria-label={
        disabled ? `${name} - Coming soon` : `${name} - ${description}`
      }
    >
      {/* External link icon or disabled indicator */}
      <div className="absolute top-3 right-3">
        {disabled ? (
          <ArrowDownIcon
            size={16}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <ExternalLinkIcon
            size={16}
            className="text-brand-300 dark:text-brand-500 group-hover:text-brand-500"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Framework logo/image */}
      <div className="mb-3 h-8 flex items-center">
        {Icon ? (
          <Icon className="h-8 w-auto text-foreground" />
        ) : image ? (
          <Image
            src={image}
            alt={`${name} logo`}
            width={80}
            height={32}
            className="h-8 w-auto object-contain"
          />
        ) : null}
      </div>

      {/* Framework name */}
      <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>

      {/* Description */}
      <p className="text-sm text-brand-400">{description}</p>
    </div>
  );

  if (disabled) {
    return <div>{content}</div>;
  }

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  );
}
