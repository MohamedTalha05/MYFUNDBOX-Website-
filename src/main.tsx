import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enable scroll-reveal styles only when JS runs and the visitor hasn't asked for reduced motion.
// Without this class every element renders fully visible (SSR, crawlers, no-JS).
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveal-ready');
}

const container = document.getElementById('root')!;
const initialPath = window.location.pathname || '/';

if (container.hasChildNodes() && container.innerHTML.trim() !== '<!--SSR_HTML-->') {
  hydrateRoot(container, <App initialPath={initialPath} />);
} else {
  createRoot(container).render(<App initialPath={initialPath} />);
}
