import type { Metadata } from "next";
import "./globals.css";
import "devicon/devicon.min.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seanneskie.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}${BASE_PATH}`),
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
  authors: [{ name: "Seanne Cañete", url: `${SITE_URL}${BASE_PATH}` }],
  creator: "Seanne Cañete",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Seanne Cañete | Portfolio",
    images: [
      {
        url: "/static/bg_2.jpg",
        width: 1200,
        height: 630,
        alt: "Seanne Cañete - Full-Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Seanneskie",
    images: ["/static/bg_2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Seanne Cañete",
  alternateName: "Seanne Canete",
  url: `${SITE_URL}${BASE_PATH}`,
  jobTitle: "Full-Stack Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mindanao State University - General Santos",
  },
  knowsAbout: [
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Data Analysis",
  ],
  sameAs: [
    "https://github.com/Seanneskie",
    "https://www.linkedin.com/in/seanne-ca%C3%B1ete-8b09322a1/",
    "https://x.com/Seanneskie",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
