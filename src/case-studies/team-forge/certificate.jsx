import { Badge } from './badges.jsx';
import { Logo } from './kit.jsx';

/* ─────────────────────────────────────────────────────────────
   The Four-Digit Club certificate, designed as a document:
   ivory paper, double-rule frame, corner ornaments, a fine
   wave-line band (like security print), a signature and a seal.
   All flat: lines and solid fills only.
   ───────────────────────────────────────────────────────────── */

/* Fine interlaced wave lines, generated once */
function waveBand(width, height, lines = 7) {
  const paths = [];
  const mid = height / 2;
  for (let k = 0; k < lines; k += 1) {
    const phase = (k / lines) * Math.PI * 2;
    const amp = height * 0.42;
    let d = '';
    for (let x = 0; x <= width; x += 3) {
      const y = mid + amp * Math.sin((x / width) * Math.PI * 6 + phase) * Math.cos((x / width) * Math.PI * 2 + phase / 2);
      d += `${x === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)}`;
    }
    paths.push(d);
  }
  return paths;
}

const BAND = waveBand(300, 26);

function Corner({ style }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ position: 'absolute', ...style }}>
      <path d="M1 12V1h11" fill="none" stroke="#0077B6" strokeWidth="1.2" />
      <path d="M5 5h3v3H5z" fill="#0077B6" transform="rotate(45 6.5 6.5)" />
    </svg>
  );
}

function Signature() {
  return (
    <svg width="96" height="30" viewBox="0 0 96 30" aria-hidden="true" style={{ display: 'block' }}>
      <path
        d="M4 21c5-13 12-17 12-9 0 7-6 11-4 5 3-9 11-12 13-6 1 4-2 9 2 8 5-1 6-12 11-11 4 1 0 9 4 9 5 0 7-9 11-8 3 1 1 7 5 7 6 0 10-6 16-7"
        fill="none"
        stroke="#16202B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M58 26c8-2 18-3 30-3" fill="none" stroke="#16202B" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function CertificateDoc() {
  return (
    <div className="tf-cert">
      <div className="tf-cert__frame">
        <Corner style={{ left: 6, top: 6 }} />
        <Corner style={{ right: 6, top: 6, transform: 'scaleX(-1)' }} />
        <Corner style={{ left: 6, bottom: 6, transform: 'scaleY(-1)' }} />
        <Corner style={{ right: 6, bottom: 6, transform: 'scale(-1)' }} />

        <svg className="tf-cert__band" viewBox="0 0 300 26" preserveAspectRatio="none" aria-hidden="true">
          {BAND.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#9FD3F1" strokeWidth="0.6" />
          ))}
        </svg>

        <div className="tf-cert__logo">
          <Logo size={16} />
        </div>
        <p className="tf-cert__kicker">Certificate of achievement</p>
        <p className="tf-cert__lead">This certifies that</p>
        <p className="tf-cert__name">Riya Sharma</p>
        <span className="tf-cert__rule" />
        <p className="tf-cert__body">
          earned <b>1,000 XP</b> across 24 approved tasks as a Marketing Intern at Orbit Studio, joining the <b>Four-Digit Club</b>.
        </p>
        <p className="tf-cert__skills">Copywriting · Market research · Canva</p>

        <div className="tf-cert__foot">
          <div className="tf-cert__sign">
            <Signature />
            <span className="tf-cert__line" />
            <b>Neha Kapoor</b>
            <small>Marketing Lead</small>
          </div>
          <div className="tf-cert__seal">
            <Badge shape="medal" tier="gold" emblem="1K" size={58} />
          </div>
          <div className="tf-cert__date">
            <b>3 Nov 2026</b>
            <span className="tf-cert__line" />
            <small>ID TF-1000-0427</small>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tiny paper thumbnail for lists (profile → certificates). */
export function CertificateThumb({ width = 40 }) {
  return (
    <svg width={width} height={(width * 52) / 40} viewBox="0 0 40 52" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <rect x="0.5" y="0.5" width="39" height="51" rx="4" fill="#FFFDF7" stroke="#E4E9EF" />
      <rect x="3.5" y="3.5" width="33" height="45" rx="2" fill="none" stroke="#0077B6" strokeWidth="0.8" />
      <rect x="12" y="9" width="16" height="2" rx="1" fill="#9FD3F1" />
      <rect x="9" y="15" width="22" height="3" rx="1.5" fill="#16202B" />
      <rect x="11" y="21" width="18" height="1.6" rx="0.8" fill="#C9D2DC" />
      <rect x="13" y="24.5" width="14" height="1.6" rx="0.8" fill="#C9D2DC" />
      <path d="M17 33h2.5l1.2 4-2 1zM20.5 33H23l-1.7 5-2-1z" fill="#0077B6" />
      <circle cx="20" cy="41" r="5.2" fill="#F6C450" stroke="#9A6A00" strokeWidth="0.8" />
      <circle cx="20" cy="41" r="3" fill="#FFF7DE" />
    </svg>
  );
}
