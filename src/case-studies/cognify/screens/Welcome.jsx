import { useId } from 'react';
import { StatusBar } from '../kit.jsx';
import { Cogni } from '../Cogni.jsx';
import cognifyLogo from '../assets/cognify-logo.svg';

/*
 * Welcome: the first screen. The real Cognify logo, Cogni introducing itself,
 * one promise in plain words, and one clear way in.
 */
export function WelcomeScreen({ nav }) {
  const titleId = useId();
  return (
    <div className="cg cg-screen cg-welcome">
      <StatusBar />

      <img className="cg-welcome__logo" src={cognifyLogo} alt="Cognify" width="132" height="36" />

      <div className="cg-welcome__stage" aria-hidden="true">
        <span className="cg-welcome__blob" />
        <span className="cg-welcome__bubble">Hi, I’m Cogni.</span>
        <span className="cg-welcome__cogni">
          <Cogni size={176} mood="wave" />
        </span>
      </div>

      <section className="cg-welcome__text" aria-labelledby={titleId}>
        <h1 id={titleId}>One small thing at a time.</h1>
        <p>Cognify breaks your day into easy steps, reads things aloud and cheers you on.</p>
      </section>

      <span className="cg-dots" aria-hidden="true">
        <i className="is-on" />
        <i />
        <i />
      </span>

      <div className="cg-bottom">
        <button type="button" className="cg-btn" onClick={() => nav?.('pace')}>
          Get started
        </button>
        <button type="button" className="cg-link">
          I already have an account
        </button>
      </div>
    </div>
  );
}
