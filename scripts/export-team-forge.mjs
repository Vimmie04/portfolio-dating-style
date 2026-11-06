/**
 * Exports the Team Forge screens, mockups and Behance boards as PNGs.
 *
 *   1. Start the dev server (npm run dev, port 5173)
 *   2. node scripts/export-team-forge.mjs          (everything)
 *      node scripts/export-team-forge.mjs cover    (only files whose name contains "cover")
 *
 * Uses the Chrome (or Edge) already installed on this computer, in headless mode,
 * driven over the DevTools protocol. Nothing is downloaded.
 * Output: exports/team-forge/{screens,mockups,behance}/*.png
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { exportJobs } from '../src/case-studies/team-forge/export-manifest.js';

const BASE = process.env.EXPORT_BASE || 'http://localhost:5173';
const OUT = path.resolve('exports/team-forge');
const PORT = 9333;
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* Minimal DevTools-protocol client over Node's built-in WebSocket */
class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} (${msg.error.code})`));
        else resolve(msg.result);
      }
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', { expression, returnByValue: true });
    return res.result?.value;
  }
}

async function pageSocket() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error('Chrome did not start its debugging port.');
}

async function main() {
  const browser = BROWSERS.find((p) => existsSync(p));
  if (!browser) throw new Error('No Chrome or Edge found. Set CHROME_PATH.');

  try {
    await fetch(BASE);
  } catch {
    throw new Error(`Dev server not reachable at ${BASE}. Run "npm run dev" first.`);
  }

  const profile = await mkdtemp(path.join(os.tmpdir(), 'tf-export-'));
  const chrome = spawn(
    browser,
    ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--force-color-profile=srgb', 'about:blank'],
    { stdio: 'ignore' },
  );

  const cdp = new CDP(await pageSocket());
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  // Optional filter: node scripts/export-team-forge.mjs cover  → only files whose path contains "cover"
  const only = process.argv[2];
  const jobs = exportJobs().filter((j) => !only || j.file.includes(only));
  let fontsWarned = false;
  console.log(`Exporting ${jobs.length} images with ${path.basename(browser)} …`);

  try {
    for (const [i, job] of jobs.entries()) {
      const metrics = (height) => cdp.send('Emulation.setDeviceMetricsOverride', { width: job.width, height, deviceScaleFactor: job.scale, mobile: false });
      await metrics(job.height ?? 1200);
      await cdp.send('Emulation.setDefaultBackgroundColorOverride', job.transparent ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
      await cdp.evaluate('window.__exportReady = false');
      await cdp.send('Page.navigate', { url: BASE + job.url });

      const start = Date.now();
      while (!(await cdp.evaluate('window.__exportReady === true').catch(() => false))) {
        if (Date.now() - start > 45000) throw new Error(`Timed out waiting for ${job.url}`);
        await sleep(150);
      }

      if (!fontsWarned && !(await cdp.evaluate('window.__exportFontsOk === true'))) {
        console.warn('  ! Assistant/Fustat did not load (offline?). Images will use fallback fonts.');
        fontsWarned = true;
      }

      if (!job.height) {
        const h = await cdp.evaluate('Math.ceil(document.querySelector("[data-export-root]").getBoundingClientRect().height)');
        await metrics(h);
        await sleep(400);
      }

      const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      const file = path.join(OUT, job.file);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, Buffer.from(data, 'base64'));
      console.log(`  ${String(i + 1).padStart(2, ' ')}/${jobs.length}  ${job.file}`);
    }
  } finally {
    await cdp.send('Browser.close').catch(() => {});
    chrome.kill();
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  }

  console.log(`Done → ${OUT}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
