import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";

export interface NavLinkData {
  href: string;
  label: string;
  external?: boolean;
}

interface MobileNavProps {
  navLinks: NavLinkData[];
  currentPathname: string;
}

const SOCIALS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "https://github.com/Seanneskie", label: "GitHub", icon: Github },
  { href: "https://x.com/Seanneskie", label: "Twitter", icon: Twitter },
  {
    href: "https://www.linkedin.com/in/seanne-ca%C3%B1ete-8b09322a1/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const itemClass = (isActive: boolean) =>
  [
    "flex items-center justify-between rounded-md px-3 py-2 text-base font-medium transition",
    "text-black hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
    "dark:text-white dark:hover:bg-teal-400/10 dark:hover:text-teal-200",
    isActive ? "bg-teal-500/10 text-teal-700 dark:text-teal-300" : "",
  ]
    .filter(Boolean)
    .join(" ");

export default function MobileNav({ navLinks, currentPathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-black transition hover:bg-teal-500/10 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 dark:text-white dark:hover:bg-teal-400/10 dark:hover:text-teal-400"
      >
        <Menu className="h-5 w-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex h-full w-3/4 max-w-sm flex-col gap-0 bg-white p-0 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left dark:bg-gray-900">
          <div className="flex items-start justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
            <div>
              <Dialog.Title className="text-lg font-semibold text-black dark:text-white">
                Navigation
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300">
                Quickly jump to any section or connect with me.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close navigation"
              className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile navigation" className="px-2 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  !link.external &&
                  (currentPathname === link.href ||
                    (link.href !== "/" && currentPathname.startsWith(link.href)));

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={itemClass(isActive)}
                    >
                      <span>{link.label}</span>
                      {link.external ? (
                        <ArrowUpRight className="ml-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-800">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
              Connect
            </p>
            <div className="mt-3 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-black transition hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 dark:text-white dark:hover:bg-teal-400/10 dark:hover:text-teal-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
