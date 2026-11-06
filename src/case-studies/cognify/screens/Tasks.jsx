import { StatusBar, TabBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';

/*
 * Tasks: today grouped by part of the day (morning / afternoon / evening),
 * not by clock times, so there's no wall of hours to read.
 * Status is always an icon + a word. "Plan tomorrow" sits on top: a 2-minute
 * way to pick tomorrow's three things the evening before.
 */
export const TASKS = [
  { part: 'Morning', icon: 'sunrise', items: [{ name: 'Start the day', icon: 'sunrise', meta: '4 steps', state: 'done' }] },
  {
    part: 'Afternoon',
    icon: 'afternoon',
    items: [
      { name: 'Write a blog post', icon: 'pen', meta: 'Step 2 of 4', state: 'next' },
      { name: 'Buy groceries', icon: 'cart', meta: '2 steps', state: 'later' },
    ],
  },
  {
    part: 'Evening',
    icon: 'moon',
    items: [
      { name: 'Invite friends to the party', icon: 'gift', meta: '3 steps', state: 'later' },
      { name: 'Evening routine', icon: 'moon', meta: '3 steps', state: 'later' },
    ],
  },
];

function State({ state }) {
  if (state === 'done')
    return (
      <span className="cg-state cg-state--done">
        <i>
          <Icon name="check" size={14} stroke={3} />
        </i>
        Done
      </span>
    );
  if (state === 'next') return <span className="cg-state cg-state--next">Next</span>;
  return <span className="cg-state cg-state--later">Later</span>;
}

export function TasksScreen({ nav }) {
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-head">
        <div className="cg-head__text">
          <h1>Tasks</h1>
          <p>Friday, 6 November</p>
        </div>
        <button type="button" className="cg-add" aria-label="Add a task. Say it or type it">
          <Icon name="plus" size={26} stroke={2.4} />
        </button>
      </header>

      <div className="cg-seg" role="tablist" aria-label="Which day">
        <button type="button" role="tab" aria-selected="true" className="is-on">
          Today
        </button>
        <button type="button" role="tab" aria-selected="false">
          Tomorrow
        </button>
        <button type="button" role="tab" aria-selected="false">
          This week
        </button>
      </div>

      <button type="button" className="cg-plan" onClick={() => nav?.('plan')}>
        <span className="cg-plan__cogni" aria-hidden="true">
          <Cogni size={44} mood="wave" />
        </span>
        <span className="cg-plan__text">
          <b>Plan tomorrow</b>
          <span>Takes about 2 minutes</span>
        </span>
        <span className="cg-plan__go" aria-hidden="true">
          <Icon name="chevronRight" size={20} stroke={2.4} />
        </span>
      </button>

      {TASKS.map((g) => (
        <section key={g.part} aria-label={g.part}>
          <h2 className="cg-group">
            <Icon name={g.icon} size={20} />
            {g.part}
          </h2>
          {g.items.map((t) => (
            <div key={t.name} className={`cg-row${t.state === 'next' ? ' is-next' : ''}`}>
              <span className="cg-row__icon">
                <Icon name={t.icon} size={22} />
              </span>
              <span className="cg-row__text">
                <b>{t.name}</b>
                <span>{t.meta}</span>
              </span>
              <State state={t.state} />
            </div>
          ))}
        </section>
      ))}

      <TabBar active="tasks" nav={nav} />
    </div>
  );
}
