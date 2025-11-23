import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { NavTitle } from "@/components/layout/nav-title";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavTitle />,
    },
  };
}
