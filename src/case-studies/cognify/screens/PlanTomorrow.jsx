import { CogniSays, StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';

/*
 * Plan tomorrow: the evening before, Meher picks up to three things and drops
 * each into a part of the day. A soft cap (3) keeps the plan doable; Cogni
 * suggests where one task fits, and everything can change in the morning.
 */
const SLOTS = [
  { part: 'Morning', icon: 'sunrise', item: { name: 'Buy groceries', icon: 'cart', meta: '2 steps' } },
  { part: 'Afternoon', icon: 'afternoon', item: { name: 'Write a blog post', icon: 'pen', meta: 'Step 3 of 4' } },
  { part: 'Evening', icon: 'moon', item: null },
];

const FROM_LIST = [
  { name: 'Evening routine', icon: 'moon' },
  { name: 'Email for the internship', icon: 'mail' },
  { name: 'Invite friends', icon: 'gift' },
];

export function PlanTomorrowScreen({ nav }) {
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-head">
        <button type="button" className="cg-back" aria-label="Back to Tasks" onClick={() => nav?.('tasks')}>
          <Icon name="chevronLeft" size={22} stroke={2.4} />
        </button>
        <div className="cg-head__text">
          <h1 style={{ fontSize: 26 }}>Plan tomorrow</h1>
          <p>Saturday, 7 November</p>
        </div>
      </header>

      <div className="cg-plan-intro">
        <CogniSays size={60}>Pick up to 3 things. You can change them in the morning.</CogniSays>
      </div>

      <div className="cg-slots-plan">
        {SLOTS.map((s) => (
          <div key={s.part} className="cg-pslot">
            <p className="cg-pslot__label">
              <Icon name={s.icon} size={19} />
              {s.part}
            </p>
            {s.item ? (
              <div className="cg-pslot__item">
                <span className="cg-row__icon">
                  <Icon name={s.item.icon} size={22} />
                </span>
                <span className="cg-row__text">
                  <b>{s.item.name}</b>
                  <span>{s.item.meta}</span>
                </span>
                <button type="button" className="cg-remove" aria-label={`Remove ${s.item.name}`}>
                  <Icon name="x" size={20} stroke={2.2} />
                </button>
              </div>
            ) : (
              <button type="button" className="cg-pslot__item cg-pslot__item--empty">
                <Icon name="plus" size={20} stroke={2.4} />
                Add something
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="cg-tip">
        <Icon name="sparkle" size={20} />
        <span>
          <b>Cogni’s tip:</b> Groceries fit the morning. Shops are quieter then.
        </span>
      </p>

      <div className="cg-pick">
        <p>From your list</p>
        <div className="cg-chips">
          {FROM_LIST.map((t) => (
            <button key={t.name} type="button" className="cg-chip">
              <Icon name="plus" size={18} stroke={2.4} />
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="cg-bottom">
        <button type="button" className="cg-btn" onClick={() => nav?.('tasks')}>
          Save my plan
        </button>
        <p>It will be on Today tomorrow.</p>
      </div>
    </div>
  );
}
