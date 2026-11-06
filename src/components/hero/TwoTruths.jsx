import { useState } from 'react';
import { twoTruths } from '../../content/site.js';
import LikeButton from '../likes/LikeButton.jsx';

/** Third "photo" of the profile card: a tiny guessing game. */
export default function TwoTruths() {
  const [picked, setPicked] = useState(null);
  const { statements, lieIndex } = twoTruths;
  const answered = picked !== null;
  const hint = !answered ? twoTruths.prompt : picked === lieIndex ? twoTruths.correct : twoTruths.wrong;

  return (
    <div className="truths">
      <p className="truths__q">{twoTruths.question}</p>
      <p className="truths__hint" aria-live="polite">
        {hint}
      </p>
      <ul className="truths__list">
        {statements.map((s, i) => {
          const isLie = i === lieIndex;
          const state = !answered ? '' : isLie ? 'is-lie' : 'is-true';
          return (
            <li key={s}>
              <button
                type="button"
                className={`truths__opt ${state} ${picked === i ? 'is-picked' : ''}`}
                onClick={() => setPicked(i)}
                disabled={answered}
                data-cursor="hand"
                data-cursor-label="THE LIE?"
              >
                <span className="truths__text">{s}</span>
                {answered && <span className={`truths__tag ${isLie ? 'truths__tag--lie' : ''}`}>{isLie ? 'LIE' : 'TRUE'}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="truths__foot">
        {answered ? (
          <button type="button" className="truths__again" onClick={() => setPicked(null)}>
            Play again
          </button>
        ) : (
          <span />
        )}
        <LikeButton id={twoTruths.id} label={twoTruths.question} likeLabel={twoTruths.likeLabel} kind="prompt" size={40} />
      </div>
    </div>
  );
}
