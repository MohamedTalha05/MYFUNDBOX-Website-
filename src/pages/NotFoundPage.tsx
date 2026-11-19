import React from 'react';
import { AppLink } from '../components/ReusableBlocks';
import { useLocalHref, resolveNavHref } from '../utils/navLinks';

const SUGGESTIONS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export function NotFoundPage() {
  const localHref = useLocalHref();
  const links = SUGGESTIONS.filter((s) => resolveNavHref(s) !== null);

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-0 grid-pattern-light" aria-hidden="true" />
      <p className="relative font-display text-7xl font-bold tracking-tight text-gradient">404</p>
      <h1 className="relative display-md mt-4 text-ink">We couldn't find that page</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        The link may be out of date, or the page may have moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <AppLink href={localHref('/')} className="btn-primary px-5 py-2.5 text-sm">
          Go to home
        </AppLink>
        {links.map((l) => (
          <AppLink key={l.href} href={localHref(l.href)} className="btn-secondary px-5 py-2.5 text-sm">
            {l.label}
          </AppLink>
        ))}
      </div>
    </div>
  );
}
