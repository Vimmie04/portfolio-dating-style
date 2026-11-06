/* Team Forge UI kit (calm redesign): shared pieces for every screen.
   Rules: one blue accent · colour only where it means something
   (green = approved, red = overdue / high priority, amber = milestones)
   · 18px cards · no gradients · Team Forge Glyphs · illustrated avatars. */
import { Glyph } from './glyphs.jsx';
import { Portrait } from './portraits.jsx';

export { Glyph };

/* ── People in the story (the persona from the research is the hero) ── */
export const PEOPLE = {
  riya: { name: 'Riya Sharma', role: 'Marketing Intern' },
  neha: { name: 'Neha Kapoor', role: 'Marketing Lead' },
  om: { name: 'Om Jain', role: 'Design Intern' },
  sid: { name: 'Sid Rath', role: 'Dev Intern' },
  kush: { name: 'Kush Sharma', role: 'Research Intern' },
  kritika: { name: 'Kritika', role: 'Content Intern' },
};

export const COMPANY = 'Orbit Studio';

export function LinkedInGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
      <path fill="#fff" d="M7.2 9.6h2.5V17H7.2zM8.4 6a1.4 1.4 0 1 1 0 2.9 1.4 1.4 0 0 1 0-2.9zm3 3.6h2.4v1h.1c.3-.6 1.2-1.2 2.4-1.2 2.6 0 3 1.7 3 3.8V17h-2.5v-3.4c0-.8 0-1.9-1.2-1.9s-1.4.9-1.4 1.8V17h-2.5z" />
    </svg>
  );
}

export function GoogleGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z" />
    </svg>
  );
}

/* ── Team Forge logo (traced from the real logo) ──
   Two interlocking chain links between two dots, tilted -10.5°, in logo cyan #0CC0DF.
   Wordmark: Poppins SemiBold. Mark viewBox is 476 × 172. */
export const LOGO_CYAN = '#0CC0DF';
export const LOGO_LINK_LEFT = 'M25.5 27V-12A44 44 0 0 0-18.5-56H-106.5A44 44 0 0 0-150.5-12V12A44 44 0 0 0-106.5 56H-40';
export const LOGO_LINK_RIGHT = 'M45-56H106.5A44 44 0 0 1 150.5-12V12A44 44 0 0 1 106.5 56H18.5A44 44 0 0 1-25.5 12V-24';
const WORDMARK_FONT = "'Poppins', var(--tf-heading), system-ui, sans-serif";

export function LogoMark({ height = 24, color = LOGO_CYAN, title }) {
  return (
    <svg
      width={(height * 476) / 172}
      height={height}
      viewBox="-238 -86 476 172"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      style={{ display: 'block', flex: 'none' }}
    >
      <g transform="rotate(-10.5)">
        <circle cx="-203" cy="2" r="37" fill={color} />
        <circle cx="203" cy="2" r="37" fill={color} />
        <g fill="none" stroke={color} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round">
          <path d={LOGO_LINK_LEFT} />
          <path d={LOGO_LINK_RIGHT} />
        </g>
      </g>
    </svg>
  );
}

/**
 * <Logo size={24} /> horizontal lockup for app bars (size = mark height).
 * <Logo layout="stacked" size={80} /> the original stacked lockup (mark over wordmark).
 */
export function Logo({ size = 24, withWord = true, layout = 'horizontal', color = LOGO_CYAN }) {
  const word = (fontSize) => (
    <span style={{ fontFamily: WORDMARK_FONT, fontWeight: 600, fontSize, lineHeight: 1, color, whiteSpace: 'nowrap' }}>TeamForge</span>
  );
  if (layout === 'stacked') {
    return (
      <span style={{ display: 'inline-grid', justifyItems: 'center', gap: size * 0.24 }} role="img" aria-label="TeamForge">
        <LogoMark height={size} color={color} />
        {withWord && word(size * 0.35)}
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32 }} role="img" aria-label="TeamForge">
      <LogoMark height={size} color={color} />
      {withWord && word(size * 0.74)}
    </span>
  );
}

/* ── Status bar ── */
export function StatusBar({ light = false }) {
  return (
    <div className={`tf-status ${light ? 'tf-status--light' : ''}`} aria-hidden="true">
      <span>9:41</span>
      <span className="tf-status__icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.6 10.6 0 0 0 8 .3C5.2.3 2.6 1.4.7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.7c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4c-1.8 0-3.5.7-4.7 1.8l1.3 1.4C5.5 6.4 6.7 5.9 8 5.9zm0 3.6c.5 0 .9.2 1.2.5L8 11.4 6.8 10c.3-.3.7-.5 1.2-.5z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

/* ── Avatar: illustrated portrait ── */
export function Avatar({ person, size = 36 }) {
  const p = PEOPLE[person];
  return (
    <span className="tf-avatar" style={{ width: size, height: size }} role="img" aria-label={p?.name}>
      <Portrait person={person} size={size} />
    </span>
  );
}

/* ── XP ring (solid stroke) ── */
export function Ring({ value, size = 76, stroke = 8, track = '#E8F1F8', color = '#00ADF2', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${c * value} ${c}`} />
      </svg>
      <span style={{ position: 'relative', textAlign: 'center' }}>{children}</span>
    </span>
  );
}

/* ── Floating pill tab bar: four destinations, the active one spelled out ── */
const INTERN_TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'wins', label: 'Wins', icon: 'trophy' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

const LEAD_TABS = [
  { id: 'lead-home', label: 'Home', icon: 'home' },
  { id: 'approvals', label: 'Reviews', icon: 'tasks' },
  { id: 'team', label: 'Team', icon: 'users' },
  { id: 'profile-lead', label: 'Profile', icon: 'user' },
];

export function FloatingTabBar({ active, nav, lead = false }) {
  const tabs = lead ? LEAD_TABS : INTERN_TABS;
  return (
    <nav className="tf-fnav" aria-label="Main">
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            className={`tf-fnav__item ${on ? 'is-active' : ''}`}
            aria-label={t.label}
            aria-current={on ? 'page' : undefined}
            onClick={() => nav?.(t.id)}
          >
            <Glyph name={t.icon} size={23} strokeWidth={on ? 1.9 : 1.75} tint={on ? 0.22 : 0.14} />
            {on && <span>{t.label}</span>}
          </button>
        );
      })}
    </nav>
  );
}

/* ── XP as text (no pill): the product's currency, always in the one blue ── */
export function XPText({ value, size = 15, suffix = 'XP' }) {
  return (
    <span className="tf-xp" style={{ fontSize: size }}>
      +{value} {suffix}
    </span>
  );
}

/* ── High priority: one small red dot, nothing for medium or low ── */
export function PriorityDot() {
  return <span className="tf-dot" role="img" aria-label="High priority" />;
}

/* ── Calm celebration: a few blue confetti bits (static, so screenshots stay crisp) ── */
const BITS = [
  [46, 128, 8, '#9FD8F5', 18],
  [78, 214, 6, '#0077B6', -24],
  [322, 152, 8, '#00ADF2', 32],
  [296, 246, 6, '#CDEEFB', 12],
  [58, 300, 5, '#00ADF2', 40],
  [336, 330, 8, '#9FD8F5', -10],
  [262, 96, 6, '#0077B6', -36],
];

export function Celebration() {
  return (
    <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {BITS.map(([x, y, sz, c, r], i) => (
        <i
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: sz,
            height: i % 3 === 0 ? sz : sz * 2.2,
            borderRadius: i % 3 === 0 ? '50%' : 3,
            background: c,
            transform: `rotate(${r}deg)`,
          }}
        />
      ))}
    </span>
  );
}
