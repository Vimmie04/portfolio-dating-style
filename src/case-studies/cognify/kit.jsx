import { Icon } from './icons.jsx';
import { Cogni } from './Cogni.jsx';
import meherAvatar from './assets/avatar-meher.jpg';
import './cognify.css';

/** Cogni speaking: the companion plus one short, calm sentence. */
export function CogniSays({ children, size = 64, mood = 'calm' }) {
  return (
    <div className="cg-says">
      <Cogni size={size} mood={mood} />
      <p className="cg-says__bubble">{children}</p>
    </div>
  );
}

export const FONTS =
  'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap';

export function StatusBar() {
  return (
    <div className="cg-status" aria-hidden="true">
      <span>9:41</span>
      <span className="cg-status__icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.6 10.6 0 0 0 8 .3C5.2.3 2.6 1.4.7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.7c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4c-1.8 0-3.5.7-4.7 1.8l1.3 1.4C5.5 6.4 6.7 5.9 8 5.9zm0 3.6c.5 0 .9.2 1.2.5L8 11.4 6.8 10c.3-.3.7-.5 1.2-.5z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

export function Avatar({ size = 48 }) {
  return (
    <span className="cg-avatar" style={{ width: size, height: size }}>
      <img src={meherAvatar} alt="Meher" width={size} height={size} />
    </span>
  );
}

const TABS = [
  { id: 'today', label: 'Today', icon: 'today' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'cogni', label: 'Ask Cogni', icon: 'mic' },
  { id: 'routines', label: 'Routines', icon: 'routine' },
  { id: 'me', label: 'Me', icon: 'me' },
];

/** Four labelled tabs with Ask Cogni in the middle: the same five places on every screen.
 *  Today · Tasks · Ask Cogni · Routines · Me (task management only; no games). */
export function TabBar({ active, nav }) {
  return (
    <nav className="cg-tabs" aria-label="Main">
      {TABS.map((t) => {
        const on = active === t.id;
        const cogni = t.id === 'cogni';
        return (
          <button
            key={t.id}
            type="button"
            className={`cg-tab${on ? ' is-active' : ''}${cogni ? ' cg-tab--cogni' : ''}`}
            aria-current={on ? 'page' : undefined}
            onClick={() => nav?.(t.id)}
          >
            <span className="cg-tab__icon">
              {t.id === 'me' ? (
                // Me is Meher: her own photo instead of a generic person icon
                <span className={`cg-tab__me${on ? ' is-on' : ''}`}>
                  <img src={meherAvatar} alt="" width="28" height="28" />
                </span>
              ) : (
                <Icon name={t.icon} size={cogni ? 26 : 24} stroke={on || cogni ? 2.2 : 2} />
              )}
            </span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
