import Link from "next/link";

import { Container } from "@/components/ui/primitives";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-2xs uppercase tracking-[0.22em] text-gold">Error 404</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
        This state collapsed
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
        The page you were looking for does not exist. It may have moved, or the link may be
        out of date.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-on-gold transition-colors hover:bg-gold-strong"
      >
        Back to the Fall Fest
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </Container>
  );
}
