import { ArrowRightIcon } from "@/components/ui/Icons";
import { event } from "@/content/event";
import { cn } from "@/lib/utils";

/**
 * The single Register control used everywhere on the site.
 *
 * When `event.registrationUrl` is null it renders a disabled button explaining that
 * registration is not open yet, rather than a link that goes nowhere. Setting the URL
 * in src/content/event.ts turns every instance on the site live at once.
 */
export function RegisterButton({
  size = "md",
  variant = "primary",
  className,
  label = "Register",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
  label?: string;
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm sm:text-base",
    lg: "px-7 py-3.5 text-base sm:text-lg",
  };

  const variants = {
    primary: "glow-cta bg-gold text-on-gold hover:bg-gold-strong",
    outline: "border border-border-strong bg-transparent text-fg hover:border-gold hover:text-gold",
  };

  const base = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
    sizes[size],
    className,
  );

  if (!event.registrationUrl) {
    return (
      <span className={cn(base, "cursor-not-allowed border border-border bg-surface-2 text-fg-subtle")}>
        <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-gold" />
        Registration opens soon
      </span>
    );
  }

  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-gate="X"
      className={cn(base, variants[variant])}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}
