import { Avatar, Glyph, GoogleGlyph, LinkedInGlyph, LogoMark, Ring, StatusBar } from '../kit.jsx';
import { Badge } from '../badges.jsx';

/** 01 · Welcome: leads with the value (recognition), shown with real UI, not a three-slide carousel. */
export function WelcomeScreen({ nav }) {
  return (
    <div className="tf tf-screen tf-screen--white">
      <StatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        {/* Inside the app: the mark on its own */}
        <LogoMark height={28} title="TeamForge" />
      </div>

      {/* A calm stack of real product moments */}
      <div style={{ position: 'relative', height: 380, margin: '14px 0 0' }} aria-hidden="true">
        {/* milestone (amber is reserved for milestones) */}
        <div className="tf-card" style={{ position: 'absolute', left: 28, top: 18, width: 220, padding: 14, transform: 'rotate(-5deg)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge shape="medal" tier="gold" emblem="1K" size={40} />
          <span style={{ display: 'grid', gap: 1 }}>
            <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 16 }}>Four-Digit Club</span>
            <span className="tf-small" style={{ display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
              <LinkedInGlyph size={14} /> Ready to share
            </span>
          </span>
        </div>

        {/* progress */}
        <div className="tf-card" style={{ position: 'absolute', right: 24, top: 74, width: 150, padding: '18px 14px', transform: 'rotate(5deg)', display: 'grid', justifyItems: 'center', gap: 10 }}>
          <Ring value={0.75} size={76} stroke={8}>
            <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 19 }}>Lv 4</span>
          </Ring>
          <span className="tf-small" style={{ fontWeight: 700, color: 'var(--tf-ink-2)' }}>
            750 / 1,000 XP
          </span>
        </div>

        {/* the approval moment */}
        <div className="tf-tint-card" style={{ position: 'absolute', left: 24, top: 212, width: 252, padding: 16, transform: 'rotate(-2deg)', display: 'grid', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar person="neha" size={34} />
            <span style={{ flex: 1, display: 'grid' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Neha approved your work</span>
              <span className="tf-small">just now</span>
            </span>
          </span>
          <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 17, lineHeight: 1.25 }}>Launch-week Instagram captions</span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="tf-chip tf-chip--success" style={{ height: 26 }}>
              <Glyph name="check" size={14} strokeWidth={2.4} />
              Approved
            </span>
            <span className="tf-xp" style={{ fontSize: 17 }}>
              +40 XP
            </span>
          </span>
        </div>
      </div>

      <div style={{ padding: '18px 24px 0', display: 'grid', gap: 12 }}>
        <h1 className="tf-display" style={{ fontSize: 38 }}>
          Your work,
          <br />
          <span style={{ color: 'var(--tf-brand)' }}>recognised.</span>
        </h1>
        <p className="tf-sub" style={{ fontSize: 16, maxWidth: 320 }}>
          Earn XP for every approved task, unlock milestones and collect certificates you can share.
        </p>
      </div>

      <div style={{ marginTop: 'auto', padding: '0 24px 44px', display: 'grid', gap: 6 }}>
        <button type="button" className="tf-btn" onClick={() => nav?.('role')}>
          Get started
        </button>
        <button type="button" className="tf-link" style={{ height: 44 }} onClick={() => nav?.('role')}>
          I already have an account
        </button>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, text, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={selected ? 'tf-tint-card' : 'tf-card'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: 16,
        border: 0,
        textAlign: 'left',
        boxShadow: selected ? 'inset 0 0 0 1.5px var(--tf-brand)' : undefined,
      }}
    >
      <span style={{ display: 'grid', placeItems: 'center', width: 48, height: 48, borderRadius: '50%', background: selected ? '#fff' : 'var(--tf-canvas)', color: 'var(--tf-brand)' }}>
        <Glyph name={icon} size={24} />
      </span>
      <span style={{ flex: 1, display: 'grid', gap: 2 }}>
        <span style={{ fontFamily: 'var(--tf-heading)', fontSize: 17, fontWeight: 800 }}>{title}</span>
        <span style={{ fontSize: 13, color: 'var(--tf-muted)', lineHeight: 1.4 }}>{text}</span>
      </span>
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: selected ? 'none' : 'inset 0 0 0 2px #c8d1db',
          background: selected ? 'var(--tf-brand)' : 'transparent',
          color: 'var(--tf-on-brand)',
        }}
      >
        {selected && <Glyph name="check" size={14} strokeWidth={2.6} />}
      </span>
    </button>
  );
}

/** 02 · Role + sign-in on one screen; LinkedIn first, because certificates end up there. */
export function RoleScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-topbar">
        <button type="button" className="tf-icon-btn" aria-label="Back" onClick={() => nav?.('welcome')}>
          <Glyph name="back" size={22} />
        </button>
        <span className="tf-small" style={{ fontWeight: 700 }}>
          Step 1 of 2
        </span>
      </div>
      <div style={{ padding: '12px 24px 0', display: 'grid', gap: 8 }}>
        <h1 className="tf-display" style={{ fontSize: 32 }}>
          How will you use
          <br />
          TeamForge?
        </h1>
        <p className="tf-sub">We’ll set up your space around your role.</p>
      </div>
      <div style={{ padding: '24px 24px 0', display: 'grid', gap: 12 }}>
        <RoleCard icon="users" title="I lead a team" text="Assign work, review it and recognise it." />
        <RoleCard icon="user" title="I’m an intern or team member" text="Track tasks, earn XP and build proof of real work." selected />
      </div>

      <div style={{ marginTop: 'auto', padding: '0 24px 40px', display: 'grid', gap: 10 }}>
        <button type="button" className="tf-btn tf-btn--ghost" onClick={() => nav?.('home')}>
          <LinkedInGlyph size={20} />
          Continue with LinkedIn
        </button>
        <button type="button" className="tf-btn tf-btn--ghost" onClick={() => nav?.('home')}>
          <GoogleGlyph size={20} />
          Continue with Google
        </button>
        <button type="button" className="tf-link" style={{ height: 40 }} onClick={() => nav?.('home')}>
          Use email instead
        </button>
        <p style={{ fontSize: 11, color: 'var(--tf-muted)', textAlign: 'center' }}>By continuing you agree to the Terms and Privacy Policy.</p>
      </div>
    </div>
  );
}
