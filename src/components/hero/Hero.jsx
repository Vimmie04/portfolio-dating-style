import { motion } from 'framer-motion';
import { heroPrompts, profile } from '../../content/site.js';
import PromptCard from '../prompts/PromptCard.jsx';
import { VerifiedIcon } from '../icons.jsx';
import ProfileCard from './ProfileCard.jsx';
import AboutCard from './AboutCard.jsx';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const dealIn = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
};

/** First fold: "Center Stage". The profile card sits centre, prompts and bio flank it. */
export default function Hero() {
  const { headline } = profile;

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <motion.div
        className="container"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      >
        <div className="hero__intro">
          <motion.p variants={rise} className="hero__badge">
            <span className="dot dot--live" aria-hidden="true" />1 new profile near you
          </motion.p>
          <motion.h1 variants={rise} id="hero-title" className="hero__title">
            {headline.before}
            <em>{headline.emphasis}</em>
            {headline.after}
          </motion.h1>
        </div>

        <div className="hero__grid">
          <motion.div variants={dealIn} className="hero__center">
            <ProfileCard />
            <p className="hero__name">
              <strong>{profile.nickname}</strong>
              <span className="hero__age">{profile.age}</span>
              <VerifiedIcon />
              <span className="hero__loc">· {profile.location}</span>
            </p>
          </motion.div>

          <motion.aside variants={rise} className="hero__about" aria-label="About me">
            <AboutCard />
          </motion.aside>

          <motion.div variants={rise} className="hero__prompts">
            {heroPrompts.map((p, i) => (
              <PromptCard key={p.id} {...p} tilt={i % 2 ? 1.5 : -2} size={i % 2 ? 'sm' : 'md'} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
