import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';
import { NEXT_STEPS } from './Today.jsx';

/*
 * One step at a time: only the current step is on screen. A soft focus ring
 * shows time spent (not a countdown), Cogni offers help in context, and the
 * step can be read aloud, finished or skipped for now.
 */
function FocusRing({ spent: SPENT, about: ABOUT }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  const done = Math.min(SPENT / ABOUT, 1);
  return (
    <div className="cg-ring" role="img" aria-label={`${SPENT} minutes spent, of about ${ABOUT}`}>
      <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#C7CBFF" strokeWidth="12" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#5A62E8"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${c * done} ${c}`}
          transform="rotate(-90 90 90)"
        />
      </svg>
      <span className="cg-ring__label" aria-hidden="true">
        <b>{SPENT} min</b>
        <span>of about {ABOUT}</span>
      </span>
    </div>
  );
}

export function OneStepScreen({ nav, item = NEXT_STEPS[2] }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <div className="cg-flow-top">
        <button type="button" className="cg-back" aria-label="Close and go back" onClick={() => nav?.('today')}>
          <Icon name="x" size={20} stroke={2.4} />
        </button>
        <span className="cg-os-task">Write a blog post</span>
        <span className="cg-steps__bars cg-os-bars" aria-label={`Step ${item.step} of 4`}>
          {[1, 2, 3, 4].map((n) => (
            <i key={n} className={n <= item.step ? 'is-done' : undefined} />
          ))}
        </span>
      </div>

      <section className="cg-os-step" aria-labelledby={titleId}>
        <p className="cg-os-label">Step {item.step} of 4</p>
        <h1 id={titleId}>{item.title}</h1>
        <p className="cg-os-help">{item.help}</p>
      </section>

      <div className="cg-os-focus">
        <FocusRing spent={item.spent} about={item.about} />
        <button type="button" className="cg-chip">
          <Icon name="pause" size={18} stroke={2.6} />
          Pause
        </button>
      </div>

      <article className="cg-card cg-os-cogni">
        <span className="cg-plan__cogni" aria-hidden="true">
          <Cogni size={44} mood="calm" />
        </span>
        <span className="cg-row__text">
          <b>Stuck?</b>
          <span style={{ color: '#111' }}>{item.stuck}</span>
        </span>
        <button type="button" className="cg-chip cg-chip--strong">
          <Icon name="sparkle" size={18} />
          Get ideas
        </button>
      </article>

      <div className="cg-bottom">
        <div className="cg-actions" style={{ marginTop: 0 }}>
          <button type="button" className="cg-btn" onClick={() => nav?.('win')}>
            <Icon name="check" size={20} stroke={2.6} />
            I’ve done this step
          </button>
          <button type="button" className="cg-round-btn" aria-label="Read the step aloud">
            <Icon name="readAloud" size={24} />
          </button>
        </div>
        <button type="button" className="cg-link">
          Skip for now
        </button>
      </div>
    </div>
  );
}
