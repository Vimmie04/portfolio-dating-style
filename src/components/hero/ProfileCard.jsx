import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { microcopy, profile } from '../../content/site.js';
import LikeButton from '../likes/LikeButton.jsx';
import { useLikes } from '../likes/LikesContext.jsx';
import { useToast } from '../toast/Toast.jsx';
import { CloseIcon } from '../icons.jsx';
import TwoTruths from './TwoTruths.jsx';
import './ProfileCard.css';

const SLIDES = ['Photo', 'Two truths and a lie'];
const PROFILE_LIKE_ID = 'profile:photo';

/** Floating Figma-selection name tag (a nod to the designer behind the profile). */
function NameTag({ children }) {
  return (
    <span className="name-tag" aria-hidden="true">
      {children}
      <i className="name-tag__h name-tag__h--tl" />
      <i className="name-tag__h name-tag__h--tr" />
      <i className="name-tag__h name-tag__h--bl" />
      <i className="name-tag__h name-tag__h--br" />
    </span>
  );
}

export default function ProfileCard() {
  const [slide, setSlide] = useState(0);
  const [stamp, setStamp] = useState(null);
  const [passes, setPasses] = useState(0);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const toast = useToast();
  const { isLiked } = useLikes();
  const liked = isLiked(PROFILE_LIKE_ID);
  const { photo } = profile;

  useEffect(() => {
    if (!stamp) return undefined;
    const t = setTimeout(() => setStamp(null), 1100);
    return () => clearTimeout(t);
  }, [stamp]);

  const go = (dir) => setSlide((s) => Math.min(SLIDES.length - 1, Math.max(0, s + dir)));

  const onLikeToggle = (nowLiked) => {
    if (!nowLiked) return;
    setStamp({ type: 'like', key: Date.now() });
    if (!reduce) controls.start({ scale: [1, 1.025, 1], transition: { duration: 0.35 } });
  };

  const onPass = () => {
    const n = passes + 1;
    setPasses(n);
    setStamp({ type: 'nope', key: Date.now() });
    toast(microcopy.passes[Math.min(n, microcopy.passes.length) - 1]);
    if (!reduce) {
      controls.start({ x: [0, -26, 10, 0], rotate: [0, -4, 1.5, 0], transition: { duration: 0.55, ease: 'easeOut' } });
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-card__frame">
        <span className="profile-card__ghost profile-card__ghost--a" aria-hidden="true" />
        <span className="profile-card__ghost profile-card__ghost--b" aria-hidden="true" />

        <motion.div
          className="profile-card__card"
          animate={controls}
          role="group"
          aria-roledescription="profile card"
          aria-label={`${profile.nickname}’s profile: ${SLIDES[slide]}, ${slide + 1} of ${SLIDES.length}`}
          data-cursor="like"
        >
          <div className="profile-card__bars" style={{ gridTemplateColumns: `repeat(${SLIDES.length}, minmax(0, 1fr))` }}>
            {SLIDES.map((name, i) => (
              <button
                key={name}
                type="button"
                className={`profile-card__bar ${i === slide ? 'is-active' : ''}`}
                aria-label={`Show ${name.toLowerCase()}`}
                aria-current={i === slide ? 'true' : undefined}
                onClick={() => setSlide(i)}
              >
                <span />
              </button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            <motion.div
              key={slide}
              className="profile-card__slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {slide === 0 && (
                <img
                  className="profile-card__img"
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  fetchpriority="high"
                  draggable="false"
                />
              )}
              {slide === 1 && <TwoTruths />}
            </motion.div>
          </AnimatePresence>

          {/* Tap zones only on the photo; the game card has its own buttons */}
          {slide === 0 && (
            <>
              <button
                type="button"
                className="profile-card__tap profile-card__tap--prev"
                aria-label="Previous"
                onClick={() => go(-1)}
                disabled={slide === 0}
                data-cursor="hand"
                data-cursor-label="◀ BACK"
              />
              <button
                type="button"
                className="profile-card__tap profile-card__tap--next"
                aria-label="Next"
                onClick={() => go(1)}
                data-cursor="hand"
                data-cursor-label="NEXT ▶"
              />
            </>
          )}

          {slide === 0 && (
            <>
              <span className="profile-card__status">
                <span className="dot" aria-hidden="true" />
                {profile.status}
              </span>
              <NameTag>{profile.nickname}</NameTag>
            </>
          )}

          <AnimatePresence>
            {stamp && (
              <motion.span
                key={stamp.key}
                className={`stamp stamp--${stamp.type}`}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 1.6, rotate: stamp.type === 'like' ? -14 : 14 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 520, damping: 22 }}
              >
                {stamp.type === 'like' ? 'LIKED' : 'NOPE'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="profile-card__actions">
        <motion.button
          type="button"
          className="pass-btn"
          aria-label="Pass"
          onClick={onPass}
          whileTap={{ scale: 0.88 }}
          data-cursor="hand"
          data-cursor-label="NOPE"
        >
          <CloseIcon width={22} height={22} />
        </motion.button>
        <LikeButton
          id={PROFILE_LIKE_ID}
          label={`${profile.nickname}’s profile`}
          likeLabel="my profile"
          kind="profile"
          variant="solid"
          size={64}
          likedMessage={microcopy.profileLiked}
          onToggle={onLikeToggle}
        />
        <span className={`profile-card__hint ${liked ? 'is-liked' : ''}`} aria-hidden="true">
          {liked ? microcopy.likedHint : microcopy.sendALike}
        </span>
      </div>
    </div>
  );
}
