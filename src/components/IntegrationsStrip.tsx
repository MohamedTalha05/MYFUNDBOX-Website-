import React, { useRef } from 'react';
import { ArrowRight, ArrowUpRight, Blocks } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { ECOSYSTEM_COPY } from '../data/integrationsEcosystem';
import {
  CONFIRMED_INTEGRATIONS,
  INTEGRATION_CATEGORY_LABELS,
  liveIntegrationUrl,
  type ConfirmedIntegration,
} from '../data/liveSite';
import { Reveal } from './motion';

/*
 * Integrations showcase (light logo wall). Phase 3A (2026-11-25):
 * - Shows only team-confirmed integrations that have a live page on myfundbox.com, and links
 *   each tile to that existing page (German twin on /de). No new /integrations routes are created.
 * - Each tile names its category, so the wall never implies identical functionality, and the
 *   note says integrations are not official partnerships unless stated.
 * - The former "REST API" tile is removed: the API is not documented sufficiently to advertise
 *   (docs.myfundbox.com serves an empty page).
 */

const TILE =
  'group/tile relative flex h-[6.75rem] flex-col justify-between overflow-hidden rounded-2xl border border-[#e7e8f0] bg-white p-4 outline-none shadow-[0_1px_2px_rgba(16,19,41,0.04)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-[#7657f6]/35 hover:shadow-[0_18px_40px_-22px_rgba(36,33,90,0.45)] focus-visible:border-[#7657f6]/60 focus-visible:ring-2 focus-visible:ring-[#7657f6]/40 dark:border-line dark:bg-surface';

/** Gradient hairline + corner glow that fade in on hover. */
function TileGlow() {
  return (
    <>
      <span
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#7657f6]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#7657f6]/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100"
        aria-hidden="true"
      />
    </>
  );
}

function LogoTile({ item, href, role }: { item: ConfirmedIntegration; href: string; role: string }) {
  return (
    <a href={href} className={TILE} aria-label={`${item.name}: ${role}`}>
      <TileGlow />
      <span className="flex items-center justify-between gap-2">
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-[#eceef5] transition-transform duration-300 group-hover/tile:scale-105">
          <img src={item.logoSrc} alt="" width={128} height={128} loading="lazy" decoding="async" className="h-full w-full rounded-lg object-contain" />
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-[#9a9db2] transition-all duration-300 group-hover/tile:-translate-y-px group-hover/tile:translate-x-px group-hover/tile:text-[#5f43e9]"
          aria-hidden="true"
        />
      </span>
      <span className="relative min-w-0">
        <span className="block truncate font-display text-[14px] font-semibold tracking-[-0.015em] text-[#101329] dark:text-ink">{item.name}</span>
        <span className="block truncate font-ui text-[11.5px] font-medium text-[#6b6f86] dark:text-subtle">
          {role}
        </span>
      </span>
    </a>
  );
}

function DirectoryTile({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} className={`${TILE} border-dashed hover:border-solid`}>
      <TileGlow />
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#7657f6]/15 bg-[#eae6ff] text-[#5f43e9]">
        <Blocks className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="relative inline-flex items-center gap-1 font-display text-[14px] font-semibold text-[#101329] dark:text-ink">
        {title}
        <ArrowRight className="h-3.5 w-3.5 text-[#5f43e9] transition-transform duration-300 group-hover/tile:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
}

export function IntegrationsStrip({ className = '' }: { className?: string }) {
  const { locale } = useRouter();
  const copy = ECOSYSTEM_COPY[locale];
  const labels = INTEGRATION_CATEGORY_LABELS[locale];
  const directoryHref = liveIntegrationUrl(null, locale);
  const wallRef = useRef<HTMLDivElement>(null);

  // Soft spotlight that follows the pointer across the wall (CSS variables only, no re-render).
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wallRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  const tiles = (
    <>
      {CONFIRMED_INTEGRATIONS.map((item) => (
        <LogoTile key={item.slug} item={item} href={liveIntegrationUrl(item.slug, locale)} role={labels[item.category]} />
      ))}
      <DirectoryTile href={directoryHref} title={copy.detailsCta} />
    </>
  );

  return (
    <section aria-labelledby="ecosystem-heading" className={`relative overflow-hidden bg-white dark:bg-canvas ${className}`}>
      {/* Soft lavender light + fine grid (light section between How it works and Global payments) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_85%_0%,rgba(118,87,246,0.08),transparent_70%),radial-gradient(45%_60%_at_0%_100%,rgba(57,213,232,0.07),transparent_70%)]" />
        <div className="grid-pattern-light absolute inset-0 opacity-60" />
      </div>

      <div className="container-x relative py-20 md:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="ecosystem-heading"
              className="mt-3 max-w-2xl font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#242638] md:text-[2.25rem] dark:text-ink"
            >
              {copy.heading}
            </h2>
          </div>
          <a href={directoryHref} className="link-arrow shrink-0 font-ui text-sm">
            {copy.detailsCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        {/* Logo wall: 2 columns on phones, 4 on tablets, 6 on desktop */}
        <Reveal index={1} className="mt-10">
          <div ref={wallRef} onPointerMove={onPointerMove} className="group/wall relative [--spot-x:50%] [--spot-y:50%]">
            <div
              className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
              style={{ background: 'radial-gradient(360px circle at var(--spot-x) var(--spot-y), rgba(118,87,246,0.08), transparent 65%)' }}
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">{tiles}</div>
          </div>
        </Reveal>

        <p className="mt-6 font-ui text-[12px] text-[#6b6f86] dark:text-subtle">{copy.note}</p>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-[#e7e8f0] dark:bg-line" aria-hidden="true" />
    </section>
  );
}
