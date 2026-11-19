import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { resolvePageByPath } from './data/pagesRegistry';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { HomePage } from './pages/HomePage';
import { ProductOverviewPage } from './pages/ProductOverviewPage';
import { PricingPage } from './pages/PricingPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { ContactPage } from './pages/ContactPage';
import { ComparePage } from './pages/ComparePage';
import { GenericContentPage } from './pages/GenericContentPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppShell() {
  const { pathname } = useRouter();
  const page = resolvePageByPath(pathname);

  let content: React.ReactNode;
  if (!page) {
    content = <NotFoundPage />;
  } else if (page.category === 'home') {
    content = <HomePage page={page} />;
  } else if (page.path === '/product') {
    content = <ProductOverviewPage page={page} />;
  } else if (page.path === '/pricing') {
    content = <PricingPage page={page} />;
  } else if (page.path === '/book-a-demo') {
    content = <BookDemoPage page={page} />;
  } else if (page.path === '/contact') {
    content = <ContactPage page={page} />;
  } else if (page.category === 'compare' || page.category === 'alternatives') {
    content = <ComparePage page={page} />;
  } else {
    content = <GenericContentPage page={page} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn-primary px-3 py-2 text-xs"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {content}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}

export default function App({ initialPath }: { initialPath?: string }) {
  const resolvedInitialPath =
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  return (
    <RouterProvider initialPath={resolvedInitialPath}>
      <AppShell />
    </RouterProvider>
  );
}
