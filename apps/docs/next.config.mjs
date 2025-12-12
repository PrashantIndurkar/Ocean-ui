import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude SolidJS packages from server-side bundling
  // These packages use client-only APIs (like 'use' from solid-js/web)
  // that don't exist in the server bundle
  serverExternalPackages: [
    "solid-js",
    "@ark-ui/solid",
    "@ocean-ui/solid",
    "lucide-solid",
  ],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
