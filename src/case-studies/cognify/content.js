/**
 * Cognify case study: all the words on the page live here.
 * Sources: Vimla's Behance case study (research, interviews, problem statement,
 * IA, task flow, Universal Design mapping) and the current app design.
 * Vimla's rules for this page: present Cognify as one design. Never label or mention
 * a redesign, a "2026 version" or an earlier version. No user personas on the page.
 */
export const cognify = {
  slug: 'cognify',
  pageTitle: 'Cognify case study · Vimla Issar',
  kind: 'Accessibility app',
  title: 'What if your to-do list was kind to you?',
  subtitle:
    'Cognify helps young adults with dyslexia get through everyday tasks one small step at a time, with a calm AI companion and gentle rewards that never pressure.',
  facts: [
    ['Role', 'UI/UX Designer'],
    ['Platform', 'Mobile app'],
    ['Approach', 'Universal design'],
    ['Research', '10 users · 3 experts'],
  ],
  behance: 'https://www.behance.net/gallery/251379015/Congify-Accessible-Productivity-App',

  summary: [
    {
      label: 'The problem',
      text: 'Dyslexia doesn’t end at school. Young adults with dyslexia juggle reading-heavy tasks, memory slips and overload, often without a diagnosis or support.',
    },
    {
      label: 'What I designed',
      text: 'An everyday companion that breaks tasks into small steps, reads things aloud and helps plan the day ahead, with a calm AI helper called Cogni.',
    },
    {
      label: 'What makes it different',
      text: 'Gentle rewards (wins, a streak with rest days, badges) instead of pressure, AI built into each step, and a calm voice that never nags.',
    },
  ],

  // Grows as sections are added
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'research', label: 'Research' },
    { id: 'problem', label: 'The problem' },
    { id: 'idea', label: 'How it helps' },
    { id: 'screens', label: 'Screens' },
    { id: 'prototype', label: 'Try it' },
    { id: 'system', label: 'Design system' },
    { id: 'access', label: 'Accessibility' },
    { id: 'success', label: 'Success' },
  ],

  overview: {
    title: 'Designing for dyslexia, not around it',
    text: [
      'Dyslexia is a learning difference that mainly affects reading, spelling and language processing. It is not about intelligence or effort: people with dyslexia process written language differently.',
      'Cognify is a universal design project: a calm everyday companion that helps adults with dyslexia manage their daily tasks, so that getting through the day feels possible, and even rewarding.',
    ],
    did: ['Secondary research', 'User interviews', 'Expert interviews', 'Problem framing', 'Information architecture', 'Task flows', 'UI design', 'Design system', 'Accessibility (WCAG)', 'Prototyping'],
    segment: ['People with a disability', 'Learning disability', 'Dyslexia'],
    audience: '18–30 years old',
    effects: ['Reading and language processing', 'Memory and processing', 'Cognitive overload'],
  },

  research: {
    title: 'Listening first',
    lede: 'I started with desk research, then spoke to 3 experts who work with dyslexia every day and 10 young adults who live with it.',
    why: [
      { title: 'It continues into adulthood', text: 'Dyslexia doesn’t go away after school; many adults were never diagnosed as children.' },
      { title: 'Design can reduce the load', text: 'Accessible design lowers cognitive load, so effort goes into the task, not the screen.' },
      { title: 'Ability over reading speed', text: 'People should be judged on what they can do, not how fast they read.' },
    ],
    desk: {
      findings: [
        'Many adults remain undiagnosed since childhood, and it keeps affecting learning, work and daily tasks.',
        'Common challenges: reading, writing, memory, focus and organisation.',
        'It often overlaps with ADHD, or with auditory or visual processing differences.',
      ],
      needs: ['Assistive technology', 'Flexible learning formats', 'Screening for young adults'],
      strengths: ['Strong visual thinking', 'High creativity', 'Good at problem-solving'],
      apps: ['Speechify', 'Audible', 'Notion', 'Grammarly', 'ChatGPT'],
      sources: 'Dyslexia Association of India · Madras Dyslexia Association · DSM-5-TR · ICD-11',
    },
    // Who I spoke to (pictured): two experts and one of the ten users
    interviews: [
      {
        name: 'Pankhuri Aggrawal',
        kind: 'Expert',
        role: 'Senior Research Fellow, Department of Clinical Psychology, NIMHANS Bangalore',
        format: 'Online interview',
        photo: 'pankhuri',
      },
      {
        name: 'Vinita',
        kind: 'Expert',
        role: 'Counsellor and educator for children with special needs, Vinita’s Life Skill Academy for Special Needs',
        format: 'Field interview',
        photo: 'vinita',
      },
      {
        name: 'N. Sai Balaji',
        kind: 'User',
        role: 'Diagnosed with dyslexia in his late 20s',
        format: 'Online interview',
        photo: 'sai',
      },
    ],
    counts: { users: '10', experts: '3' },
    themesTitle: 'What we heard, from users and experts',
    themes: [
      { title: 'Awareness gap', text: 'Low awareness among parents and teachers means early signs are missed or misread.' },
      { title: 'Late diagnosis', text: 'Without early identification, support at school and college comes too late, or never.' },
      { title: 'Text-heavy learning', text: 'Reading-heavy systems cause overload, learning gaps and lower confidence.' },
      { title: 'Their own workarounds', text: 'Young adults invent coping methods for daily tasks, but memory slips still cause overwhelm and fatigue.' },
    ],
  },

  problem: {
    title: 'Where the day gets hard',
    statement: 'Create an accessible management system for adults with dyslexia facing daily productivity and organisational challenges.',
    gapsTitle: 'What gets in the way',
    gaps: [
      { title: 'Tasks pile up', text: 'Big tasks feel impossible to start, and lists turn into walls of words.' },
      { title: 'Memory slips', text: 'Steps, plans and routines are easy to lose track of.' },
      { title: 'Motivation fades', text: 'Without small wins, effort feels unseen, and confidence drops.' },
    ],
    hmw: 'How might we help young adults with dyslexia get through everyday tasks calmly, and feel good about the progress they make?',
  },

  idea: {
    title: 'Small steps, gentle rewards, help on hand',
    lede: 'Cognify keeps one question in front of you: what’s the next small thing? Five ideas shape every screen.',
    pillars: [
      { title: 'Small steps', text: 'Every task breaks into steps you can finish, each with a time in plain words. Only one step is on screen at a time.', where: 'Break it down · One step at a time', icon: 'tasks' },
      { title: 'Plan ahead', text: 'Pick tomorrow’s three things the evening before, and keep routines on repeat, so mornings start without decisions.', where: 'Plan tomorrow · Routines', icon: 'calendar' },
      { title: 'Gentle rewards', text: 'Daily wins, a streak that rest days keep safe, and badges for habits. Encouraging, never competitive.', where: 'Small win · Me', icon: 'badge' },
      { title: 'Help on hand', text: 'Cogni, the AI companion, is one tap away on every screen. It knows what you’re looking at and answers in short chunks.', where: 'Ask Cogni · A simpler answer', icon: 'sparkle' },
      { title: 'A calm voice', text: 'Short sentences, plain words, no guilt. Cogni celebrates and helps, and never nags.', where: 'Every screen', icon: 'readAloud' },
    ],
    places: {
      title: 'Five places, always in the same spot',
      items: [
        { name: 'Today', text: 'Today’s wins and the next small step', icon: 'today' },
        { name: 'Tasks', text: 'Morning, afternoon and evening, plus Plan tomorrow', icon: 'tasks' },
        { name: 'Ask Cogni', text: 'Help from any screen, voice first', icon: 'mic' },
        { name: 'Routines', text: 'The same few steps on repeat', icon: 'routine' },
        { name: 'Me', text: 'Streak, challenge, badges and settings', icon: 'me' },
      ],
    },
    game: {
      title: 'Gamification, made gentle',
      lede: 'I took the habit-building ideas that make apps like Duolingo work, and removed the pressure that can make them stressful.',
      rows: [
        { idea: 'Daily goal', usual: 'A points target to hit every day', cognify: 'Pick 1, 3 or 5 small wins a day, and change it any time' },
        { idea: 'Streak', usual: 'Breaks the day you miss', cognify: 'Rest days are built in, so the streak stays safe' },
        { idea: 'Challenges', usual: 'Leagues and rankings against others', cognify: 'One weekly challenge you choose, only against yourself' },
        { idea: 'Rewards', usual: 'Points, lives and leaderboards', cognify: 'Badges for habits, and gold only on real wins' },
        { idea: 'Mascot', usual: 'Nudges you to come back', cognify: 'Cogni celebrates and helps, and never guilt-trips' },
      ],
    },
    voice: {
      title: 'How Cogni speaks',
      pairs: [
        { say: 'One small thing at a time.', not: 'You have 6 overdue tasks!' },
        { say: 'Done. That counts.', not: 'Great job!!! You’re on fire!' },
        { say: 'Rest days keep your streak safe.', not: 'Don’t lose your streak!' },
        { say: 'Stuck? I can suggest a few titles.', not: 'You’ve been on this step too long.' },
      ],
      rules: ['Short sentences and plain words', 'No capitals or italics for emphasis', 'At most one exclamation mark', 'Never blame, never compare'],
    },
  },

  screens: {
    title: 'Twelve screens, four moments',
    lede: 'The whole app, moment by moment. Screen numbers match the prototype below.',
  },

  prototype: {
    title: 'Try it yourself',
    lede: 'Tap through the real screens. Start a step, finish it and watch Today move on.',
  },

  system: {
    title: 'A calm design system',
    lede: 'Two hues, two readable typefaces and one companion. Everything is built to be easy on the eyes.',
    logo: { title: 'Logo', text: 'The “o” in the wordmark is a spiral. Cogni wears the same spiral as a curl, so the app and its companion belong together.' },
    colors: [
      { name: 'Indigo', hex: '#5A62E8', note: 'Buttons and active states', contrast: '4.8:1 with white' },
      { name: 'Indigo ink', hex: '#3D44C7', note: 'Small text on pale tints', contrast: '6.5:1 on tint' },
      { name: 'Periwinkle', hex: '#7C83FD', note: 'Cogni and progress' },
      { name: 'Lavender', hex: '#C7CBFF', note: 'Soft surfaces', contrast: '12.1:1 with ink', darkText: true, light: true },
      { name: 'Gold', hex: '#DFB34B', note: 'Rewards only', contrast: '9.6:1 with ink', darkText: true },
      { name: 'Cream', hex: '#FAFAF8', note: 'Background, easier than white', contrast: '18.1:1 with ink', darkText: true, light: true },
      { name: 'Ink', hex: '#111111', note: 'Text' },
      { name: 'Grey', hex: '#666666', note: 'Quiet text', contrast: '5.5:1 on cream' },
    ],
    type: [
      { family: 'Lexend', role: 'Headings and labels', sample: 'One small thing at a time.', why: 'Made to reduce visual stress and help reading fluency.' },
      { family: 'Atkinson Hyperlegible', role: 'Reading text', sample: 'Takes about 10 minutes', why: 'Made by the Braille Institute so similar letters, like I, l and 1, are easy to tell apart.' },
    ],
    cogni: {
      title: 'Cogni',
      text: 'A calm companion with three moods. Cogni is never sad or disappointed.',
      moods: [
        { mood: 'calm', label: 'Calm', use: 'Helping' },
        { mood: 'wave', label: 'Wave', use: 'Saying hello' },
        { mood: 'cheer', label: 'Cheer', use: 'Celebrating' },
      ],
    },
    icons: { title: 'Icons', text: 'One outline set with 2px strokes and round ends, always in one colour.' },
  },

  access: {
    title: 'Accessible by design',
    lede: 'Every decision maps to a universal design principle, and every screen is designed to meet WCAG 2.2 AA.',
    mapping: [
      { decision: 'Simple navigation', principle: 'Simple and intuitive use', why: 'Reduces confusion', how: 'Five labelled tabs, in the same place on every screen' },
      { decision: 'Large touch targets', principle: 'Size and space for approach', why: 'Easier to tap', how: 'Main buttons are 54px tall; other targets at least 44px' },
      { decision: 'Minimal interface', principle: 'Low physical and cognitive effort', why: 'Reduces overload', how: 'One task, one step and at most three facts per card' },
      { decision: 'AI simplification', principle: 'Flexibility in use', why: 'Supports different ways of understanding', how: 'Make it simpler, Read it to me, Simpler still' },
      { decision: 'High-contrast colours', principle: 'Perceptible information', why: 'Improves readability', how: 'All text passes AA; status is an icon and a word, never colour alone' },
      { decision: 'Consistent layouts', principle: 'Tolerance for error', why: 'A predictable experience', how: 'The same cards, buttons and places on every screen' },
    ],
    checks: [
      { title: 'Readable text', text: 'Lexend and Atkinson Hyperlegible, at least 16px, 1.5 line spacing and left-aligned. No italics or capitals for emphasis.' },
      { title: 'Calm colour', text: 'Two hues on a cream background. Gold appears only on rewards.' },
      { title: 'Listen instead', text: 'Read aloud is one tap away on steps, answers and plans, and can be switched on from day one.' },
      { title: 'Gentle motion', text: 'Celebrations are short and still. Movement respects the phone’s reduced motion setting.' },
    ],
  },

  success: {
    title: 'How I’d measure success',
    lede: 'Cognify is a concept, so these are the signals I’d track in a pilot, not results.',
    metrics: [
      { title: 'Tasks get finished', text: 'The share of started steps that get done, and tasks finished each week.', icon: 'check' },
      { title: 'People come back calmly', text: 'Days with at least one win each week, and how often rest days keep a streak going.', icon: 'today' },
      { title: 'Less overwhelm', text: 'A one-question weekly check-in, and how often Make it simpler and Read it to me are used.', icon: 'sparkle' },
    ],
  },

  next: { label: 'Next profile', title: 'Mother First', text: 'A service for first-time mothers through pregnancy.', to: '/#project-mother-first' },
};
