import { useLayoutEffect, useRef, useState } from 'react';
import './csync-frame.css';

/* The company owns CSync and its designs. Shown under every product screen. */
export const OWNERSHIP_NOTE =
  'CSync and these designs are the property of Intellosoft Infotech Private Limited. Rebuilt from the shipped product, without changes, for portfolio purposes only.';

const CANVAS_W = 1536;
const CANVAS_H = 736;

/**
 * A shipped CSync screen in a browser window, scaled to fit its container.
 * The screen itself is never reflowed: it is the 1536 × 736 canvas, scaled.
 */
export function ProductScreen({ children, title, note = OWNERSHIP_NOTE, url = 'csync.co', compact = false, label }) {
  const viewport = useRef(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;
    // Layout width, not the on-screen box: an ancestor may be zoomed with a transform (hero camera)
    const fit = (w) => setScale(w / CANVAS_W);
    fit(el.offsetWidth);
    const ro = new ResizeObserver(([entry]) => fit(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="cx-shot">
      <div className={`cx-window${compact ? ' cx-window--compact' : ''}`} role={label ? 'img' : undefined} aria-label={label}>
        <div className="cx-window__bar" aria-hidden="true">
          <span className="cx-window__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="cx-window__url">{url}</span>
        </div>
        <div ref={viewport} className="cx-window__view" style={{ height: CANVAS_H * scale }}>
          {/* --s lets overlays (note markers) keep a constant on-screen size at any scale */}
          <div className="cx-window__canvas" style={{ transform: `scale(${scale})`, '--s': scale }} aria-hidden={label ? 'true' : undefined}>
            {children}
          </div>
        </div>
      </div>
      {(title || note) && (
        <figcaption>
          {title && <b>{title}</b>}
          {note && <small>{note}</small>}
        </figcaption>
      )}
    </figure>
  );
}
