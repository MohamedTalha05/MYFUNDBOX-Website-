import React from 'react';

/**
 * Horizontal "MY FUND B◆X" wordmark. Two variants are rendered and CSS swaps them
 * by theme (the `dark` class on any ancestor), so there's no flash on hydration.
 * Both are cropped from the official logo (public/assets/aistudio/logo_mfb_2225b714.png,
 * confirmed by the MYFUNDBOX team on 2026-11-19). The light variant is the original white
 * wordmark; the dark variant recolours only the wordmark to charcoal and leaves the mark untouched.
 */
/**
 * The MYFUNDBOX mark (the red/green "box" from the official logo, cropped at native resolution:
 * public/assets/brand/mark-mfb.png). Its "$" is a transparent cut-out, so place it on a white
 * tile to match the logo as supplied. Decorative by default (alt=""); pass `alt` when standalone.
 */
export function BrandMark({ className = 'h-5 w-5', alt = '' }: { className?: string; alt?: string }) {
  return <img src="/assets/brand/mark-mfb.png" alt={alt} width={50} height={50} className={className} />;
}

/**
 * Full stacked logo ("mfb" signature above "MY FUND B◆X"), exactly as supplied by MYFUNDBOX.
 * `tone="light"` is the original white artwork for dark backgrounds; `tone="dark"` recolours only
 * the wordmark to charcoal for light backgrounds.
 */
export function BrandLogoStacked({ className = 'h-16 w-auto', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <img
      src={tone === 'light' ? '/assets/brand/logo-mfb-light.png' : '/assets/brand/logo-mfb-dark.png'}
      alt="MYFUNDBOX"
      width={492}
      height={196}
      className={className}
    />
  );
}

export function BrandLogo({ className = 'h-[18px] md:h-5' }: { className?: string }) {
  return (
    <>
      <img
        src="/assets/brand/wordmark-mfb-dark.png"
        alt="MYFUNDBOX"
        width={488}
        height={48}
        className={`${className} w-auto dark:hidden`}
      />
      <img
        src="/assets/brand/wordmark-mfb-light.png"
        alt="MYFUNDBOX"
        width={488}
        height={48}
        className={`${className} w-auto hidden dark:block`}
      />
    </>
  );
}
