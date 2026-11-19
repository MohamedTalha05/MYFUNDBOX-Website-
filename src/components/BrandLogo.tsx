import React from 'react';

/**
 * Horizontal "MY FUND B◆X" wordmark. Two variants are rendered and CSS swaps them
 * by theme (the `dark` class on any ancestor), so there's no flash on hydration.
 * Both are cropped from the official logo (public/assets/aistudio/logo_mfb_2225b714.png,
 * confirmed by the MYFUNDBOX team on 2026-11-19). The light variant is the original white
 * wordmark; the dark variant recolours only the wordmark to charcoal and leaves the mark untouched.
 */
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
