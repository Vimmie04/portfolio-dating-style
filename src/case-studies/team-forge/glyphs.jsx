/* ─────────────────────────────────────────────────────────────
   Team Forge Glyphs: the product's own icon system.
   Rules: 24px grid · 2px safe area · 1.75 stroke · round caps and joins
   · 2–3px corner radii · duotone: one soft tint shape (18%) under the line.
   ───────────────────────────────────────────────────────────── */

const GLYPHS = {
  home: {
    tint: <path d="M5.5 10.2 12 5l6.5 5.2V19a1.2 1.2 0 0 1-1.2 1.2H6.7A1.2 1.2 0 0 1 5.5 19z" />,
    line: (
      <>
        <path d="M3.5 11.4 12 4.5l8.5 6.9" />
        <path d="M5.5 9.8V19a1.2 1.2 0 0 0 1.2 1.2h10.6a1.2 1.2 0 0 0 1.2-1.2V9.8" />
        <path d="M10 20.2v-4a2 2 0 0 1 4 0v4" />
      </>
    ),
  },
  tasks: {
    tint: <rect x="4" y="4" width="16" height="16" rx="5" />,
    line: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <path d="m8.6 12.3 2.4 2.4 4.5-4.9" />
      </>
    ),
  },
  trophy: {
    tint: <path d="M8 4.5h8v4.9a4 4 0 0 1-8 0z" />,
    line: (
      <>
        <path d="M7.5 4h9v5.3a4.5 4.5 0 0 1-9 0z" />
        <path d="M7.5 6H5.3a.8.8 0 0 0-.8.9A3.6 3.6 0 0 0 7.9 10M16.5 6h2.2a.8.8 0 0 1 .8.9 3.6 3.6 0 0 1-3.4 3.1" />
        <path d="M12 13.8V17M9.2 20h5.6M10 17h4l.6 3H9.4z" />
      </>
    ),
  },
  user: {
    tint: <circle cx="12" cy="8.5" r="3.8" />,
    line: (
      <>
        <circle cx="12" cy="8.5" r="3.8" />
        <path d="M5 19.6c.9-3.4 3.7-5.6 7-5.6s6.1 2.2 7 5.6" />
      </>
    ),
  },
  users: {
    tint: <circle cx="9" cy="8.6" r="3.2" />,
    line: (
      <>
        <circle cx="9" cy="8.6" r="3.2" />
        <path d="M3.4 19c.7-3 2.9-4.9 5.6-4.9s4.9 1.9 5.6 4.9" />
        <path d="M15.4 5.6a3.1 3.1 0 0 1 0 6M17.2 14.4c1.7.6 2.9 2.1 3.4 4.6" />
      </>
    ),
  },
  chat: {
    tint: <path d="M5 18.2V7.6A2.6 2.6 0 0 1 7.6 5h8.8A2.6 2.6 0 0 1 19 7.6v6A2.6 2.6 0 0 1 16.4 16.2H8.6z" />,
    line: (
      <>
        <path d="M5 18.2V7.6A2.6 2.6 0 0 1 7.6 5h8.8A2.6 2.6 0 0 1 19 7.6v6A2.6 2.6 0 0 1 16.4 16.2H8.6z" />
        <path d="M9 9.4h6M9 12.2h3.6" />
      </>
    ),
  },
  bell: {
    tint: <path d="M6.4 16.4V11a5.6 5.6 0 0 1 11.2 0v5.4z" />,
    line: (
      <>
        <path d="M6.2 16.4V11a5.8 5.8 0 0 1 11.6 0v5.4l1.3 1.5H4.9z" />
        <path d="M10 20.3a2.2 2.2 0 0 0 4 0" />
      </>
    ),
  },
  clock: {
    tint: <circle cx="12" cy="12" r="8.5" />,
    line: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.8V12l2.8 1.8" />
      </>
    ),
  },
  send: {
    tint: <path d="M20 4 3.9 10.4l6.5 2.9 2.9 6.5z" />,
    line: (
      <>
        <path d="M20 4 3.9 10.4l6.5 2.9 2.9 6.5z" />
        <path d="m10.4 13.3 4.1-4.1" />
      </>
    ),
  },
  file: {
    tint: <path d="M7.2 3.8h6.3l4.5 4.5v10.9a1.2 1.2 0 0 1-1.2 1.2H7.2A1.2 1.2 0 0 1 6 19.2V5a1.2 1.2 0 0 1 1.2-1.2z" />,
    line: (
      <>
        <path d="M7.2 3.8h6.3l4.5 4.5v10.9a1.2 1.2 0 0 1-1.2 1.2H7.2A1.2 1.2 0 0 1 6 19.2V5a1.2 1.2 0 0 1 1.2-1.2z" />
        <path d="M13.5 3.8v4.5H18M9 13h6M9 16h4" />
      </>
    ),
  },
  bolt: {
    tint: <path d="M13.2 3.5 6 13.2h5.3l-1 7.3 7.2-9.7h-5.3z" />,
    line: <path d="M13.2 3.5 6 13.2h5.3l-1 7.3 7.2-9.7h-5.3z" />,
  },
  star: {
    tint: <path d="m12 4.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />,
    line: <path d="m12 4.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />,
  },
  flame: {
    tint: <path d="M12 20.5c3.6 0 6-2.4 6-5.8 0-3-1.9-4.9-3.4-6.8-.4 1.8-1.4 2.9-2.6 3.4.3-2.6-.8-5.3-3.2-7.3.1 3.4-3.3 5.8-3.3 10.2 0 3.6 2.9 6.3 6.5 6.3z" />,
    line: <path d="M12 20.5c3.6 0 6-2.4 6-5.8 0-3-1.9-4.9-3.4-6.8-.4 1.8-1.4 2.9-2.6 3.4.3-2.6-.8-5.3-3.2-7.3.1 3.4-3.3 5.8-3.3 10.2 0 3.6 2.9 6.3 6.5 6.3z" />,
  },
  medal: {
    tint: <circle cx="12" cy="15" r="5" />,
    line: (
      <>
        <circle cx="12" cy="15" r="5" />
        <path d="M8.9 10.6 6.5 4h3.8L12 7.6 13.7 4h3.8l-2.4 6.6" />
      </>
    ),
    solid: <path d="m12 12.7.8 1.6 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3z" />,
  },
  target: {
    tint: <circle cx="12" cy="12" r="4.6" />,
    line: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.6" />
      </>
    ),
    solid: <circle cx="12" cy="12" r="1.3" />,
  },
  moon: {
    tint: <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z" />,
    line: <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z" />,
  },
  lock: {
    tint: <rect x="5" y="10.5" width="14" height="9.5" rx="2.6" />,
    line: (
      <>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2.6" />
        <path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5M12 14.2v2" />
      </>
    ),
  },
  sparkle: {
    tint: <path d="m12 3.8 1.7 4.9 4.9 1.7-4.9 1.7L12 17l-1.7-4.9-4.9-1.7 4.9-1.7z" />,
    line: <path d="m12 3.8 1.7 4.9 4.9 1.7-4.9 1.7L12 17l-1.7-4.9-4.9-1.7 4.9-1.7z" />,
    solid: <path d="m18.5 15.6.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />,
  },
  heart: {
    tint: <path d="M12 19.6c-.3 0-7.3-4.3-7.3-9.6A4 4 0 0 1 12 7.7 4 4 0 0 1 19.3 10c0 5.3-7 9.6-7.3 9.6z" />,
    line: <path d="M12 19.6c-.3 0-7.3-4.3-7.3-9.6A4 4 0 0 1 12 7.7 4 4 0 0 1 19.3 10c0 5.3-7 9.6-7.3 9.6z" />,
  },
  share: {
    tint: (
      <>
        <circle cx="17.5" cy="6" r="2.4" />
        <circle cx="6.5" cy="12" r="2.4" />
        <circle cx="17.5" cy="18" r="2.4" />
      </>
    ),
    line: (
      <>
        <circle cx="17.5" cy="6" r="2.4" />
        <circle cx="6.5" cy="12" r="2.4" />
        <circle cx="17.5" cy="18" r="2.4" />
        <path d="m8.7 10.8 6.6-3.6M8.7 13.2l6.6 3.6" />
      </>
    ),
  },
  search: {
    tint: <circle cx="11" cy="11" r="6" />,
    line: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m15.5 15.5 4 4" />
      </>
    ),
  },
  upload: {
    line: <path d="M5 15.5v2.3a1.7 1.7 0 0 0 1.7 1.7h10.6a1.7 1.7 0 0 0 1.7-1.7v-2.3M12 15V5M8 8.8 12 5l4 3.8" />,
  },
  download: {
    line: <path d="M5 15.5v2.3a1.7 1.7 0 0 0 1.7 1.7h10.6a1.7 1.7 0 0 0 1.7-1.7v-2.3M12 5v10M8 11.2l4 3.8 4-3.8" />,
  },
  filter: { line: <path d="M4.5 7h15M7.5 12h9M10.5 17h3" /> },
  check: { line: <path d="m5.5 12.5 4.2 4.2 8.8-9" /> },
  x: { line: <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" /> },
  plus: { line: <path d="M12 5.5v13M5.5 12h13" /> },
  chevron: { line: <path d="m9.5 6 6 6-6 6" /> },
  back: { line: <path d="m14.5 6-6 6 6 6" /> },
  arrowUp: { line: <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" /> },
  more: {
    solid: (
      <>
        <circle cx="6" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="18" cy="12" r="1.5" />
      </>
    ),
  },
};

/**
 * <Glyph name="home" /> · tone="duo" (default) adds the soft tint shape, tone="line" is outline only.
 */
export function Glyph({ name, size = 22, strokeWidth = 1.75, tone = 'duo', tint = 0.18, ...rest }) {
  const g = GLYPHS[name];
  if (!g) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {tone === 'duo' && g.tint && (
        <g fill="currentColor" stroke="none" opacity={tint}>
          {g.tint}
        </g>
      )}
      {g.solid && (
        <g fill="currentColor" stroke="none">
          {g.solid}
        </g>
      )}
      {g.line}
    </svg>
  );
}

export const GLYPH_NAMES = Object.keys(GLYPHS);
