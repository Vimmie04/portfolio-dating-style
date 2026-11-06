import { forwardRef } from 'react';
import { useLikes } from '../likes/LikesContext.jsx';
import { useToast } from '../toast/Toast.jsx';
import { HeartIcon } from '../icons.jsx';
import { microcopy } from '../../content/site.js';

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** An interest tag you can like. Lives in the physics pile and in tidy mode. */
const InterestPill = forwardRef(function InterestPill({ name, tone = 'light', className = '', upright = false }, ref) {
  const { isLiked, toggleLike } = useLikes();
  const toast = useToast();
  const id = `flag:${slug(name)}`;
  const liked = isLiked(id);

  const handleClick = (e) => {
    const el = e.currentTarget;
    // A drag-and-throw ends with a click: ignore that one.
    if (el.dataset.dragged === 'true') {
      el.dataset.dragged = '';
      return;
    }
    const nowLiked = toggleLike({ id, label: name, kind: 'flag' });
    if (nowLiked) toast(microcopy.flagLiked.replace('{name}', name), 'heart');
    else toast(microcopy.unliked);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`pill pill--${tone} ${liked ? 'is-liked' : ''} ${className}`}
      aria-pressed={liked}
      aria-label={`Like ${name} as a green flag`}
      onClick={handleClick}
      data-cursor="like"
      data-cursor-label={liked ? 'UNLIKE' : 'LIKE'}
      data-no-cursor-burst=""
      data-upright={upright ? '' : undefined}
    >
      <HeartIcon filled={liked} className="pill__heart" />
      {name}
    </button>
  );
});

export default InterestPill;
