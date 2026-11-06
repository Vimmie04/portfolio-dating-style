import { useEffect } from 'react';
import { CsCalendar } from './screens/CsCalendar.jsx';
import { CompliancePlanner } from './screens/CompliancePlanner.jsx';
import { ProductScreen } from './ProductScreen.jsx';

/* Dev-only: /export/csync/screen/<id> renders one screen at its recorded size (1536 × 736);
   /export/csync/board/preview shows both screens framed, with the ownership note. */
export const CSYNC_FONTS =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

const SCREENS = { calendar: CsCalendar, planner: CompliancePlanner };

async function loadFonts() {
  let link = document.querySelector(`link[data-href="${CSYNC_FONTS}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSYNC_FONTS;
    link.dataset.href = CSYNC_FONTS;
    document.head.appendChild(link);
  }
  if (!link.sheet) {
    await new Promise((resolve) => {
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, 10000);
    });
  }
  await Promise.all(['500 14px "Plus Jakarta Sans"', '600 14px "Plus Jakarta Sans"', '700 14px "Plus Jakarta Sans"'].map((f) => document.fonts.load(f)));
  await document.fonts.ready;
}

function PreviewBoard() {
  return (
    <div style={{ width: 1200, padding: 48, display: 'grid', gap: 44, background: '#f4f5f7', fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#16181d' }}>
      <ProductScreen title="CS Calendar">
        <CsCalendar />
      </ProductScreen>
      <ProductScreen title="Compliance Planner">
        <CompliancePlanner />
      </ProductScreen>
    </div>
  );
}

export default function CsyncExport({ kind, id }) {
  useEffect(() => {
    let live = true;
    (async () => {
      await loadFonts();
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true })))));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 200));
      if (!live) return;
      window.__exportFontsOk = document.fonts.check('600 14px "Plus Jakarta Sans"');
      window.__exportReady = true;
    })();
    return () => {
      live = false;
    };
  }, [kind, id]);

  if (kind === 'board') {
    return (
      <div data-export-root style={{ width: 1200 }}>
        <PreviewBoard />
      </div>
    );
  }

  const Screen = SCREENS[id];
  return Screen ? (
    <div data-export-root>
      <Screen />
    </div>
  ) : null;
}
