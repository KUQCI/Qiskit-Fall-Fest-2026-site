"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BraketMark } from "@/components/BraketMark";
import { RegisterButton } from "@/components/RegisterButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/ui/primitives";
import {
  CloseIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
} from "@/components/ui/Icons";
import { event } from "@/content/event";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tracks/", label: "Tracks" },
  { href: "/schedule/", label: "Schedule" },
  { href: "/sponsors/", label: "Sponsors" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open, and close it on Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — mirrors the BioCAS layout, hidden on small screens where
          the space is better spent on navigation. */}
      <div className="hidden border-b border-border bg-surface/80 backdrop-blur md:block">
        <Container className="flex h-9 items-center justify-between">
          <div className="flex items-center gap-5 text-xs text-fg-muted">
            <a
              href={`mailto:${event.contactEmail}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {event.contactEmail}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-3.5 w-3.5" />
              {event.venue.name}, {event.venue.city}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={event.socials.instagram}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-fg-muted transition-colors hover:text-gold"
              aria-label="QCI on Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={event.socials.linkedin}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-fg-muted transition-colors hover:text-gold"
              aria-label="QCI on LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={event.socials.github}
              className="inline-flex h-7 w-7 items-center justify-center rounded text-fg-muted transition-colors hover:text-gold"
              aria-label="QCI on GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-bg/85 backdrop-blur-xl"
            : "border-transparent bg-bg/50 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 text-fg"
            aria-label={`${event.name}, home`}
          >
            <BraketMark className="h-8 w-auto sm:h-9" />
            <span className="flex flex-col leading-none">
              <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
                Qiskit
              </span>
              <span className="text-sm font-semibold sm:text-base">Fall Fest 2026</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href) ? "text-gold" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than passing `hidden sm:inline-flex` to the children:
                both already set their own display utility, and two display classes on
                one element resolve by stylesheet order, not class order. */}
            <div className="hidden items-center gap-2 sm:flex">
              <ThemeToggle />
              <RegisterButton size="sm" />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 z-50 flex flex-col bg-bg lg:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg"
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 text-lg font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-surface text-gold"
                        : "text-fg-muted hover:bg-surface hover:text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border px-5 py-5">
            <RegisterButton size="lg" className="w-full" />
            <div className="mt-4 flex items-center justify-between">
              <a
                href={`mailto:${event.contactEmail}`}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {event.contactEmail}
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
