import { cn } from "@/lib/utils";

/**
 * The QCI mark, redrawn as vector: a bra-ket `|  ⟩` wrapping an orbiting nucleus.
 *
 * This is a simplified version of the QCI seal for use at small sizes, where the
 * full seal's circular text is unreadable. The full seal (public/brand/) is used
 * at large sizes on the About page.
 */
export function BraketMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label="Quantum Computing Initiative"
    >
      {/* Left bar of the ket */}
      <path
        d="M4 6v28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right angle bracket */}
      <path
        d="M38 6l7 14-7 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Orbits */}
      <ellipse cx="22" cy="20" rx="12" ry="5.5" stroke="var(--c-gold)" strokeWidth="1.75" />
      <ellipse
        cx="22"
        cy="20"
        rx="12"
        ry="5.5"
        stroke="var(--c-gold)"
        strokeWidth="1.75"
        transform="rotate(60 22 20)"
        opacity="0.65"
      />
      <ellipse
        cx="22"
        cy="20"
        rx="12"
        ry="5.5"
        stroke="var(--c-gold)"
        strokeWidth="1.75"
        transform="rotate(-60 22 20)"
        opacity="0.65"
      />
      {/* Nucleus */}
      <circle cx="22" cy="20" r="3.25" fill="var(--c-gold)" />
    </svg>
  );
}
