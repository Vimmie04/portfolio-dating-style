import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { match, profile } from '../../content/site.js';
import { setCursorSwipe } from '../cursor/PixelCursor.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import PixelSprite from '../pixel/PixelSprite.jsx';
import { CloseIcon, HeartIcon } from '../icons.jsx';

const SWIPE_DISTANCE = 110;
const SWIPE_VELOCITY = 650;

/** One card in the deck. The top card is draggable; parents can call ref.swipe(dir). */
const SwipeCard = forwardRef(function SwipeCard({ card, depth, position, total, onSwiped }, ref) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-16, 16]);
  const likeOpacity = useTransform(x, [24, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -24], [1, 0]);
  const reduce = useReducedMotion();
  const leaving = useRef(false);
  const isTop = depth === 0;

  const fly = async (dir) => {
    if (leaving.current) return;
    leaving.current = true;
    setCursorSwipe(null);
    if (!reduce) {
      const distance = Math.max(window.innerWidth, 800);
      await animate(x, dir === 'right' ? distance : -distance, { duration: 0.42, ease: [0.4, 0, 0.9, 0.6] });
    }
    onSwiped(dir);
  };

  useImperativeHandle(ref, () => ({ swipe: fly }));

  const onDrag = (_, info) => {
    const dx = info.offset.x;
    setCursorSwipe(dx > 30 ? 'right' : dx < -30 ? 'left' : null);
  };

  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const dir =
      offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY
        ? 'right'
        : offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY
          ? 'left'
          : null;
    if (dir) fly(dir);
    else {
      setCursorSwipe(null);
      animate(x, 0, { type: 'spring', stiffness: 420, damping: 30 });
    }
  };

  const tone = card.kind === 'photo' ? 'paper' : card.tone ?? 'paper';

  return (
    <motion.div
      className={`swipe-card swipe-card--${tone} ${card.kind === 'photo' ? 'swipe-card--photo' : 'swipe-card--prompt'}`}
      style={{ x, rotate: reduce ? 0 : rotate, zIndex: 10 - depth }}
      initial={false}
      animate={{ scale: 1 - depth * 0.05, y: depth * 16 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      drag={isTop ? 'x' : false}
      dragMomentum={false}
      dragElastic={0.85}
      onDrag={isTop ? onDrag : undefined}
      onDragEnd={isTop ? onDragEnd : undefined}
      aria-hidden={!isTop}
      data-cursor="hand"
      data-cursor-label="DRAG ME"
    >
      <motion.span className="swipe-stamp swipe-stamp--like" style={{ opacity: likeOpacity }} aria-hidden="true">
        LIKE
      </motion.span>
      <motion.span className="swipe-stamp swipe-stamp--nope" style={{ opacity: nopeOpacity }} aria-hidden="true">
        NOPE
      </motion.span>

      {card.kind === 'photo' ? (
        <>
          <div className="swipe-card__photo">
            <img src={profile.photo.src} alt={profile.photo.alt} draggable="false" />
            <span className="swipe-card__status">
              <span className="dot" aria-hidden="true" />
              {profile.status}
            </span>
          </div>
          <div className="swipe-card__text">
            <p className="swipe-card__label">{card.label}</p>
            <p className="swipe-card__q">{card.text}</p>
          </div>
        </>
      ) : (
        <>
          <p className="swipe-card__label">{card.label}</p>
          <p className="swipe-card__big">{card.text}</p>
          <p className="swipe-card__foot">
            <span>
              {position}/{total}
            </span>
            <span>Swipe right to connect →</span>
          </p>
        </>
      )}
    </motion.div>
  );
});

/** Shown after every card has been swiped left. */
function EmptyCard({ onShuffle }) {
  return (
    <div className="swipe-card swipe-card--empty">
      <PixelSprite sprite="heart" scale={6} palette={{ B: '#AFC0FF' }} />
      <p className="swipe-card__big">{match.empty.title}</p>
      <p className="swipe-card__small">{match.empty.text}</p>
      <button type="button" className="deck-btn" onClick={onShuffle}>
        {match.empty.action}
      </button>
    </div>
  );
}

/** Shown after a right swipe. */
function MatchedCard({ onReopen, onAgain }) {
  return (
    <div className="swipe-card swipe-card--matched">
      <PixelSprite sprite="heart" scale={6} palette={{ B: '#FFFFFF' }} />
      <p className="swipe-card__big">{match.matched.title}</p>
      <p className="swipe-card__small">{match.matched.text}</p>
      <div className="swipe-card__buttons">
        <button type="button" className="deck-btn deck-btn--white" onClick={onReopen}>
          {match.matched.reopen}
        </button>
        <button type="button" className="deck-btn deck-btn--ghost" onClick={onAgain}>
          {match.matched.again}
        </button>
      </div>
    </div>
  );
}

export default function SwipeDeck({ onMatch }) {
  const cards = match.deck;
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('swiping'); // 'swiping' | 'matched'
  const [announcement, setAnnouncement] = useState('');
  const topRef = useRef(null);
  const touch = useMediaQuery('(pointer: coarse)');

  const done = index >= cards.length;
  const canSwipe = status === 'swiping' && !done;
  const visible = cards.slice(index, index + 3);

  const handleSwiped = (dir) => {
    if (dir === 'right') {
      setStatus('matched');
      setAnnouncement('It’s a match!');
      onMatch();
      return;
    }
    const next = index + 1;
    setIndex(next);
    setAnnouncement(next < cards.length ? `Card ${next + 1} of ${cards.length}: ${cards[next].text}` : match.empty.title);
  };

  const trigger = (dir) => {
    if (canSwipe) topRef.current?.swipe(dir);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      trigger('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      trigger('right');
    }
  };

  const restart = () => {
    setStatus('swiping');
    setIndex(0);
    setAnnouncement(`Card 1 of ${cards.length}: ${cards[0].text}`);
  };

  return (
    <div className="deck">
      <div
        className="deck__stage"
        tabIndex={0}
        role="group"
        aria-roledescription="swipe deck"
        aria-label={match.deckLabel}
        onKeyDown={onKeyDown}
      >
        {status === 'matched' ? (
          <MatchedCard onReopen={onMatch} onAgain={restart} />
        ) : done ? (
          <EmptyCard onShuffle={restart} />
        ) : (
          visible.map((card, depth) => (
            <SwipeCard
              key={card.id}
              ref={depth === 0 ? topRef : undefined}
              card={card}
              depth={depth}
              position={index + depth + 1}
              total={cards.length}
              onSwiped={handleSwiped}
            />
          ))
        )}
      </div>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>

      <div className="deck__actions">
        <button type="button" className="deck-btn" onClick={() => trigger('left')} disabled={!canSwipe}>
          <CloseIcon />
          {match.passLabel}
        </button>
        <button
          type="button"
          className="deck-btn deck-btn--like"
          onClick={() => trigger('right')}
          disabled={!canSwipe}
          data-cursor="connect"
          data-cursor-label="SWIPE RIGHT"
        >
          <HeartIcon filled />
          {match.likeLabel}
        </button>
      </div>
      <p className="deck__hint">{touch ? match.hintTouch : match.hint}</p>
    </div>
  );
}
