import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { featuredWork, projects } from '../../content/site.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import PromptCard from '../prompts/PromptCard.jsx';
import ProjectFolder from './ProjectFolder.jsx';
import './FeaturedWork.css';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

/**
 * A filing cabinet of dating profiles. On wide screens each folder sticks
 * and the next one slides over it; their tabs line up like dividers.
 * On small screens they simply deal in one after another.
 */
export default function FeaturedWork() {
  const listRef = useRef(null);
  const stacked = useMediaQuery('(min-width: 900px)');
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="container">
        <motion.header className="work__head" {...reveal}>
          <div>
            <p className="section-label">
              <span>03</span>Featured work
            </p>
            <h2 id="work-title" className="section-title">
              {featuredWork.title}
            </h2>
            <p className="section-lede">{featuredWork.lede}</p>
          </div>
          <div className="work__prompt">
            <PromptCard {...featuredWork.prompt} tilt={2} size="sm" />
          </div>
        </motion.header>

        <div ref={listRef} className={`work__list ${stacked ? 'is-stacked' : ''}`}>
          {projects.map((project, i) => (
            <Fragment key={project.id}>
              {/* Scroll room between folders. A spacer, not a margin: sticky items must fit
                  their margin inside the list, which would stop earlier folders sticking. */}
              {i > 0 && <span className="work__spacer" aria-hidden="true" />}
              <span id={`project-${project.id}`} className="work__anchor" aria-hidden="true" />
              <ProjectFolder
                project={project}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
                stacked={stacked}
                shrink={stacked && !reduce}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
