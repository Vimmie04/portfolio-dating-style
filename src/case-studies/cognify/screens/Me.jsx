import { useId } from 'react';
import { StatusBar, TabBar } from '../kit.jsx';
import { Icon, Spark } from '../icons.jsx';
import meherAvatar from '../assets/avatar-meher.jpg';

/*
 * Me: progress without pressure. The week shows the streak with a rest day
 * that keeps it safe, a weekly challenge Meher chose (task-based), and badges
 * for habits. Gold only marks rewards; nothing compares Meher with anyone else.
 */
const WEEK = [
  { day: 'Mon', state: 'won' },
  { day: 'Tue', state: 'won' },
  { day: 'Wed', state: 'rest' },
  { day: 'Thu', state: 'won' },
  { day: 'Fri', state: 'today' },
  { day: 'Sat', state: 'later' },
  { day: 'Sun', state: 'later' },
];

const BADGES = [
  { name: 'First routine', icon: 'routine', earned: true },
  { name: 'Planner', icon: 'calendar', earned: true },
  { name: 'Step by step', icon: 'tasks', earned: true },
  { name: '7 days', icon: 'star', earned: false },
];

function Day({ d }) {
  return (
    <li className={`cg-day cg-day--${d.state}`}>
      <span className="cg-day__dot">
        {d.state === 'won' || d.state === 'today' ? <Icon name="check" size={16} stroke={2.8} /> : null}
        {d.state === 'rest' ? <Icon name="moon" size={16} stroke={2.2} /> : null}
      </span>
      {d.day}
    </li>
  );
}

export function MeScreen({ nav }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-me-head">
        <img src={meherAvatar} alt="" width="64" height="64" />
        <div className="cg-head__text">
          <h1>Meher Singh</h1>
          <p>Steady pace · 3 wins a day</p>
        </div>
        <button type="button" className="cg-back" aria-label="Settings">
          <Icon name="settings" size={22} />
        </button>
      </header>

      <section className="cg-card cg-streak-card" aria-labelledby={titleId}>
        <div className="cg-streak-card__top">
          <Spark size={30} />
          <div>
            <h2 id={titleId}>5-day streak</h2>
            <p>Rest days keep your streak safe.</p>
          </div>
        </div>
        <ol className="cg-week" aria-label="This week: Monday, Tuesday and Thursday done, Wednesday a rest day, today in progress">
          {WEEK.map((d) => (
            <Day key={d.day} d={d} />
          ))}
        </ol>
      </section>

      <article className="cg-card cg-challenge2">
        <span className="cg-medal" aria-hidden="true">
          <Icon name="sunrise" size={24} stroke={2.2} />
        </span>
        <span className="cg-challenge2__text">
          <small>Your challenge this week</small>
          <b>Finish 3 tasks before noon</b>
          <span className="cg-meter">
            <span className="cg-meter__bars" aria-hidden="true">
              <i className="is-done" />
              <i className="is-done" />
              <i />
            </span>
            2 of 3
          </span>
        </span>
      </article>

      <div className="cg-badges-head">
        <h2>Badges</h2>
        <span>3 of 12</span>
      </div>
      <ul className="cg-badges">
        {BADGES.map((b) => (
          <li key={b.name} className={b.earned ? 'is-earned' : ''}>
            <span className="cg-badge">
              <Icon name={b.earned ? b.icon : 'lock'} size={24} stroke={2.2} />
            </span>
            {b.name}
          </li>
        ))}
      </ul>

      <TabBar active="me" nav={nav} />
    </div>
  );
}
