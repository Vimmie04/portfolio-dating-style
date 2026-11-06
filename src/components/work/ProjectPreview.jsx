import { lazy, Suspense } from 'react';
import PixelSprite from '../pixel/PixelSprite.jsx';
import ComingSoonCover from './covers/ComingSoonCover.jsx';

/* Animated covers: the real product screens, playing on the paper. Loaded on demand
   so the homepage doesn't carry every case study's code up front. */
const COVERS = {
  'team-forge': lazy(() => import('./covers/TeamForgeCover.jsx')),
  csync: lazy(() => import('./covers/CsyncCover.jsx')),
  cognify: lazy(() => import('./covers/CognifyCover.jsx')),
};

/* Drawn wireframe previews, shown until a real thumbnail is added. Decorative only. */

const BAR_HEIGHTS = [40, 65, 50, 80, 100, 70];

function DashboardSketch() {
  return (
    <div className="sk sk--dashboard">
      <div className="sk-dash__side">
        <i className="is-brand" />
        <i className="is-active" />
        <i />
        <i />
        <i />
      </div>
      <div className="sk-dash__main">
        <div className="sk-dash__top">
          <i className="sk-pill" />
          <i className="sk-avatar" />
        </div>
        <div className="sk-dash__stats">
          {[0, 1, 2].map((n) => (
            <div key={n} className="sk-card">
              <i className="sk-line sk-line--s" />
              <i className="sk-line sk-line--l" />
              {n === 1 && (
                <div className="sk-bars">
                  {BAR_HEIGHTS.map((h, b) => (
                    <i key={b} style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sk-dash__table">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="sk-row">
              <i className="sk-dot" />
              <i className="sk-line" />
              <i className="sk-line sk-line--s" />
              <i className={`sk-chip ${n === 0 ? 'is-blue' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone({ back = false }) {
  return (
    <div className={`sk-phone ${back ? 'sk-phone--back' : ''}`}>
      <div className="sk-phone__screen">
        <div className="sk-m__head">
          <i className="sk-avatar" />
          <i className="sk-line sk-line--s" />
        </div>
        <i className="sk-line sk-line--l" />
        <div className="sk-m__card">
          <i />
          <i />
        </div>
        {[0, 1, 2].map((n) => (
          <div key={n} className="sk-row">
            <i className="sk-dot" />
            <i className="sk-line" />
          </div>
        ))}
        <div className="sk-m__nav">
          <i />
          <i className="is-active" />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function MobileSketch() {
  return (
    <div className="sk sk--mobile">
      <Phone back />
      <Phone />
    </div>
  );
}

/** Team Forge: a gamified leaderboard. */
function LeaderboardSketch() {
  const podium = [
    { rank: 2, h: 62 },
    { rank: 1, h: 88 },
    { rank: 3, h: 46 },
  ];
  return (
    <div className="sk sk--board">
      <div className="sk-b__top">
        <i className="sk-line sk-line--l" />
        <b className="sk-b__xp">+120 XP</b>
      </div>
      <div className="sk-b__podium">
        {podium.map((p) => (
          <div key={p.rank} className={`sk-b__col ${p.rank === 1 ? 'is-first' : ''}`}>
            <i className="sk-avatar" />
            <div className="sk-b__block" style={{ height: `${p.h}%` }}>
              {p.rank}
            </div>
          </div>
        ))}
      </div>
      <div className="sk-b__list">
        {[72, 54, 38].map((w, n) => (
          <div key={w} className="sk-row">
            <b className="sk-b__rank">{n + 4}</b>
            <i className="sk-dot" />
            <i className="sk-line sk-line--s" />
            <span className="sk-b__bar">
              <span style={{ width: `${w}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mother First: a service journey map across the pregnancy. */
function JourneySketch() {
  return (
    <div className="sk sk--journey">
      <div className="sk-j__stages">
        {['T1', 'T2', 'T3', 'Baby'].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <svg className="sk-j__curve" viewBox="0 0 100 30" preserveAspectRatio="none">
        <polyline
          points="4,20 30,8 56,22 82,6 96,12"
          fill="none"
          stroke="#1F44FF"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="sk-j__lanes">
        {[0, 1].map((lane) => (
          <div key={lane} className="sk-j__lane">
            {[0, 1, 2, 3].map((c) => (
              <i key={c} className={(lane + c) % 3 === 0 ? 'is-strong' : ''} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CanvasSketch() {
  return (
    <div className="sk sk--canvas">
      <div className="sk-c__frame sk-c__frame--a">
        <span className="sk-c__label">Onboarding</span>
        <i className="sk-line sk-line--l" />
        <i className="sk-line" />
        <i className="sk-chip is-blue" />
      </div>
      <div className="sk-c__frame sk-c__frame--b">
        <span className="sk-c__label sk-c__label--sel">Checkout</span>
        <i className="sk-line sk-line--l" />
        <i className="sk-line" />
        <i className="sk-line sk-line--s" />
        <b className="sk-c__h sk-c__h--tl" />
        <b className="sk-c__h sk-c__h--tr" />
        <b className="sk-c__h sk-c__h--bl" />
        <b className="sk-c__h sk-c__h--br" />
      </div>
      <div className="sk-c__note">Fewer clicks?</div>
      <PixelSprite sprite="arrow" scale={2} className="sk-c__cursor" />
    </div>
  );
}

const SKETCHES = {
  leaderboard: LeaderboardSketch,
  dashboard: DashboardSketch,
  mobile: MobileSketch,
  journey: JourneySketch,
  canvas: CanvasSketch,
};

/** Layered-paper composition: two loose sheets behind a taped-down preview. */
export default function ProjectPreview({ project }) {
  const Sketch = SKETCHES[project.preview] ?? CanvasSketch;
  const Cover = COVERS[project.id] ?? (project.comingSoon ? ComingSoonCover : null);
  return (
    <div className="preview">
      <span className="preview__sheet preview__sheet--a" aria-hidden="true" />
      <span className="preview__sheet preview__sheet--b" aria-hidden="true" />
      <div className="preview__frame">
        {Cover ? (
          <Suspense fallback={<div className="preview__sketch" aria-hidden="true" />}>
            <Cover project={project} />
          </Suspense>
        ) : project.thumbnail ? (
          <img
            className="preview__img"
            src={project.thumbnail}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="preview__sketch" aria-hidden="true">
            <Sketch />
          </div>
        )}
        <span className="preview__tape" aria-hidden="true" />
        {project.shipped && (
          <span className="preview__stamp" aria-hidden="true">
            SHIPPED
          </span>
        )}
      </div>
    </div>
  );
}
