import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * New page → start at the top. A link with a hash (e.g. "/#work") → scroll to
 * that section once it has rendered.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 30) timer = setTimeout(go, 50);
    };
    go();
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
