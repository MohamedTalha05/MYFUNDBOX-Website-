import { ALL_PAGES, pageExists, pathForLocale, splitLocale, type PageMetadataEntry } from '../data/pagesRegistry';
import { SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS, COMPETITOR_DISCLAIMER } from '../data/competitorsData';
import { SUPPORTED_LOCALES } from './formatting';

/** Factual product summary shared by llms.txt and llms-full.txt. Sourced from the live myfundbox.com (2026-11-19). */
const PRODUCT_FACTS = [
  '- Category: Subscription billing and revenue management platform (SaaS, web-based)',
  '- Core capabilities: one-time and recurring billing, subscription and plan management (add-ons, coupons, trials), hosted checkout and embeddable iFrame, pay links, smart dunning and automated card retries, customer self-service portal, invoicing, tax management with EU VAT validation, refunds, custom domain, multi-language checkout, REST API and webhooks',
  '- Payment gateways: Stripe, GoCardless, Mollie, PayPal, Checkout.com; payment methods include cards, SEPA and ACH direct debit, bank transfer and open banking',
  '- Accounting and tax integrations: QuickBooks, Xero, sevDesk, Lexware, Avalara',
  '- Data location: Frankfurt, EU',
  '- Pricing: Free plan (up to 25 active subscribers), Professional and Advanced plans in EUR; see the pricing page',
  '- Developer documentation: https://docs.myfundbox.com/',
].join('\n');

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function getCanonicalBaseUrl(envUrl?: string): string {
  const cleaned = (envUrl || 'https://www.myfundbox.com').replace(/\/+$/, '');
  return cleaned;
}

/** Root-relative URL for SEO output: '/' becomes '' so the home URL has no trailing slash. */
function absolute(baseUrl: string, path: string): string {
  return path === '/' ? baseUrl : `${baseUrl}${path}`;
}

/**
 * hreflang alternates for a page: only language versions that actually exist.
 * A page with no translation gets no alternates at all, which is valid and avoids
 * pointing search engines at German URLs that 404.
 */
export function buildHreflangLinks(path: string, baseUrl: string): Array<{ hreflang: string; href: string }> {
  const { suffix } = splitLocale(path);
  const existing = SUPPORTED_LOCALES.map((loc) => ({ loc, path: pathForLocale(loc, suffix) })).filter((v) =>
    pageExists(v.path)
  );
  if (existing.length < 2) return [];
  const links: Array<{ hreflang: string; href: string }> = existing.map((v) => ({
    hreflang: v.loc,
    href: absolute(baseUrl, v.path),
  }));
  const en = existing.find((v) => v.loc === 'en');
  if (en) links.push({ hreflang: 'x-default', href: absolute(baseUrl, en.path) });
  return links;
}

/**
 * FAQPage structured data is OFF. Since August 2023, Google shows FAQ rich results only for
 * well-known, authoritative government and health websites; a commercial software site is not
 * eligible. FAQ content stays fully in the server-rendered HTML (and in the .md / llms exports),
 * which is what search engines index. Re-enable only if MYFUNDBOX becomes eligible under the
 * search engines' current guidelines.
 */
export const FAQ_RICH_RESULTS_ELIGIBLE = false;

/** Brand assets generated from the official logo (public/assets/aistudio/logo_mfb_2225b714.png). */
export const BRAND_ASSETS = {
  /** 1200×630 social share image: full logo on midnight navy. */
  ogImage: '/assets/brand/og-image.png',
  /** Full stacked logo with a charcoal wordmark, readable on white (search engines show logos on white). */
  logoOnLight: '/assets/brand/logo-mfb-dark.png',
} as const;

export function buildJsonLdGraph(page: PageMetadataEntry, baseUrl: string): Record<string, unknown> {
  const author = SITE_CONFIG.authors.find((a) => a.id === page.authorId) ?? SITE_CONFIG.authors[0];
  const canonicalUrl = absolute(baseUrl, page.path);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: SITE_CONFIG.brandName,
      legalName: SITE_CONFIG.legalEntityName,
      url: baseUrl,
      description: SITE_CONFIG.oneLineDescription,
      logo: {
        '@type': 'ImageObject',
        url: absolute(baseUrl, BRAND_ASSETS.logoOnLight),
        width: 492,
        height: 196,
      },
      foundingDate: SITE_CONFIG.foundingYear,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'DE',
        streetAddress: SITE_CONFIG.headquartersLocation,
      },
      sameAs: SITE_CONFIG.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: SITE_CONFIG.brandName,
      publisher: { '@id': `${baseUrl}/#organization` },
      inLanguage: page.locale,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/#software`,
      name: SITE_CONFIG.brandName,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Subscription Billing and Revenue Management Software',
      operatingSystem: 'Web',
      description: SITE_CONFIG.oneLineDescription,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/OnlineOnly',
        url: `${baseUrl}/pricing`,
      },
      publisher: { '@id': `${baseUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.label,
        item: absolute(baseUrl, crumb.href),
      })),
    },
    {
      '@type': 'Person',
      '@id': `${baseUrl}/#author-${author.id}`,
      name: author.name,
      jobTitle: author.role,
      description: `${author.credentials} — ${author.bio}`,
      worksFor: { '@id': `${baseUrl}/#organization` },
    },
  ];

  if (page.category === 'guide' || page.category === 'blog' || page.category === 'compare' || page.category === 'alternatives') {
    graph.push({
      '@type': 'Article',
      headline: page.h1,
      description: page.description,
      dateModified: page.lastUpdated,
      datePublished: page.lastUpdated,
      mainEntityOfPage: canonicalUrl,
      author: { '@id': `${baseUrl}/#author-${author.id}` },
      publisher: { '@id': `${baseUrl}/#organization` },
    });
  }

  if (FAQ_RICH_RESULTS_ELIGIBLE && page.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function renderHeadTagsHtml(page: PageMetadataEntry, baseUrl: string): string {
  const canonical = absolute(baseUrl, page.path);
  const hreflangs = buildHreflangLinks(page.path, baseUrl);
  const jsonLd = JSON.stringify(buildJsonLdGraph(page, baseUrl)).replace(/</g, '\\u003c');

  const alternateTags = hreflangs
    .map((h) => `<link rel="alternate" hreflang="${escapeHtmlAttr(h.hreflang)}" href="${escapeHtmlAttr(h.href)}" />`)
    .join('\n    ');

  return `
    <link rel="canonical" href="${escapeHtmlAttr(canonical)}" />
    ${alternateTags}
    <meta property="og:url" content="${escapeHtmlAttr(canonical)}" />
    <meta property="og:locale" content="${escapeHtmlAttr(page.locale)}" />
    <meta property="og:image" content="${escapeHtmlAttr(absolute(baseUrl, BRAND_ASSETS.ogImage))}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="MYFUNDBOX logo" />
    <meta name="twitter:image" content="${escapeHtmlAttr(absolute(baseUrl, BRAND_ASSETS.ogImage))}" />
    <script type="application/ld+json">${jsonLd}</script>
  `;
}

export function generateSitemapXml(baseUrl: string): string {
  const urls = ALL_PAGES.map((page) => {
    const alternates = buildHreflangLinks(page.path, baseUrl)
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
      )
      .join('\n');

    return `  <url>
    <loc>${escapeXml(absolute(baseUrl, page.path))}</loc>
    <lastmod>${escapeXml(page.lastUpdated)}</lastmod>
    <priority>${page.priority.toFixed(2)}</priority>
${alternates}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function generateRobotsTxt(baseUrl: string): string {
  return `# MYFUNDBOX robots.txt — LLM & Search Crawler Policy [CONFIRM crawler policy before production]
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

export function generateLlmsTxt(baseUrl: string): string {
  const coreLinks = ALL_PAGES.filter((p) => p.locale === 'en')
    .map((p) => `- [${p.h1}](${absolute(baseUrl, p.path)}): ${p.description}`)
    .join('\n');

  return `# MYFUNDBOX

> ${SITE_CONFIG.oneLineDescription}

${PRODUCT_FACTS}

## Key Pages
${coreLinks}

## Machine-Readable Full Context
- [Full Documentation in Markdown](${baseUrl}/llms-full.txt)
`;
}

export function generateLlmsFullTxt(baseUrl: string): string {
  const enPages = ALL_PAGES.filter((p) => p.locale === 'en');
  const pageBlocks = enPages.map((p) => generatePageMarkdown(p, baseUrl)).join('\n\n---\n\n');

  const compSummary = COMPETITORS.map(
    (c) =>
      `### MYFUNDBOX vs ${c.competitorName}\nLast reviewed: ${c.lastReviewed}\n\n${c.twoSentenceSummary}\n\nAngle: ${c.myfundboxAngle}`
  ).join('\n\n');

  return `# MYFUNDBOX — Full Machine-Readable Product & Compliance Knowledge Base

> ${SITE_CONFIG.oneLineDescription}

- Base URL: ${baseUrl}
${PRODUCT_FACTS}

---

${pageBlocks}

---

## Competitor Positioning Reference
${COMPETITOR_DISCLAIMER}

${compSummary}
`;
}

export function generatePageMarkdown(page: PageMetadataEntry, baseUrl: string): string {
  const lines: string[] = [
    `# ${page.h1}`,
    '',
    `- **Canonical URL**: ${absolute(baseUrl, page.path)}`,
    `- **Title**: ${page.title}`,
    `- **Last Updated**: ${page.lastUpdated}`,
    '',
    page.aeoSummary,
  ];

  if (page.atAGlance) {
    lines.push(
      '',
      '## At a Glance',
      `- **What it is**: ${page.atAGlance.whatItIs}`,
      `- **Who it is for**: ${page.atAGlance.whoItIsFor}`,
      `- **Key capabilities**: ${page.atAGlance.keyCapabilities.join('; ')}`,
      `- **Pricing model**: ${page.atAGlance.pricingModel}`,
      `- **Region & compliance**: ${page.atAGlance.regionAndCompliance}`,
      `- **Integrations**: ${page.atAGlance.integrations}`
    );
  }

  for (const sec of page.sections) {
    lines.push('', `## ${sec.heading}`, '', sec.directAnswer);
    if (sec.bullets) {
      lines.push('', ...sec.bullets.map((b) => `- ${b}`));
    }
    if (sec.numberedSteps) {
      lines.push('', ...sec.numberedSteps.map((s, idx) => `${idx + 1}. **${s.title}**: ${s.detail}`));
    }
    if (sec.table) {
      lines.push(
        '',
        `| ${sec.table.headers.join(' | ')} |`,
        `| ${sec.table.headers.map(() => '---').join(' | ')} |`,
        ...sec.table.rows.map((r) => `| ${r.join(' | ')} |`)
      );
    }
  }

  if (page.competitorData) {
    const c = page.competitorData;
    lines.push(
      '',
      `*Last reviewed: ${c.lastReviewed}. ${COMPETITOR_DISCLAIMER}*`,
      '',
      '## Feature Comparison',
      '| Capability | MYFUNDBOX | ' + c.competitorName + ' |',
      '| --- | --- | --- |',
      ...c.featureComparison.map((row) => `| ${row.capability} | ${row.myfundbox} | ${row.competitor} |`),
      '',
      '## Migration Steps',
      ...c.migrationSteps.map((st, idx) => `${idx + 1}. ${st}`)
    );
  }

  if (page.faqs.length > 0) {
    lines.push('', '## Frequently Asked Questions');
    for (const faq of page.faqs) {
      lines.push('', `### ${faq.question}`, faq.answer);
    }
  }

  return lines.join('\n');
}
