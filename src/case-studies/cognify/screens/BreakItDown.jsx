import { CogniSays, StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';

/*
 * Break it down: Meher added "Email for the internship" by voice; Cogni turns it
 * into small steps, each with a time in plain words. Every step can be edited,
 * reordered or made smaller, and the whole list can be read aloud.
 */
const STEPS = [
  { text: 'Open the job post', time: '2 min' },
  { text: 'Write 3 lines about you', time: '10 min' },
  { text: 'Attach your CV', time: '2 min' },
  { text: 'Read it aloud, then send', time: '3 min' },
];

export function BreakItDownScreen({ nav }) {
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-head">
        <button type="button" className="cg-back" aria-label="Back to Tasks" onClick={() => nav?.('tasks')}>
          <Icon name="chevronLeft" size={22} stroke={2.4} />
        </button>
        <div className="cg-head__text">
          <h1 style={{ fontSize: 26 }}>Break it down</h1>
          <p>With Cogni</p>
        </div>
      </header>

      <article className="cg-card cg-bd-task">
        <span className="cg-row__icon">
          <Icon name="mail" size={22} />
        </span>
        <span className="cg-row__text">
          <b>Email for the internship</b>
          <span>Added by voice · Today</span>
        </span>
      </article>

      <div className="cg-plan-intro">
        <CogniSays size={60} mood="wave">
          Here are 4 small steps. Change any you like.
        </CogniSays>
      </div>

      <div className="cg-bd-head">
        <b>Your steps</b>
        <span>About 17 minutes in all</span>
      </div>

      <ol className="cg-bd-list">
        {STEPS.map((s, i) => (
          <li key={s.text}>
            <span className="cg-bd-n">{i + 1}</span>
            <span className="cg-bd-text">{s.text}</span>
            <span className="cg-bd-time">{s.time}</span>
            <span className="cg-bd-grip" aria-hidden="true">
              <Icon name="grip" size={20} />
            </span>
          </li>
        ))}
        <li className="cg-bd-add">
          <Icon name="plus" size={20} stroke={2.4} />
          Add a step
        </li>
      </ol>

      <div className="cg-bd-tools">
        <button type="button" className="cg-chip">
          <Icon name="sparkle" size={18} />
          Make them smaller
        </button>
        <button type="button" className="cg-chip">
          <Icon name="readAloud" size={18} />
          Read aloud
        </button>
      </div>

      <div className="cg-bottom">
        <button type="button" className="cg-btn" onClick={() => nav?.('tasks')}>
          Save steps
        </button>
      </div>
    </div>
  );
}
