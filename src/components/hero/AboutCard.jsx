import { profile } from '../../content/site.js';
import { ArrowRightIcon, PenToolIcon, ShapesIcon, SparkleIcon } from '../icons.jsx';

const ROLE_ICONS = [PenToolIcon, ShapesIcon, SparkleIcon];

export default function AboutCard() {
  return (
    <div className="about-card">
      <p className="about-card__label">About me</p>
      <ul className="about-card__roles">
        {profile.roles.map((role, i) => {
          const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
          return (
            <li key={role}>
              <Icon width={18} height={18} />
              {role}
            </li>
          );
        })}
      </ul>
      <p className="about-card__intro">{profile.intro}</p>
      <a href="#green-flags" className="text-link">
        See my green flags
        <ArrowRightIcon width={16} height={16} />
      </a>
    </div>
  );
}
