"use client";

import { useEffect, useState } from "react";

import { event } from "@/content/event";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.25rem] flex-col items-center rounded-xl border border-border bg-surface/70 px-3 py-3 backdrop-blur-sm sm:min-w-[5.5rem] sm:px-4 sm:py-4">
      <span className="tabular font-mono text-2xl font-semibold text-fg sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-2xs uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </span>
    </div>
  );
}

/**
 * Live countdown to the closing showcase.
 *
 * The target is `event.countdownTarget` and carries an explicit +04:00 offset, so it
 * resolves to the same instant for every visitor regardless of their timezone.
 *
 * Renders a static placeholder on the server and fills in on mount — computing the
 * time during SSR would produce markup that never matches the client.
 */
export function Countdown({ className }: { className?: string }) {
  const target = new Date(event.countdownTarget).getTime();
  const [time, setTime] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(remainingUntil(target));

    const id = setInterval(() => setTime(remainingUntil(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // Placeholder with identical dimensions, so nothing shifts when it fills in.
  if (!mounted) {
    return (
      <div className={className}>
        <div className="flex gap-2 sm:gap-3" aria-hidden="true">
          {["Days", "Hours", "Mins", "Secs"].map((label) => (
            <Unit key={label} value={0} label={label} />
          ))}
        </div>
      </div>
    );
  }

  if (!time) {
    return (
      <div className={className}>
        <p className="font-mono text-sm uppercase tracking-[0.16em] text-gold">
          The Fall Fest is here
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="flex gap-2 sm:gap-3"
        role="timer"
        aria-live="off"
        aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes until the closing showcase`}
      >
        <Unit value={time.days} label="Days" />
        <Unit value={time.hours} label="Hours" />
        <Unit value={time.minutes} label="Mins" />
        <Unit value={time.seconds} label="Secs" />
      </div>
    </div>
  );
}
