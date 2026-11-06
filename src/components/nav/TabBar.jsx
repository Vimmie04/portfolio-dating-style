import { Link } from 'react-router-dom';
import { FileIcon, FolderIcon, HomeIcon, UserIcon } from '../icons.jsx';
import ResumeMenu from '../resume/ResumeMenu.jsx';
import { NAV_ITEMS, useActiveNav } from './navigation.js';
import './TabBar.css';

const ICONS = { home: HomeIcon, folder: FolderIcon, user: UserIcon };

/** Mobile-only bottom tab bar, same labels as the desktop nav. */
export default function TabBar() {
  const isActive = useActiveNav();

  return (
    <nav className="tab-bar" aria-label="Sections">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const current = isActive(item);
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`tab-bar__item ${current ? 'is-active' : ''}`}
            aria-current={current ? 'location' : undefined}
          >
            <Icon width={20} height={20} />
            <span>
              {item.label}
              {item.count ? ` ${item.count}` : ''}
            </span>
          </Link>
        );
      })}
      <ResumeMenu className="tab-bar__resume" placement="up" align="end">
        {(props) => (
          <button {...props} className="tab-bar__item">
            <FileIcon width={20} height={20} />
            <span>Resume</span>
          </button>
        )}
      </ResumeMenu>
    </nav>
  );
}
