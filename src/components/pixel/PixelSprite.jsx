import { useMemo } from 'react';

/**
 * Pixel art as data. Each sprite is an array of equal-ish strings:
 *   '.' = transparent, 'K' = ink, 'W' = white, 'B' = electric blue.
 * Rows are merged into horizontal runs so the SVG stays tiny and crisp.
 */
export const PALETTE = { K: '#0F0F12', W: '#FFFFFF', B: '#1F44FF' };

export const SPRITES = {
  arrow: {
    hotspot: [0, 0],
    rows: [
      'K.........',
      'KK........',
      'KBK.......',
      'KBWK......',
      'KBWWK.....',
      'KBWWWK....',
      'KBWWWWK...',
      'KBWWWWWK..',
      'KBWWWWWWK.',
      'KBWWWWKKKK',
      'KBWKWWK...',
      'KBK.KWWK..',
      'KK..KWWK..',
      'K....KWWK.',
      '.....KWWK.',
      '......KK..',
    ],
  },
  hand: {
    hotspot: [3.5, 0],
    rows: [
      '...KK........',
      '..KWWK.......',
      '..KWWK.......',
      '..KWWK.......',
      '..KWWKKK.....',
      '..KWWKWWKK...',
      '..KWWKWWKWKK.',
      'KKKWWKWWKWKWK',
      'KWKWWWWWWWWWK',
      'KWWWWWWWWWWWK',
      '.KWWWWWWWWWWK',
      '.KWWWWWWWWWK.',
      '..KWWWWWWWWK.',
      '..KWWWWWWWK..',
      '...KBBBBBBK..',
      '...KKKKKKKK..',
    ],
  },
  magnifier: {
    hotspot: [5, 5],
    rows: [
      '...KKKKK......',
      '..KWWWWWK.....',
      '.KWBBWWWWK....',
      'KWBWWWWWWWK...',
      'KWBWWWWWWWK...',
      'KWWWWWWWWWK...',
      'KWWWWWWWWWK...',
      'KWWWWWWWWWK...',
      '.KWWWWWWWKK...',
      '..KWWWWWKKKK..',
      '...KKKKKKKKKK.',
      '..........KKKK',
      '...........KKK',
      '............KK',
    ],
  },
  heart: {
    hotspot: [3, 3],
    rows: ['.BB.BB.', 'BBBBBBB', 'BBBBBBB', '.BBBBB.', '..BBB..', '...B...'],
  },
  // "Player 2": the visitor's avatar on the match screen.
  visitor: {
    hotspot: [6, 5],
    rows: [
      '...KKKKKK...',
      '..KBBBBBBK..',
      '.KBBBBBBBBK.',
      'KBBWWBBWWBBK',
      'KBBWKBBWKBBK',
      'KBBBBBBBBBBK',
      'KBWBBBBBBWBK',
      'KBBWWWWWWBBK',
      '.KBBBBBBBBK.',
      '..KBBBBBBK..',
      '...KKKKKK...',
    ],
  },
};

function toRuns(rows) {
  const width = Math.max(...rows.map((r) => r.length));
  const byColor = {};
  rows.forEach((row, y) => {
    let x = 0;
    while (x < width) {
      const c = row[x] ?? '.';
      if (c === '.') {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < width && row[x + run] === c) run += 1;
      (byColor[c] ||= []).push(`M${x} ${y}h${run}v1H${x}z`);
      x += run;
    }
  });
  return { width, height: rows.length, byColor };
}

export default function PixelSprite({ sprite, scale = 2, palette, className, style }) {
  const rows = typeof sprite === 'string' ? SPRITES[sprite].rows : sprite.rows ?? sprite;
  const { width, height, byColor } = useMemo(() => toRuns(rows), [rows]);
  const colors = { ...PALETTE, ...palette };
  return (
    <svg
      className={className}
      style={style}
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {Object.entries(byColor).map(([c, d]) => (
        <path key={c} fill={colors[c]} d={d.join('')} />
      ))}
    </svg>
  );
}
