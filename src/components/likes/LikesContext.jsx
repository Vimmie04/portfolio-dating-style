import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * The likes thread: every heart a visitor taps is remembered here
 * (for this browser session) so the match screen and the email draft
 * can reference what they liked.
 */
const STORAGE_KEY = 'vimmie:likes';
const LikesContext = createContext(null);

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(readStored);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
    } catch {
      /* storage unavailable (private mode etc.) — likes still work in memory */
    }
  }, [likes]);

  const isLiked = useCallback((id) => likes.some((l) => l.id === id), [likes]);

  /** Toggles a like and returns true if it is now liked. */
  const toggleLike = useCallback(
    ({ id, label, kind }) => {
      const exists = likes.some((l) => l.id === id);
      setLikes((prev) =>
        exists ? prev.filter((l) => l.id !== id) : [...prev, { id, label, kind, at: Date.now() }],
      );
      return !exists;
    },
    [likes],
  );

  const value = useMemo(
    () => ({ likes, count: likes.length, isLiked, toggleLike }),
    [likes, isLiked, toggleLike],
  );

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error('useLikes must be used inside <LikesProvider>');
  return ctx;
}
