"use client";

import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/Icons";

/**
 * Switches between the dark (default) and light themes by toggling `.light` on
 * <html>, and remembers the choice in localStorage. The inline script in layout.tsx
 * re-applies it before first paint so there is no flash on reload.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("qff-theme", next ? "light" : "dark");
    } catch {
      // Private browsing can block localStorage. The toggle still works for the
      // current page; it just won't be remembered.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg ${className ?? ""}`}
      aria-label={
        mounted
          ? isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
          : "Switch theme"
      }
    >
      {isLight ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}
