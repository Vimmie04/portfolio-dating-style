import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { greenFlags, interests, microcopy, tools } from '../../content/site.js';
import PixelSprite from '../pixel/PixelSprite.jsx';
import PromptCard from '../prompts/PromptCard.jsx';
import { useToast } from '../toast/Toast.jsx';
import InterestPill from './InterestPill.jsx';
import ToolMark from './ToolMark.jsx';
import { usePhysicsPile } from './usePhysicsPile.js';
import './GreenFlags.css';

const TONES = ['light', 'ink', 'light', 'tint'];
const toneFor = (i) => TONES[i % TONES.length];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return coarse;
}

/** Messy mode: tools and interests fall into a box you can play with. */
function Pile({ apiRef }) {
  const arenaRef = useRef(null);
  const itemsRef = useRef([]);
  usePhysicsPile({ arenaRef, itemsRef, enabled: true, apiRef });

  const ignoreDragClick = (e) => {
    const el = e.currentTarget;
    if (el.dataset.dragged === 'true') {
      el.dataset.dragged = '';
      return true;
    }
    return false;
  };

  return (
    <div className="toybox__layer" ref={arenaRef}>
      {tools.map((tool, i) => (
        <span
          key={tool.id}
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          className="toybox__item toybox__tool"
          data-radius="22"
          role="img"
          aria-label={tool.name}
          title={tool.name}
          onClick={(e) => {
            if (!ignoreDragClick(e)) apiRef.current?.hop(i);
          }}
          data-cursor="hand"
          data-cursor-label={tool.name.toUpperCase()}
          data-no-cursor-burst=""
        >
          <ToolMark tool={tool} />
        </span>
      ))}
      {interests.map((name, j) => (
        <InterestPill
          key={name}
          ref={(el) => {
            itemsRef.current[tools.length + j] = el;
          }}
          name={name}
          tone={toneFor(j)}
          className="toybox__item"
          upright
        />
      ))}
    </div>
  );
}

/** Tidy mode: the same things, neatly arranged (and easier to skim). */
function Tidy() {
  return (
    <div className="toybox__layer toybox__tidy">
      <div className="tidy__group">
        <p className="tidy__label">Tools</p>
        <ul className="tidy__tools">
          {tools.map((tool) => (
            <li key={tool.id}>
              <ToolMark tool={tool} />
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="tidy__group">
        <p className="tidy__label">Interests</p>
        <div className="tidy__pills">
          {interests.map((name, j) => (
            <InterestPill key={name} name={name} tone={toneFor(j)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GreenFlags() {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const toast = useToast();
  const [mode, setMode] = useState(reduce ? 'tidy' : 'messy');
  const apiRef = useRef(null);
  // Keep the pixel heart glued to the last word of the title.
  const words = greenFlags.title.split(' ');
  const titleEnd = words.pop();
  const titleStart = words.length ? `${words.join(' ')} ` : '';

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    if (next === 'tidy') toast(microcopy.tidied);
  };

  return (
    <section id="green-flags" className="flags" aria-labelledby="flags-title">
      <div className="container flags__grid">
        <motion.header className="flags__head" {...reveal}>
          <div>
            <p className="section-label">
              <span>02</span>Green flags
            </p>
            <h2 id="flags-title" className="section-title">
              {titleStart}
              <span className="flags__nowrap">
                {titleEnd}
                <span className="flags__heart" role="img" aria-label="green heart">
                  <PixelSprite sprite="heart" scale={4} palette={{ B: '#17B26A' }} />
                </span>
              </span>
            </h2>
          </div>
          <p className="section-lede flags__lede">{greenFlags.lede}</p>
        </motion.header>

        <motion.div className="flags__box" {...reveal}>
          <div className={`toybox toybox--${mode}`}>
            <div className="toybox__hud">
              <p className="toybox__hint">
                {mode === 'messy' ? (coarse ? microcopy.toyHintTouch : microcopy.toyHint) : 'Sorted. Obviously.'}
              </p>
              <div className="toybox__controls">
                {mode === 'messy' && (
                  <button type="button" className="toybox__shake" onClick={() => apiRef.current?.shake()}>
                    Shake
                  </button>
                )}
                <div className="seg" role="group" aria-label="Layout">
                  <button
                    type="button"
                    className="seg__btn"
                    aria-pressed={mode === 'messy'}
                    onClick={() => switchMode('messy')}
                  >
                    Messy
                  </button>
                  <button
                    type="button"
                    className="seg__btn"
                    aria-pressed={mode === 'tidy'}
                    onClick={() => switchMode('tidy')}
                  >
                    Tidy
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                className="toybox__stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {mode === 'messy' ? <Pile apiRef={apiRef} /> : <Tidy />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div className="flags__prompts" {...reveal}>
          {greenFlags.prompts.map((p, i) => (
            <PromptCard key={p.id} {...p} tilt={i % 2 ? 1.2 : -1.2} size="sm" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
