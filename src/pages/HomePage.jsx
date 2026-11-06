import Hero from '../components/hero/Hero.jsx';
import GreenFlags from '../components/green-flags/GreenFlags.jsx';
import FeaturedWork from '../components/work/FeaturedWork.jsx';
import MatchSection from '../components/match/MatchSection.jsx';

/** Journey: Discover my profile → Green flags → Work → Swipe → Match → (footer) Connect. */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <GreenFlags />
      <FeaturedWork />
      <MatchSection />
    </main>
  );
}
