import { useEffect, useRef, useState } from 'react';
import PixelSprite, { SPRITES } from '../pixel/PixelSprite.jsx';
import './PixelCursor.css';

/**
 * Context-aware 8-bit cursor.
 *
 * Any element can opt into a state with data attributes:
 *   data-cursor="like" | "open" | "connect" | "hand" | "default"
 *   data-cursor-label="OPEN FILE"   (optional badge text override)
 *   data-no-cursor-burst            (element draws its own click burst)
 * Links and buttons fall back to the pixel hand.
 *
 * Swipe interactions call setCursorSwipe('left' | 'right' | null).
 */

const SCALE = 2;
const INTERACTIVE = '[data-cursor], a[href], button, [role="button"], label, select, summary';
const DEFAULT_LABELS = { like: 'LIKE', open: 'OPEN FILE', connect: 'CONNECT', left: 'LEFT', right: 'RIGHT' };
const SPRITE_FOR = {
  default: 'arrow',
  hand: 'hand',
  like: 'arrow',
  connect: 'arrow',
  open: 'magnifier',
  left: 'hand',
  right: 'hand',
};
const TRAIL = 3;

export function setCursorSwipe(dir) {
  window.dispatchEvent(new CustomEvent('pixelcursor:swipe', { detail: { dir } }));
}

function hotspotOffset(kind) {
  const [hx, hy] = SPRITES[SPRITE_FOR[kind] ?? 'arrow'].hotspot;
  return `translate(${-hx * SCALE}px, ${-hy * SCALE}px)`;
}

export default function PixelCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ kind: 'default', label: null });
  const rootRef = useRef(null);
  const trailRefs = useRef([]);
  const burstRef = useRef(null);

  // Only on devices with a real hovering pointer; touch stays native.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = rootRef.current;
    const html = document.documentElement;
    html.classList.add('pixel-cursor-on');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const trail = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }));
    let visible = false;
    let raf = 0;
    let lastKey = '';
    let swipeDir = null;
    let hoverEl = null;

    const resolve = (node) => {
      if (swipeDir) return { kind: swipeDir, label: DEFAULT_LABELS[swipeDir] };
      const hit = node && node.closest ? node.closest(INTERACTIVE) : null;
      if (!hit) return { kind: 'default', label: null };
      const kind = hit.getAttribute('data-cursor') || 'hand';
      const label = hit.getAttribute('data-cursor-label') || DEFAULT_LABELS[kind] || null;
      return { kind, label };
    };

    const apply = (next) => {
      const key = `${next.kind}|${next.label ?? ''}`;
      if (key !== lastKey) {
        lastKey = key;
        setState(next);
      }
    };

    const show = () => {
      if (visible) return;
      visible = true;
      pos.x = target.x;
      pos.y = target.y;
      trail.forEach((t) => {
        t.x = target.x;
        t.y = target.y;
      });
      // Data attributes, not classes: React owns className and would wipe these on re-render.
      el.dataset.visible = 'true';
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      target.x = e.clientX;
      target.y = e.clientY;
      show();
      hoverEl = e.target;
      apply(resolve(e.target));
    };

    const onOut = (e) => {
      if (!e.relatedTarget) {
        visible = false;
        delete el.dataset.visible;
      }
    };

    const spawnBurst = (x, y, hearts) => {
      const layer = burstRef.current;
      if (!layer) return;
      const count = 8;
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const dist = 16 + Math.random() * 14;
        const p = document.createElement('span');
        p.className = hearts ? 'pixel-particle pixel-particle--heart' : 'pixel-particle';
        if (!hearts && i % 2) p.classList.add('pixel-particle--ink');
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty('--dx', `${Math.round((Math.cos(angle) * dist) / 2) * 2}px`);
        p.style.setProperty('--dy', `${Math.round((Math.sin(angle) * dist) / 2) * 2}px`);
        p.addEventListener('animationend', () => p.remove(), { once: true });
        layer.appendChild(p);
      }
    };

    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      el.dataset.pressed = 'true';
      const ownsBurst = e.target.closest && e.target.closest('[data-no-cursor-burst]');
      if (!reduce.matches && !ownsBurst) spawnBurst(e.clientX, e.clientY, lastKey.startsWith('like'));
    };

    const onUp = () => delete el.dataset.pressed;

    const onSwipe = (e) => {
      swipeDir = e.detail?.dir ?? null;
      apply(resolve(hoverEl));
    };

    // Content scrolls under a still mouse: re-check what we're hovering.
    const onScroll = () => {
      if (!visible) return;
      hoverEl = document.elementFromPoint(target.x, target.y);
      apply(resolve(hoverEl));
    };

    const tick = () => {
      const k = reduce.matches ? 1 : 0.38;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${Math.round(pos.x)}px, ${Math.round(pos.y)}px, 0)`;

      let px = pos.x;
      let py = pos.y;
      trail.forEach((t, i) => {
        const f = 0.32 - i * 0.07;
        t.x += (px - t.x) * f;
        t.y += (py - t.y) * f;
        const node = trailRefs.current[i];
        if (node) {
          const dist = Math.hypot(pos.x - t.x, pos.y - t.y);
          const alpha = reduce.matches || !visible ? 0 : Math.min(dist / 28, 1) * (0.55 - i * 0.14);
          // Snap to a 2px grid so the trail reads as pixels, not blur.
          node.style.transform = `translate3d(${Math.round(t.x / 2) * 2}px, ${Math.round(t.y / 2) * 2}px, 0)`;
          node.style.opacity = alpha.toFixed(2);
        }
        px = t.x;
        py = t.y;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pixelcursor:swipe', onSwipe);
    document.addEventListener('mouseout', onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pixelcursor:swipe', onSwipe);
      document.removeEventListener('mouseout', onOut);
      html.classList.remove('pixel-cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;

  const { kind, label } = state;
  const sprite = SPRITE_FOR[kind] ?? 'arrow';

  return (
    <div className="pixel-cursor-layer" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span
          key={i}
          ref={(n) => {
            trailRefs.current[i] = n;
          }}
          className="pixel-cursor__trail"
        />
      ))}
      <div ref={rootRef} className={`pixel-cursor pixel-cursor--${kind}`}>
        <div key={sprite} className="pixel-cursor__sprite" style={{ transform: hotspotOffset(kind) }}>
          <PixelSprite sprite={sprite} scale={SCALE} />
        </div>
        {label && (
          <span key={`${kind}-${label}`} className="pixel-cursor__badge">
            {kind === 'like' && <PixelSprite sprite="heart" scale={1} palette={{ B: '#8FA2FF' }} />}
            {kind === 'left' && '◀ '}
            {label}
            {kind === 'right' && ' ▶'}
            {kind === 'connect' && ' ↗'}
          </span>
        )}
      </div>
      <div ref={burstRef} className="pixel-cursor__bursts" />
    </div>
  );
}
