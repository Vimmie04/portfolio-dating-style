/**
 * Team Forge case study: all the words on the page live here.
 * Source: the original Behance case study (research, persona, strategy), plus the 2026 redesign notes.
 */
export const teamForge = {
  slug: 'team-forge',
  pageTitle: 'Team Forge case study · Vimla Issar',
  kind: 'Gamified team SaaS',
  title: 'What if finishing tasks actually built your career?',
  subtitle:
    'Team Forge is a team management app for startups that turns interns’ everyday work into recognition they can keep: XP, milestones and verified certificates.',
  facts: [
    ['Role', 'UI/UX Designer'],
    ['Platform', 'Mobile app'],
    ['Method', 'Lean UX'],
    ['Research', '20+ interviews'],
  ],

  summary: [
    {
      label: 'The problem',
      text: 'Interns at startups do plenty of work that nobody sees. Feedback is slow, recognition is rare and they leave with little proof of what they did.',
    },
    {
      label: 'What I designed',
      text: 'A task app where approved work earns XP, unlocks milestones and becomes a verified certificate interns can add to LinkedIn.',
    },
    {
      label: 'What changed in 2026',
      text: 'I rebuilt the screens around the moment that hurt most, waiting for approval, and added the missing half: a review queue for team leads.',
    },
  ],

  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'research', label: 'Research' },
    { id: 'riya', label: 'Meet Riya' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'redesign', label: 'The redesign' },
    { id: 'screens', label: 'Screens' },
    { id: 'prototype', label: 'Try it' },
    { id: 'system', label: 'Design system' },
    { id: 'success', label: 'Success' },
  ],

  overview: {
    title: 'Recognition through gamification',
    text: [
      'Team Forge is a gamified team management platform for startups. Interns earn points for completed tasks, unlock milestones and receive shareable certificates for professional platforms like LinkedIn.',
      'The idea is simple: if the work is real, the credit should be too.',
    ],
    did: ['Research', 'Strategy', 'Information architecture', 'UI design', 'Prototyping'],
  },

  research: {
    title: 'Why interns feel invisible',
    lede: 'I started with desk research on how small teams manage work, then interviewed 20+ interns and startup professionals.',
    stats: [
      { value: '14%', text: 'MSMEs operate at only 14% of large-enterprise productivity, partly due to poor task management.', source: 'World Economic Forum' },
      { value: '84%', text: 'of teams report lost time and low output because of disorganised task handling.', source: 'Harvard Business Review' },
      { value: '2+ yrs', text: 'of inefficient workflows have slowed MSME growth in Madhya Pradesh.', source: 'The Times of India' },
    ],
    themes: [
      {
        title: 'Recognition is missing',
        items: [
          'Interns want to grow, but no feedback and no recognition wears their motivation down.',
          'Founders find managing teams and tracking progress overwhelming, so reviews slip.',
        ],
      },
      {
        title: 'Communication is scattered',
        items: [
          'Small companies use different apps for meetings, docs and file sharing.',
          'Team chat mostly happens on WhatsApp.',
          'Files shared on WhatsApp get lost in long chats.',
          'Interns prefer live briefings, so they can ask questions directly.',
        ],
      },
    ],
  },

  persona: {
    name: 'Riya Sharma',
    meta: '21 · Marketing intern at a startup · Bangalore',
    quote: 'I want my internship work to be visible and valued.',
    lists: [
      { title: 'Goals', items: ['Gain real industry experience', 'Build a portfolio from internship work', 'Be recognised for her contributions'] },
      { title: 'Frustrations', items: ['Her work often goes unnoticed', 'Little feedback from team leads', 'Long waits for approval from busy managers'] },
      { title: 'Apps she uses', items: ['WhatsApp', 'Notion', 'LinkedIn', 'Google Drive', 'Google Meet'] },
    ],
    dayTitle: 'A day in Riya’s internship',
    day: [
      { text: 'Starts the day excited about new tasks', mood: 0.9 },
      { text: 'Finishes a task and sends it for review', mood: 0.82 },
      { text: 'Her manager is swamped; the review slips', mood: 0.48 },
      { text: 'Stuck waiting, unsure what to do next', mood: 0.18 },
      { text: 'Approved, with one line of feedback', mood: 0.38 },
      { text: 'Ends the day feeling unappreciated', mood: 0.12 },
    ],
    gapLabel: 'The gap the redesign targets',
  },

  strategy: {
    title: 'Make good work visible, fast',
    intention:
      'Design a team management platform that motivates interns through rewards and recognition, while helping startups track progress and productivity.',
    columns: [
      { title: 'Who it’s for', items: ['Startup teams of 10–50 people', 'Founders and team leads who manage interns', 'Interns looking for feedback and recognition'] },
      { title: 'What success means', items: ['More tasks completed, more engagement', 'Faster feedback and approvals', 'Achievements interns can share professionally'] },
    ],
    lean: [
      ['Assume', 'Startups manage teams on WhatsApp and scattered tools.'],
      ['Research', 'Interviewed interns about motivation and collaboration.'],
      ['Ideate', 'Explored a reward system for finishing tasks.'],
      ['Prototype', 'Designed task tracking, rewards and progress screens.'],
      ['Test & iterate', 'Refined the concept for clarity and engagement.'],
    ],
    ia: [
      { title: 'Onboarding', items: ['Business or employee?', 'Sign up / log in', 'Profile setup', 'Socials', 'Induction'] },
      { title: 'Home', items: ['Today’s tasks', 'Level & streak', 'In review', 'Kudos'] },
      { title: 'Tasks', items: ['My / team tasks', 'Board, list, calendar', 'Details & checklist', 'Files & comments'] },
      { title: 'Wins', items: ['Weekly board', 'Badges', 'Milestones', 'Certificates'] },
      { title: 'Chat', items: ['Team channels', 'DMs', 'Meetings', 'Whiteboard'] },
      { title: 'Profile & settings', items: ['Profile', 'Security & 2FA', 'Notifications', 'Team & roles', 'Billing & branding'] },
    ],
  },

  redesign: {
    title: 'Same idea, rethought UI',
    lede: 'Looking back at the original screens, the concept held up but the interface didn’t. I kept the brand, content and the core idea, and fixed what got in the way.',
    changes: [
      { area: 'Onboarding', before: 'Three generic welcome slides before anything useful.', after: 'One screen that shows the value: XP, approvals and a certificate, in real UI.' },
      { area: 'Home', before: 'Decorative images and equal weight on everything.', after: 'One statement, your progress and the one task that matters next.' },
      { area: 'Navigation', before: 'A hamburger menu plus unlabelled icons.', after: 'A floating bar with four destinations; the one you’re on is always spelled out.' },
      { area: 'Colour', before: 'Brand blue as a heavy fill, with little hierarchy.', after: 'One blue for action. Green, red and amber only when they mean something.' },
      { area: 'Icons & people', before: 'Generic icons and decorative images.', after: 'A custom duotone icon set and illustrated avatars for the team.' },
      { area: 'Rewards', before: 'Badges as plain icons and a basic certificate card.', after: 'Illustrated badges in four tiers, and a certificate designed like a real document.' },
      { area: 'Waiting', before: 'An “All set!!!” screen, then silence.', after: 'A review timeline: seen, expected by when, and a polite nudge.' },
      { area: 'Team leads', before: 'No manager side at all.', after: 'A review queue: approve, quick feedback and kudos in one card.' },
      { area: 'Leaderboard', before: 'Rank only, so most people are “losing”.', after: 'Your own week first, plus a team board that resets weekly.' },
      { area: 'Contrast', before: 'White text on #00ADF2 (about 2.5:1).', after: 'Kept #00ADF2 as the main colour, with dark text on it (6.4:1). Small blue text uses #0077B6 (4.8:1).' },
    ],
    loopTitle: 'The new core loop',
    loop: ['Do the task', 'Submit', 'Reviewed on time', 'XP + kudos', 'Milestone', 'Certificate on LinkedIn'],
  },

  flows: [
    { id: 'a', title: 'The first five minutes', text: 'Show the value, pick a role, sign in with LinkedIn.', screens: ['welcome', 'role'] },
    { id: 'b', title: 'A day of work', text: 'Know what matters today, then do it without leaving the app.', screens: ['home', 'tasks', 'task', 'submit'] },
    { id: 'c', title: 'The review loop', text: 'The redesign’s focus: waiting is visible, and leads can recognise good work in seconds.', screens: ['review', 'approvals', 'approved'] },
    { id: 'd', title: 'Recognition that travels', text: 'Milestones become proof: certificates, badges and a profile worth sharing.', screens: ['certificate', 'wins', 'profile'] },
  ],

  prototype: {
    title: 'Tap through it yourself',
    lede: 'Follow one task from Riya’s to-do list to Neha’s approval and back. The panel next to the phone tells you what to tap.',
    steps: [
      { id: 'welcome', label: 'Welcome' },
      { id: 'home', label: 'Home' },
      { id: 'task', label: 'Open a task' },
      { id: 'submit', label: 'Submit work' },
      { id: 'review', label: 'Wait (visibly)' },
      { id: 'approvals', label: 'Neha approves' },
      { id: 'approved', label: 'Recognised' },
      { id: 'profile', label: 'Wall of wins' },
      { id: 'certificate', label: 'Certificate' },
    ],
    notInPrototype: 'That part isn’t in this prototype. Follow the tip next to the phone.',
  },

  system: {
    title: 'One blue, and colour that means something',
    lede: 'Same brand and type as the original, used with restraint: one blue carries every action, there are no gradients, and other colours only appear when they mean something.',
    colors: [
      { name: 'Brand', hex: '#00ADF2', note: 'Buttons, active states, rings, icons', contrast: '6.4:1 with ink', darkText: true },
      { name: 'Text blue', hex: '#0077B6', note: 'Links, XP and small blue text', contrast: '4.8:1', isNew: true },
      { name: 'Logo cyan', hex: '#0CC0DF', note: 'The logo only' },
      { name: 'Tint', hex: '#EAF6FD', note: 'Emphasis without a colour block', light: true, isNew: true },
      { name: 'Success', hex: '#14AE5C', note: 'Only the “Approved” moment' },
      { name: 'Danger', hex: '#C00F0C', note: 'Only high priority and overdue' },
      { name: 'Milestone', hex: '#E8A000', note: 'Only milestones, badges and certificates' },
      { name: 'Ink', hex: '#16202B', note: 'Headings and body text' },
    ],
    type: [
      { family: 'Assistant', role: 'Headings', sample: 'Your work, recognised.' },
      { family: 'Fustat', role: 'Body', sample: 'Earn XP for every task and collect certificates you can share.' },
    ],
    logo: {
      title: 'The Team Forge logo',
      text: 'Two interlocking chain links between two dots, in logo cyan #0CC0DF, with a Poppins SemiBold wordmark. The full logo is for covers and documents; inside the app, the mark stands on its own.',
    },
    icons: {
      title: 'Team Forge Glyphs',
      text: 'A custom icon set drawn for the product: 24px grid, 1.75px line, rounded ends, and a soft tint under every outline.',
    },
    avatars: {
      title: 'Illustrated people',
      text: 'Six portraits in one style, so the team feels real without stock photos.',
    },
    badges: {
      title: 'Badges in four tiers',
      text: 'The material shows the level (bronze, silver, gold, sapphire) and the shape shows the family. Flat facets, no gradients.',
      tiers: ['bronze', 'silver', 'gold', 'sapphire'],
      families: [
        { label: 'Skill', shape: 'hex', tier: 'bronze', emblem: 'target' },
        { label: 'Habit', shape: 'shield', tier: 'silver', emblem: 'clock' },
        { label: 'Kudos', shape: 'rosette', tier: 'gold', emblem: 'star' },
        { label: 'Milestone', shape: 'medal', tier: 'gold', emblem: '1K' },
        { label: 'Locked', shape: 'shield', tier: 'locked', emblem: 'moon' },
      ],
    },
    certificate: {
      title: 'A certificate worth sharing',
      text: 'Designed like a real document: signed by a named lead, sealed with the milestone medal, with a date and a verifiable ID.',
    },
  },

  success: {
    title: 'What success looks like',
    lede: 'These are the signals I’d track once Team Forge is in a team’s hands, taken straight from the success factors above.',
    metrics: [
      { title: 'Faster approvals', text: 'Time from “Submit” to “Approved”, and the share of reviews done within 24 hours.' },
      { title: 'More finished work', text: 'Tasks completed per intern per week, and how many come back after a “Request changes”.' },
      { title: 'Recognition that travels', text: 'Kudos sent by leads, and certificates added to LinkedIn.' },
    ],
  },

  next: { label: 'Next profile', title: 'CSync', text: 'A shipped platform for Company Secretary firms.', to: '/work/csync' },
};
