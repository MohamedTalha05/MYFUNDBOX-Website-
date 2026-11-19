import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { pageExists, resolvePageByPath } from './src/data/pagesRegistry';
import { APP_HANDOFF_PATHS, appendQuery, resolveRedirect } from './src/data/redirects';
import { APP_LINKS } from './src/data/siteConfig';
import {
  generateLlmsFullTxt,
  generateLlmsTxt,
  generatePageMarkdown,
  generateRobotsTxt,
  generateSitemapXml,
  getCanonicalBaseUrl,
  renderHeadTagsHtml,
} from './src/utils/seoGenerators';
import { validateDemoRequest, type DemoRequestPayload } from './src/utils/validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || 3000);

function resolveRequestBaseUrl(req: express.Request): string {
  if (process.env.APP_URL) {
    return getCanonicalBaseUrl(process.env.APP_URL);
  }
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'http';
  const host = req.get('host') || `localhost:${PORT}`;
  return getCanonicalBaseUrl(`${proto}://${host}`);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  let vite: ViteDevServer | null = null;

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  // Machine-readable SEO & LLM endpoints
  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveRequestBaseUrl(req);
    res.type('text/plain; charset=utf-8').send(generateRobotsTxt(baseUrl));
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = resolveRequestBaseUrl(req);
    res.type('application/xml; charset=utf-8').send(generateSitemapXml(baseUrl));
  });

  app.get('/llms.txt', (req, res) => {
    const baseUrl = resolveRequestBaseUrl(req);
    res.type('text/plain; charset=utf-8').send(generateLlmsTxt(baseUrl));
  });

  app.get('/llms-full.txt', (req, res) => {
    const baseUrl = resolveRequestBaseUrl(req);
    res.type('text/markdown; charset=utf-8').send(generateLlmsFullTxt(baseUrl));
  });

  // Clean Markdown endpoints for key pages (e.g., /en/pricing.md)
  app.get(/^\/(.+)\.md$/, (req, res) => {
    const rawSlug = '/' + req.params[0];
    const page = resolvePageByPath(rawSlug);
    if (!page) {
      res.status(404).type('text/plain; charset=utf-8').send('# 404 Not Found\n');
      return;
    }
    const baseUrl = resolveRequestBaseUrl(req);
    res.type('text/markdown; charset=utf-8').send(generatePageMarkdown(page, baseUrl));
  });

  // 301s for legacy /en|/fr|/es prefixes, moved live-site URLs and trailing slashes.
  // Placed after the machine-readable endpoints and before SSR; query strings are kept.
  app.use((req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'HEAD') || req.path.startsWith('/api/') || req.path.includes('.')) {
      return next();
    }
    const queryIndex = req.originalUrl.indexOf('?');
    const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';

    // Live-site log-in / sign-up paths hand off to the app (temporary, so 302).
    const handoff = APP_HANDOFF_PATHS[req.path.replace(/\/+$/, '')];
    if (handoff) {
      res.redirect(302, appendQuery(APP_LINKS[handoff], query));
      return;
    }

    const target = resolveRedirect(req.path, pageExists);
    if (!target) return next();
    res.redirect(301, target + query);
  });

  // GDPR-validated demo request endpoint
  const demoSubmissions: Array<DemoRequestPayload & { referenceId: string; receivedAt: string }> = [];
  app.post('/api/demo-request', (req, res) => {
    const payload = (req.body || {}) as DemoRequestPayload;
    const validation = validateDemoRequest(payload);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Validation failed. Please review the required fields and GDPR consent.',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = `MFB-${Date.now().toString(36).toUpperCase()}`;
    demoSubmissions.push({
      ...payload,
      referenceId,
      receivedAt: new Date().toISOString(),
    });

    res.status(200).json({
      ok: true,
      referenceId,
      message: 'Demo request recorded under EU GDPR policy.',
    });
  });

  // SSR HTML Catch-All
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith('/api/') || url.includes('.')) {
      return next();
    }

    try {
      const baseUrl = resolveRequestBaseUrl(req);
      const page = resolvePageByPath(url);

      let template: string;
      let AppComponent: React.ComponentType<{ initialPath?: string }>;

      if (!isProd && vite) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const mod = await vite.ssrLoadModule('/src/App.tsx');
        AppComponent = mod.default;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
        const mod = await import('./src/App');
        AppComponent = mod.default;
      }

      const appHtml = renderToString(
        React.createElement(AppComponent, { initialPath: page ? page.path : url })
      );

      let html = template.replace('<!--SSR_HTML-->', appHtml);

      if (page) {
        const headTags = renderHeadTagsHtml(page, baseUrl);
        html = html
          .replace('<html lang="en">', `<html lang="${escapeHtml(page.locale)}">`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
          .replace(
            /<meta name="description" content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escapeHtml(page.description)}" />`
          )
          .replace(
            /<meta property="og:title" content="[^"]*"\s*\/>/,
            `<meta property="og:title" content="${escapeHtml(page.title)}" />`
          )
          .replace(
            /<meta property="og:description" content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${escapeHtml(page.description)}" />`
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`
          )
          .replace('<!--SSR_HEAD-->', headTags);

        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      } else {
        html = html
          .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | MYFUNDBOX</title>')
          .replace('<!--SSR_HEAD-->', '<meta name="robots" content="noindex" />');
        res.status(404).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      }
    } catch (err) {
      if (vite) vite.ssrFixStacktrace(err as Error);
      next(err);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MYFUNDBOX SSR server listening on http://localhost:${PORT}`);
  });
}

startServer();
