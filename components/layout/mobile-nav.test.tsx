import React, { type ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { Github } from "lucide-react";

vi.mock("next/link", () => {
  interface MockLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefetch?: boolean;
    children: React.ReactNode;
  }

  const MockLink = React.forwardRef<HTMLAnchorElement, MockLinkProps>(
    ({ href, children, ...props }, ref): ReactElement => {
      const { prefetch: _prefetch, ...rest } = props;
      void _prefetch;

      return (
        <a ref={ref} href={href} {...rest}>
          {children}
        </a>
      );
    },
  );

  MockLink.displayName = "MockNextLink";

  return {
    __esModule: true,
    default: MockLink,
  };
});

import { MobileNav } from "./mobile-nav";
import type { NavLink, SocialLink } from "@/types/navigation";

(globalThis as { React?: typeof React }).React = React;

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "https://example.com/resume.pdf", label: "Resume", external: true },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  { href: "https://github.com/example", label: "GitHub", icon: Github },
];

describe("MobileNav", () => {
  it("renders navigation links when opened and marks the active route", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <MobileNav
          navLinks={NAV_LINKS}
          socialLinks={SOCIAL_LINKS}
          currentPathname="/projects"
        />,
      );
    });

    const trigger = container.querySelector<HTMLButtonElement>("button[aria-label='Open navigation']");
    expect(trigger).not.toBeNull();

    await act(async () => {
      trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const activeLink = document.body.querySelector<HTMLAnchorElement>("a[href='/projects']");
    expect(activeLink).not.toBeNull();
    expect(activeLink?.getAttribute("aria-current")).toBe("page");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("calls the provided callback and closes after selecting a link", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const handleLinkFollow = vi.fn();

    await act(async () => {
      root.render(
        <MobileNav
          navLinks={NAV_LINKS}
          socialLinks={SOCIAL_LINKS}
          currentPathname="/"
          onLinkFollow={handleLinkFollow}
        />,
      );
    });

    const trigger = container.querySelector<HTMLButtonElement>("button[aria-label='Open navigation']");
    expect(trigger).not.toBeNull();

    await act(async () => {
      trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(trigger?.getAttribute("aria-expanded")).toBe("true");

    const resumeLink = document.body.querySelector<HTMLAnchorElement>(
      "a[href='https://example.com/resume.pdf']",
    );
    expect(resumeLink).not.toBeNull();

    await act(async () => {
      resumeLink?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(handleLinkFollow).toHaveBeenCalledWith(
      expect.objectContaining({ href: "https://example.com/resume.pdf" }),
    );
    expect(trigger?.getAttribute("aria-expanded")).toBe("false");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});
