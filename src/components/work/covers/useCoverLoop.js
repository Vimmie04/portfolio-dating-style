import { useEffect, useRef, useState } from 'react';

/* Shared plumbing for the animated project covers on the homepage. */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Adds a project's brand-font stylesheet once. */
export function useFontSheet(href) {
  useEffect(() => {
    if (document.querySelector(`link[data-href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.href = href;
    document.head.appendChild(link);
  }, [href]);
}

/**
 * Steps through `steps` ({ ms, ...state }) on repeat, only while the cover is on screen.
 * With reduced motion it holds `still` (the most telling frame) and never moves.
 */
export function useCoverLoop(steps, still = 0) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return undefined;
    const t = setTimeout(() => setI((i + 1) % steps.length), steps[i].ms);
    return () => clearTimeout(t);
  }, [i, visible, reduced, steps]);

  // Start from the beginning each time the cover comes back into view
  useEffect(() => {
    if (!visible) setI(0);
  }, [visible]);

  const index = reduced ? still : i;
  return { ref, index, step: steps[index], reduced };
}

/** The screen shown just before the current one (it stays solid underneath while the new one settles). */
export function previousScreen(steps, index, key = 'screen') {
  const now = steps[index][key];
  for (let k = 1; k < steps.length; k += 1) {
    const p = steps[(index - k + steps.length) % steps.length][key];
    if (p !== now) return p;
  }
  return null;
}
