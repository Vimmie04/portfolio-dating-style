import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../content/site.js';
import LikesCounter from '../likes/LikesCounter.jsx';
import ResumeMenu from '../resume/ResumeMenu.jsx';
import { ArrowUpRightIcon } from '../icons.jsx';
import { NAV_ITEMS, useActiveNav } from './navigation.js';
import './Nav.css';

export default function Nav() {
  const isActive = useActiveNav();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/#top" className="logo" aria-label={`${profile.nickname} (${profile.fullName}), home`}>
          <span className="logo__mark">
            {profile.nickname.toLowerCase()}
            <span className="logo__dot">.</span>
          </span>
          <span className="logo__name">{profile.fullName.toUpperCase()}</span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          {NAV_ITEMS.map((item) => {
            const current = isActive(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`site-nav__link ${current ? 'is-active' : ''}`}
                aria-current={current ? 'location' : undefined}
              >
                {item.label}
                {item.count && <span className="site-nav__count">{item.count}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <LikesCounter />
          <ResumeMenu className="site-header__resume" placement="down" align="end">
            {(props) => (
              <button {...props} className="btn btn--ghost" data-cursor="hand" data-cursor-label="RESUME">
                Resume
                <ArrowUpRightIcon width={14} height={14} />
              </button>
            )}
          </ResumeMenu>
        </div>
      </div>
    </header>
  );
}
