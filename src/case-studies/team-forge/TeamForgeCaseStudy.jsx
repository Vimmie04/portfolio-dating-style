import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '../../components/icons.jsx';
import LikeButton from '../../components/likes/LikeButton.jsx';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import { ContentsRail, CsSection, PhoneShot, ProcessToggle, useDocumentTitle, useStylesheet } from '../../components/case-study/CaseStudyKit.jsx';
import { links } from '../../content/site.js';
import { teamForge as c } from './content.js';
import { Avatar, FloatingTabBar, Glyph, Logo, LogoMark, PriorityDot, XPText } from './kit.jsx';
import { GLYPH_NAMES } from './glyphs.jsx';
import { Badge, TIERS } from './badges.jsx';
import { CertificateDoc } from './certificate.jsx';
import { Portrait } from './portraits.jsx';
import { SCREENS, SCREEN_ORDER } from './screens/index.js';
import { HomeScreen, TASKS, TaskCard } from './screens/Work.jsx';
import { RecognisedScreen } from './screens/Review.jsx';
import { CertificateScreen } from './screens/Recognition.jsx';
import Prototype from './Prototype.jsx';
import './tf.css';

// Team Forge's own type (from the original style guide), loaded only on this page.
const FONTS = 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Fustat:wght@400;500;600;700;800&family=Poppins:wght@600&display=swap';

const pad = (n) => String(n).padStart(2, '0');

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="cs-hero container">
      <Link className="cs-back" to="/#work">
        <ArrowRightIcon width={16} height={16} />
        All work
      </Link>

      <div className="cs-folder">
        <div className="cs-folder__tab" aria-hidden="true">
          <span>PROJECT 01</span>
          <span>teamforge.fig</span>
        </div>
        <div className="cs-folder__body">
          <div className="cs-hero__info">
            <div className="cs-hero__meta">
              <p className="cs-mini">{c.kind}</p>
            </div>
            <h1 className="cs-hero__title">{c.title}</h1>
            <p className="cs-hero__sub">{c.subtitle}</p>
            <dl className="cs-facts">
              {c.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="cs-hero__actions">
              <LikeButton id="project:team-forge" label="Team Forge" likeLabel="Team Forge" kind="project" />
              <a className="cs-cta cs-cta--down" href="#prototype" data-cursor="open">
                Try the prototype
                <ArrowRightIcon width={16} height={16} />
              </a>
              <a className="text-link" href={links.behance} target="_blank" rel="noopener noreferrer">
                Original on Behance
                <ArrowUpRightIcon width={14} height={14} />
              </a>
            </div>
          </div>

          <div className="cs-hero__visual">
            <div className="cs-cover">
              <span className="cs-cover__ring" aria-hidden="true" />
              <span className="cs-cover__disc" aria-hidden="true" />
              <div className="cs-cover__phone cs-cover__phone--l">
                <PhoneMockup width="calc(var(--w) * 0.86)" tone="midnight" label="Recognised screen: approved by Neha, +50 XP">
                  <RecognisedScreen />
                </PhoneMockup>
              </div>
              <div className="cs-cover__phone cs-cover__phone--r">
                <PhoneMockup width="calc(var(--w) * 0.86)" tone="midnight" label="Certificate screen: Four-Digit Club">
                  <CertificateScreen />
                </PhoneMockup>
              </div>
              <div className="cs-cover__phone cs-cover__phone--c">
                <PhoneMockup width="var(--w)" tone="midnight" label="Home screen: four tasks this week, level 4, next task">
                  <HomeScreen />
                </PhoneMockup>
              </div>

              <div className="tf cs-cover__float cs-cover__float--a" aria-hidden="true">
                <Avatar person="neha" size={38} />
                <span>
                  <b>Approved by Neha</b>
                  <small>
                    <span className="cs-cover__xp">+40 XP</span> · just now
                  </small>
                </span>
              </div>
              <div className="tf cs-cover__float cs-cover__float--b" aria-hidden="true">
                <Badge shape="medal" tier="gold" emblem="1K" size={36} />
                <span>
                  <b>Four-Digit Club</b>
                  <small>Certificate unlocked</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Summary() {
  return (
    <section className="cs-summary container" aria-labelledby="summary-title">
      <div className="cs-summary__head">
        <h2 id="summary-title" className="cs-summary__title">
          The 60-second version
        </h2>
        <p className="cs-mini">Short on time? Start here.</p>
      </div>
      <div className="cs-summary__grid">
        {c.summary.map((s) => (
          <article key={s.label} className="cs-card cs-summary__card">
            <p className="cs-mini">{s.label}</p>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Riya's day as a mood curve ───────────────────────────── */
function MoodChart({ day }) {
  const W = 600;
  const H = 170;
  const col = W / day.length;
  const pts = day.map((d, i) => [col * (i + 0.5), 22 + (1 - d.mood) * (H - 44)]);
  // Smooth curve through the points (Catmull-Rom → cubic Bézier).
  let path = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    path += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return (
    <svg className="cs-day__chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Riya’s mood starts high, drops sharply while she waits for review, and ends low.">
      <rect x={col * 2 + 6} y="0" width={col * 3 - 12} height={H} rx="14" fill="var(--electric-tint)" />
      <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="var(--line)" strokeDasharray="4 6" />
      <path d={`${path} L${pts.at(-1)[0]},${H} L${pts[0][0]},${H} Z`} fill="url(#cs-mood-fill)" />
      <defs>
        <linearGradient id="cs-mood-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--electric)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--electric)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="var(--electric)" strokeWidth="3" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#fff" stroke="var(--electric)" strokeWidth="2.5" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)" fill="var(--electric-ink)">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Design-system component strip (decorative) ───────────── */
function KitStrip() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current?.setAttribute('inert', '');
  }, []);
  return (
    <div className="tf cs-kit" ref={ref} aria-hidden="true">
      <div className="cs-kit__group">
        <p className="cs-mini">Components</p>
        <div className="cs-kit__btns">
          <button type="button" className="tf-btn">
            <Glyph name="upload" size={20} strokeWidth={2} />
            Submit work
          </button>
          <button type="button" className="tf-btn tf-btn--ghost">
            Request changes
          </button>
        </div>
        <div className="cs-kit__row">
          <span className="tf-chip">Creative</span>
          <span className="tf-chip tf-chip--on">
            <Glyph name="check" size={14} strokeWidth={2.4} />
            Great work
          </span>
          <span className="tf-chip tf-chip--success">
            <Glyph name="check" size={14} strokeWidth={2.4} />
            Approved
          </span>
          <span className="tf-chip tf-chip--milestone">
            <Glyph name="sparkle" size={15} />
            Milestone
          </span>
        </div>
        <div className="cs-kit__row" style={{ gap: 18 }}>
          <XPText value={40} size={18} />
          <span className="tf-small" style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <PriorityDot />
            High priority
          </span>
          <span className="tf-switch is-on" />
        </div>
        <div className="tf-bar" style={{ maxWidth: 360 }}>
          <span style={{ width: '75%' }} />
        </div>
      </div>
      <div className="cs-kit__group">
        <TaskCard task={TASKS.captions} />
        <div style={{ position: 'relative', height: 64, maxWidth: 360 }}>
          <FloatingTabBar active="home" />
        </div>
      </div>
    </div>
  );
}

export default function TeamForgeCaseStudy() {
  useStylesheet(FONTS);
  useDocumentTitle(c.pageTitle);

  return (
    <>
      <Hero />
      <Summary />

      <div className="cs-layout container">
        <ContentsRail sections={c.sections} />

        <div className="cs-content">
          {/* 01 · Overview */}
          <CsSection id="overview" index="01" label="Overview" title={c.overview.title}>
            <div className="cs-overview">
              <div>
                {c.overview.text.map((p) => (
                  <p key={p} className="cs-p">
                    {p}
                  </p>
                ))}
              </div>
              <div className="cs-card cs-did">
                <p className="cs-mini">What I did</p>
                <ul className="cs-chips">
                  {c.overview.did.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CsSection>

          {/* 02 · Research */}
          <CsSection id="research" index="02" label="Research" title={c.research.title} lede={c.research.lede}>
            <div className="cs-stats">
              {c.research.stats.map((s) => (
                <article key={s.value} className="cs-card cs-stat">
                  <p className="cs-stat__value">{s.value}</p>
                  <p className="cs-stat__text">{s.text}</p>
                  <p className="cs-mini cs-stat__src">Source · {s.source}</p>
                </article>
              ))}
            </div>
            <div className="cs-interviews">
              <div className="cs-card cs-interviews__count">
                <p className="cs-mini">User interviews</p>
                <p className="cs-stat__value">20+</p>
                <p>interns and startup professionals, on motivation, feedback and how they work together.</p>
              </div>
              <div className="cs-themes">
                {c.research.themes.map((t) => (
                  <div key={t.title} className="cs-card cs-theme">
                    <h3 className="cs-h3">{t.title}</h3>
                    <ol>
                      {t.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </CsSection>

          {/* 03 · Persona */}
          <CsSection id="riya" index="03" label="Persona" title="Meet Riya" lede="The persona I designed for, built from the interviews. Every screen in the redesign is written for her.">
            <div className="cs-card cs-persona">
              <div className="cs-persona__who">
                <span className="cs-persona__avatar" aria-hidden="true">
                  RS
                </span>
                <div>
                  <p className="cs-persona__name">{c.persona.name}</p>
                  <p className="cs-persona__meta">{c.persona.meta}</p>
                </div>
                <blockquote className="cs-persona__quote">“{c.persona.quote}”</blockquote>
              </div>
              <div className="cs-persona__lists">
                {c.persona.lists.map((l) => (
                  <div key={l.title} className="cs-list">
                    <p className="cs-mini">{l.title}</p>
                    <ul>
                      {l.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-card cs-day">
              <div className="cs-day__head">
                <h3 className="cs-h3">{c.persona.dayTitle}</h3>
                <span className="cs-day__key">
                  <i aria-hidden="true" />
                  {c.persona.gapLabel}
                </span>
              </div>
              <MoodChart day={c.persona.day} />
              <ol className="cs-day__steps">
                {c.persona.day.map((d, i) => (
                  <li key={d.text}>
                    <span className="cs-mini">{pad(i + 1)}</span>
                    {d.text}
                  </li>
                ))}
              </ol>
            </div>
          </CsSection>

          {/* 04 · Strategy */}
          <CsSection id="strategy" index="04" label="Strategy" title={c.strategy.title}>
            <div className="cs-card cs-intention">
              <p className="cs-mini">Design intention</p>
              <blockquote>{c.strategy.intention}</blockquote>
            </div>
            <div className="cs-cols">
              {c.strategy.columns.map((col) => (
                <div key={col.title} className="cs-card">
                  <div className="cs-list">
                    <p className="cs-mini">{col.title}</p>
                    <ul>
                      {col.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <ProcessToggle label="Show process: Lean UX + information architecture">
              <h3 className="cs-h3">Lean UX, one loop at a time</h3>
              <ol className="cs-lean">
                {c.strategy.lean.map(([t, d], i) => (
                  <li key={t}>
                    <span className="cs-mini">{pad(i + 1)}</span>
                    <b>{t}</b>
                    {d}
                  </li>
                ))}
              </ol>
              <div className="cs-card cs-ia">
                <h3 className="cs-h3">Information architecture, redesigned</h3>
                <p className="cs-p" style={{ marginTop: 6, fontSize: 15 }}>
                  Wins is new: rewards were scattered across the old dashboard, so they now get their own tab.
                </p>
                <div style={{ marginTop: 20 }}>
                  <span className="cs-ia__root">TeamForge</span>
                </div>
                <div className="cs-ia__cols">
                  {c.strategy.ia.map((col) => (
                    <div key={col.title} className={`cs-ia__col ${col.title === 'Wins' ? 'is-new' : ''}`}>
                      <b>{col.title}</b>
                      {col.items.map((it) => (
                        <span key={it}>{it}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </ProcessToggle>
          </CsSection>

          {/* 05 · Redesign */}
          <CsSection id="redesign" index="05" label="2026 redesign" title={c.redesign.title} lede={c.redesign.lede}>
            <div className="cs-card cs-changes" role="table" aria-label="What changed in the redesign">
              <div className="cs-changes__row" role="row">
                <span className="cs-mini" role="columnheader">
                  Area
                </span>
                <span className="cs-mini" role="columnheader">
                  Before
                </span>
                <span className="cs-mini" role="columnheader">
                  Now
                </span>
              </div>
              {c.redesign.changes.map((ch) => (
                <div key={ch.area} className="cs-changes__row" role="row">
                  <span className="cs-changes__area" role="rowheader">
                    {ch.area}
                  </span>
                  <span className="cs-changes__before" role="cell">
                    {ch.before}
                  </span>
                  <span className="cs-changes__after" role="cell">
                    {ch.after}
                  </span>
                </div>
              ))}
            </div>

            <div className="cs-sub">
              <h3 className="cs-h3">{c.redesign.loopTitle}</h3>
              <p className="cs-mini">Highlighted: where the redesign focuses</p>
            </div>
            <ol className="cs-card cs-loop">
              {c.redesign.loop.map((s, i) => (
                <li key={s}>
                  {i > 0 && <ArrowRightIcon width={16} height={16} aria-hidden="true" />}
                  <span className={i === 2 || i === 3 ? 'is-focus' : i === c.redesign.loop.length - 1 ? 'is-end' : ''}>{s}</span>
                </li>
              ))}
            </ol>
          </CsSection>

          {/* 06 · Screens */}
          <CsSection id="screens" index="06" label="Screens" title="Twelve screens, four moments" lede="The full redesign, flow by flow. Screen numbers match the prototype below.">
            {c.flows.map((f, fi) => (
              <div key={f.id} className="cs-flow">
                <div className="cs-flow__head">
                  <span className="cs-flow__letter" aria-hidden="true">
                    {String.fromCharCode(65 + fi)}
                  </span>
                  <h3 className="cs-h3">{f.title}</h3>
                  <p>{f.text}</p>
                </div>
                <div className={`cs-stage ${f.id === 'c' ? 'cs-stage--focus' : ''}`}>
                  <div className="cs-gallery" style={{ '--n': f.screens.length }}>
                    {f.screens.map((id) => {
                      const s = SCREENS[id];
                      return (
                        <PhoneShot key={id} n={pad(SCREEN_ORDER.indexOf(id) + 1)} title={s.title} caption={s.caption} who={s.who === 'Neha' ? 'Team lead' : undefined}>
                          <s.Component />
                        </PhoneShot>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </CsSection>

          {/* 07 · Prototype */}
          <CsSection id="prototype" index="07" label="Prototype" title={c.prototype.title} lede={c.prototype.lede}>
            <Prototype />
          </CsSection>

          {/* 08 · Design system */}
          <CsSection id="system" index="08" label="Design system" title={c.system.title} lede={c.system.lede}>
            <div className="cs-card cs-logo">
              <div>
                <h3 className="cs-h3">{c.system.logo.title}</h3>
                <p className="cs-assets__text">{c.system.logo.text}</p>
              </div>
              <div className="cs-logo__tiles">
                <div className="cs-logo__tile cs-logo__tile--main">
                  <Logo layout="stacked" size={86} />
                  <span className="cs-mini">Stacked</span>
                </div>
                <div className="cs-logo__tile">
                  <Logo size={30} />
                  <span className="cs-mini">Horizontal · headers</span>
                </div>
                <div className="cs-logo__tile cs-logo__tile--ink">
                  <LogoMark height={52} />
                  <span className="cs-mini">Mark · in the app</span>
                </div>
              </div>
            </div>
            <div className="cs-swatches">
              {c.system.colors.map((col) => (
                <article key={col.hex} className="cs-card cs-swatch">
                  <div className="cs-swatch__chip" style={{ background: col.hex, boxShadow: col.light ? 'inset 0 -1px 0 var(--line)' : undefined }}>
                    {col.contrast && (
                      <>
                        <span className="cs-swatch__aa" aria-hidden="true" style={col.darkText ? { color: '#16202B' } : undefined}>
                          Aa
                        </span>
                        <span className="cs-swatch__ratio">{col.darkText ? col.contrast : `${col.contrast} with white`}</span>
                      </>
                    )}
                    {col.isNew && <span className={`cs-swatch__new ${col.light ? 'cs-swatch__new--dark' : ''}`}>New</span>}
                  </div>
                  <div className="cs-swatch__info">
                    <span className="cs-swatch__name">{col.name}</span>
                    <span className="cs-swatch__hex">{col.hex}</span>
                    <span className="cs-swatch__note">{col.note}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="cs-type">
              {c.system.type.map((t) => {
                const ff = { fontFamily: `'${t.family}', system-ui, sans-serif` };
                return (
                  <article key={t.family} className="cs-card cs-type__card">
                    <span className="cs-type__aa" style={ff} aria-hidden="true">
                      Aa
                    </span>
                    <span className="cs-type__name" style={ff}>
                      {t.family}
                    </span>
                    <span className="cs-mini">{t.role}</span>
                    <span className="cs-type__sample" style={ff}>
                      {t.sample}
                    </span>
                  </article>
                );
              })}
            </div>
            <div className="cs-assets">
              <div className="cs-card cs-assets__card">
                <div>
                  <h3 className="cs-h3">{c.system.icons.title}</h3>
                  <p className="cs-assets__text">{c.system.icons.text}</p>
                </div>
                <ul className="cs-glyphs" aria-label="Icon set">
                  {GLYPH_NAMES.map((n) => (
                    <li key={n} title={n}>
                      <Glyph name={n} size={26} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cs-card cs-assets__card">
                <div>
                  <h3 className="cs-h3">{c.system.avatars.title}</h3>
                  <p className="cs-assets__text">{c.system.avatars.text}</p>
                </div>
                <ul className="cs-people" aria-label="Avatars">
                  {['riya', 'neha', 'om', 'sid', 'kush', 'kritika'].map((p) => (
                    <li key={p}>
                      <Portrait person={p} size={64} />
                      <span>{p === 'kritika' ? 'Kritika' : p.charAt(0).toUpperCase() + p.slice(1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cs-assets cs-assets--rewards">
              <div className="cs-card cs-assets__card">
                <div>
                  <h3 className="cs-h3">{c.system.badges.title}</h3>
                  <p className="cs-assets__text">{c.system.badges.text}</p>
                </div>
                <ul className="cs-badges" aria-label="Badge tiers">
                  {c.system.badges.tiers.map((tier) => (
                    <li key={tier}>
                      <Badge shape="hex" tier={tier} emblem="star" size={72} />
                      <span>
                        {TIERS[tier].label} <b>{TIERS[tier].level}</b>
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="cs-badges cs-badges--families" aria-label="Badge families">
                  {c.system.badges.families.map((b) => (
                    <li key={b.label}>
                      <Badge shape={b.shape} tier={b.tier} emblem={b.emblem} size={52} />
                      <span>{b.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cs-card cs-assets__card">
                <div>
                  <h3 className="cs-h3">{c.system.certificate.title}</h3>
                  <p className="cs-assets__text">{c.system.certificate.text}</p>
                </div>
                <div className="tf cs-cert-preview">
                  <CertificateDoc />
                </div>
              </div>
            </div>
            <KitStrip />
          </CsSection>

          {/* 09 · Success */}
          <CsSection id="success" index="09" label="Success" title={c.success.title} lede={c.success.lede}>
            <div className="cs-metrics">
              {c.success.metrics.map((m, i) => (
                <article key={m.title} className="cs-card cs-metric">
                  <span className="cs-metric__icon" aria-hidden="true">
                    <Glyph name={['clock', 'tasks', 'share'][i]} size={24} />
                  </span>
                  <h3 className="cs-h3">{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              ))}
            </div>
          </CsSection>

          <Link className="cs-next" to={c.next.to} data-cursor="open" data-cursor-label="NEXT FILE">
            <div>
              <p className="cs-mini">{c.next.label}</p>
              <p className="cs-next__title">{c.next.title}</p>
              <p className="cs-next__text">{c.next.text}</p>
            </div>
            <span className="cs-next__arrow" aria-hidden="true">
              <ArrowRightIcon width={26} height={26} />
            </span>
          </Link>
          <div className="cs-backlink">
            <Link className="text-link" to="/#work">
              Back to all work
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
