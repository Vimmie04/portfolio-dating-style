import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { match } from '../../content/site.js';
import PromptCard from '../prompts/PromptCard.jsx';
import SwipeDeck from './SwipeDeck.jsx';
import MatchModal from './MatchModal.jsx';
import LikesRecap from './LikesRecap.jsx';
import './Match.css';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function MatchSection() {
  const [open, setOpen] = useState(false);
  const openMatch = useCallback(() => setOpen(true), []);
  const closeMatch = useCallback(() => setOpen(false), []);

  return (
    <section id="match" className="match" aria-labelledby="match-heading">
      <div className="container">
        <motion.header className="match__head" {...reveal}>
          <p className="section-label">
            <span>04</span>
            {match.label}
          </p>
          <h2 id="match-heading" className="section-title">
            {match.title}
          </h2>
          <p className="section-lede">{match.lede}</p>
        </motion.header>

        <div className="match__grid">
          <motion.div className="match__deck" {...reveal}>
            <SwipeDeck onMatch={openMatch} />
          </motion.div>
          <motion.div className="match__prompt" {...reveal}>
            <PromptCard {...match.prompt} tilt={-2} size="sm" />
          </motion.div>
          <motion.aside className="match__recap" aria-label="Your likes so far" {...reveal}>
            <LikesRecap />
          </motion.aside>
        </div>
      </div>

      <MatchModal open={open} onClose={closeMatch} />
    </section>
  );
}
