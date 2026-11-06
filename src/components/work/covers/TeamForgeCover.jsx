import PhoneMockup from '../../case-study/PhoneMockup.jsx';
import { Avatar } from '../../../case-studies/team-forge/kit.jsx';
import { HomeScreen, SubmitScreen, TaskDetailScreen } from '../../../case-studies/team-forge/screens/Work.jsx';
import { ApprovalsScreen, InReviewScreen, RecognisedScreen } from '../../../case-studies/team-forge/screens/Review.jsx';
import '../../../case-studies/team-forge/tf.css';
import { previousScreen, useCoverLoop, useFontSheet } from './useCoverLoop.js';
import './covers.css';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Fustat:wght@400;500;600;700;800&family=Poppins:wght@600&display=swap';

/*
 * Team Forge's real loop, on two phones (~10 s):
 * Riya opens her next task → Submit work → Send for review → In review.
 * Neha (team lead, phone behind) taps Approve on Riya's card.
 * Riya sees "Approved by Neha, +50 XP" (40 for the task + 10 kudos). Then it starts over.
 * Only the shipped case-study screens; tap points are the buttons' centres in 390 × 844 space.
 */
const STEPS = [
  { ms: 1300, screen: 'home' },
  { ms: 450, screen: 'home', tap: ['riya', 195, 505] },
  { ms: 1100, screen: 'task' },
  { ms: 450, screen: 'task', tap: ['riya', 227, 781] },
  { ms: 1000, screen: 'submit' },
  { ms: 450, screen: 'submit', tap: ['riya', 195, 746] },
  { ms: 1300, screen: 'review', neha: true },
  { ms: 550, screen: 'review', neha: true, tap: ['neha', 263, 494] },
  { ms: 2800, screen: 'approved', won: true },
  { ms: 500, screen: 'home' },
];
const STILL = 8; // reduced motion: the approved moment

// [screen, component, how it arrives]: the submit sheet sits on the task screen, so it fades in
const RIYA = [
  ['home', HomeScreen, 'fade'],
  ['task', TaskDetailScreen, 'push'],
  ['submit', SubmitScreen, 'fade'],
  ['review', InReviewScreen, 'push'],
  ['approved', RecognisedScreen, 'rise'],
];

export default function TeamForgeCover() {
  useFontSheet(FONTS);
  const { ref, index, step: s, reduced } = useCoverLoop(STEPS, STILL);
  const prev = reduced ? null : previousScreen(STEPS, index);
  const layer = (id, enter) => `cover__layer cover__layer--${enter}${s.screen === id ? ' is-on' : ''}${prev === id ? ' is-prev' : ''}`;
  const tap = (who) => s.tap?.[0] === who && <span key={index} className="cover__tap" style={{ left: s.tap[1], top: s.tap[2] }} />;

  return (
    <>
      <div ref={ref} className="preview__sketch cover cover--tf" aria-hidden="true">
        <span className="cover__disc" />

        <div className={`cover__phone cover__phone--back${s.neha ? ' is-active' : ''}`}>
          <PhoneMockup width="100%" tone="midnight">
            <div className="cover__flow">
              <ApprovalsScreen />
              {tap('neha')}
            </div>
          </PhoneMockup>
          <span className="cover__who">Neha · team lead</span>
        </div>

        <div className="cover__phone cover__phone--front">
          <PhoneMockup width="100%" tone="midnight">
            <div className="cover__flow">
              {RIYA.map(([id, Screen, enter]) => (
                <div key={id} className={layer(id, enter)}>
                  <Screen />
                </div>
              ))}
              {tap('riya')}
            </div>
          </PhoneMockup>
          <span className="cover__who">Riya · intern</span>
        </div>
      </div>

      <div className={`tf cover__float cover__float--tf${s.won ? ' is-on' : ''}`} aria-hidden="true">
        <Avatar person="neha" size={36} />
        <span>
          <b>Approved by Neha</b>
          <small>
            <span className="cover__xp">+50 XP</span> · just now
          </small>
        </span>
      </div>
    </>
  );
}
