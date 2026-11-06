/* Cognify icons: one calm outline set on a 24 grid, 2px strokes, round ends.
   Single colour (currentColor) so screens never gain extra hues. */
const PATHS = {
  today: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  tasks: (
    <>
      <path d="M10 6.5h10M10 12h10M10 17.5h10" />
      <path d="m3.5 6.5 1.5 1.5L7.5 5.5M3.5 12l1.5 1.5L7.5 11" />
      <circle cx="5.2" cy="17.5" r="1.4" />
    </>
  ),
  routine: (
    <>
      <path d="M4.5 11a7.5 7.5 0 0 1 13-4.6L19.5 8.5" />
      <path d="M19.5 4v4.5H15" />
      <path d="M19.5 13a7.5 7.5 0 0 1-13 4.6L4.5 15.5" />
      <path d="M4.5 20v-4.5H9" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="M8 14h3" />
    </>
  ),
  me: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.8" width="6" height="11.5" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3.5" />
    </>
  ),
  readAloud: (
    <>
      <path d="M11 5 6.5 8.8H3.5v6.4h3L11 19z" />
      <path d="M15.2 9a4.2 4.2 0 0 1 0 6M18 6.3a8 8 0 0 1 0 11.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pen: (
    <>
      <path d="M12.5 20h8" />
      <path d="M16.3 3.8a2.2 2.2 0 0 1 3.1 3.1L8 18.3l-4.2 1 1-4.2z" />
    </>
  ),
  moon: <path d="M19.5 14.6A7.8 7.8 0 1 1 9.4 4.5a6.2 6.2 0 0 0 10.1 10.1z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  chevronLeft: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  cart: (
    <>
      <path d="M3 4.5h2.2l2.1 9.9a1.6 1.6 0 0 0 1.6 1.3h8.2a1.6 1.6 0 0 0 1.6-1.2l1.6-6.5H6.2" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7M12 8.5v12" />
      <path d="M12 8.5C10.6 5 7 4.6 7 6.7c0 1.8 5 1.8 5 1.8zM12 8.5c1.4-3.5 5-3.9 5-1.8 0 1.8-5 1.8-5 1.8z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7.2 8.2 6 8.2-6" />
    </>
  ),
  sunrise: (
    <>
      <path d="M3.5 18.5h17M7 18.5a5 5 0 0 1 10 0" />
      <path d="M12 6.5v3M5.4 10.6l1.7 1.2M18.6 10.6l-1.7 1.2" />
    </>
  ),
  afternoon: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5c.7 4.2 2.6 6.1 6.8 6.8-4.2.7-6.1 2.6-6.8 6.8-.7-4.2-2.6-6.1-6.8-6.8 4.2-.7 6.1-2.6 6.8-6.8z" />
      <path d="M19 15.5v4M17 17.5h4" />
    </>
  ),
  grip: (
    <>
      <circle cx="9" cy="6.5" r="1.2" />
      <circle cx="15" cy="6.5" r="1.2" />
      <circle cx="9" cy="12" r="1.2" />
      <circle cx="15" cy="12" r="1.2" />
      <circle cx="9" cy="17.5" r="1.2" />
      <circle cx="15" cy="17.5" r="1.2" />
    </>
  ),
  pause: <path d="M9 6v12M15 6v12" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
  branch: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <path d="M8.2 6.5c4 .5 5 2.5 7.6 4.8M8.2 17.5c4-.5 5-2.5 7.6-4.8" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M6.5 10h1M10.5 10h1M14.5 10h1M8 14h8" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8.5h14l-1 11.5a1.5 1.5 0 0 1-1.5 1.4h-9A1.5 1.5 0 0 1 6 20z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.5" r="6" />
      <path d="m8.5 14.5-1.5 6 5-2.5 5 2.5-1.5-6" />
    </>
  ),
  start: <path d="M8 5.2v13.6a.7.7 0 0 0 1.1.6l10.2-6.8a.7.7 0 0 0 0-1.2L9.1 4.6a.7.7 0 0 0-1.1.6z" />,
};

// Filled shapes (the rest are outlines)
const FILLED = new Set(['start']);

export function Icon({ name, size = 24, stroke = 2, className, style, title }) {
  const filled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      className={className}
      style={{ display: 'block', flex: 'none', ...style }}
    >
      {PATHS[name]}
    </svg>
  );
}

/* The streak mark: a soft four-point spark, always gold (rewards are the only gold). */
export function Spark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <path d="M12 2.5c.8 5 3.6 7.9 8.6 8.6-5 .8-7.8 3.6-8.6 8.6-.8-5-3.6-7.8-8.6-8.6 5-.7 7.8-3.6 8.6-8.6z" fill="#DFB34B" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
