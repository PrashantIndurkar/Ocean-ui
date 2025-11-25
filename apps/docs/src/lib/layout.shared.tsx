import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { NavTitle } from "@/components/layout/nav-title";

export function baseOptions(): BaseLayoutProps &
  Pick<DocsLayoutProps, "sidebar"> {
  return {
    nav: {
      title: <NavTitle />,
    },
    sidebar: {
      collapsible: true,
      defaultOpenLevel: 1,
    },
  } as BaseLayoutProps & Pick<DocsLayoutProps, "sidebar">;
}
