import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { footer, profile } from '../../content/site.js';
import { CONTACT_LABELS, useContactLink } from '../contact/contactLinks.js';
import ResumeMenu from '../resume/ResumeMenu.jsx';
import { ArrowUpRightIcon, BehanceIcon, FileIcon, InstagramIcon, LinkedInIcon, MailIcon } from '../icons.jsx';
import './Footer.css';

const ICONS = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  behance: BehanceIcon,
  email: MailIcon,
  resume: FileIcon,
};

const CURSOR_LABELS = { email: 'SAY HI', resume: 'RESUME' };

/** A message from Vimmie that "types" itself once the footer is in view. */
function ChatBubble() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setSent(true);
      return undefined;
    }
    const t = setTimeout(() => setSent(true), 1500);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  return (
    <div className="chat" ref={ref}>
      <span className="chat__avatar" aria-hidden="true">
        <img src={profile.photo.src} alt="" />
      </span>
      <div className="chat__col" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.p
              key="msg"
              className="chat__bubble"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            >
              {footer.chat.message}
            </motion.p>
          ) : (
            <motion.p
              key="typing"
              className="chat__bubble chat__bubble--typing"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <span className="visually-hidden">{footer.chat.typing}</span>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </motion.p>
          )}
        </AnimatePresence>
        <p className={`chat__status ${sent ? 'is-visible' : ''}`}>
          <span aria-hidden="true">✓✓</span> {footer.chat.status}
        </p>
      </div>
    </div>
  );
}

/** One row of the link grid (shared by links and the resume button). */
function LinkRowContent({ Icon, label, meta }) {
  return (
    <>
      <span className="footer-link__icon">
        <Icon width={22} height={22} />
      </span>
      <span className="footer-link__text">
        <span className="footer-link__label">{label}</span>
        <span className="footer-link__meta">{meta}</span>
      </span>
      <ArrowUpRightIcon className="footer-link__arrow" width={24} height={24} />
    </>
  );
}

export default function Footer() {
  const contact = useContactLink();
  const year = new Date().getFullYear();

  return (
    <footer id="connect" className="footer" aria-labelledby="footer-title">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="section-label footer__label">
              <span>05</span>
              {footer.label}
            </p>
            <h2 id="footer-title" className="footer__title">
              {footer.titleStart}
              <em>{footer.titleEmphasis}</em>
            </h2>
          </div>
          <ChatBubble />
        </div>

        <ul className="footer__links">
          {footer.links.map(({ key, meta }) => {
            const Icon = ICONS[key];
            if (key === 'resume') {
              return (
                <li key={key}>
                  <ResumeMenu placement="up" align="start">
                    {(props) => (
                      <button
                        {...props}
                        className="footer-link footer-link--button"
                        data-cursor="connect"
                        data-cursor-label={CURSOR_LABELS.resume}
                      >
                        <LinkRowContent Icon={Icon} label="Resume" meta={meta} />
                      </button>
                    )}
                  </ResumeMenu>
                </li>
              );
            }
            return (
              <li key={key}>
                <a
                  className="footer-link"
                  {...contact(key)}
                  data-cursor="connect"
                  data-cursor-label={CURSOR_LABELS[key] ?? 'CONNECT'}
                >
                  <LinkRowContent Icon={Icon} label={CONTACT_LABELS[key]} meta={meta} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="footer__bottom">
          <p className="footer__closing">{footer.closing}</p>
          <div className="footer__legal">
            <span>
              © {year} {profile.fullName}
            </span>
            <Link to="/#top" className="footer__again" data-cursor-label="PLAY AGAIN">
              {footer.backToTop} ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
