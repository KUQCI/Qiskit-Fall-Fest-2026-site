"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { RegisterButton } from "@/components/RegisterButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  CloseIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Container } from "@/components/ui/primitives";
import { fallFestAssets } from "@/content/assets";
import { event } from "@/content/event";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tracks/", label: "Tracks" },
  { href: "/schedule/", label: "How It Works" },
  { href: "/sponsors/", label: "Partners" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

const socials = event.socials;
const qciWebsite = socials.website;
const whatsapp = socials.whatsapp;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const menuTitleId = useId();
  const menuDialog = useRef<HTMLDivElement | null>(null);
  const menuTrigger = useRef<HTMLButtonElement | null>(null);
  const menuClose = useRef<HTMLButtonElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia("(min-width: 64rem)");
    const closeAtDesktopWidth = () => {
      if (desktopNavigation.matches) setMenuOpen(false);
    };
    closeAtDesktopWidth();
    desktopNavigation.addEventListener("change", closeAtDesktopWidth);
    return () => desktopNavigation.removeEventListener("change", closeAtDesktopWidth);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    returnFocus.current = menuTrigger.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const inertTargets = [
      document.getElementById("main"),
      document.getElementById("site-footer"),
    ].filter((target): target is HTMLElement => Boolean(target));
    const previousInertState = inertTargets.map((target) => ({
      target,
      inert: target.inert,
      ariaHidden: target.getAttribute("aria-hidden"),
    }));
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    inertTargets.forEach((target) => {
      target.inert = true;
      target.setAttribute("aria-hidden", "true");
    });

    const focusFrame = window.requestAnimationFrame(() => menuClose.current?.focus());
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        keyboardEvent.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (keyboardEvent.key !== "Tab" || !menuDialog.current) return;

      const focusable = Array.from(
        menuDialog.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
      if (focusable.length === 0) {
        keyboardEvent.preventDefault();
        menuDialog.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (keyboardEvent.shiftKey && active === first) {
        keyboardEvent.preventDefault();
        last.focus();
      } else if (!keyboardEvent.shiftKey && active === last) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (focusEvent: FocusEvent) => {
      const target = focusEvent.target;
      if (
        target instanceof Node &&
        menuDialog.current &&
        !menuDialog.current.contains(target)
      ) {
        menuClose.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      previousInertState.forEach(({ target, inert, ariaHidden }) => {
        target.inert = inert;
        if (ariaHidden === null) target.removeAttribute("aria-hidden");
        else target.setAttribute("aria-hidden", ariaHidden);
      });
      const target = returnFocus.current;
      window.requestAnimationFrame(() => {
        if (target?.isConnected) target.focus();
      });
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const iconLinkClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-gold";

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-border bg-surface/85 backdrop-blur md:block">
        <Container className="flex min-h-11 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 text-xs text-fg-muted">
            <a
              href={`mailto:${event.contactEmail}`}
              className="inline-flex min-h-11 min-w-0 items-center gap-1.5 transition-colors hover:text-fg"
            >
              <MailIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">{event.contactEmail}</span>
            </a>
            <span className="inline-flex min-h-11 items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              {event.venue.name}, {event.venue.city}
            </span>
          </div>
          <div className="flex items-center">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="QCI on Instagram (opens in a new tab)"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="QCI on LinkedIn (opens in a new tab)"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="QCI on GitHub (opens in a new tab)"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="Join QCI on WhatsApp (opens in a new tab)"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border bg-bg/90 backdrop-blur-xl"
            : "border-transparent bg-bg/70 backdrop-blur-md",
        )}
      >
        <Container className="flex min-h-18 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <a
              href={qciWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-offset-4"
              aria-label="Quantum Computing Initiative website (opens in a new tab)"
            >
              <img
                src={fallFestAssets.logos.qciLogoHeader.src}
                alt=""
                width="44"
                height="44"
                className="h-11 w-11 object-contain"
              />
            </a>
            <Link
              href="/"
              className="flex min-h-11 min-w-0 items-center text-fg"
              aria-label={`${event.name}, home`}
            >
              <span className="flex min-w-0 flex-col leading-none">
                <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
                  Qiskit
                </span>
                <span className="truncate text-sm font-semibold sm:text-base">
                  Fall Fest 2026
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-lg px-2.5 text-sm font-medium transition-colors xl:px-3",
                  isActive(link.href) ? "text-gold" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span
                    className="absolute inset-x-3 bottom-1 h-px bg-gold"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="hidden items-center gap-1.5 sm:flex">
              <Link
                href="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                aria-label="Qiskit Fall Fest 2026 home"
              >
                <img
                  src={fallFestAssets.badge.pink.src}
                  alt=""
                  width="44"
                  height="44"
                  className="h-10 w-10 object-contain"
                />
              </Link>
              <ThemeToggle />
              <RegisterButton size="sm" />
            </div>
            <button
              ref={menuTrigger}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={menuId}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      {menuOpen ? (
        <div
          ref={menuDialog}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuTitleId}
          tabIndex={-1}
          className="fixed inset-0 z-[70] flex flex-col bg-bg lg:hidden"
        >
          <div className="flex min-h-18 items-center justify-between border-b border-border px-5">
            <div className="flex items-center gap-3">
              <img
                src={fallFestAssets.badge.pink.src}
                alt=""
                width="44"
                height="44"
                className="h-10 w-10 object-contain"
              />
              <h2
                id={menuTitleId}
                className="font-mono text-2xs uppercase tracking-[0.18em] text-gold"
              >
                Explore the Fest
              </h2>
            </div>
            <button
              ref={menuClose}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg"
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
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
            <a
              href={`mailto:${event.contactEmail}`}
              className="mt-3 inline-flex min-h-11 w-full items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <MailIcon className="h-4 w-4" />
              {event.contactEmail}
            </a>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="QCI on Instagram (opens in a new tab)"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="QCI on LinkedIn (opens in a new tab)"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="QCI on GitHub (opens in a new tab)"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="Join QCI on WhatsApp (opens in a new tab)"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
