import { useId } from 'react';

/* ─────────────────────────────────────────────────────────────
   Illustrated avatars for the people in the Team Forge story.
   Flat, friendly, consistent: same head, neck and shoulder shapes;
   identity comes from hair, skin tone and clothing colour.
   ───────────────────────────────────────────────────────────── */
const LOOKS = {
  riya: { skin: '#D9A07E', shade: '#C08665', hair: '#2A1B16', top: '#8EC1E6', bg: '#DCEFFB', style: 'long' },
  neha: { skin: '#C68A65', shade: '#AC7251', hair: '#3B2A22', top: '#86C7A6', bg: '#E2F3E9', style: 'bob' },
  om: { skin: '#B57650', shade: '#9C6141', hair: '#1F1612', top: '#EDC27F', bg: '#FCEFD9', style: 'beard' },
  sid: { skin: '#A66B4A', shade: '#8E583B', hair: '#2A1D17', top: '#8FCFD8', bg: '#DDF4F7', style: 'curly' },
  kush: { skin: '#CF9572', shade: '#B67E5D', hair: '#3A2A20', top: '#A3ACBA', bg: '#E9EBEF', style: 'glasses' },
  kritika: { skin: '#E2AE8A', shade: '#C99573', hair: '#4A2E22', top: '#C2B2F2', bg: '#EEE9FD', style: 'bun' },
};

function HairBack({ style, color }) {
  if (style === 'long')
    return <path fill={color} d="M18.5 31c0-10.5 5.8-17 13.5-17s13.5 6.5 13.5 17v13.5a2.9 2.9 0 0 1-2.9 2.9H21.4a2.9 2.9 0 0 1-2.9-2.9z" />;
  if (style === 'bob')
    return <path fill={color} d="M18.8 31.5c0-10.8 6-17.3 13.2-17.3s13.2 6.5 13.2 17.3v6.8a2.7 2.7 0 0 1-2.7 2.7H21.5a2.7 2.7 0 0 1-2.7-2.7z" />;
  if (style === 'bun') return <circle fill={color} cx="32" cy="12.8" r="5.6" />;
  return null;
}

function HairFront({ style, color }) {
  switch (style) {
    case 'long':
      return (
        <path
          fill={color}
          d="M20.6 28.5c-.2-8.4 4.6-13.6 11.4-13.6s11.6 5.2 11.4 13.6c-3.6-1.4-6.8-4.4-8.6-8.3-.9 2-1.9 3-2.8 3.5-.9-.5-1.9-1.5-2.8-3.5-1.8 3.9-5 6.9-8.6 8.3z"
        />
      );
    case 'bob':
      return <path fill={color} d="M20.7 28.8c-.4-8.5 4.6-13.9 11.6-13.9 6.4 0 11.2 4.4 11.1 11.4-5.8-.2-11.5-2.8-14.4-6.6-1.6 4-4.6 7.4-8.3 9.1z" />;
    case 'beard':
      return (
        <path
          fill={color}
          d="M20.8 27.2c-.6-8 4.3-13.4 11.2-13.4s11.8 5.4 11.2 13.4c-1.3-3.4-3.3-5.1-5.6-5.6-3.6 1.3-7.6 1.3-11.2 0-2.3.5-4.3 2.2-5.6 5.6z"
        />
      );
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="21.8" cy="23" r="4.6" />
          <circle cx="26.5" cy="18.2" r="5.2" />
          <circle cx="32.5" cy="16.4" r="5.6" />
          <circle cx="38.4" cy="18.2" r="5.2" />
          <circle cx="42.6" cy="23" r="4.6" />
          <circle cx="20.4" cy="28" r="3.4" />
          <circle cx="43.6" cy="28" r="3.4" />
        </g>
      );
    case 'glasses':
      return <path fill={color} d="M20.9 27.4c-.9-8.3 4.1-13.6 11.6-13.6 7 0 11.8 4.6 11.1 12.6-1.6-3.4-4.6-5.5-8.6-6-4.6-.6-9.6.9-14.1 7z" />;
    case 'bun':
      return <path fill={color} d="M20.7 28.4c-.4-8.4 4.7-13.7 11.3-13.7s11.7 5.3 11.3 13.7c-2.7-4.2-6.6-6.8-11.3-6.8s-8.6 2.6-11.3 6.8z" />;
    default:
      return null;
  }
}

export function Portrait({ person, size = 40, title }) {
  const look = LOOKS[person];
  const clip = `tf-portrait-${useId().replace(/:/g, '')}`;
  if (!look) return null;
  const beard = look.style === 'beard';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : 'true'} style={{ display: 'block' }}>
      <defs>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="64" height="64" fill={look.bg} />
        <HairBack style={look.style} color={look.hair} />
        {/* neck + shoulders */}
        <path fill={look.shade} d="M27 37.5h10v7c0 2.8-2.2 4.6-5 4.6s-5-1.8-5-4.6z" />
        <path fill={look.top} d="M8 64c1.6-11.6 11-18.2 24-18.2S54.4 52.4 56 64z" />
        <path fill={look.shade} opacity="0.55" d="M26.4 46.2c1.5 2.5 3.4 3.8 5.6 3.8s4.1-1.3 5.6-3.8c-1.7-.3-3.6-.4-5.6-.4s-3.9.1-5.6.4z" />
        {/* head */}
        <circle cx="20.8" cy="30.6" r="2.8" fill={look.skin} />
        <circle cx="43.2" cy="30.6" r="2.8" fill={look.skin} />
        <ellipse cx="32" cy="29.5" rx="11.2" ry="12.8" fill={look.skin} />
        {beard && (
          <path
            fill={look.hair}
            d="M21 32.5c.3 6.6 4.6 10.3 11 10.3s10.7-3.7 11-10.3c-1.6 2.3-3.6 3.5-5.4 3.7-1.6-.9-3.3-1.3-5.6-1.3s-4 .4-5.6 1.3c-1.8-.2-3.8-1.4-5.4-3.7z"
          />
        )}
        <HairFront style={look.style} color={look.hair} />
        {/* face */}
        <circle cx="25.2" cy="34.3" r="2" fill="#F08A7A" opacity="0.22" />
        <circle cx="38.8" cy="34.3" r="2" fill="#F08A7A" opacity="0.22" />
        <circle cx="27.6" cy="30.8" r="1.35" fill="#22160F" />
        <circle cx="36.4" cy="30.8" r="1.35" fill="#22160F" />
        <path d="M29.2 35.5c1.7 1.3 3.9 1.3 5.6 0" fill="none" stroke={beard ? '#F2D6C3' : '#8A4A35'} strokeWidth="1.3" strokeLinecap="round" />
        {look.style === 'glasses' && (
          <g fill="none" stroke="#2B2F36" strokeWidth="1.3">
            <rect x="22.8" y="27.6" width="7.6" height="5.8" rx="2.4" />
            <rect x="33.6" y="27.6" width="7.6" height="5.8" rx="2.4" />
            <path d="M30.4 29.6c1-.8 2.2-.8 3.2 0" strokeLinecap="round" />
          </g>
        )}
      </g>
    </svg>
  );
}
