import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ToastProvider } from './components/toast/Toast.jsx';
import { LikesProvider } from './components/likes/LikesContext.jsx';
import PixelCursor from './components/cursor/PixelCursor.jsx';
import Nav from './components/nav/Nav.jsx';
import TabBar from './components/nav/TabBar.jsx';
import Footer from './components/footer/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import HomePage from './pages/HomePage.jsx';

// Case studies load on demand, so the home page stays light.
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.jsx'));

// Export page (PNG renders for Behance/Figma): dev server only, never in the live build.
const ExportPage = import.meta.env.DEV ? lazy(() => import('./pages/ExportPage.jsx')) : null;

export default function App() {
  const { pathname } = useLocation();

  if (ExportPage && pathname.startsWith('/export/')) {
    return (
      <Suspense fallback={null}>
        <ExportPage />
      </Suspense>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <LikesProvider>
          <ScrollManager />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Nav />
          <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
          <TabBar />
          <PixelCursor />
        </LikesProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
