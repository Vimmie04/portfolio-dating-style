import { motion } from 'framer-motion';
import LikeButton from '../likes/LikeButton.jsx';
import './PromptCard.css';

/** Hinge-style prompt: a question, a witty answer and a heart. Reused across the site. */
export default function PromptCard({ id, question, answer, likeLabel, tilt = 0, size = 'md', className = '' }) {
  return (
    <motion.article
      className={`prompt-card prompt-card--${size} ${className}`}
      style={{ rotate: tilt }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      data-cursor="like"
    >
      <p className="prompt-card__q">{question}</p>
      <p className="prompt-card__a">{answer}</p>
      <LikeButton id={id} label={question} likeLabel={likeLabel} kind="prompt" className="prompt-card__like" />
    </motion.article>
  );
}
