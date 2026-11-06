import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLikes } from './LikesContext.jsx';
import { HeartIcon } from '../icons.jsx';
import PixelSprite from '../pixel/PixelSprite.jsx';
import { microcopy } from '../../content/site.js';
import './LikesCounter.css';

const capitalise = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Header heart counter: the visible home of the likes thread. */
export default function LikesCounter() {
  const { likes, count } = useLikes();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="likes-counter" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className={`likes-counter__btn ${count ? 'has-likes' : ''}`}
        aria-expanded={open}
        aria-controls="likes-popover"
        aria-label={`Likes sent: ${count}. Show what you liked`}
        onClick={() => setOpen((o) => !o)}
        data-cursor="like"
        data-cursor-label="YOUR LIKES"
      >
        <HeartIcon filled={count > 0} />
        <motion.span
          key={count}
          className="likes-counter__num"
          initial={{ scale: 1.7 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        >
          {count}
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="likes-popover"
            className="likes-counter__pop"
            role="dialog"
            aria-label="Your likes"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <p className="likes-counter__title">You’ve liked</p>
            {count === 0 ? (
              <p className="likes-counter__empty">{microcopy.likesEmpty}</p>
            ) : (
              <ul className="likes-counter__list">
                {likes.map((l) => (
                  <li key={l.id} className="likes-counter__item">
                    <PixelSprite sprite="heart" scale={2} />
                    {capitalise(l.label)}
                  </li>
                ))}
              </ul>
            )}
            <p className="likes-counter__foot">{microcopy.likesFooter}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
