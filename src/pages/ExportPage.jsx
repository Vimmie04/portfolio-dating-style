import { lazy, Suspense, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Dev-only page that renders one artwork at its exact export size: /export/<project>/<kind>/<id> */
const EXPORTERS = {
  'team-forge': lazy(() => import('../case-studies/team-forge/exports.jsx')),
  csync: lazy(() => import('../case-studies/csync/exports.jsx')),
  cognify: lazy(() => import('../case-studies/cognify/exports.jsx')),
};

export default function ExportPage() {
  const { pathname } = useLocation();
  const [, , project, kind, id] = pathname.split('/');
  const Exporter = EXPORTERS[project];

  useLayoutEffect(() => {
    document.documentElement.classList.add('is-export');
    return () => document.documentElement.classList.remove('is-export');
  }, []);

  if (!Exporter) return null;
  return (
    <Suspense fallback={null}>
      <Exporter kind={kind} id={id} />
    </Suspense>
  );
}
