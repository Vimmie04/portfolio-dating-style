import { useCallback, useState } from 'react';
import { CalendarAnimation } from '../../../case-studies/csync/CalendarAnimation.jsx';
import { DeadlineCard } from '../../../case-studies/csync/screens/CsCalendar.jsx';
import { useFontSheet } from './useCoverLoop.js';
import './covers.css';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;800&display=swap';

/*
 * CSync: the shipped CS Calendar loop from the case study (month fills in → Saturday 25 is
 * picked → its deadlines slide in). When the cursor rests on the first deadline, that real
 * card lifts off the screen and over the paper's edge. The company owns the designs, so a
 * short ownership line sits on the stage.
 */
export default function CsyncCover() {
  useFontSheet(FONTS);
  const [lift, setLift] = useState(false);
  // Lift while the cursor hovers the card; reduced motion (the finished, un-zoomed state) keeps it lifted
  const onState = useCallback((s) => setLift(Boolean(s.hover || (s.dead && !s.zoom))), []);

  return (
    <>
      <div className="preview__sketch cover cover--cy" aria-hidden="true">
        <CalendarAnimation onState={onState}>
          <p className="cover__own">Designs © Intellosoft Infotech Private Limited</p>
        </CalendarAnimation>
      </div>

      <div className={`cx-vars cover__float cover__float--cy${lift ? ' is-on' : ''}`} aria-hidden="true">
        <DeadlineCard />
      </div>
    </>
  );
}
