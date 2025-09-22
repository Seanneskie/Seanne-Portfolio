"use client";

import * as React from "react";
import { type ReactElement } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink, SocialLink } from "@/types/navigation";

interface MobileNavProps {
  navLinks: readonly NavLink[];
  socialLinks: readonly SocialLink[];
  currentPathname: string | null;
  onLinkFollow?: (link: NavLink) => void;
}

export function MobileNav({
  navLinks,
  socialLinks,
  currentPathname,
  onLinkFollow,
}: MobileNavProps): ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenChange = React.useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const handleSelect = React.useCallback(
    (link: NavLink) => {
      onLinkFollow?.(link);
      setOpen(false);
    },
    [onLinkFollow],
  );

  const handleDismiss = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          aria-expanded={open}
          className="text-black hover:text-teal-600 dark:text-white dark:hover:text-teal-400"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="gap-0 p-0">
        <SheetHeader className="border-b border-gray-200 bg-white px-4 py-4 text-left dark:border-gray-800 dark:bg-gray-900">
          <SheetTitle className="text-lg font-semibold text-black dark:text-white">
            Navigation
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600 dark:text-gray-300">
            Quickly jump to any section or connect with me.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="px-2 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                !link.external &&
                (currentPathname === link.href ||
                  (link.href !== "/" && (currentPathname?.startsWith(link.href) ?? false)));

              const itemClassName = cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-base font-medium transition",
                "text-black hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                "dark:text-white dark:hover:bg-teal-400/10 dark:hover:text-teal-200",
                isActive && "bg-teal-500/10 text-teal-700 dark:text-teal-300",
              );

              const content = (
                <>
                  <span>{link.label}</span>
                  {link.external ? (
                    <ArrowUpRight className="ml-3 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  ) : null}
                </>
              );

              return (
                <li key={link.href}>
                  {link.external ? (
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleSelect(link)}
                        className={itemClassName}
                      >
                        {content}
                      </a>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        prefetch={false}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => handleSelect(link)}
                        className={itemClassName}
                      >
                        {content}
                      </Link>
                    </SheetClose>
                  )}
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
            {socialLinks.map((social) => (
              <SheetClose asChild key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={handleDismiss}
                  className="rounded-md p-2 text-black transition hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 dark:text-white dark:hover:bg-teal-400/10 dark:hover:text-teal-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
