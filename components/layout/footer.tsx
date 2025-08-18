import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/courses", label: "Courses" },
  { href: "/certificates", label: "Certificates" },
  { href: "/awards", label: "Awards" },
  { href: "/work-experiences", label: "Work Experiences" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Seanneskie",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://x.com/Seanneskie",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "https://www.linkedin.com/in/seanne-ca%C3%B1ete-8b09322a1/",
    label: "LinkedIn",
    icon: Linkedin,
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-gradient-to-r from-teal-600/20 to-transparent dark:from-teal-400/20 dark:to-transparent bg-size-200 animate-gradient-x">
      <span className="pointer-events-none absolute inset-0 dot-pattern opacity-30 blur-sm animate-dots" />
      <div className="relative container mx-auto flex flex-col items-center gap-4 px-4 py-6 text-sm text-black dark:text-white sm:h-16 sm:flex-row sm:justify-between sm:py-0">
        <p>&copy; {new Date().getFullYear()} Seanne Cañete</p>
        <nav className="flex flex-wrap justify-center gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition hover:text-teal-600 dark:hover:text-teal-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

