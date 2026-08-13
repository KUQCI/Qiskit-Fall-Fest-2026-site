import Link from "next/link";

import {
  ExternalLinkIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Container } from "@/components/ui/primitives";
import { fallFestAssets } from "@/content/assets";
import { event, footerContent } from "@/content/event";
import { resources } from "@/content/resources";

const siteLinks = [
  { href: "/tracks/", label: "Tracks" },
  { href: "/schedule/", label: "How It Works" },
  { href: "/sponsors/", label: "Partners" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ", gate: "Z" },
];

const socials = event.socials;
const qciWebsite = socials.website;
const whatsapp = socials.whatsapp;

const footerResourceDefinitions = [
  {
    label: "QCI GitHub",
    matches: (title: string) => title.toLowerCase().includes("qci") && title.includes("GitHub"),
  },
  {
    label: "IBM Learning",
    matches: (title: string) => title.toLowerCase().includes("learning"),
  },
  {
    label: "IBM Platform",
    matches: (title: string) => title.toLowerCase().includes("platform"),
  },
  {
    label: "Qiskit Docs",
    matches: (title: string) => {
      const normalized = title.toLowerCase();
      return normalized.includes("documentation") || normalized.includes("docs");
    },
  },
  {
    label: "Qiskit GitHub",
    matches: (title: string) => title.toLowerCase().includes("qiskit") && title.includes("GitHub"),
  },
  {
    label: "Fall Fest 2026",
    matches: (title: string) => title.toLowerCase().includes("fall fest"),
  },
] as const;

const footerResources = footerResourceDefinitions.flatMap((definition) => {
  const resource = resources.find((candidate) => definition.matches(candidate.title));
  return resource ? [{ ...resource, label: definition.label }] : [];
});

export function SiteFooter() {
  const socialLinkClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-gold hover:text-gold";

  return (
    <footer id="site-footer" className="relative border-t border-border bg-surface/40">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <a
                href={qciWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                aria-label="Quantum Computing Initiative website (opens in a new tab)"
              >
                <img
                  src={fallFestAssets.logos.qciLogoHeader.src}
                  alt=""
                  width="48"
                  height="48"
                  className="h-12 w-12 object-contain"
                />
              </a>
              <Link href="/" className="inline-flex min-h-11 items-center text-fg">
                <span className="flex flex-col leading-none">
                  <span className="font-mono text-2xs uppercase tracking-[0.18em] text-gold">
                    Qiskit
                  </span>
                  <span className="text-base font-semibold">Fall Fest 2026</span>
                </span>
              </Link>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
              {footerContent.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="QCI on Instagram (opens in a new tab)"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="QCI on LinkedIn (opens in a new tab)"
              >
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="QCI on GitHub (opens in a new tab)"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Join QCI on WhatsApp (opens in a new tab)"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Explore
            </h2>
            <ul className="mt-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-gate={link.gate}
                    className="inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-2xs uppercase tracking-[0.18em] text-fg-subtle">
              Resources
            </h2>
            <ul className="mt-3">
              {footerResources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-gold"
                  >
                    <span>{resource.label}</span>
                    <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{footerContent.copyright}</p>
          <a
            href={`mailto:${event.contactEmail}`}
            className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg"
          >
            <MailIcon className="h-4 w-4" />
            {event.contactEmail}
          </a>
        </div>

        <p className="mt-6 max-w-5xl text-xs leading-relaxed text-fg-subtle">
          {footerContent.disclaimer}
        </p>
      </Container>
    </footer>
  );
}
