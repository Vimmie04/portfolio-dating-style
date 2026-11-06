import { useId } from 'react';
import { Avatar, StatusBar, TabBar } from '../kit.jsx';
import { Icon, Spark } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';

/*
 * Today: the home screen. One question answered: "what's the next small thing?"
 * - Today's wins (the daily goal Meher picked: Steady = 3) with Cogni
 * - Up next: one task, one step, a time in words, Start + Read aloud
 * - Two small doors: plan tomorrow (2 minutes) and the evening routine
 * At most three facts per card; gold only on rewards.
 */
const GOAL = 3;

// The steps of "Write a blog post" (step 1 is already done). Today, One step and
// Small win all read from here, so the prototype can walk through them in order.
export const NEXT_STEPS = {
  2: {
    step: 2,
    title: 'Choose a title',
    time: 'Takes about 10 minutes',
    help: 'Write a short title that says what your post is about.',
    spent: 4,
    about: 10,
    stuck: 'I can suggest a few titles.',
  },
  3: {
    step: 3,
    title: 'Write three short parts',
    time: 'Takes about 15 minutes',
    help: 'An opening, the main idea and an ending. A few lines each.',
    spent: 2,
    about: 15,
    stuck: 'I can help you start the first part.',
  },
  4: {
    step: 4,
    title: 'Read it aloud, then post',
    time: 'Takes about 5 minutes',
    help: 'Listen to your post once. Fix anything that sounds off, then post it.',
    spent: 1,
    about: 5,
    stuck: 'I can read it to you.',
  },
};

export function TodayScreen({ nav, done = 1, next = NEXT_STEPS[2] }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <header className="cg-top">
        <Avatar />
        <div className="cg-greet">
          <b>Hi, Meher</b>
          <span>Friday</span>
        </div>
        <span className="cg-streak" aria-label="You showed up 5 days in a row">
          <Spark size={20} />5-day streak
        </span>
      </header>

      <section className="cg-wins" aria-labelledby={titleId}>
        <span className="cg-wins__disc" aria-hidden="true" />
        <span className="cg-wins__cogni">
          <Cogni size={124} mood="wave" />
        </span>
        <p className="cg-wins__label">Today’s wins</p>
        <h1 id={titleId} className="cg-wins__title">
          {done >= GOAL ? `All ${GOAL} done` : `${done} of ${GOAL} done`}
        </h1>
        <p className="cg-wins__sub">Small steps count.</p>
        <ul className="cg-slots" aria-label={`${done} of ${GOAL} wins done`}>
          {Array.from({ length: GOAL }, (_, i) => (
            <li key={i} className={`cg-slot${i < done ? ' is-won' : ''}`}>
              {i < done && <Icon name="check" size={18} stroke={2.6} />}
            </li>
          ))}
        </ul>
      </section>

      <h2 className="cg-h2">Up next</h2>
      <article className="cg-card">
        <div className="cg-task">
          <span className="cg-tile-icon">
            <Icon name="pen" size={24} />
          </span>
          <div className="cg-task__name">
            <b>Write a blog post</b>
            <span className="cg-steps">
              <span className="cg-steps__bars" aria-hidden="true">
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className={n <= next.step ? 'is-done' : undefined} />
                ))}
              </span>
              Step {next.step} of 4
            </span>
          </div>
        </div>
        <div className="cg-step">
          <b>{next.title}</b>
          <span className="cg-meta">
            <Icon name="clock" size={18} />
            {next.time}
          </span>
        </div>
        <div className="cg-actions">
          <button type="button" className="cg-btn" onClick={() => nav?.('step')}>
            <Icon name="start" size={18} />
            Start this step
          </button>
          <button type="button" className="cg-round-btn" aria-label="Read aloud">
            <Icon name="readAloud" size={24} />
          </button>
        </div>
      </article>

      <div className="cg-tiles">
        <button type="button" className="cg-card cg-tile" onClick={() => nav?.('plan')}>
          <span className="cg-tile-icon">
            <Icon name="calendar" size={22} />
          </span>
          <span>
            <b>Plan tomorrow</b>
            <span className="cg-tile__meta">2 minutes</span>
          </span>
        </button>
        <button type="button" className="cg-card cg-tile" onClick={() => nav?.('routines')}>
          <span className="cg-tile-icon">
            <Icon name="moon" size={22} />
          </span>
          <span>
            <b>Evening routine</b>
            <span className="cg-tile__meta">3 steps</span>
          </span>
        </button>
      </div>

      <TabBar active="today" nav={nav} />
    </div>
  );
}
