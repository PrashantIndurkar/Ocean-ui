"use client";

import * as React from "react";
import { ThemeImage } from "../theme/theme-image";
import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DocImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}

export function DocImage({
  lightSrc,
  darkSrc,
  alt,
  className,
  ...imageProps
}: DocImageProps) {
  return (
    <ThemeImage
      lightSrc={lightSrc}
      darkSrc={darkSrc}
      alt={alt}
      className={cn("rounded-xl", className)}
      {...imageProps}
    />
  );
}
