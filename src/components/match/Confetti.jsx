import { useMemo } from 'react';

const COLORS = ['#1F44FF', '#0F0F12', '#AFC0FF', '#E6E9FF', '#17B26A'];

/** Pixel confetti + tiny pixel hearts, fired once on mount. Pure CSS animation. */
export default function Confetti({ count = 44 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = -Math.PI + Math.random() * Math.PI; // upper half
        const dist = 120 + Math.random() * 220;
        const heart = i % 6 === 0;
        const size = [4, 6, 8][i % 3];
        return {
          heart,
          dx: Math.round(Math.cos(angle) * dist),
          dy: Math.round(Math.sin(angle) * dist * 0.85),
          rot: Math.round((Math.random() - 0.5) * 540),
          dur: Math.round(1100 + Math.random() * 900),
          delay: Math.round(Math.random() * 140),
          w: heart ? 14 : size,
          h: heart ? 12 : size,
          color: COLORS[i % COLORS.length],
        };
      }),
    [count],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={`confetti__p ${p.heart ? 'confetti__p--heart' : ''}`}
          style={{
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            width: p.w,
            height: p.h,
            background: p.heart ? undefined : p.color,
            animationDuration: `${p.dur}ms`,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
