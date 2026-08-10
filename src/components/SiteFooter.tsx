import Link from "next/link";

import { BraketMark } from "@/components/BraketMark";
import { Container } from "@/components/ui/primitives";
import {
  ExternalLinkIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { event } from "@/content/event";
import { resources } from "@/content/resources";

const siteLinks = [
  { href: "/tracks/", label: "Tracks" },
  { href: "/schedule/", label: "Schedule" },
  { href: "/sponsors/", label: "Sponsors" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 text-fg">
              <BraketMark className="h-9 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
                  Qiskit
                </span>
                <span className="text-base font-semibold">Fall Fest 2026</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              Hosted by the {event.host} at {event.university}, as part of IBM Quantum&rsquo;s
              global Qiskit Fall Fest programme.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={event.socials.instagram}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="QCI on Instagram"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={event.socials.linkedin}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="QCI on LinkedIn"
              >
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={event.socials.github}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="QCI on GitHub"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Site links */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IBM Quantum resources — specifically requested by Prof. Elfadel */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Quantum resources
            </h2>
            <ul className="mt-4 space-y-2.5">
              {resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm text-fg-muted transition-colors hover:text-gold"
                  >
                    <span>{resource.title}</span>
                    <ExternalLinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {event.host}, {event.university}. All rights
            reserved.
          </p>
          <a
            href={`mailto:${event.contactEmail}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            <MailIcon className="h-4 w-4" />
            {event.contactEmail}
          </a>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-fg-subtle">
          Qiskit and IBM Quantum are trademarks of International Business Machines
          Corporation. This event is independently organised and hosted by the {event.host}{" "}
          at {event.university} as an approved participant in the Qiskit Fall Fest programme.
        </p>
      </Container>
    </footer>
  );
}
