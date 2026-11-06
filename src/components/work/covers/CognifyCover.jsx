import PhoneMockup from '../../case-study/PhoneMockup.jsx';
import { FONTS } from '../../../case-studies/cognify/kit.jsx';
import { Spark } from '../../../case-studies/cognify/icons.jsx';
import { NEXT_STEPS, TodayScreen } from '../../../case-studies/cognify/screens/Today.jsx';
import { OneStepScreen } from '../../../case-studies/cognify/screens/OneStep.jsx';
import { SmallWinScreen } from '../../../case-studies/cognify/screens/SmallWin.jsx';
import { previousScreen, useCoverLoop, useFontSheet } from './useCoverLoop.js';
import './covers.css';

/*
 * Cognify's core loop in one phone, the same one as the case-study hero (~8.7 s):
 * Today (1 of 3) → "Start this step" → One step at a time → "I've done this step" →
 * Small win (the second slot fills gold) → "Take a break" → Today, now 2 of 3. Then over.
 * One phone on purpose: one small thing at a time. The streak chip (the real one from
 * Today's header) lifts off the paper while the win is celebrated.
 * Tap points are the buttons' centres in the screen's 390 × 844 space.
 */
const STEPS = [
  { ms: 1300, screen: 'a' },
  { ms: 450, screen: 'a', tap: [163, 543] },
  { ms: 1700, screen: 'step' },
  { ms: 450, screen: 'step', tap: [163, 735] },
  { ms: 2100, screen: 'win', won: true },
  { ms: 450, screen: 'win', won: true, tap: [195, 783] },
  { ms: 1700, screen: 'b' },
  { ms: 600, screen: 'a' },
];
const STILL = 4; // reduced motion: the small win

// [id, how it arrives, screen]
const LAYERS = [
  ['a', 'fade', () => <TodayScreen done={1} />],
  ['step', 'push', () => <OneStepScreen />],
  ['win', 'rise', () => <SmallWinScreen />],
  ['b', 'fade', () => <TodayScreen done={2} next={NEXT_STEPS[3]} />],
];

export default function CognifyCover() {
  useFontSheet(FONTS);
  const { ref, index, step: s, reduced } = useCoverLoop(STEPS, STILL);
  const prev = reduced ? null : previousScreen(STEPS, index);
  const layer = (id, enter) => `cover__layer cover__layer--${enter}${s.screen === id ? ' is-on' : ''}${prev === id ? ' is-prev' : ''}`;

  return (
    <>
      <div ref={ref} className="preview__sketch cover cover--cg" aria-hidden="true">
        <span className="cover__disc" />
        <div className="cover__phone cover__phone--solo">
          <PhoneMockup width="100%" tone="midnight">
            <div className="cover__flow">
              {LAYERS.map(([id, enter, render]) => (
                <div key={id} className={layer(id, enter)} data-id={id}>
                  {render()}
                </div>
              ))}
              {s.tap && <span key={index} className="cover__tap" style={{ left: s.tap[0], top: s.tap[1] }} />}
            </div>
          </PhoneMockup>
        </div>
      </div>

      <div className={`cg cover__float cover__float--cg${s.won ? ' is-on' : ''}`} aria-hidden="true">
        <span className="cg-streak">
          <Spark size={20} />
          5-day streak
        </span>
      </div>
    </>
  );
}
