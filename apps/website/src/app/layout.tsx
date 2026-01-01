import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { RootProvider } from "fumadocs-ui/provider/next";
import { FrameworkProvider } from "@/lib/contexts/framework-context";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

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
    url: "https://components.prashantindurkar.in/",
    siteName: "Ocean UI",
    title: "Ocean UI - Beautiful Components for Design Engineers",
    description:
      "A collection of beautiful, copy-&-paste components for quickly building application UIs. Open-source design system built with Tailwind CSS and Ark UI.",
    images: [
      {
        url: "https://components.prashantindurkar.in/images/oceanui-og-dark.png",
        width: 1200,
        height: 630,
        alt: "Ocean UI - Beautiful Components for Design Engineers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean UI - Beautiful Components for Design Engineers",
    description:
      "A collection of beautiful, copy-&-paste components for quickly building application UIs.",
    creator: "@prashant2weet",
    images: [
      "https://components.prashantindurkar.in/images/oceanui-og-dark.png",
    ],
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
      <body
        className={`${inter.className} ${inter.variable} ${geistMono.variable} flex flex-col min-h-screen`}
      >
        <RootProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FrameworkProvider>
              <ConditionalNavbar />
              {children}
            </FrameworkProvider>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}
