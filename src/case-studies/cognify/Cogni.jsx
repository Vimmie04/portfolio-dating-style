/*
 * Cogni: Cognify's companion. A soft periwinkle character with the logo's spiral as a curl.
 * Flat, two brand hues only (periwinkle body, indigo curl and feet), ink face.
 * Cogni is never sad or disappointed: moods are calm, wave and cheer.
 */
const PERI = '#7C83FD';
const INDIGO = '#5A62E8';
const LAV = '#C7CBFF';
const INK = '#111111';

// The spiral from the Cognify logo, as a curl on Cogni's head (centre 80,22, ends inside the head)
function spiralPath() {
  const pts = [];
  for (let t = 0; t <= 7.6; t += 0.12) {
    const r = 1.4 + 1.95 * t;
    pts.push([80 + r * Math.cos(t), 22 + r * Math.sin(t)]);
  }
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
}
const CURL = spiralPath();

function Face({ mood }) {
  if (mood === 'calm') {
    return (
      <g fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round">
        <path d="M56 92q7.5-7 15 0M89 92q7.5-7 15 0" />
        <path d="M71 107q9 8 18 0" />
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="64" cy="90" rx="5.5" ry="7" fill={INK} />
      <ellipse cx="96" cy="90" rx="5.5" ry="7" fill={INK} />
      <circle cx="66" cy="87" r="1.9" fill="#fff" />
      <circle cx="98" cy="87" r="1.9" fill="#fff" />
      {mood === 'cheer' ? (
        <path d="M69 104h22q-2 13-11 13t-11-13z" fill={INK} />
      ) : (
        <path d="M71 106q9 8.5 18 0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      )}
    </g>
  );
}

export function Cogni({ size = 120, mood = 'wave', title }) {
  const armUp = mood === 'wave' || mood === 'cheer';
  return (
    <svg
      width={size}
      height={(size * 170) / 160}
      viewBox="0 0 160 170"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <ellipse cx="80" cy="160" rx="42" ry="5.5" fill={INK} opacity="0.08" />
      {/* feet */}
      <ellipse cx="62" cy="149" rx="13" ry="8" fill={INDIGO} />
      <ellipse cx="98" cy="149" rx="13" ry="8" fill={INDIGO} />
      {/* arms */}
      <g fill="none" stroke={PERI} strokeWidth="12" strokeLinecap="round">
        {armUp ? <path d="M32 100C18 94 14 80 20 69" /> : <path d="M30 104c-9 6-12 13-9 20" />}
        {mood === 'cheer' ? <path d="M128 100c14-6 18-20 12-31" /> : <path d="M130 104c9 6 12 13 9 20" />}
      </g>
      {/* curl */}
      <path d={CURL} fill="none" stroke={INDIGO} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* body */}
      <path d="M80 36c36 0 56 26 56 60 0 32-24 54-56 54s-56-22-56-54c0-34 20-60 56-60z" fill={PERI} />
      <ellipse cx="80" cy="118" rx="33" ry="25" fill="#fff" opacity="0.2" />
      {/* cheeks */}
      <ellipse cx="51" cy="104" rx="8" ry="5" fill={LAV} />
      <ellipse cx="109" cy="104" rx="8" ry="5" fill={LAV} />
      <Face mood={mood} />
    </svg>
  );
}
