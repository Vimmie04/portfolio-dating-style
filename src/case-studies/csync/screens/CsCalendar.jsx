import { AppShell } from '../AppShell.jsx';
import { Icon } from '../icons.jsx';

/* CS Calendar, April 2026, exactly as shipped (data from the product demo). */
const memo = (t) => ({ type: 'memo', t });
const inv = (t) => ({ type: 'invoice', t });
const task = (t) => ({ type: 'task', t });

const DAYS = [
  { n: 29, out: true }, { n: 30, out: true }, { n: 31, out: true },
  { n: 1, ev: [memo('MEMO-2026-009')] }, { n: 2, ev: [memo('MEMO-2026-009')] }, { n: 3 }, { n: 4 },
  { n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 },
  { n: 12, ev: [memo('MEMO-2026-011')] },
  { n: 13, ev: [memo('MEMO-2026-011'), inv('INVOICE-2026-…')] },
  { n: 14 }, { n: 15 },
  { n: 16, ev: [memo('MEMO-2026-012')] },
  { n: 17 },
  { n: 18, ev: [memo('MEMO-2026-012')] },
  { n: 19 },
  { n: 20, ev: [task('Br'), memo('MEMO-2026-011')] },
  { n: 21, ev: [task('Compliance fail…'), memo('MEMO-2026-009')], more: 1 },
  { n: 22, today: true, ev: [task('Assigned to Mr. A…')] },
  { n: 23, ev: [task('GST Registration'), task('n n')] },
  { n: 24, ev: [task('ESOP Allotment'), task('xyz')] },
  { n: 25, sel: true, ev: [task('Annual Return Filing'), task('Director KYC Update')], more: 1 },
  { n: 26 }, { n: 27 }, { n: 28 }, { n: 29 }, { n: 30 }, { n: 1, out: true }, { n: 2, out: true },
];

const DEADLINES = [
  { title: 'Annual Return Filing', priority: 'High', status: 'Pending', who: 'Aditya Shrivastava' },
  { title: 'Director KYC Update', priority: 'Low', status: 'Pending', who: 'Manya Gupta' },
  { title: 'Board Meeting Compliance', priority: 'High', status: 'Completed', who: 'Deependra Patel' },
];

/** One card from the Deadlines panel (also used on its own in the page cover). */
export function DeadlineCard({ item = DEADLINES[0] }) {
  return (
    <div className={`cx-due${item.priority === 'High' ? ' cx-due--high' : ''}`}>
      <b>{item.title}</b>
      <span className="cx-due__type">Task</span>
      <span className="cx-due__co">2026-27/001 – ABC Test Company</span>
      <div className="cx-due__chips">
        <span className="cx-chip">Task</span>
        <span className={`cx-chip cx-chip--${item.priority.toLowerCase()}`}>{item.priority}</span>
        <span className="cx-due__status">
          <i className="cx-dot" />
          {item.status}
        </span>
      </div>
      <span className="cx-due__who">
        <Icon name="user" size={13} stroke={1.8} />
        {item.who}
      </span>
    </div>
  );
}

// --i: running order of every event on the month (used to stagger the hero animation)
const EVENT_ORDER = new Map();
DAYS.forEach((d, di) => d.ev?.forEach((_, ei) => EVENT_ORDER.set(`${di}:${ei}`, EVENT_ORDER.size)));

function Day({ d, di }) {
  const cls = ['cx-day', d.out && 'cx-day--out', d.today && 'cx-day--today', d.sel && 'cx-day--sel'].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <span className="cx-day__num">{d.n}</span>
      {d.ev && (
        <ul>
          {d.ev.map((e, i) => (
            <li key={i} className={`cx-ev--${e.type}`} style={{ '--i': EVENT_ORDER.get(`${di}:${i}`) }}>
              <i className="cx-dot" />
              <span>{e.t}</span>
            </li>
          ))}
        </ul>
      )}
      {d.more && (
        <span className="cx-day__more" style={{ '--i': EVENT_ORDER.get(`${di}:${d.ev.length - 1}`) + 1 }}>
          +{d.more} more
        </span>
      )}
    </div>
  );
}

export function CsCalendar({ overlay }) {
  return (
    <AppShell active="calendar" crumb="CS Calendar" thumb={[4, 540]} overlay={overlay}>
      <div className="cx-head">
        <span className="cx-head__icon">
          <Icon name="calendarEvent" size={20} stroke={2} />
        </span>
        <div>
          <p className="cx-head__eyebrow">Compliance Planner</p>
          <h1>CS Calendar</h1>
        </div>
      </div>
      <div className="cx-head__nav">
        <span className="cx-navbtn">
          <Icon name="chevronLeft" size={17} stroke={2} />
        </span>
        <span className="cx-today">Today</span>
        <span className="cx-navbtn">
          <Icon name="chevronRight" size={17} stroke={2} />
        </span>
      </div>

      <div className="cx-cal-layout">
        <section className="cx-card cx-cal">
          <div className="cx-cal__bar">
            <h2>April 2026</h2>
            <div className="cx-cal__filters">
              <span className="cx-pill cx-filter cx-filter--tasks">
                <i className="cx-dot" />
                Tasks (12)
              </span>
              <span className="cx-pill cx-filter cx-filter--inv">
                <i className="cx-dot" />
                Invoices (11)
              </span>
            </div>
          </div>
          <div className="cx-cal__week">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => (
              <span key={w}>{w.toUpperCase()}</span>
            ))}
          </div>
          <div className="cx-cal__grid">
            {DAYS.map((d, i) => (
              <Day key={i} d={d} di={i} />
            ))}
          </div>
        </section>

        <aside className="cx-card cx-dead">
          <div className="cx-dead__head">
            <b>Deadlines</b>
            <small>Saturday, 25 April 2026</small>
          </div>
          <div className="cx-dead__list">
            {DEADLINES.map((x, i) => (
              <div key={x.title} className="cx-dead__item" style={{ '--i': i }}>
                <DeadlineCard item={x} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
