import { useId } from 'react';
import { StatusBar, TabBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';

/*
 * Routines: the same few steps on repeat, so there's less to remember.
 * Tonight's routine is open with its steps (one of them is Plan tomorrow,
 * which links the two features); the others sit below with one status each.
 */
const TONIGHT = [
  { text: 'Pack your bag for tomorrow', icon: 'bag' },
  { text: 'Plan tomorrow', icon: 'calendar' },
  { text: 'Phone on charge', icon: 'phone' },
];

const OTHERS = [
  { name: 'Morning routine', icon: 'sunrise', meta: '4 steps · Every day', state: 'done' },
  { name: 'Sunday reset', icon: 'routine', meta: '5 steps · Sundays', state: 'later' },
];

export function RoutinesScreen({ nav }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-head">
        <div className="cg-head__text">
          <h1>Routines</h1>
          <p>Same steps, less to remember.</p>
        </div>
        <button type="button" className="cg-add" aria-label="Make a routine with Cogni">
          <Icon name="plus" size={26} stroke={2.4} />
        </button>
      </header>

      <section className="cg-tonight" aria-labelledby={titleId}>
        <p className="cg-feature__label">Up tonight</p>
        <h2 id={titleId}>Evening routine</h2>
        <p className="cg-tonight__meta">
          <Icon name="clock" size={18} />
          Takes about 15 minutes
        </p>
        <ol className="cg-tonight__steps">
          {TONIGHT.map((s) => (
            <li key={s.text}>
              <span className="cg-tonight__check" aria-hidden="true" />
              <Icon name={s.icon} size={20} />
              {s.text}
            </li>
          ))}
        </ol>
        <button type="button" className="cg-btn" onClick={() => nav?.('routine-run')}>
          <Icon name="start" size={18} />
          Start routine
        </button>
      </section>

      <h2 className="cg-h2">Your other routines</h2>
      {OTHERS.map((r) => (
        <div key={r.name} className="cg-row">
          <span className="cg-row__icon">
            <Icon name={r.icon} size={22} />
          </span>
          <span className="cg-row__text">
            <b>{r.name}</b>
            <span>{r.meta}</span>
          </span>
          {r.state === 'done' ? (
            <span className="cg-state cg-state--done">
              <i>
                <Icon name="check" size={14} stroke={3} />
              </i>
              Done today
            </span>
          ) : (
            <Icon name="chevronRight" size={20} style={{ color: '#666' }} />
          )}
        </div>
      ))}

      <TabBar active="routines" nav={nav} />
    </div>
  );
}
