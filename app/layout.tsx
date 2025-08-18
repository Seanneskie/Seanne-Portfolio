import type { Metadata } from "next";
import "./globals.css";
import "devicon/devicon.min.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: "Seanne Cañete — Portfolio",
  description: "Next.js portfolio with shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Global notifications (Sonner) */}
          <Toaster
            theme="system"
            richColors
            closeButton
            position="top-right"
          />

          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
