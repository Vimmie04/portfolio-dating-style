import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import { useToast } from '../../components/toast/Toast.jsx';
import { SCREENS, SCREEN_ORDER } from './screens/index.js';
import { NEXT_STEPS } from './screens/Today.jsx';

const NOT_IN_PROTOTYPE = 'That part isn’t in this prototype. Try the highlighted buttons.';

const HINTS = {
  welcome: 'Tap “Get started”.',
  pace: 'Tap “Continue”.',
  today: 'Tap “Start this step”.',
  todayDone: 'All 3 wins done. Explore the tabs: Tasks, Ask Cogni, Routines and Me.',
  step: 'Tap “I’ve done this step”.',
  win: 'Tap “Keep going”, or take a break.',
  tasks: 'Tap “Plan tomorrow”.',
  plan: 'Tap “Save my plan”.',
  breakdown: 'Tap “Save steps”.',
  routines: 'Tap Ask Cogni in the middle of the tab bar.',
  cogni: 'Tap “Make it simpler”.',
  answer: 'Tap “Add Send by Friday to Tasks”.',
  me: 'That’s the tour. Restart, or explore the tabs.',
};

const START = { screen: 'welcome', dir: 1, seen: ['welcome'], progress: 0, win: null };

// Slide in (opaque) over the old screen; going back reverses it.
const variants = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-28%', zIndex: d > 0 ? 2 : 1, filter: d > 0 ? 'brightness(1)' : 'brightness(0.9)' }),
  center: { x: '0%', filter: 'brightness(1)', transitionEnd: { zIndex: 1 } },
  exit: (d) => ({ x: d > 0 ? '-28%' : '100%', zIndex: d > 0 ? 1 : 2, filter: d > 0 ? 'brightness(0.9)' : 'brightness(1)' }),
};

function TapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10l4.6.9a2 2 0 0 1 1.6 2.2l-.6 4.6A3 3 0 0 1 14.6 20H11a3 3 0 0 1-2.4-1.2L5.5 14.6a1.5 1.5 0 0 1 2.2-2L9 14" />
      <path d="M6 4.5a5 5 0 0 1 9 0" />
    </svg>
  );
}

/**
 * Tap-through prototype: the real screens, wired together.
 * It remembers the blog post's progress, so finishing a step moves Today on
 * (1 of 3 → 2 of 3 → all 3) and the next step is the right one.
 */
export default function Prototype() {
  const toast = useToast();
  const [state, setState] = useState(START);
  const deviceRef = useRef(null);
  const screenRef = useRef(null);
  const refocus = useRef(false);
  const { screen, dir, seen, progress } = state;
  const meta = SCREENS[screen];
  const Screen = meta.Component;

  const go = (id) => {
    if (!SCREENS[id]) {
      toast(NOT_IN_PROTOTYPE);
      return;
    }
    if (id === screen) return;
    refocus.current = Boolean(deviceRef.current?.contains(document.activeElement));
    setState((s) => {
      let { progress: p, win } = s;
      // Finishing a step: record the win and move the blog post on by one step
      if (id === 'win' && s.screen === 'step') {
        const finished = Math.min(2 + p, 4);
        p = Math.min(p + 1, 3);
        win = { finished: NEXT_STEPS[finished].title, done: 1 + p, next: NEXT_STEPS[finished + 1] || null };
      }
      return {
        screen: id,
        dir: SCREEN_ORDER.indexOf(id) >= SCREEN_ORDER.indexOf(s.screen) ? 1 : -1,
        seen: s.seen.includes(id) ? s.seen : [...s.seen, id],
        progress: p,
        win,
      };
    });
  };

  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    screenRef.current?.focus({ preventScroll: true });
  }, [screen]);

  const restart = () => {
    refocus.current = false;
    setState({ ...START, dir: -1 });
  };

  // Each screen gets the progress it should show
  const current = NEXT_STEPS[Math.min(2 + progress, 4)];
  const props = {
    today: { done: Math.min(1 + progress, 3), next: current },
    step: { item: current },
    win: state.win || {},
  }[screen];

  const hint = screen === 'today' && progress >= 2 ? HINTS.todayDone : HINTS[screen];
  const n = String(SCREEN_ORDER.indexOf(screen) + 1).padStart(2, '0');

  return (
    <div className="cs-proto cgp-proto">
      <div className="cs-proto__panel cs-proto__head">
        <div className="cs-proto__now" aria-live="polite">
          <p className="cs-mini">
            Screen {n} of {SCREEN_ORDER.length}
          </p>
          <p className="cs-proto__screen-title">{meta.title}</p>
          <p className="cs-proto__caption">{meta.caption}</p>
          <p className="cs-proto__hint">
            <TapIcon />
            {hint}
          </p>
        </div>
      </div>

      <div className="cs-proto__device" aria-label="Cognify prototype" role="group" ref={deviceRef}>
        <PhoneMockup width="100%" interactive tone="midnight">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={screen}
              ref={screenRef}
              tabIndex={-1}
              className="cs-proto__screen"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              aria-label={`${meta.title} screen`}
              style={{ outline: 'none' }}
            >
              <Screen nav={go} {...props} />
            </motion.div>
          </AnimatePresence>
        </PhoneMockup>
      </div>

      <div className="cs-proto__panel cs-proto__nav">
        <div>
          <p className="cs-mini" style={{ marginBottom: 10, color: 'var(--on-ink-muted)' }}>
            Jump to
          </p>
          <ol className="cs-proto__steps">
            {SCREEN_ORDER.map((id, i) => (
              <li key={id}>
                <button
                  type="button"
                  className={`${screen === id ? 'is-current' : ''} ${seen.includes(id) ? 'is-seen' : ''}`}
                  aria-current={screen === id ? 'step' : undefined}
                  onClick={() => go(id)}
                >
                  <span className="cs-mini">{i + 1}</span>
                  {SCREENS[id].title}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="cs-proto__foot">
          <button type="button" className="cs-proto__restart" onClick={restart}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5V6H6" />
            </svg>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
