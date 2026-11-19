import React, { useEffect, useRef, useState } from 'react';

/**
 * Lightweight motion primitives (IntersectionObserver + CSS, no animation library).
 * Content is always present in the server-rendered HTML; it is only hidden for the
 * reveal once JS has run and the visitor allows motion (see main.tsx / index.css).
 */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function useInView<T extends Element>(options: IntersectionObserverInit = { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

type RevealProps<E extends React.ElementType> = {
  as?: E;
  /** Stagger position; each step adds 90ms delay. */
  index?: number;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Reveal<E extends React.ElementType = 'div'>({ as, index = 0, className = '', children, style, ...rest }: RevealProps<E>) {
  const Tag = (as ?? 'div') as React.ElementType;
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`${className}${inView ? ' is-visible' : ''}`}
      style={{ ...(style as React.CSSProperties), ['--reveal-i' as string]: index }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Animated number. Server-renders the final value (so crawlers and no-JS visitors see it)
 * and counts up from zero the first time it scrolls into view.
 */
export function CountUp({
  value,
  duration = 1400,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
  className = '',
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || prefersReducedMotion()) return;
    started.current = true;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setDisplay(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(display)}
    </span>
  );
}
