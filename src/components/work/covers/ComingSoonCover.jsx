import './covers.css';

/**
 * A project still in progress: no mockups and no placeholder art, just what it's for and
 * who it's for, with a quiet "Coming soon" label. Real text, so screen readers get it too.
 */
export default function ComingSoonCover({ project }) {
  const c = project.comingSoon;
  return (
    // The paper is the size container, so spacing in paper units lives on the inner block
    <div className="preview__sketch cover cover--soon">
      <div className="cover__soon">
        <p className="cover__soon-tag">
          <span className="cover__soon-dot" aria-hidden="true" />
          {c.label}
        </p>
        <dl className="cover__soon-facts">
          <div>
            <dt>Purpose</dt>
            <dd>{c.purpose}</dd>
          </div>
          <div>
            <dt>For</dt>
            <dd>{c.audience}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
