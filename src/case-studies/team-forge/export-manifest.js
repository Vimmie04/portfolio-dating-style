/* What gets exported for Behance / Figma. Plain JS so the Node capture script can read it too. */
export const SCREEN_IDS = ['welcome', 'role', 'home', 'tasks', 'task', 'submit', 'review', 'approvals', 'approved', 'certificate', 'wins', 'profile'];

export const BOARDS = [
  { id: 'cover', file: '01-cover' },
  { id: 'flow-a', file: '02-flow-the-first-five-minutes' },
  { id: 'flow-b', file: '03-flow-a-day-of-work' },
  { id: 'flow-c', file: '04-flow-the-review-loop' },
  { id: 'flow-d', file: '05-flow-recognition-that-travels' },
  { id: 'rewards', file: '06-badges-and-certificate' },
  { id: 'system', file: '07-design-system' },
];

const nn = (i) => String(i + 1).padStart(2, '0');

/** Every capture job. Boards have no fixed height: the page reports it. */
export function exportJobs() {
  return [
    ...SCREEN_IDS.map((id, i) => ({ url: `/export/team-forge/screen/${id}`, file: `screens/${nn(i)}-${id}.png`, width: 390, height: 844, scale: 3 })),
    ...SCREEN_IDS.map((id, i) => ({ url: `/export/team-forge/mockup/${id}`, file: `mockups/${nn(i)}-${id}.png`, width: 414, height: 868, scale: 3, transparent: true })),
    ...BOARDS.map((b) => ({ url: `/export/team-forge/board/${b.id}`, file: `behance/${b.file}.png`, width: 1400, scale: 2 })),
  ];
}
