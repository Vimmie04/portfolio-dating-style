import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../../content/site.js';

/** Home page sections, in scroll order. */
export const SECTION_IDS = ['top', 'green-flags', 'work', 'match', 'connect'];

/** Nav labels follow the brief: Home · Work (04) · About · Resume. Links work from any page. */
export const NAV_ITEMS = [
  { label: 'Home', to: '/#top', sections: ['top'], icon: 'home' },
  {
    label: 'Work',
    to: '/#work',
    sections: ['work'],
    count: String(projects.length).padStart(2, '0'),
    icon: 'folder',
    routes: ['/work'],
  },
  { label: 'About', to: '/#green-flags', sections: ['green-flags'], icon: 'user' },
];

/** Which nav item is current: case-study pages count as "Work"; on home, the section in view. */
export function useActiveNav() {
  const { pathname } = useLocation();
  const section = useActiveSection(pathname);
  return (item) =>
    pathname === '/' ? item.sections.includes(section) : (item.routes ?? []).some((r) => pathname.startsWith(r));
}

/** Which home section sits in the middle of the viewport. */
export function useActiveSection(pathname = '/') {
  const [active, setActive] = useState(SECTION_IDS[0]);

  useEffect(() => {
    if (pathname !== '/') return undefined;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return active;
}
