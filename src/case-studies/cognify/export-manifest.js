/* What gets exported for Behance / Figma. Plain JS so the Node capture script can read it too. */
export const SCREEN_IDS = ['welcome', 'pace', 'today', 'tasks', 'plan', 'breakdown', 'step', 'win', 'routines', 'cogni', 'answer', 'me'];

const SCREEN_FILES = {
  welcome: 'welcome',
  pace: 'set-your-pace',
  today: 'today',
  tasks: 'tasks',
  plan: 'plan-tomorrow',
  breakdown: 'break-it-down',
  step: 'one-step-at-a-time',
  win: 'small-win',
  routines: 'routines',
  cogni: 'ask-cogni',
  answer: 'a-simpler-answer',
  me: 'me',
};

export const BOARDS = [
  { id: 'cover', file: '01-cover' },
  { id: 'problem', file: '02-designing-for-dyslexia' },
  { id: 'research', file: '03-research' },
  { id: 'idea', file: '04-how-it-helps' },
  { id: 'flow-a', file: '05-flow-getting-started' },
  { id: 'flow-b', file: '06-flow-planning-the-day' },
  { id: 'flow-c', file: '07-flow-doing-a-task' },
  { id: 'flow-d', file: '08-flow-help-and-habits' },
  { id: 'game', file: '09-gamification-and-voice' },
  { id: 'system', file: '10-design-system' },
  { id: 'access', file: '11-accessibility' },
];

const nn = (i) => String(i + 1).padStart(2, '0');

/** Every capture job. Boards have no fixed height: the page reports it. */
export function exportJobs() {
  return [
    ...SCREEN_IDS.map((id, i) => ({ url: `/export/cognify/screen/${id}`, file: `screens/${nn(i)}-${SCREEN_FILES[id]}.png`, width: 390, height: 844, scale: 3 })),
    ...SCREEN_IDS.map((id, i) => ({ url: `/export/cognify/mockup/${id}`, file: `mockups/${nn(i)}-${SCREEN_FILES[id]}.png`, width: 414, height: 868, scale: 3, transparent: true })),
    ...BOARDS.map((b) => ({ url: `/export/cognify/board/${b.id}`, file: `behance/${b.file}.png`, width: 1400, scale: 2 })),
  ];
}
