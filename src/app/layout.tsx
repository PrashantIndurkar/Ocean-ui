import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Ocean UI",
    template: "%s | Ocean UI",
  },
  description:
    "A collection of beautiful, copy-&-paste components for quickly building application UIs. Open-source design system built with Tailwind CSS and Ark UI.",
  keywords: [
    "design system",
    "UI components",
    "React components",
    "SolidJS components",
    "Tailwind CSS",
    "Ark UI",
    "component library",
    "open source",
  ],
  authors: [{ name: "Prashant Indurkar" }],
  creator: "Prashant Indurkar",
  publisher: "Ocean UI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ocean UI",
    title: "Ocean UI - Beautiful Components for Design Engineers",
    description:
      "A collection of beautiful, copy-&-paste components for quickly building application UIs. Open-source design system built with Tailwind CSS and Ark UI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean UI - Beautiful Components for Design Engineers",
    description:
      "A collection of beautiful, copy-&-paste components for quickly building application UIs.",
    creator: "@prashant2weet",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
