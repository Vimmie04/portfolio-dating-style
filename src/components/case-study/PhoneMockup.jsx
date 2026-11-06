import { useLayoutEffect, useRef, useState } from 'react';
import './PhoneMockup.css';

// Device frame size; screens are designed at 390 × 844 (iPhone 15 / 16).
const FRAME_W = 414;

/**
 * A realistic phone mockup that scales its 390 × 844 screen to any width.
 * - interactive=false (default): the screen is a picture; its buttons are inert
 *   and screen readers get `label` instead.
 * - interactive=true: the screen is live (used by the tap-through prototype).
 */
export default function PhoneMockup({ children, width = 280, label, interactive = false, tone = 'titanium', className = '' }) {
  const ref = useRef(null);
  const screenRef = useRef(null);
  const [scale, setScale] = useState(typeof width === 'number' ? width / FRAME_W : 0.6);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Layout width (ignores 3D tilts and scales on ancestors, unlike getBoundingClientRect).
    const update = () => setScale(parseFloat(getComputedStyle(el).width) / FRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // React 18 has no `inert` prop: set it directly so decorative screens can't be tabbed into.
  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    if (interactive) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [interactive]);

  return (
    <div
      ref={ref}
      className={`phone phone--${tone} ${className}`}
      style={{ '--phone-w': typeof width === 'number' ? `${width}px` : width }}
      role={interactive ? undefined : 'img'}
      aria-label={interactive ? undefined : label}
    >
      <div className="phone__scaler" style={{ transform: `scale(${scale})` }}>
        <div className="phone__body">
          <i className="phone__btn phone__btn--action" />
          <i className="phone__btn phone__btn--up" />
          <i className="phone__btn phone__btn--down" />
          <i className="phone__btn phone__btn--power" />
          <div className="phone__bezel">
            <div className="phone__screen" ref={screenRef} aria-hidden={interactive ? undefined : 'true'}>
              {children}
              <span className="phone__island" aria-hidden="true" />
              <span className="phone__indicator" aria-hidden="true" />
              <span className="phone__glare" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
