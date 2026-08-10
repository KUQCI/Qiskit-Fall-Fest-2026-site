"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Reveals its children on scroll, with an optional stagger delay.
 *
 * The element starts hidden via the `[data-reveal]` CSS rule and is shown when it
 * enters the viewport. Two safety nets keep content from ever being permanently
 * invisible:
 *   - `.no-js` on <html> (removed by the theme script) forces everything visible
 *     if JavaScript never runs.
 *   - `prefers-reduced-motion` overrides the hidden state in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger delay in ms. Keep siblings 40ms apart. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the user prefers reduced motion, show immediately and skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            // Reveal once, then stop observing — this never re-hides on scroll up.
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);

    // Safety net: content must never be permanently invisible. IntersectionObserver
    // does not fire in a background tab, so a page opened in one (middle-click, or
    // "open in new tab") could otherwise render blank sections. If the observer has
    // not fired by the time this expires, reveal regardless.
    const failsafe = setTimeout(() => {
      if (el.getAttribute("data-revealed") !== "true") {
        el.setAttribute("data-revealed", "true");
        observer.unobserve(el);
      }
    }, 2000);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
