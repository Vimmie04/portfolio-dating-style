import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup.jsx';
import './CaseStudy.css';

/** Adds a stylesheet <link> once (used for a project's own brand fonts). */
export function useStylesheet(href) {
  useEffect(() => {
    if (document.querySelector(`link[data-href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.href = href;
    document.head.appendChild(link);
  }, [href]);
}

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

/** Which section is in the reading zone (for the contents rail). */
function useActiveId(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function ContentsRail({ sections }) {
  const [ids] = useState(() => sections.map((s) => s.id));
  const active = useActiveId(ids);
  return (
    <nav className="cs-rail" aria-label="Case study contents">
      <p className="cs-rail__title">Contents</p>
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>
              <span className="cs-rail__n">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CsSection({ id, index, label, title, lede, children, className = '' }) {
  return (
    <section id={id} className={`cs-section ${className}`} aria-labelledby={`${id}-title`}>
      <header className="cs-section__head">
        <p className="section-label">
          <span>{index}</span>
          {label}
        </p>
        <h2 id={`${id}-title`} className="cs-h2">
          {title}
        </h2>
        {lede && <p className="cs-lede">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

/** "Show process": optional depth for people who want it, out of the way for people who don't. */
export function ProcessToggle({ label = 'Show process', openLabel = 'Hide process', children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="cs-process">
      <button type="button" className={`cs-toggle ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="cs-toggle__icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 2v10M2 7h10" />
          </svg>
        </span>
        {open ? openLabel : label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="cs-process__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cs-process__inner">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** One screen in a gallery: phone + numbered caption. */
export function PhoneShot({ n, title, caption, who, children }) {
  return (
    <figure className="cs-shot">
      <PhoneMockup width="100%" label={`${title} screen`}>
        {children}
      </PhoneMockup>
      <figcaption>
        <span className="cs-shot__top">
          <span className="cs-shot__n">{n}</span>
          <span className="cs-shot__title">{title}</span>
          {who && <span className="cs-shot__who">{who}</span>}
        </span>
        <span className="cs-shot__cap">{caption}</span>
      </figcaption>
    </figure>
  );
}
