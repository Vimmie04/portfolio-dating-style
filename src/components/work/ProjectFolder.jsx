import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredWork, microcopy } from '../../content/site.js';
import LikeButton from '../likes/LikeButton.jsx';
import { useToast } from '../toast/Toast.jsx';
import { ArrowRightIcon, CheckIcon } from '../icons.jsx';
import ProjectPreview from './ProjectPreview.jsx';

/**
 * Case-study link props: an in-site page ("/work/…"), an external link,
 * or a friendly toast while the case study isn't ready yet.
 */
function useCaseStudyLink(project) {
  const toast = useToast();
  if (project.href?.startsWith('/')) return { internal: true, to: project.href };
  if (project.href) {
    const external = /^https?:\/\//.test(project.href);
    return { href: project.href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) };
  }
  return {
    href: `#project-${project.id}`,
    onClick: (e) => {
      e.preventDefault();
      toast(microcopy.caseStudyMissing.replace('{name}', project.title));
    },
  };
}

export default function ProjectFolder({ project, index, total, progress, stacked, shrink }) {
  // Folders underneath shrink a touch as the next one slides over them.
  const target = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, target]);
  const caseLink = useCaseStudyLink(project);
  const titleId = `project-${project.id}-title`;

  return (
    <motion.article
      className={`folder folder--${project.tone}`}
      style={{ scale: shrink ? scale : 1, '--i': index }}
      initial={stacked ? false : { opacity: 0, y: 40 }}
      whileInView={stacked ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={titleId}
    >
      <a className="folder__tab" href={`#project-${project.id}`} aria-label={`Jump to ${project.title}`}>
        <span className="folder__tab-index">PROJECT {project.index}</span>
        <span className="folder__tab-file">{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '')}.fig</span>
      </a>

      <div className="folder__body">
        <div className="folder__info">
          <div className="folder__intro">
            <div className="folder__meta">
              <p className="folder__kind">
                {project.kind} · {project.index}/{String(total).padStart(2, '0')}
              </p>
              {project.shipped && (
                <p className="folder__shipped">
                  <CheckIcon width={14} height={14} />
                  {featuredWork.shippedLabel}
                </p>
              )}
            </div>
            <h3 id={titleId} className="folder__title">
              {project.title}
            </h3>
          </div>

          <div className="folder__bio">
            <p className="folder__bio-label">{featuredWork.bioLabel}</p>
            <p className="folder__bio-text">“{project.tagline}”</p>
          </div>

          <div className="folder__foot">
            <ul className="folder__tags" aria-label="Tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="folder__actions">
              <LikeButton
                id={`project:${project.id}`}
                label={project.title}
                likeLabel={project.title}
                kind="project"
                className="folder__like"
              />
              {caseLink.internal ? (
                <Link
                  className="folder__cta"
                  to={caseLink.to}
                  data-cursor="open"
                  data-cursor-label="OPEN FILE"
                  aria-describedby={titleId}
                >
                  {featuredWork.cta}
                  <ArrowRightIcon width={16} height={16} />
                </Link>
              ) : (
                <a
                  className="folder__cta"
                  {...caseLink}
                  data-cursor="open"
                  data-cursor-label="OPEN FILE"
                  aria-describedby={titleId}
                >
                  {featuredWork.cta}
                  <ArrowRightIcon width={16} height={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="folder__visual">
          <ProjectPreview project={project} />
        </div>
      </div>
    </motion.article>
  );
}
