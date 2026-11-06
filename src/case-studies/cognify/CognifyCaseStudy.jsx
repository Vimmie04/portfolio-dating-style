import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '../../components/icons.jsx';
import LikeButton from '../../components/likes/LikeButton.jsx';
import { ContentsRail, CsSection, PhoneShot, useDocumentTitle, useStylesheet } from '../../components/case-study/CaseStudyKit.jsx';
import { cognify as c } from './content.js';
import { FONTS } from './kit.jsx';
import { HeroAnimation } from './HeroAnimation.jsx';
import Prototype from './Prototype.jsx';
import { Icon, Spark } from './icons.jsx';
import { Cogni } from './Cogni.jsx';
import { FLOWS, SCREENS, SCREEN_ORDER } from './screens/index.js';
import cognifyLogo from './assets/cognify-logo.svg';
import photoPankhuri from './assets/interview-pankhuri-aggrawal.jpg';
import photoVinita from './assets/interview-vinita.jpg';
import photoSai from './assets/interview-n-sai-balaji.jpg';
import './cognify-page.css';

const PHOTOS = { pankhuri: photoPankhuri, vinita: photoVinita, sai: photoSai };

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
          <span>PROJECT 03</span>
          <span>cognify.fig</span>
        </div>
        <div className="cs-folder__body">
          <div className="cs-hero__info">
            <img className="cgp-logo" src={cognifyLogo} alt="Cognify" width="132" height="36" />
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
              <LikeButton id="project:cognify" label="Cognify" likeLabel="Cognify" kind="project" />
              <a className="cs-cta cs-cta--down" href="#prototype" data-cursor="open">
                Try the prototype
                <ArrowRightIcon width={16} height={16} />
              </a>
              <a className="text-link" href={c.behance} target="_blank" rel="noopener noreferrer">
                View on Behance
                <ArrowUpRightIcon width={14} height={14} />
              </a>
            </div>
          </div>

          <div className="cs-hero__visual">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── 60-second version ────────────────────────────────────── */
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

function Overview() {
  const o = c.overview;
  return (
    <CsSection id="overview" index="01" label="Overview" title={o.title}>
      <div className="cs-overview">
        <div>
          {o.text.map((p) => (
            <p key={p} className="cs-p">
              {p}
            </p>
          ))}
        </div>
        <div className="cs-card cs-did">
          <p className="cs-mini">What I did</p>
          <ul className="cs-chips">
            {o.did.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cs-card cgp-segment">
        <div>
          <p className="cs-mini">Who it’s for</p>
          <ol className="cgp-segment__chain">
            {o.segment.map((s, i) => (
              <li key={s} className={i === o.segment.length - 1 ? 'is-focus' : undefined}>
                {s}
              </li>
            ))}
          </ol>
          <p className="cgp-segment__age">
            Young adults, <b>{o.audience}</b>
          </p>
        </div>
        <div>
          <p className="cs-mini">How dyslexia affects them</p>
          <ul className="cgp-effects">
            {o.effects.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </CsSection>
  );
}

function Research() {
  const r = c.research;
  return (
    <CsSection id="research" index="02" label="Research" title={r.title} lede={r.lede}>
      <div className="cs-stats">
        {r.why.map((w, i) => (
          <article key={w.title} className="cs-card cs-stat">
            <p className="cs-mini">Why it matters · {String(i + 1).padStart(2, '0')}</p>
            <h3 className="cs-h3">{w.title}</h3>
            <p className="cs-stat__text">{w.text}</p>
          </article>
        ))}
      </div>

      <div className="cs-card cgp-desk">
        <div className="cs-list">
          <p className="cs-mini">Desk research</p>
          <ul>
            {r.desk.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="cgp-source">Sources · {r.desk.sources}</p>
        </div>
        <div className="cgp-desk__side">
          {[
            ['What helps', r.desk.needs],
            ['Strengths to design for', r.desk.strengths],
            ['Apps they already use', r.desk.apps],
          ].map(([title, items]) => (
            <div key={title}>
              <p className="cs-mini">{title}</p>
              <ul className="cs-chips">
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <h3 className="cs-h3 cgp-sub">Who I spoke to</h3>
      <div className="cgp-experts">
        {r.interviews.map((e) => (
          <figure key={e.name} className="cs-card cgp-expert">
            <img src={PHOTOS[e.photo]} alt={`${e.format} with ${e.name}`} loading="lazy" />
            <figcaption>
              <p className="cs-mini">
                <span className={`cgp-kind cgp-kind--${e.kind.toLowerCase()}`}>{e.kind}</span>
                {e.format}
              </p>
              <b>{e.name}</b>
              <span>{e.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="cs-interviews cgp-users">
        <div className="cs-card cs-interviews__count">
          <p className="cs-mini">Interviews</p>
          <div className="cgp-counts">
            <p>
              <span className="cs-stat__value">{r.counts.users}</span>
              young adults with dyslexia, aged 18–30
            </p>
            <p>
              <span className="cs-stat__value">{r.counts.experts}</span>
              experts who work with dyslexia
            </p>
          </div>
        </div>
        <div>
          <p className="cs-mini cgp-themes__title">{r.themesTitle}</p>
          <div className="cgp-themes">
          {r.themes.map((t, i) => (
            <article key={t.title} className="cs-card cgp-theme">
              <span className="cgp-theme__n">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t.title}</h4>
              <p>{t.text}</p>
            </article>
          ))}
          </div>
        </div>
      </div>
    </CsSection>
  );
}

function Problem() {
  const p = c.problem;
  return (
    <CsSection id="problem" index="03" label="The problem" title={p.title}>
      <div className="cs-card cgp-statement">
        <p className="cs-mini">Problem statement</p>
        <blockquote>{p.statement}</blockquote>
      </div>

      <p className="cs-mini cgp-gaps__title">{p.gapsTitle}</p>
      <div className="cgp-gaps">
        {p.gaps.map((g, i) => (
          <article key={g.title} className="cs-card cgp-theme">
            <span className="cgp-theme__n">{String(i + 1).padStart(2, '0')}</span>
            <h4>{g.title}</h4>
            <p>{g.text}</p>
          </article>
        ))}
      </div>

      <div className="cs-card cs-intention cgp-hmw">
        <p className="cs-mini">How might we</p>
        <blockquote>{p.hmw}</blockquote>
      </div>
    </CsSection>
  );
}

const pad = (n) => String(n).padStart(2, '0');

const ICONS = ['today', 'tasks', 'mic', 'routine', 'me', 'calendar', 'readAloud', 'clock', 'pen', 'check', 'sparkle', 'bulb', 'branch', 'mail', 'cart', 'gift', 'sunrise', 'moon', 'bag', 'phone', 'badge', 'star', 'lock', 'settings'];

/* ── 04 · How it helps ────────────────────────────────────── */
function Idea() {
  const d = c.idea;
  return (
    <CsSection id="idea" index="04" label="How it helps" title={d.title} lede={d.lede}>
      <div className="cgp-pillars">
        {d.pillars.map((p, i) => (
          <article key={p.title} className="cs-card cgp-pillar">
            <span className="cgp-pillar__icon" aria-hidden="true">
              <Icon name={p.icon} size={24} />
            </span>
            <p className="cs-mini">{pad(i + 1)}</p>
            <h3 className="cs-h3">{p.title}</h3>
            <p className="cgp-pillar__text">{p.text}</p>
            <p className="cgp-pillar__where">{p.where}</p>
          </article>
        ))}
      </div>

      <h3 className="cs-h3 cgp-sub">{d.places.title}</h3>
      <ol className="cgp-places">
        {d.places.items.map((pl) => (
          <li key={pl.name} className={pl.name === 'Ask Cogni' ? 'is-cogni' : undefined}>
            <span className="cgp-places__icon" aria-hidden="true">
              <Icon name={pl.icon} size={22} stroke={2.2} />
            </span>
            <b>{pl.name}</b>
            <span>{pl.text}</span>
          </li>
        ))}
      </ol>

      <h3 className="cs-h3 cgp-sub">{d.game.title}</h3>
      <p className="cs-p cgp-sub__lede">{d.game.lede}</p>
      <div className="cs-card cgp-table" role="table" aria-label={d.game.title}>
        <div className="cgp-table__row cgp-table__row--head" role="row">
          <span className="cs-mini" role="columnheader">
            Idea
          </span>
          <span className="cs-mini" role="columnheader">
            Usually
          </span>
          <span className="cs-mini" role="columnheader">
            In Cognify
          </span>
        </div>
        {d.game.rows.map((r) => (
          <div key={r.idea} className="cgp-table__row" role="row">
            <span className="cgp-table__k" role="rowheader">
              {r.idea}
            </span>
            <span className="cgp-table__usual" role="cell" data-label="Usually">
              {r.usual}
            </span>
            <span className="cgp-table__ours" role="cell" data-label="In Cognify">
              {r.cognify}
            </span>
          </div>
        ))}
      </div>

      <h3 className="cs-h3 cgp-sub">{d.voice.title}</h3>
      <div className="cgp-voice">
        <div className="cs-card cgp-voice__pairs">
          {d.voice.pairs.map((p) => (
            <div key={p.say} className="cgp-voice__pair">
              <p className="cgp-voice__say">
                <span className="cgp-voice__tag cgp-voice__tag--yes">
                  <Icon name="check" size={14} stroke={3} />
                  Say
                </span>
                {p.say}
              </p>
              <p className="cgp-voice__not">
                <span className="cgp-voice__tag">
                  <Icon name="x" size={14} stroke={3} />
                  Not
                </span>
                {p.not}
              </p>
            </div>
          ))}
        </div>
        <div className="cs-card cgp-voice__rules">
          <Cogni size={86} mood="calm" />
          <ul className="cs-list">
            {d.voice.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </CsSection>
  );
}

/* ── 05 · Screens ─────────────────────────────────────────── */
function Screens() {
  return (
    <CsSection id="screens" index="05" label="Screens" title={c.screens.title} lede={c.screens.lede}>
      {FLOWS.map((f, fi) => (
        <div key={f.id} className="cs-flow">
          <div className="cs-flow__head">
            <span className="cs-flow__letter cgp-flow__letter" aria-hidden="true">
              {String.fromCharCode(65 + fi)}
            </span>
            <h3 className="cs-h3">{f.title}</h3>
            <p>{f.text}</p>
          </div>
          <div className="cs-stage cgp-stage">
            <div className="cs-gallery" style={{ '--n': f.screens.length }}>
              {f.screens.map((id) => {
                const s = SCREENS[id];
                return (
                  <PhoneShot key={id} n={pad(SCREEN_ORDER.indexOf(id) + 1)} title={s.title} caption={s.caption}>
                    <s.Component />
                  </PhoneShot>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </CsSection>
  );
}

/* ── 07 · Design system ───────────────────────────────────── */
function System() {
  const s = c.system;
  return (
    <CsSection id="system" index="07" label="Design system" title={s.title} lede={s.lede}>
      <div className="cs-card cgp-brand">
        <div className="cgp-brand__logo">
          <img src={cognifyLogo} alt="Cognify logo" width="264" height="72" />
        </div>
        <div>
          <h3 className="cs-h3">{s.logo.title}</h3>
          <p className="cs-p">{s.logo.text}</p>
        </div>
      </div>

      <div className="cs-swatches cgp-swatches">
        {s.colors.map((col) => (
          <article key={col.hex} className="cs-card cs-swatch">
            <div className="cs-swatch__chip" style={{ background: col.hex, boxShadow: col.light ? 'inset 0 -1px 0 var(--line)' : undefined }}>
              {col.contrast && (
                <>
                  <span className="cs-swatch__aa" aria-hidden="true" style={col.darkText ? { color: '#111111' } : undefined}>
                    Aa
                  </span>
                  <span className="cs-swatch__ratio">{col.contrast}</span>
                </>
              )}
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
        {s.type.map((t) => {
          const ff = { fontFamily: `'${t.family}', system-ui, sans-serif` };
          return (
            <article key={t.family} className="cs-card cs-type__card">
              <span className="cs-type__aa cgp-type__aa" style={ff} aria-hidden="true">
                Aa
              </span>
              <span className="cs-type__name" style={ff}>
                {t.family}
              </span>
              <span className="cs-mini">{t.role}</span>
              <span className="cs-type__sample" style={ff}>
                {t.sample}
              </span>
              <span className="cgp-type__why">{t.why}</span>
            </article>
          );
        })}
      </div>

      <div className="cgp-kit">
        <div className="cs-card cgp-kit__card">
          <h3 className="cs-h3">{s.cogni.title}</h3>
          <p className="cgp-kit__text">{s.cogni.text}</p>
          <ul className="cgp-moods">
            {s.cogni.moods.map((m) => (
              <li key={m.mood}>
                <span className="cgp-moods__stage">
                  <Cogni size={92} mood={m.mood} />
                </span>
                <b>{m.label}</b>
                <span>{m.use}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cs-card cgp-kit__card">
          <h3 className="cs-h3">{s.icons.title}</h3>
          <p className="cgp-kit__text">{s.icons.text}</p>
          <ul className="cgp-icons" aria-label="Icon set">
            {ICONS.map((name) => (
              <li key={name} title={name}>
                <Icon name={name} size={24} />
              </li>
            ))}
            <li className="cgp-icons__gold" title="streak">
              <Spark size={24} />
            </li>
          </ul>
        </div>
      </div>
    </CsSection>
  );
}

/* ── 08 · Accessibility ───────────────────────────────────── */
function Access() {
  const a = c.access;
  return (
    <CsSection id="access" index="08" label="Accessibility" title={a.title} lede={a.lede}>
      <div className="cs-card cgp-table cgp-table--map" role="table" aria-label="Design decisions mapped to universal design principles">
        <div className="cgp-table__row cgp-table__row--head" role="row">
          <span className="cs-mini" role="columnheader">
            Design decision
          </span>
          <span className="cs-mini" role="columnheader">
            Universal design principle
          </span>
          <span className="cs-mini" role="columnheader">
            Why
          </span>
          <span className="cs-mini" role="columnheader">
            In Cognify
          </span>
        </div>
        {a.mapping.map((m) => (
          <div key={m.decision} className="cgp-table__row" role="row">
            <span className="cgp-table__k" role="rowheader">
              {m.decision}
            </span>
            <span className="cgp-table__principle" role="cell" data-label="Principle">
              {m.principle}
            </span>
            <span className="cgp-table__usual" role="cell" data-label="Why">
              {m.why}
            </span>
            <span className="cgp-table__ours" role="cell" data-label="In Cognify">
              {m.how}
            </span>
          </div>
        ))}
      </div>

      <div className="cgp-checks">
        {a.checks.map((ch) => (
          <article key={ch.title} className="cs-card cgp-theme">
            <h4>{ch.title}</h4>
            <p>{ch.text}</p>
          </article>
        ))}
      </div>
    </CsSection>
  );
}

/* ── 09 · Success ─────────────────────────────────────────── */
function Success() {
  const s = c.success;
  return (
    <CsSection id="success" index="09" label="Success" title={s.title} lede={s.lede}>
      <div className="cgp-metrics">
        {s.metrics.map((m) => (
          <article key={m.title} className="cs-card cgp-pillar">
            <span className="cgp-pillar__icon" aria-hidden="true">
              <Icon name={m.icon} size={24} />
            </span>
            <h3 className="cs-h3">{m.title}</h3>
            <p className="cgp-pillar__text">{m.text}</p>
          </article>
        ))}
      </div>
    </CsSection>
  );
}

export default function CognifyCaseStudy() {
  useStylesheet(FONTS);
  useDocumentTitle(c.pageTitle);

  return (
    <>
      <Hero />
      <Summary />

      <div className="cs-layout container">
        <ContentsRail sections={c.sections} />
        <div className="cs-content">
          <Overview />
          <Research />
          <Problem />
          <Idea />
          <Screens />

          {/* 06 · Prototype */}
          <CsSection id="prototype" index="06" label="Try it" title={c.prototype.title} lede={c.prototype.lede}>
            <Prototype />
          </CsSection>

          <System />
          <Access />
          <Success />

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
