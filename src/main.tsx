import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const initialPath = window.location.pathname || '/en';

if (container.hasChildNodes() && container.innerHTML.trim() !== '<!--SSR_HTML-->') {
  hydrateRoot(container, <App initialPath={initialPath} />);
} else {
  createRoot(container).render(<App initialPath={initialPath} />);
}
