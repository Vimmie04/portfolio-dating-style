import { lazy, Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';

/* One entry per in-site case study. Add Mother First here when it's ready. */
const STUDIES = {
  'team-forge': lazy(() => import('../case-studies/team-forge/TeamForgeCaseStudy.jsx')),
  csync: lazy(() => import('../case-studies/csync/CsyncCaseStudy.jsx')),
  cognify: lazy(() => import('../case-studies/cognify/CognifyCaseStudy.jsx')),
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const Study = STUDIES[slug];
  if (!Study) return <Navigate to="/#work" replace />;

  return (
    <main id="main" className="cs" tabIndex={-1}>
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Study />
      </Suspense>
    </main>
  );
}
