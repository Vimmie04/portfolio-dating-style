import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Icon } from '../icons.jsx';
import { Cogni } from '../Cogni.jsx';

/*
 * Ask Cogni: opened from the middle of the tab bar on any screen.
 * It knows what's on screen (context), offers four plain-language actions
 * (simpler, explain, read aloud, sort thoughts), named by what they do,
 * and voice comes first; typing is the alternative.
 */
const ACTIONS = [
  { name: 'Make it simpler', note: 'Fewer, easier words', icon: 'sparkle', go: 'answer' },
  { name: 'Explain this', note: 'What a word means', icon: 'bulb' },
  { name: 'Read it to me', note: 'Listen instead', icon: 'readAloud' },
  { name: 'Sort my thoughts', note: 'Turn notes into steps', icon: 'branch' },
];

export function AskCogniScreen({ nav }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen">
      <StatusBar />

      <div className="cg-flow-top">
        <button type="button" className="cg-back" aria-label="Close Ask Cogni" onClick={() => nav?.('today')}>
          <Icon name="x" size={20} stroke={2.4} />
        </button>
        <span className="cg-os-task">Ask Cogni</span>
      </div>

      <section className="cg-ask-hello" aria-labelledby={titleId}>
        <span className="cg-ask-hello__disc" aria-hidden="true">
          <Cogni size={86} mood="wave" />
        </span>
        <h1 id={titleId}>Hi Meher. How can I help?</h1>
      </section>

      <div className="cg-context">
        <Icon name="mail" size={20} />
        <span>
          Looking at: <b>the internship job post</b>
        </span>
      </div>

      <div className="cg-actions-grid">
        {ACTIONS.map((a) => (
          <button key={a.name} type="button" className="cg-card cg-action" onClick={() => nav?.(a.go || 'ask-more')}>
            <span className="cg-tile-icon" style={{ width: 40, height: 40, borderRadius: 12 }}>
              <Icon name={a.icon} size={22} />
            </span>
            <b>{a.name}</b>
            <span>{a.note}</span>
          </button>
        ))}
      </div>

      <div className="cg-voice">
        <button type="button" className="cg-voice__mic" aria-label="Talk to Cogni">
          <Icon name="mic" size={30} stroke={2.2} />
        </button>
        <p>Tap and talk</p>
        <button type="button" className="cg-link cg-voice__type">
          <Icon name="keyboard" size={20} />
          Type instead
        </button>
      </div>
    </div>
  );
}
