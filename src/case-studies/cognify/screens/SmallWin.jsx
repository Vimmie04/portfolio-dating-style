import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Icon, Spark } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';
import { NEXT_STEPS } from './Today.jsx';

/*
 * Small win: a short, calm celebration after a step. Gold appears because this
 * is a reward. One exclamation-free headline, the day's wins, the streak, and the
 * next step, with "Take a break" given equal standing to "Keep going".
 * Confetti is still (no motion), so it is safe with reduced motion.
 */
const BITS = [
  { x: 64, y: 108, s: 12, c: '#DFB34B', r: 18, shape: 'rect' },
  { x: 300, y: 96, s: 10, c: '#7C83FD', r: -24, shape: 'rect' },
  { x: 46, y: 220, s: 9, c: '#7C83FD', r: 0, shape: 'dot' },
  { x: 322, y: 206, s: 12, c: '#DFB34B', r: 30, shape: 'rect' },
  { x: 112, y: 70, s: 8, c: '#C7CBFF', r: 0, shape: 'dot' },
  { x: 264, y: 250, s: 9, c: '#DFB34B', r: 0, shape: 'dot' },
  { x: 84, y: 246, s: 10, c: '#C7CBFF', r: -14, shape: 'rect' },
];

const GOAL = 3;

export function SmallWinScreen({ nav, finished = NEXT_STEPS[2].title, done = 2, next = NEXT_STEPS[3] }) {
  const titleId = useId();
  const wins = Math.min(done, GOAL);
  return (
    <div className="cg cg-screen cg-win">
      <StatusBar />

      <button type="button" className="cg-back cg-win__close" aria-label="Close" onClick={() => nav?.('today')}>
        <Icon name="x" size={20} stroke={2.4} />
      </button>

      <div className="cg-win__stage" aria-hidden="true">
        <span className="cg-win__disc" />
        {BITS.map((b, i) => (
          <i
            key={i}
            className="cg-win__bit"
            style={{
              left: b.x,
              top: b.y,
              width: b.s,
              height: b.shape === 'rect' ? b.s * 1.8 : b.s,
              background: b.c,
              borderRadius: b.shape === 'rect' ? 3 : '50%',
              transform: `rotate(${b.r}deg)`,
            }}
          />
        ))}
        <span className="cg-win__cogni">
          <Cogni size={150} mood="cheer" />
        </span>
      </div>

      <section className="cg-win__text" aria-labelledby={titleId}>
        <h1 id={titleId}>Done. That counts.</h1>
        <p>You finished “{finished}”.</p>
      </section>

      <article className="cg-card cg-win__wins">
        <div>
          <p className="cg-win__k">Today’s wins</p>
          <b>{wins === GOAL ? 'All 3 done' : `${wins} of ${GOAL} done`}</b>
        </div>
        <ul className="cg-slots" aria-label={`${wins} of ${GOAL} wins done`} style={{ marginTop: 0 }}>
          {Array.from({ length: GOAL }, (_, i) => (
            <li key={i} className={`cg-slot${i < wins ? ' is-won' : ''}`}>
              {i < wins && <Icon name="check" size={18} stroke={2.6} />}
            </li>
          ))}
        </ul>
        <p className="cg-win__streak">
          <Spark size={18} />
          Your 5-day streak keeps going
        </p>
      </article>

      <div className="cg-bottom">
        {next ? (
          <p className="cg-win__next">
            Next: <b>{next.title}</b>
            <br />
            <span>{next.time}</span>
          </p>
        ) : (
          <p className="cg-win__next">
            <b>Blog post done.</b>
            <br />
            <span>That was the last step.</span>
          </p>
        )}
        {next && (
          <button type="button" className="cg-btn" onClick={() => nav?.('step')}>
            Keep going
          </button>
        )}
        <button type="button" className="cg-btn cg-btn--quiet" onClick={() => nav?.('today')}>
          Take a break
        </button>
      </div>
    </div>
  );
}
