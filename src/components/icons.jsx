/* Stroke icons (24px grid). Decorative by default. */

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const HEART = 'M12 20s-7-4.35-9.2-8.6C1.4 8.6 3.1 5 6.6 5c2 0 3.5 1.1 4.4 2.6C11.9 6.1 13.4 5 15.4 5c3.5 0 5.2 3.6 3.8 6.4C17 15.65 12 20 12 20z';

export function HeartIcon({ filled = false, ...props }) {
  return (
    <svg {...base} strokeWidth={2} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d={HEART} />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

export function VerifiedIcon({ title = 'Verified designer', ...props }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" role="img" aria-label={title} {...props}>
      <circle cx="12" cy="12" r="10" fill="#1F44FF" />
      <path d="M8 12.5l2.6 2.6L16.2 9.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PenToolIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

/** Circle, square, triangle: visual communication. */
export function ShapesIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.5" cy="7.5" r="4" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <path d="M17 3.5l4 7h-8z" />
      <path d="M3.5 21l4-7 4 7z" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} strokeWidth={2.4} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
    </svg>
  );
}

export function SparkleIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function FolderIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export function FileIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.1" />
    </svg>
  );
}

export function BehanceIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h4.5a2.3 2.3 0 0 1 0 4.6H3zM3 11.6h5a2.7 2.7 0 0 1 0 5.4H3zM3 7v10" />
      <path d="M14.5 8h5M13.5 14h7a3.5 3.5 0 1 0-1 2.5" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
