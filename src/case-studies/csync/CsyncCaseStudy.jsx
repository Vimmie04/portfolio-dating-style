import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '../../components/icons.jsx';
import LikeButton from '../../components/likes/LikeButton.jsx';
import { ContentsRail, CsSection, useDocumentTitle, useStylesheet } from '../../components/case-study/CaseStudyKit.jsx';
import { csync as c } from './content.js';
import { OWNERSHIP_NOTE, ProductScreen } from './ProductScreen.jsx';
import { CalendarAnimation } from './CalendarAnimation.jsx';
import { AnnotatedScreen } from './AnnotatedScreen.jsx';
import { CsCalendar } from './screens/CsCalendar.jsx';
import { CompliancePlanner } from './screens/CompliancePlanner.jsx';
import { VideoPlayer } from './VideoPlayer.jsx';
import csyncLogo from './assets/csync-logo.png';
import csyncSubmark from './assets/csync-submark.png';
import carousel from './assets/carousel.webp';
import pricingPage from './assets/pricing-page.webp';
import './csync-page.css';

// CSync's own type, loaded only on this page: Plus Jakarta Sans (the shipped UI) and Inter (the brand).
const FONTS = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;800&display=swap';

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
          <span>PROJECT 02</span>
          <span>csync.fig</span>
        </div>
        <div className="cs-folder__body">
          <div className="cs-hero__info">
            <img className="cy-logo" src={csyncLogo} alt="CSync" width="119" height="25" />
            <div className="cs-hero__meta">
              <p className="cs-mini">{c.kind}</p>
              <p className="cs-badge">{c.badge}</p>
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
              <LikeButton id="project:csync" label="CSync" likeLabel="CSync" kind="project" />
              <a className="text-link" href={c.behance} target="_blank" rel="noopener noreferrer">
                Original on Behance
                <ArrowUpRightIcon width={14} height={14} />
              </a>
            </div>
          </div>

          <div className="cs-hero__visual cy-hero__visual">
            <CalendarAnimation />
            <p className="cy-cover__note">{OWNERSHIP_NOTE}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Product demo: featured right after the hero, plays in place ── */
function DemoVideo() {
  const v = c.demo;

  return (
    <section id="demo" className="cy-demo container" aria-labelledby="demo-title">
      <div className="cy-demo__band">
        <header className="cy-demo__head">
          <p className="cs-mini">Product demo · {v.length}</p>
          <h2 id="demo-title" className="cy-demo__title">
            {v.title}
          </h2>
          <p className="cy-demo__sub">{v.text}</p>
        </header>

        <VideoPlayer id={v.id} title="the CSync product demo" length={v.length} playLabel="Play demo">
          <div className="cy-demo__screen" aria-hidden="true">
            <ProductScreen compact note={null}>
              <CompliancePlanner />
            </ProductScreen>
          </div>
        </VideoPlayer>

        <p className="cy-demo__note">{v.note}</p>
      </div>
    </section>
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

function Module({ m, screen, label }) {
  return (
    <div className="cy-module">
      <div className="cy-module__head">
        <p className="cs-mini">{m.label}</p>
        <h3 className="cy-module__name">{m.name}</h3>
        <p className="cs-p">{m.job}</p>
      </div>
      <AnnotatedScreen screen={screen} notes={m.notes} label={label} />
    </div>
  );
}

/* ── 04 · Marketing: carousel, launch video, pricing ──────── */
function Marketing() {
  const m = c.marketing;
  return (
    <>
      <article className="cs-card cy-carousel">
        <div className="cy-carousel__head">
          <p className="cs-mini">{m.carousel.label}</p>
          <h3 className="cy-module__name">{m.carousel.title}</h3>
          <p className="cs-p">{m.carousel.text}</p>
        </div>
        <div className="cy-carousel__scroll">
          <div className="cy-carousel__strip">
            <img src={carousel} alt={m.carousel.alt} width="1796" height="445" loading="lazy" />
            <ol className="cy-carousel__arc">
              {m.carousel.arc.map((a, i) => (
                <li key={a}>
                  <span>{pad(i + 1)}</span>
                  {a}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>

      <article className="cs-card cy-media">
        <VideoPlayer id={c.launchVideo.id} title="the CSync launch video" length={c.launchVideo.length} playLabel="Play launch video" className="cy-player--launch">
          <div className="cy-launch-poster" aria-hidden="true">
            {m.launch.poster.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </VideoPlayer>
        <div className="cy-media__text">
          <p className="cs-mini">{m.launch.label}</p>
          <h3 className="cy-module__name">{m.launch.title}</h3>
          <p className="cs-p">{m.launch.text}</p>
        </div>
      </article>

      <article className="cs-card cy-media">
        <div className="cy-media__img">
          <img src={pricingPage} alt={m.pricing.alt} width="1300" height="1022" loading="lazy" />
        </div>
        <div className="cy-media__text">
          <p className="cs-mini">{m.pricing.label}</p>
          <h3 className="cy-module__name">{m.pricing.title}</h3>
          <p className="cs-p">{m.pricing.text}</p>
          <span className="cy-law">
            <span className="cs-mini">UX principle</span>
            <strong>{m.pricing.law}</strong>
            <span>{m.pricing.why}</span>
          </span>
        </div>
      </article>

      <p className="cy-cover__note">{m.note}</p>
    </>
  );
}

function ListCard({ title, items, source }) {
  return (
    <article className="cs-card cs-stat cs-list">
      <p className="cs-mini">{title}</p>
      <ul>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      {source && <p className="cs-mini cs-stat__src">Source · {source}</p>}
    </article>
  );
}

export default function CsyncCaseStudy() {
  useStylesheet(FONTS);
  useDocumentTitle(c.pageTitle);
  const o = c.overview;

  return (
    <>
      <Hero />
      <DemoVideo />
      <Summary />

      <div className="cs-layout container">
        <ContentsRail sections={c.sections} />

        <div className="cs-content">
          {/* 01 · Overview */}
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

            <div className="cs-stats cy-overview__facts">
              <article className="cs-card cs-stat">
                <p className="cs-stat__value">{o.stat.value}</p>
                <p className="cs-stat__text">{o.stat.text}</p>
                <p className="cs-mini cs-stat__src">
                  Source ·{' '}
                  <a href={o.stat.href} target="_blank" rel="noopener noreferrer">
                    {o.stat.source}
                  </a>
                </p>
              </article>
              <ListCard {...o.oldWay} />
              <ListCard {...o.audience} />
            </div>
          </CsSection>

          {/* 02 · Key modules */}
          <CsSection id="modules" index="02" label="Key modules" title={c.modules.title} lede={c.modules.lede}>
            <div className="cy-process">
              <p className="cs-mini">{c.modules.process.title}</p>
              <ol>
                {c.modules.process.steps.map((s, i) => (
                  <li key={s.name}>
                    <span className="cy-process__n">{String(i + 1).padStart(2, '0')}</span>
                    <b>{s.name}</b>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Module m={c.modules.calendar} screen={CsCalendar} label="CS Calendar as shipped: April 2026 with memos, invoices and tasks, and Saturday 25 April's deadlines. Numbered notes follow." />
            <Module m={c.modules.planner} screen={CompliancePlanner} label="Compliance Planner as shipped: companies with filing progress, and one company's forms. Numbered notes follow." />
          </CsSection>

          {/* 03 · Brand */}
          <CsSection id="brand" index="03" label="Brand" title={c.brand.title} lede={c.brand.lede}>
            <div className="cs-card cs-logo">
              <div>
                <h3 className="cs-h3">{c.brand.logo.title}</h3>
                <p className="cs-assets__text">{c.brand.logo.text}</p>
              </div>
              <div className="cs-logo__tiles cy-logo-tiles">
                <div className="cs-logo__tile cs-logo__tile--main">
                  <img className="cy-brand-logo" src={csyncLogo} alt="CSync logo" width="238" height="50" />
                  <span className="cs-mini">Logo</span>
                </div>
                <div className="cs-logo__tile cs-logo__tile--main">
                  <img className="cy-brand-submark" src={csyncSubmark} alt="CSync submark" width="58" height="46" />
                  <span className="cs-mini">Submark</span>
                </div>
              </div>
            </div>

            <div className="cs-swatches cy-swatches">
              {c.brand.colors.map((col) => (
                <article key={col.hex} className="cs-card cs-swatch">
                  <div className="cs-swatch__chip" style={{ background: col.hex, boxShadow: col.light ? 'inset 0 -1px 0 var(--line)' : undefined }}>
                    {col.contrast && (
                      <>
                        <span className="cs-swatch__aa" aria-hidden="true">
                          Aa
                        </span>
                        <span className="cs-swatch__ratio">{col.contrast} with white</span>
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
              {c.brand.type.map((t) => {
                const ff = { fontFamily: `'${t.family}', system-ui, sans-serif` };
                return (
                  <article key={t.family} className="cs-card cs-type__card">
                    <span className="cs-type__aa cy-type__aa" style={ff} aria-hidden="true">
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
          </CsSection>

          {/* 04 · Marketing */}
          <CsSection id="marketing" index="04" label="Marketing" title={c.marketing.title} lede={c.marketing.lede}>
            <Marketing />
          </CsSection>

          {/* 05 · Reflection (Vimla's own words) */}
          <CsSection id="reflection" index="05" label="Reflection" title={c.reflection.title}>
            <div className="cy-reflection">
              <p className="cy-reflection__opening">{c.reflection.opening}</p>
              <div className="cy-reflection__learned">
                <p className="cs-mini">{c.reflection.learnedIntro}</p>
                <ol>
                  {c.reflection.learned.map((l, i) => (
                    <li key={l} className="cs-card">
                      <span>{pad(i + 1)}</span>
                      {l}
                    </li>
                  ))}
                </ol>
              </div>
              <blockquote className="cy-reflection__closing">{c.reflection.closing}</blockquote>
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
