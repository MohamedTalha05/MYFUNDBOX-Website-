import React from 'react';
import { useRouter } from '../context/RouterContext';
import { AppLink } from '../components/ReusableBlocks';

export function NotFoundPage() {
  const { locale } = useRouter();
  const prefix = `/${locale}`;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center space-y-6">
      <p className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400">404 · Page Not Found</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        This MYFUNDBOX page could not be found
      </h1>
      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        The requested URL does not match an active page. Use the links below to jump directly to MYFUNDBOX product documentation, EUR pricing, comparisons, or demo scheduling.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <AppLink
          href={prefix}
          className="btn-gradient-primary rounded-lg px-5 py-2.5 text-sm font-semibold"
        >
          Go to Home
        </AppLink>
        <AppLink
          href={`${prefix}/product/revenue-recognition`}
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Revenue Recognition
        </AppLink>
        <AppLink
          href={`${prefix}/pricing`}
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Pricing
        </AppLink>
        <AppLink
          href={`${prefix}/contact`}
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Book a demo
        </AppLink>
      </div>
    </div>
  );
}
