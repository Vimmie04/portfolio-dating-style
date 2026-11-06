import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';

/*
 * Set your pace: Meher picks a daily goal (Gentle 1, Steady 3, Focused 5 wins),
 * the Duolingo daily-goal idea without pressure: it can change any time, and
 * reading help (read aloud, bigger text) is set up from the start.
 */
const PACES = [
  { id: 'gentle', name: 'Gentle', wins: 1, note: 'For busy or tiring days' },
  { id: 'steady', name: 'Steady', wins: 3, note: 'A few small things each day' },
  { id: 'focused', name: 'Focused', wins: 5, note: 'When you want to get more done' },
];

function Dots({ n }) {
  return (
    <span className="cg-pace__dots" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < n ? 'is-on' : ''} />
      ))}
    </span>
  );
}

function Toggle({ on }) {
  return (
    <span className={`cg-toggle${on ? ' is-on' : ''}`} aria-hidden="true">
      <i />
    </span>
  );
}

export function SetPaceScreen({ nav }) {
  const titleId = useId();
  const selected = 'steady';
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <div className="cg-flow-top">
        <button type="button" className="cg-back" aria-label="Back" onClick={() => nav?.('welcome')}>
          <Icon name="chevronLeft" size={22} stroke={2.4} />
        </button>
        <span className="cg-steps__bars cg-os-bars" aria-label="Step 2 of 3" style={{ marginLeft: 'auto' }}>
          <i className="is-done" />
          <i className="is-done" />
          <i />
        </span>
      </div>

      <section className="cg-os-step" aria-labelledby={titleId} style={{ marginTop: 18 }}>
        <h1 id={titleId} style={{ fontSize: 30 }}>
          How much feels right each day?
        </h1>
        <p className="cg-os-help">You can change this any time.</p>
      </section>

      <div className="cg-paces" role="radiogroup" aria-labelledby={titleId}>
        {PACES.map((p) => {
          const on = p.id === selected;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={on} className={`cg-pace${on ? ' is-on' : ''}`}>
              <span className="cg-pace__text">
                <b>{p.name}</b>
                <span>
                  {p.wins} {p.wins === 1 ? 'win' : 'wins'} a day · {p.note}
                </span>
              </span>
              <Dots n={p.wins} />
              <span className="cg-pace__radio" aria-hidden="true">
                {on && <Icon name="check" size={16} stroke={3} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="cg-help">
        <p className="cg-help__title">Make reading easier</p>
        <div className="cg-help__row">
          <Icon name="readAloud" size={22} />
          <span>Read things aloud</span>
          <Toggle on />
        </div>
        <div className="cg-help__row">
          <span className="cg-aa" aria-hidden="true">
            Aa
          </span>
          <span>Bigger text</span>
          <Toggle on={false} />
        </div>
      </div>

      <div className="cg-bottom">
        <button type="button" className="cg-btn" onClick={() => nav?.('today')}>
          Continue
        </button>
      </div>
    </div>
  );
}
