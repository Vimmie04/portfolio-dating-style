import { useLikes } from '../likes/LikesContext.jsx';
import PixelSprite from '../pixel/PixelSprite.jsx';
import { microcopy } from '../../content/site.js';

const capitalise = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Live view of the likes thread, right before the payoff. */
export default function LikesRecap() {
  const { likes, count } = useLikes();
  const recent = likes.slice(-4).reverse();

  return (
    <div className="recap">
      <p className="recap__label">Your likes so far</p>
      <p className="recap__count">
        <PixelSprite sprite="heart" scale={4} />
        <span>{count}</span>
      </p>
      {count ? (
        <ul className="recap__list">
          {recent.map((l) => (
            <li key={l.id}>{capitalise(l.label)}</li>
          ))}
          {count > recent.length && <li className="recap__more">+{count - recent.length} more</li>}
        </ul>
      ) : (
        <p className="recap__empty">{microcopy.recapEmpty}</p>
      )}
      <p className="recap__note">{microcopy.recapNote}</p>
    </div>
  );
}
