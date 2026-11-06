import { useEffect } from 'react';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import { FONTS } from './kit.jsx';
import { cognify as c } from './content.js';
import { FLOWS, SCREENS, SCREEN_ORDER } from './screens/index.js';
import { Icon, Spark } from './icons.jsx';
import { Cogni } from './Cogni.jsx';
import cognifyLogo from './assets/cognify-logo.svg';
import photoPankhuri from './assets/interview-pankhuri-aggrawal.jpg';
import photoVinita from './assets/interview-vinita.jpg';
import photoSai from './assets/interview-n-sai-balaji.jpg';
import './boards.css';

/*
 * Dev-only export page for Cognify (Behance + Figma):
 *   /export/cognify/screen/<id>  one screen, 390 × 844 (exported at 3×)
 *   /export/cognify/mockup/<id>  the screen in a flat phone frame, transparent (414 × 868 at 3×)
 *   /export/cognify/board/<id>   a Behance board, 1400px wide (exported at 2×)
 * Raises window.__exportReady once fonts and images are in.
 */
const PHOTOS = { pankhuri: photoPankhuri, vinita: photoVinita, sai: photoSai };
const pad = (n) => String(n).padStart(2, '0');

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
  await Promise.all(['500 16px Lexend', '600 16px Lexend', '700 16px Lexend', '800 32px Lexend', '400 17px "Atkinson Hyperlegible"', '700 17px "Atkinson Hyperlegible"'].map((f) => document.fonts.load(f)));
  await document.fonts.ready;
}

/* ── Building blocks ──────────────────────────────────────── */
function Board({ title, letter, lede, children }) {
  return (
    <div className="cb" data-export-root>
      <header className="cb__head">
        <div className="cb__title">
          {letter && <span className="cb__letter">{letter}</span>}
          <h1>{title}</h1>
        </div>
        <img className="cb__logo" src={cognifyLogo} alt="Cognify" />
      </header>
      {lede && <p className="cb__lede">{lede}</p>}
      <div className="cb__body">{children}</div>
    </div>
  );
}

function Phone({ id, width, props }) {
  const S = SCREENS[id];
  return (
    <PhoneMockup width={width} tone="midnight" label={`${S.title} screen`}>
      <S.Component {...props} />
    </PhoneMockup>
  );
}

/* ── 01 · Cover ───────────────────────────────────────────── */
function CoverBoard() {
  return (
    <div className="cb cb--cover" data-export-root>
      <div className="cb-cover__text">
        <img className="cb-cover__logo" src={cognifyLogo} alt="Cognify" />
        <p className="cb-cover__kicker">{c.kind} · UI/UX case study</p>
        <h1 className="cb-cover__title">{c.title}</h1>
        <p className="cb-cover__sub">{c.subtitle}</p>
        <dl className="cb-facts">
          {c.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="cb-cover__stage">
        <span className="cb-cover__ring" aria-hidden="true" />
        <span className="cb-cover__disc" aria-hidden="true" />
        <div className="cb-cover__phone cb-cover__phone--l">
          <Phone id="tasks" width={266} />
        </div>
        <div className="cb-cover__phone cb-cover__phone--r">
          <Phone id="win" width={266} />
        </div>
        <div className="cb-cover__phone cb-cover__phone--c">
          <Phone id="today" width={310} />
        </div>
        <div className="cb-float cb-float--a">
          <span className="cb-float__icon">
            <Cogni size={40} mood="calm" />
          </span>
          <span>
            <b>Hi, I’m Cogni.</b>
            <small>One small thing at a time</small>
          </span>
        </div>
        <div className="cb-float cb-float--b">
          <span className="cb-float__icon cb-float__icon--gold">
            <Spark size={26} />
          </span>
          <span>
            <b>5-day streak</b>
            <small>Rest days keep it safe</small>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 02 · Overview & problem ──────────────────────────────── */
function ProblemBoard() {
  const o = c.overview;
  const p = c.problem;
  return (
    <Board title={o.title}>
      <section className="cb-panel cb-overview">
        <div>
          {o.text.map((t) => (
            <p key={t} className="cb-text">
              {t}
            </p>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
          <div>
            <p className="cb-label">Who it’s for</p>
            <ol className="cb-chain">
              {o.segment.map((s, i) => (
                <li key={s} className={i === o.segment.length - 1 ? 'is-focus' : undefined}>
                  {s}
                </li>
              ))}
            </ol>
            <p className="cb-text" style={{ marginTop: 12 }}>
              Young adults, <b style={{ color: '#111' }}>{o.audience}</b>
            </p>
          </div>
          <div>
            <p className="cb-label">How dyslexia affects them</p>
            <ul className="cb-pills">
              {o.effects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="cb-quote cb-quote--light">
        <p className="cb-label">Problem statement</p>
        <blockquote>{p.statement}</blockquote>
      </div>

      <div className="cb-cards">
        {p.gaps.map((g, i) => (
          <article key={g.title} className="cb-card">
            <span className="cb-card__n">
              {p.gapsTitle} · {pad(i + 1)}
            </span>
            <h3 className="cb-h3">{g.title}</h3>
            <p className="cb-text">{g.text}</p>
          </article>
        ))}
      </div>

      <div className="cb-quote">
        <p className="cb-label">How might we</p>
        <blockquote>{p.hmw}</blockquote>
      </div>
    </Board>
  );
}

/* ── 03 · Research ────────────────────────────────────────── */
function ResearchBoard() {
  const r = c.research;
  return (
    <Board title={r.title} lede={r.lede}>
      <div className="cb-people">
        {r.interviews.map((e) => (
          <figure key={e.name} className="cb-person">
            <img src={PHOTOS[e.photo]} alt={`${e.format} with ${e.name}`} />
            <figcaption>
              <span className={`cb-tag${e.kind === 'User' ? ' cb-tag--user' : ''}`}>
                {e.kind} · {e.format}
              </span>
              <b>{e.name}</b>
              <span>{e.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="cb-research">
        <div className="cb-count">
          <p className="cb-label">Interviews</p>
          <p>
            <strong>{r.counts.users}</strong>
            young adults with dyslexia, aged 18–30
          </p>
          <p>
            <strong>{r.counts.experts}</strong>
            experts who work with dyslexia
          </p>
        </div>
        <div>
          <p className="cb-label">{r.themesTitle}</p>
          <div className="cb-themes">
            {r.themes.map((t, i) => (
              <article key={t.title} className="cb-card">
                <span className="cb-card__n">{pad(i + 1)}</span>
                <h3 className="cb-h3">{t.title}</h3>
                <p className="cb-text">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <section className="cb-panel" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40 }}>
        <div>
          <p className="cb-label">Desk research</p>
          <ul className="cb-voice__rules" style={{ display: 'grid', gap: 0 }}>
            {r.desk.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="cb-text" style={{ marginTop: 16, fontSize: 15, color: '#666' }}>
            Sources · {r.desk.sources}
          </p>
        </div>
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          {[
            ['Strengths to design for', r.desk.strengths],
            ['Apps they already use', r.desk.apps],
          ].map(([t, items]) => (
            <div key={t}>
              <p className="cb-label" style={{ marginBottom: 10 }}>
                {t}
              </p>
              <ul className="cb-chips">
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Board>
  );
}

/* ── 04 · How it helps ────────────────────────────────────── */
function IdeaBoard() {
  const d = c.idea;
  return (
    <Board title={d.title} lede={d.lede}>
      <div className="cb-pillars">
        {d.pillars.map((p) => (
          <article key={p.title} className="cb-card">
            <span className="cb-icon">
              <Icon name={p.icon} size={28} />
            </span>
            <h3 className="cb-h3" style={{ marginTop: 6 }}>
              {p.title}
            </h3>
            <p className="cb-text">{p.text}</p>
            <p className="cb-where">{p.where}</p>
          </article>
        ))}
      </div>
      <section className="cb-panel">
        <p className="cb-label">{d.places.title}</p>
        <ol className="cb-places">
          {d.places.items.map((pl) => (
            <li key={pl.name} className={pl.name === 'Ask Cogni' ? 'is-cogni' : undefined}>
              <span className="cb-icon">
                <Icon name={pl.icon} size={26} stroke={2.2} />
              </span>
              <b>{pl.name}</b>
              <span>{pl.text}</span>
            </li>
          ))}
        </ol>
      </section>
    </Board>
  );
}

/* ── 05–08 · The four moments ─────────────────────────────── */
function FlowBoard({ index }) {
  const f = FLOWS[index];
  const four = f.screens.length > 3;
  const width = four ? 272 : 300;
  return (
    <Board title={f.title} letter={'ABCD'[index]} lede={f.text}>
      <div className={`cb-phones${four ? ' cb-phones--4' : ''}`}>
        {f.screens.map((id) => {
          const S = SCREENS[id];
          return (
            <figure key={id} className="cb-shot" style={{ width }}>
              <Phone id={id} width={width} />
              <figcaption>
                <span className="cb-shot__top">
                  <span className="cb-shot__n">{pad(SCREEN_ORDER.indexOf(id) + 1)}</span>
                  {S.title}
                </span>
                <span className="cb-shot__cap">{S.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Board>
  );
}

/* ── 09 · Gamification and voice ──────────────────────────── */
function GameBoard() {
  const g = c.idea.game;
  const v = c.idea.voice;
  return (
    <Board title={g.title} lede={g.lede}>
      <section className="cb-panel cb-table">
        <div className="cb-table__row cb-table__row--head">
          <span>Idea</span>
          <span>Usually</span>
          <span>In Cognify</span>
        </div>
        {g.rows.map((r) => (
          <div key={r.idea} className="cb-table__row">
            <span className="cb-table__k">{r.idea}</span>
            <span className="cb-table__muted">{r.usual}</span>
            <span className="cb-table__strong">{r.cognify}</span>
          </div>
        ))}
      </section>

      <div className="cb-voice">
        <section className="cb-panel">
          <p className="cb-label">{v.title}</p>
          {v.pairs.map((p) => (
            <div key={p.say} className="cb-voice__pair">
              <p className="cb-voice__say">
                <span className="cb-voice__tag cb-voice__tag--yes">
                  <Icon name="check" size={14} stroke={3} />
                  Say
                </span>
                {p.say}
              </p>
              <p className="cb-voice__not">
                <span className="cb-voice__tag">
                  <Icon name="x" size={14} stroke={3} />
                  Not
                </span>
                {p.not}
              </p>
            </div>
          ))}
        </section>
        <section className="cb-panel cb-voice__rules">
          <Cogni size={104} mood="calm" />
          <ul>
            {v.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </div>
    </Board>
  );
}

/* ── 10 · Design system ───────────────────────────────────── */
const ICONS = ['today', 'tasks', 'mic', 'routine', 'me', 'calendar', 'readAloud', 'clock', 'pen', 'check', 'sparkle', 'bulb', 'branch', 'mail', 'cart', 'gift', 'sunrise', 'moon', 'bag', 'phone', 'badge', 'star', 'lock', 'settings', 'plus'];

function SystemBoard() {
  const s = c.system;
  return (
    <Board title="Design system" lede={s.lede}>
      <div className="cb-row" style={{ gridTemplateColumns: '1.15fr 1fr' }}>
        <section className="cb-panel">
          <p className="cb-label">{s.logo.title}</p>
          <div className="cb-brand__logo">
            <img src={cognifyLogo} alt="Cognify logo" />
          </div>
          <p className="cb-text" style={{ marginTop: 16 }}>
            {s.logo.text}
          </p>
        </section>
        <section className="cb-panel">
          <p className="cb-label">{s.cogni.title}</p>
          <ul className="cb-moods">
            {s.cogni.moods.map((m) => (
              <li key={m.mood}>
                <span className="cb-moods__stage">
                  <Cogni size={112} mood={m.mood} />
                </span>
                <b>{m.label}</b>
                <span>{m.use}</span>
              </li>
            ))}
          </ul>
          <p className="cb-text" style={{ marginTop: 16 }}>
            {s.cogni.text}
          </p>
        </section>
      </div>

      <section className="cb-panel">
        <p className="cb-label">Colour</p>
        <ul className="cb-swatches">
          {s.colors.map((col) => (
            <li key={col.hex}>
              <span className="cb-swatch" style={{ background: col.hex, boxShadow: col.light ? 'inset 0 0 0 1px #E6E6EE' : undefined }}>
                {col.contrast && (
                  <span className="cb-swatch__aa" style={{ color: col.darkText ? '#111111' : '#ffffff' }}>
                    Aa
                  </span>
                )}
              </span>
              <b>{col.name}</b>
              <small>{col.hex}</small>
              <small>{col.note}</small>
              {col.contrast && <small style={{ color: '#3d44c7' }}>{col.contrast}</small>}
            </li>
          ))}
        </ul>
      </section>

      <div className="cb-row">
        {s.type.map((t) => {
          const ff = { fontFamily: `'${t.family}', system-ui, sans-serif` };
          return (
            <section key={t.family} className="cb-panel cb-type">
              <span className="cb-type__aa" style={ff}>
                Aa
              </span>
              <b style={ff}>{t.family}</b>
              <span className="cb-label" style={{ margin: 0 }}>
                {t.role}
              </span>
              <span className="cb-text" style={ff}>
                {t.why}
              </span>
            </section>
          );
        })}
      </div>

      <section className="cb-panel">
        <p className="cb-label">
          {s.icons.title} · {s.icons.text}
        </p>
        <ul className="cb-icons">
          {ICONS.map((n) => (
            <li key={n}>
              <Icon name={n} size={30} />
            </li>
          ))}
          <li className="is-gold">
            <Spark size={30} />
          </li>
        </ul>
      </section>
    </Board>
  );
}

/* ── 11 · Accessibility ───────────────────────────────────── */
function AccessBoard() {
  const a = c.access;
  return (
    <Board title={a.title} lede={a.lede}>
      <section className="cb-panel cb-table cb-table--4">
        <div className="cb-table__row cb-table__row--head">
          <span>Design decision</span>
          <span>Universal design principle</span>
          <span>Why</span>
          <span>In Cognify</span>
        </div>
        {a.mapping.map((m) => (
          <div key={m.decision} className="cb-table__row">
            <span className="cb-table__k">{m.decision}</span>
            <span className="cb-table__accent">{m.principle}</span>
            <span className="cb-table__muted">{m.why}</span>
            <span className="cb-table__strong">{m.how}</span>
          </div>
        ))}
      </section>
      <div className="cb-checks">
        {a.checks.map((ch) => (
          <article key={ch.title} className="cb-card">
            <h3 className="cb-h3" style={{ fontSize: 21 }}>
              {ch.title}
            </h3>
            <p className="cb-text" style={{ fontSize: 17 }}>
              {ch.text}
            </p>
          </article>
        ))}
      </div>
    </Board>
  );
}

const BOARDS = {
  cover: CoverBoard,
  problem: ProblemBoard,
  research: ResearchBoard,
  idea: IdeaBoard,
  'flow-a': () => <FlowBoard index={0} />,
  'flow-b': () => <FlowBoard index={1} />,
  'flow-c': () => <FlowBoard index={2} />,
  'flow-d': () => <FlowBoard index={3} />,
  game: GameBoard,
  system: SystemBoard,
  access: AccessBoard,
};

export default function CognifyExport({ kind, id }) {
  useEffect(() => {
    let live = true;
    (async () => {
      await loadFonts();
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true })))));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 250));
      if (!live) return;
      window.__exportFontsOk = document.fonts.check('600 16px Lexend') && document.fonts.check('400 17px "Atkinson Hyperlegible"');
      window.__exportReady = true;
    })();
    return () => {
      live = false;
    };
  }, [kind, id]);

  if (kind === 'board') {
    const B = BOARDS[id];
    return B ? <B /> : null;
  }

  const S = SCREENS[id];
  if (!S) return null;

  if (kind === 'mockup') {
    return (
      <div data-export-root style={{ width: 414 }}>
        <PhoneMockup width={414} tone="midnight" className="phone--flat" label={`${S.title} screen`}>
          <S.Component />
        </PhoneMockup>
      </div>
    );
  }

  return (
    <div data-export-root style={{ width: 390, height: 844 }}>
      <S.Component />
    </div>
  );
}
