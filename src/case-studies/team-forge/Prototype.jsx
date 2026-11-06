import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import { useToast } from '../../components/toast/Toast.jsx';
import { teamForge } from './content.js';
import { SCREENS, SCREEN_ORDER } from './screens/index.js';

const { steps, notInPrototype } = teamForge.prototype;

const HINTS = {
  welcome: 'Tap “Get started”.',
  role: 'Pick any sign-in option.',
  home: 'Tap the Instagram captions task.',
  homeAfter: 'Open Profile in the tab bar to see your wins.',
  tasks: 'Tap any task to open it.',
  task: 'Tap “Submit work”.',
  submit: 'Tap “Send for review”.',
  review: 'Now see the other side: switch to Neha’s phone.',
  approvals: 'Tap “Approve” on Riya’s card.',
  approved: 'Tap “Keep going”.',
  wins: 'Open Profile in the tab bar.',
  profile: 'Tap the Four-Digit Club certificate.',
  certificate: 'That’s the whole loop. Restart, or explore the tabs.',
};

// iOS-style push: the new screen slides in (opaque) over the old one; going back reverses it.
const variants = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-28%', zIndex: d > 0 ? 2 : 1, filter: d > 0 ? 'brightness(1)' : 'brightness(0.88)' }),
  center: { x: '0%', filter: 'brightness(1)', transitionEnd: { zIndex: 1 } },
  exit: (d) => ({ x: d > 0 ? '-28%' : '100%', zIndex: d > 0 ? 1 : 2, filter: d > 0 ? 'brightness(0.88)' : 'brightness(1)' }),
};

function TapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10l4.6.9a2 2 0 0 1 1.6 2.2l-.6 4.6A3 3 0 0 1 14.6 20H11a3 3 0 0 1-2.4-1.2L5.5 14.6a1.5 1.5 0 0 1 2.2-2L9 14" />
      <path d="M6 4.5a5 5 0 0 1 9 0" />
    </svg>
  );
}

/** Tap-through prototype: the real screens, wired together. */
export default function Prototype() {
  const toast = useToast();
  const [state, setState] = useState({ screen: 'welcome', dir: 1, seen: ['welcome'], lastRiya: 'welcome' });
  const deviceRef = useRef(null);
  const screenRef = useRef(null);
  const refocus = useRef(false);
  const { screen, dir, seen } = state;
  const meta = SCREENS[screen];
  const Screen = meta.Component;

  const go = (id) => {
    if (!SCREENS[id]) {
      toast(notInPrototype);
      return;
    }
    if (id === screen) return;
    // Only move focus if the person was using the phone itself (not the side panel).
    refocus.current = Boolean(deviceRef.current?.contains(document.activeElement));
    setState((s) => ({
      screen: id,
      dir: SCREEN_ORDER.indexOf(id) >= SCREEN_ORDER.indexOf(s.screen) ? 1 : -1,
      seen: s.seen.includes(id) ? s.seen : [...s.seen, id],
      lastRiya: SCREENS[id].who === 'Riya' ? id : s.lastRiya,
    }));
  };

  // Keyboard users land on the new screen instead of losing focus.
  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    screenRef.current?.focus({ preventScroll: true });
  }, [screen]);

  const restart = () => {
    refocus.current = false;
    setState({ screen: 'welcome', dir: -1, seen: ['welcome'], lastRiya: 'welcome' });
  };

  const hint = screen === 'home' && seen.includes('approved') ? HINTS.homeAfter : HINTS[screen];
  const n = String(SCREEN_ORDER.indexOf(screen) + 1).padStart(2, '0');

  const device = (
    <div className="cs-proto__device" aria-label="Team Forge prototype" role="group" ref={deviceRef}>
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
              <Screen nav={go} />
            </motion.div>
          </AnimatePresence>
        </PhoneMockup>
    </div>
  );

  // Order: tip → phone → jump list, so on small screens the tip sits above the phone.
  return (
    <div className="cs-proto">
      <div className="cs-proto__panel cs-proto__head">
        <div className="cs-proto__who" role="group" aria-label="Whose phone">
          <button type="button" aria-pressed={meta.who === 'Riya'} onClick={() => meta.who !== 'Riya' && go(state.lastRiya)}>
            Riya · intern
          </button>
          <button type="button" aria-pressed={meta.who === 'Neha'} onClick={() => go('approvals')}>
            Neha · team lead
          </button>
        </div>

        <div className="cs-proto__now" aria-live="polite">
          <p className="cs-mini">
            Screen {n} of {SCREEN_ORDER.length} · {meta.who}’s phone
          </p>
          <p className="cs-proto__screen-title">{meta.title}</p>
          <p className="cs-proto__caption">{meta.caption}</p>
          <p className="cs-proto__hint">
            <TapIcon />
            {hint}
          </p>
        </div>

        {screen === 'review' && (
          <button type="button" className="cs-proto__switch" onClick={() => go('approvals')}>
            Switch to Neha’s phone
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        )}
      </div>

      {device}

      <div className="cs-proto__panel cs-proto__nav">
        <div>
          <p className="cs-mini" style={{ marginBottom: 10, color: 'var(--on-ink-muted)' }}>
            Jump to
          </p>
          <ol className="cs-proto__steps">
            {steps.map((st, i) => (
              <li key={st.id}>
                <button
                  type="button"
                  className={`${screen === st.id ? 'is-current' : ''} ${seen.includes(st.id) ? 'is-seen' : ''}`}
                  aria-current={screen === st.id ? 'step' : undefined}
                  onClick={() => go(st.id)}
                >
                  <span className="cs-mini">{i + 1}</span>
                  {st.label}
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
