import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { SidebarFooter } from "@/components/layout/sidebar-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
      themeSwitch={{
        enabled: false,
      }}
      sidebar={{
        footer: <SidebarFooter />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
