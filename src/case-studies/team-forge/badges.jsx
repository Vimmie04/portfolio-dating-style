import { Glyph } from './glyphs.jsx';

/* ─────────────────────────────────────────────────────────────
   Team Forge badges: illustrated, tiered, flat-shaded (no gradients).
   Tier = material + level banner. Shape = badge family.
   ───────────────────────────────────────────────────────────── */
export const TIERS = {
  bronze: { label: 'Bronze', level: 'I', light: '#F3CFAE', base: '#DB9965', dark: '#B4703F', rim: '#8A4F24', plate: '#FCEBDD', ink: '#8A4F24' },
  silver: { label: 'Silver', level: 'II', light: '#F6F8FB', base: '#D3DAE2', dark: '#A9B4C1', rim: '#677386', plate: '#FFFFFF', ink: '#566173' },
  gold: { label: 'Gold', level: 'III', light: '#FFEAA8', base: '#F6C450', dark: '#D69D1F', rim: '#9A6A00', plate: '#FFF7DE', ink: '#875C00' },
  sapphire: { label: 'Sapphire', level: 'IV', light: '#D3F0FC', base: '#63C6EF', dark: '#1F95D0', rim: '#00609A', plate: '#F0FAFE', ink: '#00609A' },
  locked: { label: 'Locked', level: '', light: '#F0F3F6', base: '#E1E6EC', dark: '#CFD6DE', rim: '#B5BEC9', plate: '#F7F9FB', ink: '#A3ADBA' },
};

const C = { x: 32, y: 30 };

function hexPoints(r, cx = C.x, cy = C.y) {
  return [-90, -30, 30, 90, 150, 210].map((a) => {
    const t = (a * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });
}

const fmt = (pts) => pts.map((p) => p.map((n) => n.toFixed(2)).join(',')).join(' ');

/* Hexagon: six facets around a recessed plate */
function Hex({ t }) {
  const o = hexPoints(27);
  const tones = [t.light, t.light, t.base, t.dark, t.dark, t.base];
  return (
    <>
      {o.map((p, i) => (
        <polygon key={i} points={fmt([[C.x, C.y], p, o[(i + 1) % 6]])} fill={tones[i]} />
      ))}
      <polygon points={fmt(o)} fill="none" stroke={t.rim} strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points={fmt(hexPoints(17.5))} fill={t.plate} stroke={t.rim} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  );
}

/* Shield: split light/base faces, darker tip */
function Shield({ t }) {
  const outer = 'M32 3.5 54.5 10.5V30c0 14.5-10 23.6-22.5 28.5C19.5 53.6 9.5 44.5 9.5 30V10.5z';
  return (
    <>
      <path d={outer} fill={t.base} />
      <path d="M32 3.5 9.5 10.5V30c0 14.5 10 23.6 22.5 28.5z" fill={t.light} />
      <path d="M32 58.5c6.1-2.4 11.6-6 15.6-10.9L32 40.5 16.4 47.6c4 4.9 9.5 8.5 15.6 10.9z" fill={t.dark} opacity="0.55" />
      <path d={outer} fill="none" stroke={t.rim} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M32 12 47 16.6v12.9c0 9.4-6.4 15.4-15 18.8-8.6-3.4-15-9.4-15-18.8V16.6z" fill={t.plate} stroke={t.rim} strokeWidth="1.2" strokeLinejoin="round" />
    </>
  );
}

/* Rosette: scalloped edge, bevelled disc */
function Rosette({ t }) {
  const scallops = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [C.x + 22.5 * Math.cos(a), C.y + 22.5 * Math.sin(a)];
  });
  return (
    <>
      {scallops.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.6" fill={i % 2 ? t.dark : t.base} />
      ))}
      <circle cx={C.x} cy={C.y} r="23" fill={t.base} />
      <path d={`M${C.x - 23} ${C.y}a23 23 0 0 1 46 0z`} fill={t.light} />
      <circle cx={C.x} cy={C.y} r="23" fill="none" stroke={t.rim} strokeWidth="1.4" />
      <circle cx={C.x} cy={C.y} r="16" fill={t.plate} stroke={t.rim} strokeWidth="1.2" />
    </>
  );
}

/* Medal: neck ribbon in Team Forge blue + faceted disc (milestones) */
function Medal({ t }) {
  return (
    <>
      <path d="M19 0h10l6 17-7 3z" fill="#0077B6" />
      <path d="M35 0h10l-9 20-7-3z" fill="#00ADF2" />
      <path d="M29 0h6l-3 8z" fill="#005A8C" />
      <circle cx="32" cy="40" r="22" fill={t.base} />
      <path d="M10 40a22 22 0 0 1 44 0z" fill={t.light} />
      <path d="M32 62a22 22 0 0 0 19.1-11L32 40 12.9 51A22 22 0 0 0 32 62z" fill={t.dark} opacity="0.5" />
      <circle cx="32" cy="40" r="22" fill="none" stroke={t.rim} strokeWidth="1.4" />
      <circle cx="32" cy="40" r="15" fill={t.plate} stroke={t.rim} strokeWidth="1.2" />
    </>
  );
}

const SHAPES = { hex: Hex, shield: Shield, rosette: Rosette, medal: Medal };

/**
 * <Badge shape="hex" tier="gold" emblem="star" /> · emblem can be a glyph name or text (e.g. "1K").
 * Banner with the tier's level numeral sits across the bottom (not on medals or locked badges).
 */
export function Badge({ shape = 'hex', tier = 'bronze', emblem = 'star', size = 56, banner = true, title }) {
  const t = TIERS[tier];
  const Shape = SHAPES[shape];
  const locked = tier === 'locked';
  const cy = shape === 'medal' ? 40 : C.y;
  const isText = emblem && !/^[a-z]/.test(emblem);
  const showBanner = banner && !locked && shape !== 'medal';
  return (
    <svg
      width={size}
      height={(size * 72) / 64}
      viewBox="0 0 64 72"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <Shape t={t} />
      {isText ? (
        <text x="32" y={cy + 4.6} textAnchor="middle" fontFamily="Assistant, system-ui, sans-serif" fontWeight="800" fontSize="13.5" fill={t.ink} letterSpacing="-0.3">
          {emblem}
        </text>
      ) : (
        <Glyph name={emblem} size={19} x={22.5} y={cy - 9.5} strokeWidth={2} tint={0.22} style={{ color: t.ink }} />
      )}
      {showBanner && (
        <g>
          <path d="M14.5 52.5H8.4l2.9 4.3-2.9 4.3h6.1z" fill={t.rim} opacity="0.75" />
          <path d="M49.5 52.5h6.1l-2.9 4.3 2.9 4.3h-6.1z" fill={t.rim} opacity="0.75" />
          <rect x="14" y="50" width="36" height="12.5" rx="2" fill={t.rim} />
          <text x="32" y="59.4" textAnchor="middle" fontFamily="Assistant, system-ui, sans-serif" fontWeight="800" fontSize="8.4" fill="#fff" letterSpacing="0.6">
            {t.level}
          </text>
        </g>
      )}
      {locked && (
        <g>
          <circle cx="50" cy="52" r="8.5" fill="#fff" stroke="#D5DBE2" strokeWidth="1" />
          <Glyph name="lock" size={11} x={44.5} y={46.5} strokeWidth={2.2} tone="line" style={{ color: '#7A8594' }} />
        </g>
      )}
    </svg>
  );
}

/* Riya's badges, as shown on her profile */
export const RIYA_BADGES = [
  { label: 'First task', shape: 'hex', tier: 'bronze', emblem: 'target' },
  { label: 'On time ×5', shape: 'shield', tier: 'silver', emblem: 'clock' },
  { label: 'Kudos magnet', shape: 'rosette', tier: 'gold', emblem: 'star' },
  { label: 'Four-Digit Club', shape: 'medal', tier: 'gold', emblem: '1K' },
  { label: 'Team player', shape: 'hex', tier: 'sapphire', emblem: 'users' },
  { label: 'Night owl', shape: 'shield', tier: 'locked', emblem: 'moon' },
];
