import { Icon } from './icons.jsx';
import intellosoftMark from './assets/intellosoft-mark.png';
import adminAvatar from './assets/admin-avatar.png';
import './csync-app.css';

/* The shipped CSync admin shell, rebuilt 1:1 from the product (1536 × 736 viewport). */
const NAV = [
  { label: 'Overview', items: [{ id: 'dashboard', name: 'Dashboard', icon: 'home' }] },
  {
    label: 'Work',
    items: [
      { id: 'tasks', name: 'Task Sheet', icon: 'clipboardCheck' },
      { id: 'invoices', name: 'Invoice Details', icon: 'fileText' },
      { id: 'calendar', name: 'CS Calendar', icon: 'calendar' },
      { id: 'planner', name: 'Compliance Planner', icon: 'chartSquare' },
      { id: 'chat', name: 'Chat', icon: 'message' },
    ],
  },
  {
    label: 'Organization',
    items: [
      { id: 'companies', name: 'Companies', icon: 'building' },
      { id: 'employees', name: 'Employees', icon: 'users' },
      { id: 'profile', name: 'Company Profile', icon: 'building' },
      { id: 'phone', name: 'Phone Directory', icon: 'phoneCall' },
    ],
  },
  { label: 'Logs', items: [] },
];

export function AppShell({ active, crumb, scroll = 0, thumb, overlay, children }) {
  return (
    <div className="cx">
      <aside className="cx-side">
        <div className="cx-brand">
          <span className="cx-brand__logo">
            <img src={intellosoftMark} alt="" />
          </span>
          <b>Intellosoft Infotech ...</b>
        </div>

        <nav className="cx-nav" aria-label="CSync">
          {NAV.map((group) => (
            <div key={group.label} className="cx-nav__group">
              <p className="cx-nav__label">{group.label}</p>
              {group.items.map((item) => (
                <span key={item.id} className={`cx-nav__item${item.id === active ? ' is-active' : ''}`}>
                  <Icon name={item.icon} size={18} stroke={1.7} />
                  {item.name}
                </span>
              ))}
            </div>
          ))}
        </nav>

        <div className="cx-user">
          <img className="cx-user__avatar" src={adminAvatar} alt="" />
          <span className="cx-user__name">
            <b>Admin Intello...</b>
            <small>Admin</small>
          </span>
          <span className="cx-user__collapse">
            <Icon name="chevronsLeft" size={16} stroke={1.8} />
          </span>
        </div>
      </aside>

      <div className="cx-main">
        <header className="cx-top">
          <span className="cx-crumb__role">
            <i />
            Admin
          </span>
          <Icon name="chevronRight" size={13} stroke={2} className="cx-crumb__sep" />
          <span className="cx-crumb__page">{crumb}</span>

          <span className="cx-search">
            <Icon name="search" size={17} stroke={1.8} />
            <span className="cx-search__ph">Search tasks, companies, invoices, users...</span>
            <kbd>Ctrl K</kbd>
          </span>
          <span className="cx-bell">
            <Icon name="bell" size={18} stroke={1.8} />
            <em>2</em>
          </span>
        </header>

        <div className="cx-page" style={{ transform: `translateY(${-scroll}px)` }}>
          {children}
        </div>
      </div>

      <div className="cx-scrollbar" aria-hidden="true">
        <span style={{ top: thumb[0], height: thumb[1] - thumb[0] }} />
      </div>

      {/* Animation layer (cursor, click ripple), in the same 1536 × 736 coordinates */}
      {overlay}
    </div>
  );
}
