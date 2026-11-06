import { Avatar, FloatingTabBar, Glyph, LinkedInGlyph, StatusBar } from '../kit.jsx';
import { Badge, RIYA_BADGES } from '../badges.jsx';
import { CertificateDoc, CertificateThumb } from '../certificate.jsx';

/** 10 · Certificate: a designed document — signed, sealed, verifiable — not just a card. */
export function CertificateScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-topbar">
        <button type="button" className="tf-icon-btn" aria-label="Close" onClick={() => nav?.('profile')}>
          <Glyph name="x" size={20} />
        </button>
        <span className="tf-chip tf-chip--milestone">
          <Glyph name="sparkle" size={16} />
          Milestone unlocked
        </span>
        <span style={{ width: 44 }} />
      </div>

      <div style={{ padding: '4px 24px 0', textAlign: 'center' }}>
        <h1 className="tf-display" style={{ fontSize: 28 }}>
          Welcome to the
          <br />
          Four-Digit Club
        </h1>
      </div>

      <div style={{ flex: 1, display: 'grid', alignContent: 'center', padding: '8px 20px 24px' }}>
        <CertificateDoc />
        <p className="tf-small" style={{ marginTop: 14, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontWeight: 600 }}>
          <Glyph name="lock" size={15} />
          Anyone can verify it at teamforge.app/v/riya-1000
        </p>
      </div>

      <div style={{ flex: 'none', padding: '0 20px 40px', display: 'flex', gap: 10 }}>
        <button type="button" className="tf-btn">
          <span style={{ display: 'grid', placeItems: 'center', borderRadius: 5, background: '#fff' }}>
            <LinkedInGlyph size={20} />
          </span>
          Add to LinkedIn
        </button>
        <button type="button" className="tf-icon-btn" aria-label="Download PDF" style={{ width: 54, height: 54, boxShadow: 'inset 0 0 0 1px var(--tf-line)' }}>
          <Glyph name="download" size={21} />
        </button>
        <button type="button" className="tf-icon-btn" aria-label="Share" style={{ width: 54, height: 54, boxShadow: 'inset 0 0 0 1px var(--tf-line)' }}>
          <Glyph name="share" size={21} />
        </button>
      </div>
    </div>
  );
}

const PODIUM = [
  { person: 'riya', name: 'You', xp: 180, rank: 2, h: 70, you: true },
  { person: 'om', name: 'Om', xp: 210, rank: 1, h: 94 },
  { person: 'sid', name: 'Sid', xp: 150, rank: 3, h: 54 },
];

/** 11 · Wins: personal progress first, a friendly weekly board second (it resets, so no one is stuck at the bottom). */
export function WinsScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-body">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h1 className="tf-display" style={{ fontSize: 32 }}>
            Wins
          </h1>
          <span className="tf-small" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, paddingBottom: 4 }}>
            <Glyph name="clock" size={16} />
            Resets in 3 days
          </span>
        </div>
        <div className="tf-seg" style={{ marginTop: 16 }}>
          <button type="button" className="is-active">
            This week
          </button>
          <button type="button">All time</button>
        </div>

        <div className="tf-card" style={{ marginTop: 16, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="tf-label">Your week</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: 'var(--tf-primary)' }}>
              <Glyph name="arrowUp" size={14} strokeWidth={2.4} />
              50% vs last week
            </span>
          </div>
          <p style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 40, lineHeight: 1.1, marginTop: 6 }}>
            +180 <span style={{ fontSize: 20, color: 'var(--tf-muted)' }}>XP</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 12, paddingTop: 14, borderTop: '1px solid var(--tf-line)' }}>
            {[
              ['tasks', '5', 'tasks'],
              ['star', '2', 'kudos'],
              ['flame', '6', 'day streak'],
            ].map(([icon, n, label]) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tf-muted)' }}>
                <Glyph name={icon} size={18} style={{ color: 'var(--tf-brand)' }} />
                <span style={{ fontSize: 13 }}>
                  <b style={{ fontSize: 15, color: 'var(--tf-ink)' }}>{n}</b> {label}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="tf-section">
          <p className="tf-h3">Team board</p>
          <span className="tf-small">Marketing &amp; Design</span>
        </div>
        <div className="tf-card" style={{ padding: '18px 16px 0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, alignItems: 'end' }}>
            {PODIUM.map((p) => (
              <div key={p.person} style={{ display: 'grid', justifyItems: 'center', gap: 4 }}>
                <span style={{ borderRadius: '50%', boxShadow: p.you ? '0 0 0 3px #fff, 0 0 0 5px var(--tf-brand)' : 'none' }}>
                  <Avatar person={p.person} size={p.rank === 1 ? 56 : 48} />
                </span>
                <span style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{p.name}</span>
                <span className="tf-xp" style={{ fontSize: 13 }}>
                  {p.xp} XP
                </span>
                <span
                  style={{
                    display: 'grid',
                    placeItems: 'start center',
                    width: '100%',
                    height: p.h,
                    marginTop: 6,
                    paddingTop: 8,
                    borderRadius: '14px 14px 0 0',
                    background: p.rank === 1 ? 'var(--tf-tint)' : 'var(--tf-canvas)',
                    fontFamily: 'var(--tf-heading)',
                    fontWeight: 800,
                    fontSize: 22,
                    color: p.rank === 1 ? 'var(--tf-primary)' : 'var(--tf-muted)',
                  }}
                >
                  {p.rank}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="tf-card" style={{ marginTop: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar person="om" size={36} />
          <span style={{ flex: 1, display: 'grid' }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Om sent you kudos</span>
            <span className="tf-small">“Your carousel copy was spot on.”</span>
          </span>
          <Glyph name="star" size={20} style={{ color: 'var(--tf-brand)' }} />
        </div>
      </div>
      <FloatingTabBar active="wins" nav={nav} />
    </div>
  );
}

/** 12 · Profile as a wall of wins: tiered badges and certificates that prove real work. */
export function ProfileScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <button type="button" className="tf-icon-btn" aria-label="More" style={{ position: 'absolute', top: 62, right: 22, zIndex: 2 }}>
        <Glyph name="more" size={22} />
      </button>
      <div className="tf-body" style={{ paddingTop: 22 }}>
        <div style={{ display: 'grid', justifyItems: 'center', textAlign: 'center' }}>
          <span style={{ position: 'relative' }}>
            <span style={{ display: 'block', borderRadius: '50%', boxShadow: '0 0 0 4px #fff, 0 10px 24px rgba(16,32,48,0.1)' }}>
              <Avatar person="riya" size={76} />
            </span>
            <span style={{ position: 'absolute', left: '50%', bottom: -10, transform: 'translateX(-50%)', padding: '2px 10px', borderRadius: 999, background: 'var(--tf-brand)', border: '2px solid #fff', color: 'var(--tf-on-brand)', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>
              Lv 5
            </span>
          </span>
          <p className="tf-h2" style={{ marginTop: 18, fontSize: 24 }}>
            Riya Sharma
          </p>
          <p className="tf-small" style={{ marginTop: 2 }}>
            Marketing Intern · Orbit Studio
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--tf-ink-2)', marginTop: 6 }}>
            <LinkedInGlyph size={15} />
            Connected
          </p>
        </div>

        <div className="tf-card" style={{ marginTop: 18, padding: '14px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
          {[
            ['24', 'tasks done'],
            ['9', 'kudos'],
            ['1,040', 'total XP'],
          ].map(([n, label], i) => (
            <span key={label} style={{ display: 'grid', borderLeft: i ? '1px solid var(--tf-line)' : 0 }}>
              <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 22 }}>{n}</span>
              <span className="tf-small">{label}</span>
            </span>
          ))}
        </div>

        <div className="tf-section" style={{ margin: '18px 0 10px' }}>
          <p className="tf-h3">Badges</p>
          <span className="tf-small">5 of 12</span>
        </div>
        <div className="tf-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 12, padding: '14px 8px' }}>
          {RIYA_BADGES.map((b) => (
            <span key={b.label} style={{ display: 'grid', justifyItems: 'center', gap: 4, textAlign: 'center' }}>
              <Badge shape={b.shape} tier={b.tier} emblem={b.emblem} size={52} />
              <span style={{ fontSize: 12, fontWeight: 700, color: b.tier === 'locked' ? 'var(--tf-muted)' : 'var(--tf-ink-2)' }}>{b.label}</span>
            </span>
          ))}
        </div>

        <div className="tf-section" style={{ margin: '18px 0 10px' }}>
          <p className="tf-h3">Certificates</p>
          <span className="tf-link">See all</span>
        </div>
        <button type="button" className="tf-card" onClick={() => nav?.('certificate')} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 12px', border: 0, textAlign: 'left' }}>
          <CertificateThumb width={36} />
          <span style={{ flex: 1, display: 'grid' }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Four-Digit Club</span>
            <span className="tf-small">Verified by Neha · Nov 2026</span>
          </span>
          <Glyph name="chevron" size={18} style={{ color: 'var(--tf-muted)' }} />
        </button>
      </div>
      <FloatingTabBar active="profile" nav={nav} />
    </div>
  );
}
