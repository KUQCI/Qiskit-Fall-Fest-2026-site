import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { BlochCursor } from "@/components/BlochCursor";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fallFestAssets } from "@/content/assets";
import { event } from "@/content/event";

import "./globals.css";

/* IBM Plex — IBM's own typeface, which reinforces the Qiskit association for free.
   `display: swap` keeps text visible while the font loads. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const metadataDescription =
  `Join ${event.name}, hosted by the ${event.host} at ${event.university}, ` +
  "as part of IBM Quantum's annual global Qiskit Fall Fest event series.";

export const metadata: Metadata = {
  title: {
    default: `${event.name} — ${event.hostShort} at ${event.university}`,
    template: `%s — ${event.name}`,
  },
  description: metadataDescription,
  icons: {
    icon: fallFestAssets.badge.pink.src,
  },
  keywords: [
    "Qiskit Fall Fest",
    "quantum computing",
    "Khalifa University",
    "IBM Quantum",
    "hackathon",
    "Abu Dhabi",
    "UAE",
  ],
  openGraph: {
    title: `${event.name} — ${event.university}`,
    description: metadataDescription,
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary",
    title: event.name,
    description: metadataDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom is deliberately left enabled — never set maximumScale or userScalable here.
};

/**
 * Applies the saved theme before first paint so there is no flash of the wrong
 * theme. Runs blocking and inline on purpose — it is three lines.
 */
const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('qff-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var useLight = saved === 'light' || (saved !== 'dark' && prefersLight);
    document.documentElement.classList.toggle('light', useLight);
  } catch (e) {}
  document.documentElement.classList.remove('no-js');
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script above intentionally mutates this
    // element's class list (removing `no-js`, adding `light`) before React hydrates,
    // so the server and client markup differ here by design.
    <html
      lang="en"
      className={`no-js ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-lg bg-gold px-4 py-2 font-semibold text-on-gold"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <BlochCursor />
      </body>
    </html>
  );
}
