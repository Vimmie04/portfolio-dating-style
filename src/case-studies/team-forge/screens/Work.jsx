import { Avatar, FloatingTabBar, Glyph, PriorityDot, Ring, StatusBar, XPText } from '../kit.jsx';

/* Tasks in the story. Cards show three facts: title, due, XP (+ who you're working with). */
export const TASKS = {
  captions: { title: 'Draft launch-week Instagram captions', due: 'Today, 6:00 PM', xp: 40, high: true, with: ['kush'] },
  stories: { title: 'Design 3 story templates in Canva', due: 'Tomorrow', xp: 30 },
  ugc: { title: 'Collect UGC for the launch page', due: 'Friday', xp: 20, with: ['kritika'] },
  report: { title: 'Weekly social media report', due: 'Monday', xp: 35 },
};

export function TaskCard({ task, onClick }) {
  return (
    <button type="button" className="tf-card tf-task" onClick={onClick}>
      <span className="tf-task__title">
        {task.high && <PriorityDot />}
        {task.title}
      </span>
      <span className="tf-task__meta">
        <span className="tf-task__due">
          <Glyph name="clock" size={16} />
          {task.due}
        </span>
        <span className="tf-task__right">
          {task.with && (
            <span className="tf-avatars">
              <Avatar person="riya" size={26} />
              {task.with.map((p) => (
                <Avatar key={p} person={p} size={26} />
              ))}
            </span>
          )}
          <XPText value={task.xp} />
        </span>
      </span>
    </button>
  );
}

/** 03 · Home: one statement, one progress card, one next task. Everything else waits a tap away. */
export function HomeScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-body">
        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar person="riya" size={48} />
          <div style={{ flex: 1, display: 'grid', gap: 1 }}>
            <p style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>Hi, Riya</p>
            <p className="tf-small">Monday, 3 November</p>
          </div>
          <button type="button" className="tf-icon-btn" aria-label="Notifications" style={{ position: 'relative' }}>
            <Glyph name="bell" size={22} />
            <span style={{ position: 'absolute', top: 11, right: 12, width: 8, height: 8, borderRadius: '50%', background: 'var(--tf-brand)', boxShadow: '0 0 0 2px #fff' }} />
          </button>
        </div>

        {/* The one statement */}
        <h1 className="tf-display" style={{ marginTop: 32 }}>
          You have <span style={{ color: 'var(--tf-brand)' }}>4 tasks</span>
          <br />
          to do this week.
        </h1>

        {/* Progress: white card, the ring carries the colour */}
        <div className="tf-card" style={{ marginTop: 26, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Ring value={0.75} size={64} stroke={7}>
            <span style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 17 }}>Lv 4</span>
          </Ring>
          <div style={{ flex: 1, display: 'grid', gap: 3 }}>
            <p style={{ fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 22, lineHeight: 1.05 }}>
              750 <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tf-muted)' }}>/ 1,000 XP</span>
            </p>
            <p className="tf-small">250 XP to the Four-Digit Club</p>
          </div>
        </div>

        {/* Next up: set apart by a pale tint, not a heavy colour block */}
        <div className="tf-section" style={{ marginTop: 30 }}>
          <p className="tf-h3">Next up</p>
          <button type="button" className="tf-link" onClick={() => nav?.('tasks')}>
            See all
          </button>
        </div>
        <button
          type="button"
          className="tf-tint-card"
          onClick={() => nav?.('task')}
          style={{ position: 'relative', overflow: 'hidden', display: 'grid', gap: 14, width: '100%', padding: 20, border: 0, textAlign: 'left', color: 'var(--tf-ink)' }}
        >
          <span aria-hidden="true" style={{ position: 'absolute', right: -46, top: -46, width: 150, height: 150, borderRadius: '50%', border: '22px solid rgba(0,119,182,0.05)' }} />
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="tf-chip tf-chip--white">
              <Glyph name="clock" size={16} style={{ color: 'var(--tf-brand)' }} />
              Today, 6:00 PM
            </span>
            <span className="tf-avatars">
              <Avatar person="riya" size={32} />
              <Avatar person="kush" size={32} />
            </span>
          </span>
          <span style={{ position: 'relative', maxWidth: 270, fontFamily: 'var(--tf-heading)', fontWeight: 800, fontSize: 24, lineHeight: 1.15 }}>
            Draft launch-week Instagram captions
          </span>
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'grid' }}>
              <XPText value={40} size={20} />
              <span className="tf-small">when Neha approves</span>
            </span>
            <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: '50%', background: 'var(--tf-brand)', color: 'var(--tf-on-brand)' }}>
              <Glyph name="chevron" size={20} strokeWidth={2.2} />
            </span>
          </span>
        </button>

        {/* Waiting on someone else: quiet, one line */}
        <button
          type="button"
          className="tf-card"
          onClick={() => nav?.('review')}
          style={{ marginTop: 12, width: '100%', border: 0, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}
        >
          <span className="tf-file__icon" style={{ width: 38, height: 38 }}>
            <Glyph name="send" size={20} />
          </span>
          <span style={{ flex: 1, display: 'grid', gap: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Competitor research</span>
            <span className="tf-small">In review · seen by Neha</span>
          </span>
          <Glyph name="chevron" size={18} style={{ color: 'var(--tf-muted)' }} />
        </button>
      </div>
      <FloatingTabBar active="home" nav={nav} />
    </div>
  );
}

/** 04 · Tasks: one switch for status, grouped by when it's due. No filter rows, no tag soup. */
export function TasksScreen({ nav }) {
  const open = () => nav?.('task');
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="tf-display" style={{ fontSize: 32 }}>
            My tasks
          </h1>
          <button type="button" className="tf-icon-btn" aria-label="Search">
            <Glyph name="search" size={21} />
          </button>
        </div>

        <div className="tf-seg" style={{ marginTop: 18 }}>
          <button type="button" className="is-active">
            To do<span className="tf-seg__count">4</span>
          </button>
          <button type="button">
            In review<span className="tf-seg__count">1</span>
          </button>
          <button type="button">
            Done<span className="tf-seg__count">23</span>
          </button>
        </div>

        <p className="tf-group">Today</p>
        <TaskCard task={TASKS.captions} onClick={open} />
        <p className="tf-group">This week</p>
        <div style={{ display: 'grid', gap: 10 }}>
          <TaskCard task={TASKS.stories} onClick={open} />
          <TaskCard task={TASKS.ugc} onClick={open} />
        </div>
        <p className="tf-group">Next week</p>
        <TaskCard task={TASKS.report} onClick={open} />
      </div>
      <FloatingTabBar active="tasks" nav={nav} />
    </div>
  );
}

function Fact({ label, children, first }) {
  return (
    <span style={{ display: 'grid', gap: 3, padding: '0 14px', borderLeft: first ? 0 : '1px solid var(--tf-line)' }}>
      <span className="tf-small">{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700 }}>{children}</span>
    </span>
  );
}

/** 05 · Task detail: brief, checklist and files in one place, so nothing gets lost in a chat thread. */
export function TaskDetailScreen({ nav }) {
  const checks = [
    ['Read the brand voice guide', true],
    ['Write 5 caption options', true],
    ['Add a hashtag set for the launch', false],
  ];
  return (
    <div className="tf tf-screen">
      <StatusBar />
      <div className="tf-topbar">
        <button type="button" className="tf-icon-btn" aria-label="Back" onClick={() => nav?.('home')}>
          <Glyph name="back" size={22} />
        </button>
        <button type="button" className="tf-icon-btn" aria-label="More">
          <Glyph name="more" size={22} />
        </button>
      </div>
      <div className="tf-body" style={{ paddingTop: 6 }}>
        <p className="tf-small" style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <PriorityDot />
          High priority · from Neha
        </p>
        <h1 className="tf-h1" style={{ marginTop: 8 }}>
          Draft launch-week Instagram captions
        </h1>

        <div className="tf-card" style={{ marginTop: 18, padding: '14px 0', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr' }}>
          <Fact label="Due" first>
            Today, 6 PM
          </Fact>
          <Fact label="Reward">
            <XPText value={40} />
          </Fact>
          <Fact label="With">
            <Avatar person="kush" size={22} />
            Kush
          </Fact>
        </div>

        <p className="tf-group">Brief</p>
        <p style={{ fontSize: 15, color: 'var(--tf-ink-2)' }}>Five caption options for the launch-week posts. Playful, on-brand, under 150 characters.</p>

        <div className="tf-section" style={{ margin: '22px 0 10px' }}>
          <p className="tf-label">Checklist</p>
          <span className="tf-small">2 of 3</span>
        </div>
        <div className="tf-card" style={{ padding: '2px 16px' }}>
          {checks.map(([label, done]) => (
            <div key={label} className={`tf-check ${done ? 'is-done' : ''}`}>
              <span className="tf-check__box">{done && <Glyph name="check" size={14} strokeWidth={2.6} />}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="tf-file" style={{ marginTop: 10 }}>
          <span className="tf-file__icon">
            <Glyph name="file" size={20} />
          </span>
          <span style={{ flex: 1, display: 'grid' }}>
            <span className="tf-file__name">Brand_voice_guide.pdf</span>
            <span className="tf-small">1.2 MB</span>
          </span>
          <Glyph name="download" size={20} style={{ color: 'var(--tf-muted)' }} />
        </div>
      </div>
      <div className="tf-dock">
        <button type="button" className="tf-icon-btn" aria-label="Comments" style={{ width: 54, height: 54, boxShadow: 'inset 0 0 0 1px var(--tf-line)' }}>
          <Glyph name="chat" size={22} />
        </button>
        <button type="button" className="tf-btn" onClick={() => nav?.('submit')}>
          <Glyph name="upload" size={20} strokeWidth={2} />
          Submit work
        </button>
      </div>
    </div>
  );
}

/** 06 · Submit: file, a note for the reviewer, send. One sheet, three steps. */
export function SubmitScreen({ nav }) {
  return (
    <div className="tf tf-screen">
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <TaskDetailScreen />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,32,48,0.42)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 22px 38px', borderRadius: '26px 26px 0 0', background: '#fff', display: 'grid', gap: 14 }}>
        <span style={{ justifySelf: 'center', width: 40, height: 5, borderRadius: 3, background: '#d6dde5' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="tf-h2">Submit work</h2>
          <button type="button" className="tf-icon-btn" aria-label="Close" style={{ width: 40, height: 40, boxShadow: 'none', background: 'var(--tf-canvas)' }} onClick={() => nav?.('task')}>
            <Glyph name="x" size={18} />
          </button>
        </div>

        <p className="tf-label" style={{ marginTop: 4 }}>
          Your file
        </p>
        <div className="tf-file" style={{ boxShadow: 'inset 0 0 0 1px var(--tf-line)' }}>
          <span className="tf-file__icon">
            <Glyph name="file" size={20} />
          </span>
          <span style={{ flex: 1, display: 'grid' }}>
            <span className="tf-file__name">Launch_captions_v2.docx</span>
            <span className="tf-small">248 KB · uploaded</span>
          </span>
          <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, borderRadius: '50%', background: 'var(--tf-brand)', color: 'var(--tf-on-brand)' }}>
            <Glyph name="check" size={14} strokeWidth={2.6} />
          </span>
        </div>
        <button type="button" className="tf-link" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Glyph name="plus" size={16} strokeWidth={2.2} />
          Add another file
        </button>

        <p className="tf-label" style={{ marginTop: 4 }}>
          Note for Neha
        </p>
        <div style={{ minHeight: 84, padding: '12px 14px', borderRadius: 18, boxShadow: 'inset 0 0 0 1px var(--tf-line)', fontSize: 15, color: 'var(--tf-ink-2)' }}>
          Added 5 options. Option B is my pick for the teaser!
        </div>

        <button type="button" className="tf-btn" style={{ marginTop: 6 }} onClick={() => nav?.('review')}>
          <Glyph name="send" size={20} />
          Send for review
        </button>
        <p className="tf-small" style={{ textAlign: 'center' }}>
          Neha gets a notification right away.
        </p>
      </div>
    </div>
  );
}
