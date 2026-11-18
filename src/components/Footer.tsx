import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS } from '../data/competitorsData';
import { SUPPORTED_LOCALES, type LocaleCode } from '../utils/formatting';
import { AppLink } from './ReusableBlocks';

export function Footer() {
  const { locale, switchLocale, theme, toggleTheme, openCookiePreferences } = useRouter();
  const prefix = `/${locale}`;

  return (
    <footer className="border-t border-slate-800/80 bg-[#0b0f17] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <AppLink href={prefix} aria-label="MYFUNDBOX Home" className="inline-flex items-center">
              <img
                src="/assets/aistudio/logo_mfb_2225b714.png"
                alt="MYFUNDBOX"
                className="h-10 w-auto object-contain"
              />
            </AppLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {SITE_CONFIG.oneLineDescription}
            </p>
            <p className="mt-4 text-xs text-amber-300/90">
              Built in Germany · EU Data Residency · EUR Default · GDPR &amp; IFRS 15
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white mb-3">Product &amp; Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><AppLink href={`${prefix}/product/revenue-recognition`} className="hover:text-rose-300 transition-colors">Revenue Recognition</AppLink></li>
              <li><AppLink href={`${prefix}/product/deferred-revenue-accruals`} className="hover:text-rose-300 transition-colors">Deferred Revenue &amp; Accruals</AppLink></li>
              <li><AppLink href={`${prefix}/product/revenue-reporting`} className="hover:text-rose-300 transition-colors">Reporting &amp; Analytics</AppLink></li>
              <li><AppLink href={`${prefix}/product/revenue-forecasting`} className="hover:text-rose-300 transition-colors">Revenue Forecasting</AppLink></li>
              <li><AppLink href={`${prefix}/product/integrations-api`} className="hover:text-rose-300 transition-colors">Integrations &amp; API</AppLink></li>
              <li><AppLink href={`${prefix}/solutions/saas`} className="hover:text-rose-300 transition-colors">B2B SaaS</AppLink></li>
              <li><AppLink href={`${prefix}/solutions/finance-teams-cfo`} className="hover:text-rose-300 transition-colors">Finance Teams &amp; CFOs</AppLink></li>
              <li><AppLink href={`${prefix}/solutions/digital-services`} className="hover:text-rose-300 transition-colors">Digital Services</AppLink></li>
              <li><AppLink href={`${prefix}/solutions/memberships`} className="hover:text-rose-300 transition-colors">Memberships</AppLink></li>
              <li><AppLink href={`${prefix}/solutions/agencies`} className="hover:text-rose-300 transition-colors">Agencies</AppLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white mb-3">Compare &amp; Guides</h3>
            <ul className="space-y-2 text-sm">
              {COMPETITORS.slice(0, 5).map((comp) => (
                <li key={comp.slug}>
                  <AppLink href={`${prefix}/compare/${comp.slug}`} className="hover:text-rose-300 transition-colors">
                    vs {comp.competitorName.split(' ')[0]}
                  </AppLink>
                </li>
              ))}
              <li><AppLink href={`${prefix}/resources`} className="hover:text-rose-300 transition-colors">All Guides &amp; Alternatives</AppLink></li>
              <li><AppLink href={`${prefix}/guides/revenue-recognition-saas-ifrs-15`} className="hover:text-rose-300 transition-colors">IFRS 15 SaaS Guide</AppLink></li>
              <li><AppLink href={`${prefix}/glossary`} className="hover:text-rose-300 transition-colors">Finance Glossary</AppLink></li>
              <li><AppLink href={`${prefix}/blog`} className="hover:text-rose-300 transition-colors">Blog</AppLink></li>
              <li><AppLink href={`${prefix}/case-studies`} className="hover:text-rose-300 transition-colors">Case Studies</AppLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white mb-3">Company &amp; Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><AppLink href={`${prefix}/pricing`} className="hover:text-rose-300 transition-colors">Pricing</AppLink></li>
              <li><AppLink href={`${prefix}/about`} className="hover:text-rose-300 transition-colors">About MYFUNDBOX</AppLink></li>
              <li><AppLink href={`${prefix}/security`} className="hover:text-rose-300 transition-colors">Security &amp; GDPR</AppLink></li>
              <li><AppLink href={`${prefix}/contact`} className="hover:text-rose-300 transition-colors">Book a Demo</AppLink></li>
              <li><AppLink href={`${prefix}/changelog`} className="hover:text-rose-300 transition-colors">Changelog</AppLink></li>
              <li><AppLink href={`${prefix}/help`} className="hover:text-rose-300 transition-colors">Help &amp; FAQ Hub</AppLink></li>
              <li><AppLink href={`${prefix}/legal/imprint`} className="hover:text-rose-300 transition-colors">Imprint (Impressum)</AppLink></li>
              <li><AppLink href={`${prefix}/legal/privacy`} className="hover:text-rose-300 transition-colors">Privacy Policy</AppLink></li>
              <li><AppLink href={`${prefix}/legal/terms`} className="hover:text-rose-300 transition-colors">Terms of Service</AppLink></li>
              <li><AppLink href={`${prefix}/legal/cookies`} className="hover:text-rose-300 transition-colors">Cookie Policy</AppLink></li>
              <li><AppLink href={`${prefix}/legal/dpa`} className="hover:text-rose-300 transition-colors">DPA (Art. 28 GDPR)</AppLink></li>
            </ul>
          </div>
        </div>

        {/* Utility Row: Language Switcher, Dark Mode Toggle, Cookie Settings, Machine-Readable Specs */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>© 2026 {SITE_CONFIG.legalEntityName}</span>
            <span aria-hidden="true">·</span>
            <a href="/llms.txt" className="hover:text-white">llms.txt</a>
            <a href="/sitemap.xml" className="hover:text-white">sitemap.xml</a>
            <a href="/robots.txt" className="hover:text-white">robots.txt</a>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Locale Segmented Switcher */}
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center rounded-lg border border-slate-700/80 bg-[#111827] p-0.5"
            >
              {SUPPORTED_LOCALES.map((loc: LocaleCode) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => switchLocale(loc)}
                  aria-pressed={locale === loc}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    locale === loc
                      ? 'bg-rose-700 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Light / Dark Mode Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#111827] px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                  <span>Light mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-rose-300" aria-hidden="true" />
                  <span>Dark mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
