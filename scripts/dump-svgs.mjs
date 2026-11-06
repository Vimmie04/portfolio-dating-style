/* Temporary helper: renders Team Forge SVG artwork from the real components to plain SVG strings (for Figma). */
import { writeFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const out = process.argv[2];
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const h = React.createElement;
  const { Glyph, GLYPH_NAMES } = await server.ssrLoadModule('/src/case-studies/team-forge/glyphs.jsx');
  const { Portrait } = await server.ssrLoadModule('/src/case-studies/team-forge/portraits.jsx');
  const { Badge, RIYA_BADGES } = await server.ssrLoadModule('/src/case-studies/team-forge/badges.jsx');
  const { LogoMark, LinkedInGlyph, GoogleGlyph, StatusBar } = await server.ssrLoadModule('/src/case-studies/team-forge/kit.jsx');
  const { CertificateDoc } = await server.ssrLoadModule('/src/case-studies/team-forge/certificate.jsx');

  const ns = (svg) => (svg.includes('xmlns=') ? svg : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'));
  const clean = (svg) => ns(svg.replace(/ (aria-hidden|role|aria-label|style)="[^"]*"/g, (m, a) => (a === 'style' ? m : '')));

  // Turn nested <svg x y width viewBox="0 0 24 24" style="color:..."> into <g transform> with explicit colours.
  function flatten(svg) {
    let s = svg;
    for (;;) {
      const start = s.indexOf('<svg', 1);
      if (start < 0) break;
      const openEnd = s.indexOf('>', start);
      const close = s.indexOf('</svg>', openEnd);
      const attrs = s.slice(start + 4, openEnd);
      const inner = s.slice(openEnd + 1, close);
      const get = (n) => (attrs.match(new RegExp(`(?:^|\\s)${n}="([^"]*)"`)) || [])[1];
      const color = ((get('style') || '').match(/color:\s*([^;]+)/) || [])[1] || '#16202B';
      const size = parseFloat(get('width'));
      const keep = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']
        .map((n) => (get(n) != null ? ` ${n}="${get(n)}"` : ''))
        .join('');
      const g = `<g transform="translate(${get('x') || 0} ${get('y') || 0}) scale(${size / 24})"${keep}>${inner}</g>`.replaceAll('currentColor', color);
      s = s.slice(0, start) + g + s.slice(close + 6);
    }
    return s.replace(/ style="[^"]*"/g, '');
  }

  const glyphs = Object.fromEntries(
    GLYPH_NAMES.map((n) => [n, clean(renderToStaticMarkup(h(Glyph, { name: n, size: 24 }))).replace(/ style="[^"]*"/g, '').replaceAll('currentColor', '#16202B')]),
  );
  const people = ['riya', 'neha', 'om', 'sid', 'kush', 'kritika'];
  const portraits = Object.fromEntries(people.map((p) => [p, clean(renderToStaticMarkup(h(Portrait, { person: p, size: 64 }))).replace(/ style="[^"]*"/g, '')]));
  const badgeSpecs = [...RIYA_BADGES, { label: 'Medal 1K', shape: 'medal', tier: 'gold', emblem: '1K' }];
  const badges = Object.fromEntries(badgeSpecs.map((b) => [b.label, flatten(clean(renderToStaticMarkup(h(Badge, { ...b, size: 64 }))))]));
  const logoMark = clean(renderToStaticMarkup(h(LogoMark, { height: 172 }))).replace(/ style="[^"]*"/g, '');
  const brands = {
    linkedin: clean(renderToStaticMarkup(h(LinkedInGlyph, { size: 24 }))),
    google: clean(renderToStaticMarkup(h(GoogleGlyph, { size: 24 }))),
  };
  const statusSvgs = renderToStaticMarkup(h(StatusBar)).match(/<svg[\s\S]*?<\/svg>/g).map((s) => ns(s).replaceAll('currentColor', '#16202B'));
  const certSvgs = renderToStaticMarkup(h(CertificateDoc)).match(/<svg[\s\S]*?<\/svg>/g).map((s) => ns(s.replace(/ style="[^"]*"/g, '')));
  // certSvgs order: 4 corners, band, logo mark, signature, seal badge
  const certificate = { corner: certSvgs[0], band: certSvgs[4], signature: certSvgs[6], seal: flatten(clean(certSvgs[7])) };

  await writeFile(out, JSON.stringify({ glyphs, portraits, badges, logoMark, brands, status: statusSvgs, certificate }, null, 1));
  console.log('wrote', out, 'glyphs', Object.keys(glyphs).length, 'portraits', people.length, 'badges', badgeSpecs.length, 'certSvgs', certSvgs.length);
} finally {
  await server.close();
}
