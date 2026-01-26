import type { Metadata } from "next";
import "./globals.css";
import "devicon/devicon.min.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: {
    default: "Seanne Cañete | Full-Stack Engineer",
    template: "%s | Seanne Cañete",
  },
  description:
    "Seanne Cañete is a full-stack engineer and Information Technology graduate from Mindanao State University - General Santos City. Explore projects, experience, and engineering work.",
  keywords: [
    "Seanne Cañete",
    "Seanne Canete",
    "full stack engineer",
    "full stack developer",
    "software engineer",
    "web developer",
    "frontend developer",
    "backend developer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "JavaScript developer",
    "data engineer",
    "data analyst",
    "portfolio",
    "hire full stack engineer",
    "full stack engineer for hire",
    "Mindanao State University",
    "Mindanao State University - General Santos",
    "MSU General Santos",
    "General Santos City",
    "Philippines",
  ],
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
