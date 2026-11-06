import { useEffect, useRef, useState } from 'react';
import PhoneMockup from '../../components/case-study/PhoneMockup.jsx';
import { NEXT_STEPS, TodayScreen } from './screens/Today.jsx';
import { OneStepScreen } from './screens/OneStep.jsx';
import { SmallWinScreen } from './screens/SmallWin.jsx';

/*
 * Hero animation: Cognify's core loop in one phone, on repeat (~8 s).
 * Today (1 of 3) → tap "Start this step" → One step at a time → tap "I've done
 * this step" → Small win (the second win fills gold) → tap "Take a break" →
 * Today again, now 2 of 3 with the next step ready. Then it starts over.
 * Only the real screens and data; reduced motion shows the Today screen still.
 * Tap points are the buttons' centres in the screen's 390 × 844 space.
 */
const STEPS = [
  { ms: 1300, screen: 'a', stage: 0 },
  { ms: 450, screen: 'a', stage: 0, tap: [163, 543] },
  { ms: 1700, screen: 'step', stage: 1 },
  { ms: 450, screen: 'step', stage: 1, tap: [163, 735] },
  { ms: 2100, screen: 'win', stage: 2 },
  { ms: 450, screen: 'win', stage: 2, tap: [195, 783] },
  { ms: 1700, screen: 'b', stage: 0 },
  { ms: 600, screen: 'a', stage: 0 },
];

const STAGES = ['Pick the next step', 'Focus on one step', 'Celebrate the win'];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function HeroAnimation() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return undefined;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].ms);
    return () => clearTimeout(t);
  }, [step, visible, reduced]);

  useEffect(() => {
    if (!visible) setStep(0);
  }, [visible]);

  const s = reduced ? STEPS[0] : STEPS[step];
  // The screen we came from stays solid underneath while the new one settles in (no see-through crossfade)
  const prev = (() => {
    for (let k = 1; k < STEPS.length; k += 1) {
      const p = STEPS[(step - k + STEPS.length) % STEPS.length].screen;
      if (p !== s.screen) return p;
    }
    return null;
  })();
  const layer = (id) => `cgp-layer cgp-layer--${id}${s.screen === id ? ' is-on' : ''}${!reduced && prev === id ? ' is-prev' : ''}`;

  return (
    <div ref={root} className="cgp-anim" data-screen={s.screen}>
      <span className="cs-cover__ring" aria-hidden="true" />
      <span className="cs-cover__disc" aria-hidden="true" />

      <div className="cgp-anim__phone">
        <PhoneMockup
          width="var(--w)"
          tone="midnight"
          label="Animation of Cognify: on Today, Meher starts the next step, focuses on it one step at a time, finishes it and sees a small win, then Today shows 2 of 3 wins done."
        >
          <div className="cgp-flow">
            <div className={layer('a')}>
              <TodayScreen done={1} />
            </div>
            <div className={layer('step')}>
              <OneStepScreen />
            </div>
            <div className={layer('win')}>
              <SmallWinScreen />
            </div>
            <div className={layer('b')}>
              <TodayScreen done={2} next={NEXT_STEPS[3]} />
            </div>
            {s.tap && <span key={step} className="cgp-tap" style={{ left: s.tap[0], top: s.tap[1] }} />}
          </div>
        </PhoneMockup>
      </div>

      <ol className="cgp-anim__stages" aria-hidden="true">
        {STAGES.map((label, i) => (
          <li key={label} className={s.stage === i ? 'is-on' : undefined}>
            <span>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
