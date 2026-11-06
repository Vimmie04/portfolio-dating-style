import { useState } from 'react';

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
    </svg>
  );
}

/**
 * A YouTube video that plays in place. Until someone presses play it shows our own
 * poster (children), so YouTube only loads on play (privacy-friendly embed).
 */
export function VideoPlayer({ id, title, length, playLabel = 'Play', className = '', children }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`cy-player ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="cy-player__poster">
          {children}
          <button type="button" className="cy-player__play" onClick={() => setPlaying(true)} aria-label={`Play ${title}, ${length}`}>
            <span className="cy-player__disc">
              <PlayIcon width={30} height={30} />
            </span>
            <span className="cy-player__chip">
              {playLabel} <span>{length}</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
