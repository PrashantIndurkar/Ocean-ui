"use client";

import { usePathname } from "next/navigation";
import { Navbar1 } from "./navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith("/docs");

  if (isDocsPage) {
    return null;
  }

  return <Navbar1 />;
}
