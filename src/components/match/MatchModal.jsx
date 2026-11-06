import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { match, profile } from '../../content/site.js';
import { useLikes } from '../likes/LikesContext.jsx';
import { CONTACT_LABELS, likedSummary, useContactLink } from '../contact/contactLinks.js';
import PixelSprite from '../pixel/PixelSprite.jsx';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BehanceIcon,
  CloseIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from '../icons.jsx';
import Confetti from './Confetti.jsx';

const CONTACTS = [
  { key: 'email', Icon: MailIcon },
  { key: 'linkedin', Icon: LinkedInIcon },
  { key: 'behance', Icon: BehanceIcon },
  { key: 'instagram', Icon: InstagramIcon },
];

const spring = { type: 'spring', stiffness: 320, damping: 24 };

function Dialog({ onClose }) {
  const { likes } = useLikes();
  const contact = useContactLink();
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  // Focus, Escape, focus trap and scroll lock while open.
  useEffect(() => {
    const previous = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])');
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const likedLine = likes.length
    ? `You liked ${likes.length} thing${likes.length === 1 ? '' : 's'} about me: ${likedSummary(likes)}. Bold.`
    : match.modal.likedNone;

  return (
    <motion.div
      className="match-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="match-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-title"
        aria-describedby="match-desc"
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={spring}
      >
        {!reduce && <Confetti />}

        <button ref={closeRef} type="button" className="match-modal__close" aria-label="Close" onClick={onClose}>
          <CloseIcon width={20} height={20} />
        </button>

        <div className="match-modal__avatars" aria-hidden="true">
          <motion.figure
            className="match-avatar"
            initial={{ x: -60, rotate: -12, opacity: 0 }}
            animate={{ x: 0, rotate: -6, opacity: 1 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            <span className="match-avatar__img match-avatar__img--me">
              <img src={profile.photo.src} alt="" />
            </span>
            <figcaption>Me</figcaption>
          </motion.figure>
          <motion.span
            className="match-modal__heart"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.35, 1] }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <PixelSprite sprite="heart" scale={3} palette={{ B: '#FFFFFF' }} />
          </motion.span>
          <motion.figure
            className="match-avatar"
            initial={{ x: 60, rotate: 12, opacity: 0 }}
            animate={{ x: 0, rotate: 6, opacity: 1 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            <span className="match-avatar__img match-avatar__img--you">
              <PixelSprite sprite="visitor" scale={5} />
            </span>
            <figcaption>You</figcaption>
          </motion.figure>
        </div>

        <h2 id="match-title" className="match-modal__title">
          {match.modal.title}
          <PixelSprite sprite="heart" scale={4} />
        </h2>
        <div id="match-desc">
          <p className="match-modal__lead">{match.modal.lead}</p>
          <p className="match-modal__sub">{match.modal.sub}</p>
        </div>

        <p className="match-modal__likes">{likedLine}</p>

        <ul className="match-modal__links">
          {CONTACTS.map(({ key, Icon }) => (
            <li key={key}>
              <a className="contact-chip" {...contact(key)} data-cursor="connect">
                <Icon width={20} height={20} />
                {CONTACT_LABELS[key]}
                <ArrowUpRightIcon className="contact-chip__arrow" width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>

        <a className="match-modal__cta" {...contact('email')} data-cursor="connect" data-cursor-label="SAY HI">
          {match.modal.cta}
          <ArrowRightIcon width={18} height={18} />
        </a>
        <button type="button" className="match-modal__later" onClick={onClose}>
          {match.modal.later}
        </button>
      </motion.div>
    </motion.div>
  );
}

/** "It's a match!" dialog, rendered at the end of <body>. */
export default function MatchModal({ open, onClose }) {
  return createPortal(<AnimatePresence>{open && <Dialog key="match" onClose={onClose} />}</AnimatePresence>, document.body);
}
