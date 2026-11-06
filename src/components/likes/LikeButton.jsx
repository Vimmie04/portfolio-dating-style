import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLikes } from './LikesContext.jsx';
import { useToast } from '../toast/Toast.jsx';
import { HeartIcon } from '../icons.jsx';
import { microcopy } from '../../content/site.js';
import './LikeButton.css';

const BURST = Array.from({ length: 6 }, (_, i) => {
  const angle = -Math.PI / 2 + (i - 2.5) * 0.55;
  const r = 34 + (i % 2) * 12;
  return {
    x: Math.round((Math.cos(angle) * r) / 2) * 2,
    y: Math.round((Math.sin(angle) * r) / 2) * 2,
    delay: i * 18,
  };
});

function HeartBurst() {
  return (
    <span className="heart-burst" aria-hidden="true">
      {BURST.map((p, i) => (
        <span
          key={i}
          className="heart-burst__p"
          style={{ '--dx': `${p.x}px`, '--dy': `${p.y}px`, animationDelay: `${p.delay}ms` }}
        />
      ))}
    </span>
  );
}

/**
 * Heart button wired into the likes thread.
 * variant: 'outline' (white circle) | 'solid' (electric blue, used on the profile card)
 */
export default function LikeButton({
  id,
  label,
  likeLabel,
  kind = 'prompt',
  size = 44,
  variant = 'outline',
  likedMessage,
  onToggle,
  className = '',
}) {
  const { isLiked, toggleLike, count } = useLikes();
  const toast = useToast();
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const liked = isLiked(id);

  const handleClick = () => {
    const nowLiked = toggleLike({ id, label: likeLabel ?? label, kind });
    if (nowLiked) {
      setBurst((b) => b + 1);
      toast(likedMessage ?? microcopy.liked[count % microcopy.liked.length], 'heart');
    } else {
      toast(microcopy.unliked);
    }
    onToggle?.(nowLiked);
  };

  return (
    <motion.button
      type="button"
      className={`like-btn like-btn--${variant} ${liked ? 'is-liked' : ''} ${className}`}
      style={{ '--size': `${size}px` }}
      aria-pressed={liked}
      aria-label={`${liked ? 'Unlike' : 'Like'}: ${label}`}
      onClick={handleClick}
      whileTap={{ scale: 0.86 }}
      data-cursor="like"
      data-no-cursor-burst=""
    >
      <HeartIcon filled={liked || variant === 'solid'} />
      {!reduce && burst > 0 && <HeartBurst key={burst} />}
    </motion.button>
  );
}
