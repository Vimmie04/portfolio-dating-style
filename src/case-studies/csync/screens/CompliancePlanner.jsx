import { AppShell } from '../AppShell.jsx';
import { Icon } from '../icons.jsx';

/* Compliance Planner, exactly as shipped: the page is scrolled past its summary cards. */
const COMPANIES = [
  { name: '2026-27/001 – ABC Test C…', left: '6 left', pct: 25, filed: 2, notFiled: 6, tone: 'amber', sel: true },
  { name: '100002 – Company2 Techn…', left: '1 left', pct: 0, filed: 0, notFiled: 1 },
  { name: '100019 – Company19 Techn…', left: '1 left', pct: 0, filed: 0, notFiled: 1 },
  { name: 'ABC Test Company', left: '1 left', pct: 50, filed: 1, notFiled: 1, tone: 'indigo' },
  { name: 'Company15 Technologies Pr…', left: '1 left', pct: 50, filed: 1, notFiled: 1, tone: 'indigo' },
  { name: '100004 – Company4 Tech…', done: true, pct: 100, filed: 1, notFiled: 0, tone: 'green' },
];

const FORMS = [
  { code: 'FO', name: 'Form Not Specified', filed: 1, notFiled: 2, due: '30 Apr 2026', pct: 33 },
  { code: 'IN', name: 'INC-27', filed: 0, notFiled: 1, due: '24 Apr 2026', pct: 0 },
  { code: 'MR', name: 'MR-1', filed: 0, notFiled: 1, due: '05 May 2026', pct: 0 },
  { code: 'SH', name: 'SH-7', filed: 0, notFiled: 1, due: '12 May 2026', pct: 0 },
  { code: 'SP', name: 'SPICe+ Form', filed: 0, notFiled: 1, due: '25 Apr 2026', pct: 0 },
  { code: 'IN', name: 'INC-4', filed: 1, notFiled: 0, due: '25 Apr 2026', pct: 100, isFiled: true },
];

const STATS = [
  { tone: 'violet', hint: 'Tap to view all' },
  { tone: 'violet', hint: 'Tap to view all' },
  { tone: 'amber', hint: 'Tap to view pending' },
  { tone: 'green', hint: 'Tap to view filed' },
];

/** One company in the planner's list (also used on its own in the page cover). */
export function CompanyCard({ c = COMPANIES[0] }) {
  return (
    <div className={`cx-co${c.sel ? ' is-sel' : ''}`}>
      <div className="cx-co__row">
        <b>{c.name}</b>
        {c.done ? (
          <span className="cx-co__badge cx-co__badge--done">
            <Icon name="check" size={10} stroke={2.6} />
            Done
          </span>
        ) : (
          <span className="cx-co__badge">{c.left}</span>
        )}
      </div>
      <div className="cx-co__row">
        <span className="cx-bar">
          <span className={`cx-bar__fill cx-bar__fill--${c.tone || 'amber'}`} style={{ width: `${c.pct}%` }} />
        </span>
        <small className="cx-co__pct">{c.pct}%</small>
      </div>
      <small className="cx-co__meta">
        {c.filed} filed · {c.notFiled} not filed
      </small>
    </div>
  );
}

export function CompliancePlanner({ overlay }) {
  return (
    <AppShell active="planner" crumb="Compliance Planner" thumb={[157, 659]} overlay={overlay}>
      {/* Summary cards: scrolled up under the top bar, only their last line shows */}
      <div className="cx-stats">
        {STATS.map((s, i) => (
          <div key={i} className={`cx-stat cx-stat--${s.tone}`}>
            <span>{s.hint}</span>
          </div>
        ))}
      </div>

      <section className="cx-card cx-plan">
        <div className="cx-plan__tools">
          <span className="cx-plan__search">
            <Icon name="search" size={16} stroke={1.8} />
            Search company...
          </span>
          <span className="cx-seg">
            <span className="is-on">
              All <em>(17)</em>
            </span>
            <span>
              Pending <em className="amber">(10)</em>
            </span>
            <span>
              Filed <em className="green">(7)</em>
            </span>
          </span>
          <span className="cx-plan__count">
            <i className="cx-dot" />8 companies
          </span>
        </div>

        <div className="cx-plan__list">
          <p className="cx-plan__label">
            Companies <em>(8)</em>
          </p>
          {COMPANIES.map((c) => (
            <CompanyCard key={c.name} c={c} />
          ))}
        </div>

        <div className="cx-plan__detail">
          <div className="cx-plan__head">
            <div>
              <h2>2026-27/001 – ABC Test Company</h2>
              <small>8 total forms · 2 filed · 6 not filed</small>
            </div>
            <span className="cx-pill cx-status cx-status--pending cx-status--lg">
              <i className="cx-dot" />
              Pending Compliance
            </span>
            <span className="cx-sort">
              Sort: Not Filed First
              <Icon name="chevronDown" size={15} stroke={2} />
            </span>
          </div>

          <div className="cx-plan__filters">
            <span className="is-on">All Forms</span>
            <span>Not Filed</span>
            <span>Filed</span>
            <small>6 forms</small>
          </div>

          <div className="cx-table">
            <div className="cx-table__head">
              <span>Form</span>
              <span>Status</span>
              <span>Filed</span>
              <span>Not filed</span>
              <span>Last due date</span>
              <span>Progress</span>
            </div>
            {FORMS.map((f) => (
              <div key={f.name} className={`cx-table__row${f.name.length > 14 ? ' is-tall' : ''}`}>
                <span className="cx-form">
                  <i className={f.isFiled ? 'is-filed' : ''}>{f.code}</i>
                  {f.name}
                </span>
                <span>
                  <span className={`cx-pill cx-status ${f.isFiled ? 'cx-status--filed' : 'cx-status--pending'}`}>
                    <i className="cx-dot" />
                    {f.isFiled ? 'Filed' : 'Not Filed'}
                  </span>
                </span>
                <span className="cx-num cx-num--green">{f.filed}</span>
                <span className={`cx-num ${f.notFiled ? 'cx-num--amber' : 'cx-num--none'}`}>{f.notFiled || '—'}</span>
                <span className="cx-date">{f.due}</span>
                <span className="cx-prog">
                  <span className="cx-bar">
                    <span className={`cx-bar__fill cx-bar__fill--${f.pct === 100 ? 'green' : 'amber'}`} style={{ width: `${f.pct}%` }} />
                  </span>
                  <small>{f.pct}%</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
