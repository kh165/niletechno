import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import './index.css';

const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));

const isPartnersPage =
  new URLSearchParams(window.location.search).get('page') === 'partners';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {isPartnersPage ? (
        <Suspense fallback={null}>
          <PartnersPage />
        </Suspense>
      ) : (
        <App />
      )}
    </ErrorBoundary>
  </StrictMode>,
);