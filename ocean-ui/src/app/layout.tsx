import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar1 } from "@/components/layout/navbar-1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar1 />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
