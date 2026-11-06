import { useState } from 'react';
import { ProductScreen } from './ProductScreen.jsx';

/**
 * A shipped screen with numbered notes. The markers sit on the screen (in its own
 * 1536 × 736 coordinates); the list below carries the words, so screen readers get
 * the notes and the picture is decoration. Hovering a note highlights its marker.
 *
 * <AnnotatedScreen screen={CsCalendar} notes={[{ title, text, at: [x, y] }]} label="…" />
 */
export function AnnotatedScreen({ screen: Screen, notes, label }) {
  const [active, setActive] = useState(null);

  const markers = notes.map((n, i) => (
    <span key={n.title} className={`cy-mark${active === i ? ' is-active' : ''}`} style={{ left: n.at[0], top: n.at[1] }} aria-hidden="true">
      {i + 1}
    </span>
  ));

  return (
    <div className="cy-annotated">
      <ProductScreen label={label}>
        <Screen overlay={markers} />
      </ProductScreen>
      <ol className="cy-notes">
        {notes.map((n, i) => (
          <li key={n.title} className={active === i ? 'is-active' : undefined} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <span className="cy-notes__n" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              <b>{n.title}</b>
              {n.text}
              {n.law && (
                <span className="cy-law">
                  <span className="cs-mini">UX principle</span>
                  <strong>{n.law}</strong>
                  <span>{n.why}</span>
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
