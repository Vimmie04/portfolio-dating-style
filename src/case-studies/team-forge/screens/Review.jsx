import { Avatar, Celebration, FloatingTabBar, Glyph, StatusBar, XPText } from '../kit.jsx';
import { TASKS, TaskCard } from './Work.jsx';

function Step({ title, meta, state, last }) {
  const done = state === 'done';
  const current = state === 'current';
  return (
    <div style={{ display: 'flex', gap: 12, position: 'relative', paddingBottom: last ? 0 : 18 }}>
      {!last && <span style={{ position: 'absolute', left: 12, top: 28, bottom: 2, width: 2, borderRadius: 2, background: done ? 'var(--tf-brand)' : 'var(--tf-line)' }} />}
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          flex: 'none',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: done ? 'var(--tf-brand)' : '#fff',
          boxShadow: done ? 'none' : `inset 0 0 0 2px ${current ? 'var(--tf-brand)' : 'var(--tf-line)'}`,
          color: 'var(--tf-on-brand)',
        }}
      >
        {done && <Glyph name="check" size={14} strokeWidth={2.6} />}
        {current && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tf-brand)' }} />}
      </span>
      <span style={{ display: 'grid', gap: 1, paddingTop: 2 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>{title}</span>
        <span className="tf-small">{meta}</span>
      </span>
    </div>
  );
}

/** 07 · In review: the waiting is visible, timed and nudgeable (the core pain from research). */
export function InReviewScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-topbar">
        <button type="button" className="tf-icon-btn" aria-label="Back" onClick={() => nav?.('home')}>
          <Glyph name="back" size={22} />
        </button>
      </div>
      <div className="tf-body" style={{ paddingTop: 8 }}>
        <span className="tf-file__icon" style={{ width: 60, height: 60 }}>
          <Glyph name="send" size={28} />
        </span>
        <h1 className="tf-display" style={{ marginTop: 16, fontSize: 32 }}>
          Sent for review
        </h1>
        <p className="tf-sub" style={{ marginTop: 6 }}>
          Neha usually reviews within a day.
        </p>

        <div className="tf-card" style={{ marginTop: 20, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, paddingBottom: 14, marginBottom: 16, borderBottom: '1px solid var(--tf-line)' }}>
            <span className="tf-task__title" style={{ fontSize: 16 }}>
              Draft launch-week Instagram captions
            </span>
            <XPText value={40} />
          </div>
          <Step title="Submitted" meta="Today, 10:24 AM" state="done" />
          <Step title="Seen by Neha" meta="Today, 11:02 AM" state="done" />
          <Step title="Approval" meta="Expected by tomorrow morning" state="current" last />
        </div>

        <p className="tf-small" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Glyph name="bell" size={18} />
          Need it sooner? You can nudge Neha tomorrow.
        </p>

        <p className="tf-group" style={{ marginTop: 26 }}>
          While you wait
        </p>
        <TaskCard task={TASKS.stories} onClick={() => nav?.('task')} />
      </div>
      <FloatingTabBar active="tasks" nav={nav} />
    </div>
  );
}

/** 08 · Reviews (team lead): approve, give quick feedback and send kudos in one card. New in the redesign. */
export function ApprovalsScreen({ nav }) {
  const feedback = [
    ['Great work', true],
    ['On time', true],
    ['Creative', false],
  ];
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar person="neha" size={48} />
          <div style={{ flex: 1, display: 'grid', gap: 1 }}>
            <p style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>Hi, Neha</p>
            <p className="tf-small">Monday, 3 November</p>
          </div>
          <button type="button" className="tf-icon-btn" aria-label="Notifications">
            <Glyph name="bell" size={22} />
          </button>
        </div>

        <h1 className="tf-display" style={{ marginTop: 26 }}>
          <span style={{ color: 'var(--tf-brand)' }}>4 reviews</span> waiting
        </h1>

        <div className="tf-card" style={{ marginTop: 18, padding: 18, display: 'grid', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar person="riya" size={40} />
            <span style={{ flex: 1, display: 'grid' }}>
              <span style={{ fontWeight: 700 }}>Riya Sharma</span>
              <span className="tf-small">Marketing intern · 2h ago</span>
            </span>
            <XPText value={40} />
          </div>
          <p className="tf-task__title" style={{ fontSize: 18 }}>
            Draft launch-week Instagram captions
          </p>
          <div className="tf-file" style={{ padding: '10px 12px', boxShadow: 'inset 0 0 0 1px var(--tf-line)' }}>
            <span className="tf-file__icon" style={{ width: 34, height: 34 }}>
              <Glyph name="file" size={18} />
            </span>
            <span className="tf-file__name" style={{ flex: 1 }}>
              Launch_captions_v2.docx
            </span>
            <span className="tf-link">Open</span>
          </div>
          <span style={{ display: 'flex', gap: 8 }}>
            {feedback.map(([label, on]) => (
              <span key={label} className={`tf-chip ${on ? 'tf-chip--on' : ''}`}>
                {on && <Glyph name="check" size={14} strokeWidth={2.4} />}
                {label}
              </span>
            ))}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="tf-file__icon" style={{ width: 34, height: 34 }}>
              <Glyph name="star" size={18} />
            </span>
            <span style={{ flex: 1, display: 'grid' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Send kudos</span>
              <span className="tf-small">+10 bonus XP for Riya</span>
            </span>
            <span className="tf-switch is-on" aria-hidden="true" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 2 }}>
            <button type="button" className="tf-link" style={{ flex: 'none', padding: '0 4px', color: 'var(--tf-ink-2)' }}>
              Request changes
            </button>
            <button type="button" className="tf-btn" style={{ height: 50 }} onClick={() => nav?.('approved')}>
              <Glyph name="check" size={18} strokeWidth={2.4} />
              Approve
            </button>
          </div>
        </div>

        <div className="tf-card" style={{ marginTop: 12 }}>
          {[
            ['kush', 'Competitor research', 'Kush · 5h ago', false],
            ['sid', 'Onboarding wireframes', 'Sid · due yesterday', true],
          ].map(([p, title, meta, overdue], i) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i ? '1px solid var(--tf-line)' : 0 }}>
              <Avatar person={p} size={34} />
              <span style={{ flex: 1, display: 'grid' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
                <span className="tf-small" style={overdue ? { color: 'var(--tf-danger)', fontWeight: 600 } : undefined}>
                  {overdue ? 'Overdue · ' : ''}
                  {meta}
                </span>
              </span>
              <Glyph name="chevron" size={18} style={{ color: 'var(--tf-muted)' }} />
            </div>
          ))}
        </div>
      </div>
      <FloatingTabBar active="approvals" nav={nav} lead />
    </div>
  );
}

/** 09 · Recognised: XP plus the manager's actual words — the recognition Riya was missing. */
export function RecognisedScreen({ nav }) {
  return (
    <div className="tf tf-screen tf-screen--white">
      <Celebration />
      <StatusBar />
      <div className="tf-topbar" style={{ justifyContent: 'flex-end' }}>
        <button type="button" className="tf-icon-btn" aria-label="Close" onClick={() => nav?.('home')}>
          <Glyph name="x" size={20} />
        </button>
      </div>
      <div className="tf-body" style={{ display: 'grid', justifyItems: 'center', alignContent: 'start', textAlign: 'center', position: 'relative', paddingTop: 4 }}>
        {/* green is reserved for this moment: approved */}
        <span style={{ display: 'grid', placeItems: 'center', width: 96, height: 96, borderRadius: '50%', background: 'var(--tf-success)', color: '#fff', boxShadow: '0 0 0 12px var(--tf-success-bg)' }}>
          <Glyph name="check" size={46} strokeWidth={2.6} />
        </span>
        <h1 className="tf-display" style={{ marginTop: 30 }}>
          Approved by Neha
        </h1>
        <p style={{ marginTop: 8, fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 44, lineHeight: 1, color: 'var(--tf-primary)' }}>+50 XP</p>
        <p className="tf-small" style={{ marginTop: 6 }}>
          40 for the task + 10 kudos
        </p>

        <div className="tf-card" style={{ marginTop: 22, width: '100%', padding: 16, textAlign: 'left', display: 'flex', gap: 12 }}>
          <Avatar person="neha" size={38} />
          <p style={{ fontSize: 15, color: 'var(--tf-ink-2)' }}>“Sharp, on-brand captions. We’re using option B for the teaser!”</p>
        </div>

        <div className="tf-card" style={{ marginTop: 10, width: '100%', padding: 16, textAlign: 'left', display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 18 }}>800 / 1,000 XP</span>
            <span className="tf-small" style={{ fontWeight: 700 }}>
              Level 4
            </span>
          </div>
          <div className="tf-bar">
            <span style={{ width: '80%' }} />
          </div>
          <span className="tf-small">200 XP to the Four-Digit Club</span>
        </div>
      </div>
      <div style={{ padding: '12px 22px 40px', display: 'grid', gap: 4 }}>
        <button type="button" className="tf-btn" onClick={() => nav?.('home')}>
          Keep going
        </button>
        <button type="button" className="tf-link" style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Glyph name="share" size={18} />
          Share the win
        </button>
      </div>
    </div>
  );
}
