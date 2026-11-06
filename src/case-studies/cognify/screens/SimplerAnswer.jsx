import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';

/*
 * A simpler answer: Cogni turns a dense job post into three short chunks,
 * each with a plain label. It can be read aloud, made simpler still, and
 * the deadline can become a task in one tap (AI that leads back to tasks).
 */
const CHUNKS = [
  { label: 'What it is', text: 'A marketing internship for 3 months.' },
  { label: 'What to send', text: 'Your CV and a short email.' },
  { label: 'By when', text: 'Friday, 13 November.' },
];

export function SimplerAnswerScreen({ nav }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-head">
        <button type="button" className="cg-back" aria-label="Back to Ask Cogni" onClick={() => nav?.('cogni')}>
          <Icon name="chevronLeft" size={22} stroke={2.4} />
        </button>
        <div className="cg-head__text">
          <h1 style={{ fontSize: 26 }}>Make it simpler</h1>
          <p>The internship job post</p>
        </div>
      </header>

      <div className="cg-original">
        <p>
          We are seeking a motivated Marketing Intern to support cross-functional campaign initiatives for a three-month tenure. Applicants are requested to
          submit a curriculum vitae alongside a brief cover letter no later than…
        </p>
        <button type="button" className="cg-link">
          Show the original
        </button>
      </div>

      <article className="cg-answer" aria-labelledby={titleId}>
        <div className="cg-answer__who">
          <span className="cg-plan__cogni" aria-hidden="true" style={{ width: 44, height: 44, borderRadius: 14 }}>
            <Cogni size={36} mood="calm" />
          </span>
          <b id={titleId}>In short</b>
        </div>
        <dl className="cg-chunks">
          {CHUNKS.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.text}</dd>
            </div>
          ))}
        </dl>
        <div className="cg-answer__tools">
          <button type="button" className="cg-chip cg-chip--strong">
            <Icon name="readAloud" size={18} />
            Read aloud
          </button>
          <button type="button" className="cg-chip">
            <Icon name="sparkle" size={18} />
            Simpler still
          </button>
        </div>
      </article>

      <button type="button" className="cg-suggest" onClick={() => nav?.('breakdown')}>
        <span className="cg-row__icon">
          <Icon name="plus" size={22} stroke={2.4} />
        </span>
        <span className="cg-row__text">
          <b>Add “Send by Friday” to Tasks</b>
          <span>Cogni can break it into steps</span>
        </span>
      </button>

      <div className="cg-follow">
        <span>Ask a follow-up…</span>
        <span className="cg-follow__mic" aria-hidden="true">
          <Icon name="mic" size={22} stroke={2.2} />
        </span>
      </div>
    </div>
  );
}
