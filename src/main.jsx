import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const mountApp = () => {
  let container = document.getElementById('root');
  if (container) {
    // Check if the container has React's internal container keys (often starts with __reactContainer)
    const containerKeys = Object.keys(container);
    const hasInternalContainer = containerKeys.some(key => key.startsWith('__reactContainer'));

    if (hasInternalContainer || window.__reactRootMounted) {
      if (window.__reactRoot) {
        // Safe to call render on existing root
        window.__reactRoot.render(
          <StrictMode>
            <App />
          </StrictMode>,
        );
      } else {
        // If the workspace or script context loaded twice and state is lost but DOM keys remain,
        // we shallow-clone 'root' to completely strip React's internal keys and prevent React 19 Error #299.
        const pristineContainer = container.cloneNode(false);
        if (container.parentNode) {
          container.parentNode.replaceChild(pristineContainer, container);
        }
        window.__reactRoot = createRoot(pristineContainer);
        window.__reactRootMounted = true;
        window.__reactRoot.render(
          <StrictMode>
            <App />
          </StrictMode>,
        );
      }
    } else {
      // First mount: pristine container clone to guarantee clean execution environment
      const pristineContainer = container.cloneNode(false);
      if (container.parentNode) {
        container.parentNode.replaceChild(pristineContainer, container);
      }
      window.__reactRoot = createRoot(pristineContainer);
      window.__reactRootMounted = true;
      window.__reactRoot.render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
