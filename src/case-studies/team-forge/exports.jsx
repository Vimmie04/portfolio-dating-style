import { useEffect } from 'react';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import '../../components/case-study/CaseStudy.css';
import { teamForge as c } from './content.js';
import { SCREENS } from './screens/index.js';
import { Avatar, Glyph, Logo, LogoMark } from './kit.jsx';
import { GLYPH_NAMES } from './glyphs.jsx';
import { Badge, TIERS } from './badges.jsx';
import { CertificateDoc } from './certificate.jsx';
import { Portrait } from './portraits.jsx';
import './tf.css';
import './exports.css';

/* Renders one artwork at its exact export size and raises window.__exportReady once fonts are in. */
const FONTS = 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Fustat:wght@400;500;600;700;800&family=Poppins:wght@600&display=swap';

async function loadFonts() {
  let link = document.querySelector(`link[data-href="${FONTS}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS;
    link.dataset.href = FONTS;
    document.head.appendChild(link);
  }
  if (!link.sheet) {
    await new Promise((resolve) => {
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, 10000);
    });
  }
  await Promise.all(['800 24px Assistant', '700 24px Assistant', '400 16px Fustat', '600 16px Fustat', '700 16px Fustat', '600 24px Poppins'].map((f) => document.fonts.load(f)));
  await document.fonts.ready;
}

function useExportReady() {
  useEffect(() => {
    let live = true;
    (async () => {
      await loadFonts();
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 200));
      if (!live) return;
      window.__exportFontsOk = document.fonts.check('800 24px Assistant') && document.fonts.check('400 16px Fustat') && document.fonts.check('600 24px Poppins');
      window.__exportReady = true;
    })();
    return () => {
      live = false;
    };
  }, []);
}

/* ── Boards (1400px wide, exported at 2×) ─────────────────── */
function Board({ title, letter, children, className = '' }) {
  return (
    <div className={`tf xb ${className}`} data-export-root>
      <header className="xb__head">
        <div className="xb__title">
          {letter && <span className="xb__letter">{letter}</span>}
          <h1>{title}</h1>
        </div>
        <Logo size={30} />
      </header>
      {children}
    </div>
  );
}

function Phone({ id, width }) {
  const S = SCREENS[id];
  return (
    <PhoneMockup width={width} tone="midnight" label={`${S.title} screen`}>
      <S.Component />
    </PhoneMockup>
  );
}

function CoverBoard() {
  return (
    <div className="tf xb xb--cover" data-export-root>
      <div className="xb-cover">
        <div className="cs-cover" style={{ '--w': '330px', '--off': '252px' }}>
          <span className="cs-cover__ring" aria-hidden="true" />
          <span className="cs-cover__disc" aria-hidden="true" />
          <div className="cs-cover__phone cs-cover__phone--l">
            <Phone id="approved" width="calc(var(--w) * 0.86)" />
          </div>
          <div className="cs-cover__phone cs-cover__phone--r">
            <Phone id="certificate" width="calc(var(--w) * 0.86)" />
          </div>
          <div className="cs-cover__phone cs-cover__phone--c">
            <Phone id="home" width="var(--w)" />
          </div>
          <div className="tf cs-cover__float xb-cover__float--a">
            <Avatar person="neha" size={44} />
            <span>
              <b>Approved by Neha</b>
              <small>
                <span className="cs-cover__xp">+40 XP</span> · just now
              </small>
            </span>
          </div>
          <div className="tf cs-cover__float xb-cover__float--b">
            <Badge shape="medal" tier="gold" emblem="1K" size={42} />
            <span>
              <b>Four-Digit Club</b>
              <small>Certificate unlocked</small>
            </span>
          </div>
        </div>
      </div>
      <div className="xb-cover__logo">
        <Logo size={34} />
      </div>
    </div>
  );
}

function FlowBoard({ index }) {
  const f = c.flows[index];
  return (
    <Board title={f.title} letter={'ABCD'[index]}>
      <div className="xb__phones">
        {f.screens.map((id) => (
          <Phone key={id} id={id} width={290} />
        ))}
      </div>
    </Board>
  );
}

function RewardsBoard() {
  const b = c.system.badges;
  return (
    <Board title="Badges & certificate">
      <div className="xb-rewards">
        <div className="xb-panel">
          <p className="xb-label">Four tiers</p>
          <ul className="xb-tiers">
            {b.tiers.map((t) => (
              <li key={t}>
                <Badge shape="hex" tier={t} emblem="star" size={112} />
                <span>
                  {TIERS[t].label} <b>{TIERS[t].level}</b>
                </span>
              </li>
            ))}
          </ul>
          <p className="xb-label" style={{ marginTop: 36 }}>
            Five families
          </p>
          <ul className="xb-families">
            {b.families.map((f) => (
              <li key={f.label}>
                <Badge shape={f.shape} tier={f.tier} emblem={f.emblem} size={78} />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="xb-cert">
          <CertificateDoc />
        </div>
      </div>
    </Board>
  );
}

function SystemBoard() {
  return (
    <Board title="Design system">
      <section className="xb-panel">
        <p className="xb-label">Logo</p>
        <div className="xb-logo">
          <div className="xb-logo__tile xb-logo__tile--main">
            <Logo layout="stacked" size={110} />
          </div>
          <div className="xb-logo__tile">
            <Logo size={40} />
          </div>
          <div className="xb-logo__tile xb-logo__tile--ink">
            <LogoMark height={66} />
          </div>
        </div>
      </section>
      <section className="xb-panel">
        <p className="xb-label">Colour</p>
        <ul className="xb-swatches">
          {c.system.colors.map((col) => (
            <li key={col.hex}>
              <span className="xb-swatch" style={{ background: col.hex, boxShadow: col.light ? 'inset 0 0 0 1px #E4E9EF' : undefined }} />
              <b>{col.name}</b>
              <small>{col.hex}</small>
            </li>
          ))}
        </ul>
      </section>
      <div className="xb-row">
        <section className="xb-panel">
          <p className="xb-label">Type</p>
          <div className="xb-type">
            {c.system.type.map((t) => (
              <div key={t.family} style={{ fontFamily: `'${t.family}', system-ui, sans-serif` }}>
                <span className="xb-type__aa">Aa</span>
                <b>{t.family}</b>
                <small>{t.role}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="xb-panel">
          <p className="xb-label">People</p>
          <ul className="xb-people">
            {['riya', 'neha', 'om', 'sid', 'kush', 'kritika'].map((p) => (
              <li key={p}>
                <Portrait person={p} size={84} />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="xb-panel">
        <p className="xb-label">Team Forge Glyphs</p>
        <ul className="xb-glyphs">
          {GLYPH_NAMES.map((n) => (
            <li key={n}>
              <Glyph name={n} size={30} />
            </li>
          ))}
        </ul>
      </section>
    </Board>
  );
}

const BOARDS = {
  cover: CoverBoard,
  'flow-a': () => <FlowBoard index={0} />,
  'flow-b': () => <FlowBoard index={1} />,
  'flow-c': () => <FlowBoard index={2} />,
  'flow-d': () => <FlowBoard index={3} />,
  rewards: RewardsBoard,
  system: SystemBoard,
};

export default function TeamForgeExport({ kind, id }) {
  useExportReady();

  if (kind === 'screen') {
    const S = SCREENS[id];
    return S ? (
      <div className="xp-screen" data-export-root>
        <S.Component />
      </div>
    ) : null;
  }

  if (kind === 'mockup') {
    const S = SCREENS[id];
    return S ? (
      <div data-export-root>
        <PhoneMockup width={414} tone="midnight" className="phone--flat" label={`${S.title} screen`}>
          <S.Component />
        </PhoneMockup>
      </div>
    ) : null;
  }

  if (kind === 'board') {
    const B = BOARDS[id];
    return B ? <B /> : null;
  }

  return null;
}
