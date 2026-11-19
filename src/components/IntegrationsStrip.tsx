import React, { useRef } from 'react';
import { ArrowRight, ArrowUpRight, Code2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BRAND_MARKS } from '../data/brandMarks';
import { APP_LINKS } from '../data/siteConfig';
import { ECOSYSTEM_COPY, ECOSYSTEM_ITEMS, type EcosystemItem } from '../data/integrationsEcosystem';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * "Dark logo wall": a midnight band that continues from the hero, with glass tiles that
 * light up on hover. Each tile names the integration's role, so the wall never implies
 * that every integration offers the same functionality or availability.
 */

/** Monochrome lockup: official wordmark file → official mark + name → name only. */
function LogoLockup({ item }: { item: EcosystemItem }) {
  if (item.logoSrc) {
    return (
      <img
        src={item.logoSrc}
        alt={item.name}
        loading="lazy"
        className="h-6 w-auto max-w-[8.5rem] object-contain opacity-70 brightness-0 invert transition-opacity duration-300 group-hover/tile:opacity-100"
      />
    );
  }
  const mark = item.mark ? BRAND_MARKS[item.mark] : null;
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-[#c9cbe0] transition-colors duration-300 group-hover/tile:text-white">
      {mark && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 fill-current">
          <path d={mark.path} />
        </svg>
      )}
      <span className="truncate font-display text-[15.5px] font-semibold tracking-[-0.02em]">{item.name}</span>
    </span>
  );
}

const TILE =
  'group/tile relative flex h-[6.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9a68ff]/40 hover:bg-white/[0.05] hover:shadow-[0_18px_40px_-18px_rgba(118,87,246,0.7)]';

/** Gradient hairline + corner glow that fade in on hover. */
function TileGlow() {
  return (
    <>
      <span
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#b29dff]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#7657f6]/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100"
        aria-hidden="true"
      />
    </>
  );
}

function LogoTile({ item, role }: { item: EcosystemItem; role: string }) {
  return (
    <div className={TILE}>
      <TileGlow />
      <LogoLockup item={item} />
      <span className="relative font-ui text-[11.5px] font-medium text-[#9195ae] transition-colors duration-300 group-hover/tile:text-[#b9bcd2]">
        {role}
      </span>
    </div>
  );
}

function ApiTile({ title, role }: { title: string; role: string }) {
  return (
    <a href={APP_LINKS.docs} className={`${TILE} border-dashed hover:border-solid`}>
      <TileGlow />
      <span className="inline-flex items-center gap-2 text-[#c9cbe0] transition-colors duration-300 group-hover/tile:text-white">
        <Code2 className="h-[18px] w-[18px] shrink-0 text-[#b29dff]" aria-hidden="true" />
        <span className="font-display text-[15.5px] font-semibold tracking-[-0.02em]">{title}</span>
      </span>
      <span className="relative inline-flex items-center gap-1 font-ui text-[11.5px] font-medium text-[#b29dff]">
        {role}
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/tile:-translate-y-px group-hover/tile:translate-x-px" aria-hidden="true" />
      </span>
    </a>
  );
}

export function IntegrationsStrip({ className = '' }: { className?: string }) {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = ECOSYSTEM_COPY[locale];
  const items = ECOSYSTEM_ITEMS.filter((i) => i.show !== false);
  const detailsHref = resolveNavHref({ href: '/integrations/payments', fallbackHref: '/product/integrations-api' });
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
      {items.map((item) => (
        <LogoTile key={item.name} item={item} role={item.role[locale]} />
      ))}
      <ApiTile title={copy.apiTitle} role={copy.apiRole} />
    </>
  );

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className={`dark relative overflow-hidden bg-[#0d1024] text-ink ${className}`}
    >
      {/* Ambient light, continuing the hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(36,33,90,0.65),transparent_70%)]" />
        <div className="orb orb-violet animate-drift-slow -left-32 top-1/3 h-80 w-80 opacity-25" />
        <div className="orb orb-cyan animate-drift -right-24 bottom-0 h-72 w-72 opacity-20" />
      </div>

      <div className="container-x relative py-16 md:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="ecosystem-heading"
              className="mt-3 max-w-2xl font-display text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.03em] text-white md:text-[2.125rem]"
            >
              {copy.heading}
            </h2>
          </div>
          {detailsHref && (
            <AppLink href={localHref(detailsHref)} className="link-arrow shrink-0 font-ui text-sm">
              {copy.detailsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AppLink>
          )}
        </Reveal>

        {/* Tablet & desktop: logo wall */}
        <Reveal index={1} className="mt-10 hidden md:block">
          <div
            ref={wallRef}
            onPointerMove={onPointerMove}
            className="group/wall relative [--spot-x:50%] [--spot-y:50%]"
          >
            <div
              className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
              style={{ background: 'radial-gradient(360px circle at var(--spot-x) var(--spot-y), rgba(118,87,246,0.16), transparent 65%)' }}
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-4 gap-3 lg:grid-cols-6">{tiles}</div>
          </div>
        </Reveal>

        {/* Phones: gentle horizontal movement (pauses on touch/focus, static for reduced motion) */}
        <div className="marquee -mx-4 mt-8 md:hidden">
          {/* Trailing padding equals the gap so the -50% loop is seamless */}
          <div className="marquee-track gap-3 pr-3">
            <div className="flex shrink-0 gap-3 [&>*]:w-44">{tiles}</div>
            <div className="marquee-duplicate flex shrink-0 gap-3 [&>*]:w-44" aria-hidden="true" inert>
              {tiles}
            </div>
          </div>
        </div>

        <p className="mt-6 font-ui text-[12px] text-[#9195ae]">{copy.note}</p>
      </div>

      <div className="hairline-top absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
