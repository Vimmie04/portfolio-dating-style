import { useEffect, useRef, useState } from 'react';
import { ProductScreen } from './ProductScreen.jsx';
import { CsCalendar } from './screens/CsCalendar.jsx';
import './CalendarAnimation.css';

/*
 * Hero animation: the shipped CS Calendar, in a calm loop.
 * The month fills in → a cursor picks Saturday 25 → that day's deadlines slide into the panel
 * → the cursor rests on the first one → everything clears and it starts again.
 * Only the product's real states and data are used; reduced motion shows the finished state.
 */
// zoom: the camera moves in on Saturday 25 + the Deadlines panel so the moment is readable.
// One loop ≈ 6.5s (CSS transition lengths in csync-page.css are tuned to these steps).
const STEPS = [
  { ms: 400 }, // empty month
  { ms: 1000, events: true },
  { ms: 850, events: true, zoom: true, cursor: 'start' },
  { ms: 650, events: true, zoom: true, cursor: 'day' },
  { ms: 250, events: true, zoom: true, cursor: 'day', sel: true, click: true },
  { ms: 800, events: true, zoom: true, cursor: 'day', sel: true, dead: true },
  { ms: 1700, events: true, zoom: true, cursor: 'card', sel: true, dead: true, hover: true },
  { ms: 900 }, // clear + zoom out
];
const FINAL = { events: true, sel: true, dead: true };

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

function Cursor() {
  return (
    <svg className="cy-cursor__arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 2.8 18.6 15l-6.1.5 3.5 7.2-2.9 1.3-3.4-7.2L5 21.1z" fill="#16181d" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** onState (optional) hears each state change, so a page can sync its own extras to the loop. */
export function CalendarAnimation({ onState, children }) {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  // Only run while on screen
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

  // Restart from the top whenever it comes back into view
  useEffect(() => {
    if (!visible) setStep(0);
  }, [visible]);

  const s = reduced ? FINAL : STEPS[step];
  const flag = (on) => (on ? '' : undefined);

  useEffect(() => {
    onState?.(s);
  }, [s, onState]);

  return (
    <div
      ref={root}
      className="cy-cover cy-anim"
      data-events={flag(s.events)}
      data-sel={flag(s.sel)}
      data-dead={flag(s.dead)}
      data-hover={flag(s.hover)}
      data-zoom={flag(s.zoom)}
      data-cursor={s.cursor || undefined}
    >
      <div className="cy-camera">
        <span className="cy-cover__disc" aria-hidden="true" />
        <span className="cy-cover__ring" aria-hidden="true" />
        <div className="cy-cover__win">
          <ProductScreen
            compact
            note={null}
            label="Animation of the CSync CS Calendar: April 2026 fills with memos, invoices and tasks, then Saturday 25 April is selected and its three deadlines appear."
          >
            <CsCalendar
              overlay={
                <>
                  <span className="cy-cursor">
                    <Cursor />
                  </span>
                  {s.click && <span className="cy-ripple" />}
                </>
              }
            />
          </ProductScreen>
        </div>
      </div>
      {children}
    </div>
  );
}
