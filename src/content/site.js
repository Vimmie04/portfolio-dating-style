/**
 * ─────────────────────────────────────────────────────────────
 *  ALL EDITABLE CONTENT LIVES HERE.
 *  Change copy, links and projects in this file; every
 *  component reads from it, so you never have to touch the UI.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  nickname: 'Vimmie',
  fullName: 'Vimla Issar',
  age: 22,
  location: 'Bhopal, India',
  status: 'Active now',
  roles: ['UI/UX Design', 'Visual Communication', 'Brand Identity'],
  headline: {
    before: 'Humans are ',
    emphasis: 'complicated',
    after: ', interfaces don’t have to be.',
  },
  intro:
    'I create thoughtful digital experiences that help brands stand out through clean design, purposeful interactions and seamless development.',
  photo: {
    src: '/images/vimmie.webp',
    width: 1127,
    height: 1396,
    alt: 'Vimmie resting her cheek on her hand, looking off to the side',
  },
};

/**
 * Contact links. An empty string shows a friendly "coming soon"
 * message instead of a broken link.
 */
export const links = {
  email: 'vimlaissar2@gmail.com', // no "mailto:"
  linkedin: 'https://www.linkedin.com/in/vimla-issar-a9252a270/',
  instagram: 'https://www.instagram.com/balancedesignslab/',
  behance: 'https://www.behance.net/vimlaissaruiux',
  resume: '/Vimla-Issar-Resume.pdf', // file lives in /public
  resumeFileName: 'Vimla-Issar-Resume.pdf', // name used when downloading
};

/** Hinge-style prompts on the first fold. `likeLabel` is how a like is described later. */
export const heroPrompts = [
  {
    id: 'prompt:green-flag',
    question: 'A green flag I look for',
    answer: 'Clear communication, creative freedom, and ideas that make it out of Figma.',
    likeLabel: 'my green-flag take',
  },
  {
    id: 'prompt:simple-pleasures',
    question: 'My simple pleasures',
    answer: 'Clear intentions, thoughtful interactions, and a little attention to detail.',
    likeLabel: 'my simple pleasures',
  },
];

/** Third "photo" on the profile card: an interactive prompt. */
export const twoTruths = {
  id: 'prompt:two-truths',
  question: 'Two truths and a lie',
  likeLabel: 'two truths and a lie',
  statements: [
    'I love solving problems.',
    'I obsess over typography.',
    'I’ve never redesigned something because the spacing felt off.',
  ],
  lieIndex: 2,
  prompt: 'Tap the lie.',
  correct: 'Correct. I’ve redesigned things over 2px.',
  wrong: 'Nope, that one’s painfully true.',
};

/**
 * GREEN FLAGS: tools that fall into the toy box.
 *
 * OFFICIAL LOGOS: put the file in /public/logos/ and set `logo`, e.g.
 *   logo: '/logos/figma.svg'
 *   logoFit: 'contain' → logo sits centred on a white tile (marks like Figma's)
 *   logoFit: 'fill'    → the file IS the tile (app icons like Photoshop's square)
 * While `logo` is empty, the drawn fallback tile (`mark`) is shown.
 * Built-in drawn marks: 'figma', 'framer', 'canva'; anything else uses a
 * monogram tile (`letters`, `bg`, `fg`).
 */
export const tools = [
  { id: 'figma', name: 'Figma', logo: '', logoFit: 'contain', mark: 'figma' },
  { id: 'photoshop', name: 'Photoshop', logo: '', logoFit: 'fill', mark: 'monogram', letters: 'Ps', bg: '#001E36', fg: '#31A8FF' },
  { id: 'illustrator', name: 'Illustrator', logo: '', logoFit: 'fill', mark: 'monogram', letters: 'Ai', bg: '#330000', fg: '#FF9A00' },
  { id: 'framer', name: 'Framer', logo: '', logoFit: 'contain', mark: 'framer' },
  { id: 'canva', name: 'Canva', logo: '', logoFit: 'contain', mark: 'canva' },
  { id: 'jitter', name: 'Jitter', logo: '/logos/jitter.jpg', logoFit: 'fill', mark: 'monogram', letters: 'Ji', bg: '#FFFFFF', fg: '#0F0F12' },
  { id: 'claude', name: 'Claude', logo: '/logos/claude.svg', logoFit: 'contain', mark: 'monogram', letters: 'Cl', bg: '#D97757', fg: '#FFFFFF' },
  { id: 'davinci-resolve', name: 'DaVinci Resolve', logo: '/logos/davinci-resolve.jpg', logoFit: 'fill', mark: 'monogram', letters: 'Dr', bg: '#1E2A3A', fg: '#FFFFFF' },
];

/** Interest tags. Visitors can tap each one to like it. */
export const interests = [
  'SaaS',
  'HRMS',
  'Prototyping',
  'Design Systems',
  'User Research',
  'Developer Handover',
  'Wireframing',
  'Product Thinking',
  'Responsive Design',
  'Information Architecture',
  'Interaction Design',
  'Microinteractions',
  'Agentic AI',
  'Visual Hierarchy',
  'Branding',
  'Service Design',
];

export const greenFlags = {
  title: 'My Green Flags',
  lede: 'My green flags? Clean components, good documentation and developers who actually read the Figma handoff.',
  prompts: [
    {
      id: 'prompt:geek-out',
      question: 'I geek out on',
      answer: 'Interfaces, human behaviour and the little details people don’t notice but always feel.',
      likeLabel: 'what I geek out on',
    },
    {
      id: 'prompt:irrational-fear',
      question: 'My most irrational fear',
      answer: 'Unnamed layers. “Frame 4327” still haunts me.',
      likeLabel: 'my irrational fear',
    },
  ],
};

/**
 * FEATURED WORK: each project is a folder that reads like a dating profile.
 *  href       → case study link ('' shows a friendly "coming soon" toast instead of a dead link).
 *               External links (https://…) open in a new tab.
 *  thumbnail  → image path, e.g. '/projects/csync.webp' (put files in /public/projects/).
 *               While empty, a drawn wireframe preview is shown, chosen by `preview`:
 *               'leaderboard' | 'dashboard' | 'mobile' | 'journey' | 'canvas'.
 *  tone       → folder colour: 'paper' | 'ink' | 'electric' | 'tint'.
 *  shipped    → true adds a "Shipped product" badge and a SHIPPED stamp.
 *  comingSoon → { label, purpose, audience }: a quiet text cover for work still in progress.
 *  summary    → one-line factual description (used on the case-study page).
 */
export const projects = [
  {
    id: 'team-forge',
    index: '01',
    title: 'Team Forge',
    kind: 'Gamified team SaaS',
    summary:
      'A gamified team management SaaS product designed to improve team collaboration, productivity and engagement.',
    tagline: 'Competitive? Good. I turn everyday teamwork into a game everyone wants to win.',
    tags: ['SaaS', 'Gamification', 'Product Design'],
    href: '/work/team-forge', // in-site case study page
    thumbnail: '',
    preview: 'leaderboard',
    tone: 'paper',
  },
  {
    id: 'csync',
    index: '02',
    title: 'CSync',
    kind: 'CS firm platform',
    summary:
      'A management platform built for Company Secretary (CS) firms to streamline workflows, task management, approvals and compliance.',
    tagline:
      'Looking for someone who appreciates a well-organised life. I happen to organise entire company secretarial workflows.',
    tags: ['SaaS', 'Workflows', 'Compliance'],
    shipped: true, // shows the "Shipped product" badge and stamp
    href: '/work/csync', // in-site case study page
    thumbnail: '',
    preview: 'dashboard',
    tone: 'ink',
  },
  {
    id: 'cognify',
    index: '03',
    title: 'Cognify',
    kind: 'Accessibility app',
    summary:
      'An accessibility-focused organising app designed for people with cognitive disabilities, helping them manage everyday tasks and routines more independently.',
    tagline:
      'Patient, predictable and never overwhelming. I help people get through their day, one calm step at a time.',
    tags: ['Accessibility', 'Mobile App', 'Inclusive Design'],
    href: '/work/cognify', // in-site case study page
    thumbnail: '',
    preview: 'mobile',
    tone: 'electric',
  },
  {
    id: 'mother-first',
    index: '04',
    title: 'Mother First',
    kind: 'Service design',
    summary:
      'A service designed to support first-time pregnant women through their pregnancy journey, with guidance, resources and support at every stage.',
    tagline: 'In it for the whole nine months. I make a first pregnancy feel a little less like guesswork.',
    tags: ['Service Design', 'Healthcare', 'User Research'],
    href: '',
    thumbnail: '',
    preview: 'journey',
    tone: 'tint',
    // Still in progress: the cover shows these words instead of any mockup
    comingSoon: {
      label: 'Coming soon',
      purpose: 'Guidance, resources and support at every stage of pregnancy.',
      audience: 'First-time pregnant women.',
    },
  },
];

export const featuredWork = {
  title: 'Featured Work',
  lede: 'Four projects, four very different personalities. Scroll to meet them, one file at a time.',
  bioLabel: 'Bio',
  cta: 'View case study',
  shippedLabel: 'Shipped product',
  prompt: {
    id: 'prompt:win-me-over',
    question: 'The way to win me over',
    answer: 'Ask about my process, not just the final screens.',
    likeLabel: 'how to win me over',
  },
};

/**
 * IT'S A MATCH: the swipe deck. Swiping left reveals the next card;
 * swiping right (on any card) opens the match screen.
 * Card tones: 'paper' | 'ink' | 'electric' | 'tint'. `kind: 'photo'` uses your portrait.
 */
export const match = {
  label: 'It’s a match',
  title: 'Is it a match?',
  lede: 'One last thing before you go. Be honest, I can take it. (I can’t.)',
  hint: 'Drag the card, tap the buttons or press ← →',
  hintTouch: 'Swipe the card or tap the buttons',
  deckLabel: 'Swipe deck. Use the left and right arrow keys to swipe.',
  passLabel: 'Not my type',
  likeLabel: 'Let’s connect',
  deck: [
    {
      id: 'main',
      kind: 'photo',
      label: 'Vimmie, 22 · Bhopal',
      text: 'Looking for a designer who can turn complicated problems into simple experiences?',
    },
    { id: 'spacing', tone: 'ink', label: 'On second thought', text: 'Not your type? Fair. But have you seen my spacing?' },
    {
      id: 'onboarding',
      tone: 'electric',
      label: 'Counter-offer',
      text: 'I’ll redesign your onboarding flow and remember your launch dates. Reconsider?',
    },
    { id: 'docs', tone: 'tint', label: 'Hmm', text: 'Swiping left on a designer who documents her components? Bold move.' },
    {
      id: 'last',
      tone: 'paper',
      label: 'Last card, promise',
      text: 'I’m better at responding to design briefs than texts. Just saying.',
    },
  ],
  empty: {
    title: 'You’ve run out of cards.',
    text: 'That’s never happened to me before.',
    action: 'Shuffle the deck',
  },
  matched: {
    title: 'Matched.',
    text: 'Your move. Pick a channel and say hi.',
    reopen: 'Open the match',
    again: 'Swipe again',
  },
  modal: {
    title: 'It’s a match!',
    lead: 'Looks like we have great design chemistry.',
    sub: 'Now that we’ve matched, let’s make something meaningful together.',
    cta: 'Let’s talk',
    later: 'Keep browsing',
    likedNone: 'You swiped right without liking a single thing. Mysterious. I respect it.',
  },
  prompt: {
    id: 'prompt:first-date',
    question: 'My ideal first date',
    answer: 'A challenging design problem and a really good brainstorming session.',
    likeLabel: 'my ideal first date',
  },
};

/** LET'S STAY CONNECTED: the dark footer. Link URLs come from `links` above. */
export const footer = {
  label: 'Let’s stay connected',
  titleStart: 'Liked what you saw? ',
  titleEmphasis: 'Don’t leave me on read.',
  closing: 'Not every connection needs an algorithm. Sometimes it just needs good design.',
  chat: {
    typing: 'Vimmie is typing',
    message: 'Hey, it’s Vimmie. My inbox is open. Your move.',
    status: 'Read just now',
  },
  links: [
    { key: 'linkedin', meta: 'Work stuff' },
    { key: 'instagram', meta: 'Design lab' },
    { key: 'behance', meta: 'Case studies' },
    { key: 'email', meta: 'Say hi' },
    { key: 'resume', meta: 'View or download PDF' },
  ],
  backToTop: 'Play again',
};

/** Small lines of UI copy. */
export const microcopy = {
  liked: [
    'Liked. I’ll bring it up when we match.',
    'Noted. That one goes on the match screen.',
    'Good taste. Keep going.',
  ],
  unliked: 'Like taken back. Bold strategy.',
  profileLiked: 'Like sent. Keep scrolling, I get better.',
  passes: [
    'Passing on page one? At least see my work first.',
    'Still no? My Figma files are extremely organised.',
    'Fair. There’s a proper swipe deck further down. Reject me there.',
  ],
  resumeMissing: 'My resume’s getting one last kerning pass. Back soon.',
  likesEmpty: 'Nothing yet. Playing hard to get?',
  likesFooter: 'Everything you like shows up when we match.',
  sendALike: 'Send a like',
  likedHint: 'Liked',
  flagLiked: '{name}? Green flag noted.',
  toyHint: 'Drag it. Throw it. Tap an interest to like it.',
  toyHintTouch: 'Tap an interest to like it. Tap a tool to make it hop.',
  tidied: 'Ahh. Much better. I feel calmer already.',
  caseStudyMissing: '{name}’s case study is still being written up. Ask me about it when we match.',
  linkMissing: 'My {name} is getting a glow-up. Back very soon.',
  recapEmpty: 'None yet. Scroll up and heart something. I’ll wait.',
  recapNote: 'They’ll show up on the match screen.',
};
