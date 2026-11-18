import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { resolvePageByPath } from './data/pagesRegistry';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { HomePage } from './pages/HomePage';
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
  } else if (page.category === 'compare' || page.category === 'alternatives') {
    content = <ComparePage page={page} />;
  } else {
    content = <GenericContentPage page={page} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 dark:bg-[#070A10] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 rounded-md btn-gradient-primary px-3 py-2 text-xs font-medium"
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
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/en');

  return (
    <RouterProvider initialPath={resolvedInitialPath}>
      <AppShell />
    </RouterProvider>
  );
}
