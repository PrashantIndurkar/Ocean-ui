"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import type { ImgHTMLAttributes } from "react";

interface ThemeImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}

export function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  ...imageProps
}: ThemeImageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show light image until mounted to avoid flash
  const currentSrc = mounted && theme === "dark" ? darkSrc : lightSrc;

  return <img src={currentSrc} alt={alt} {...imageProps} />;
}
