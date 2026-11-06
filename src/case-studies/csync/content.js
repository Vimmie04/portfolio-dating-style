/**
 * CSync case study: all the words on the page live here.
 * Sources: Vimla's own account, her Behance case study, and the public launch and demo videos.
 * Under NDA: only what was shown publicly (launch video, demo video, selected screens) is used.
 */
export const csync = {
  slug: 'csync',
  pageTitle: 'CSync case study · Vimla Issar',
  kind: 'CS firm platform',
  badge: 'Shipped product',
  title: 'Taking a CS firm’s deadlines out of Excel and WhatsApp.',
  subtitle:
    'CSync is a SaaS platform by Intellosoft Infotech that brings a Company Secretary firm’s tasks, deadlines, compliance and client records into one workspace. I designed it as an intern, and as its first and only designer.',
  facts: [
    ['Role', 'Design intern · sole designer'],
    ['Company', 'Intellosoft Infotech'],
    ['Platform', 'Web app (SaaS)'],
    ['Scope', 'Product, brand, marketing'],
  ],
  behance: 'https://www.behance.net/gallery/251379939/CSync-CS-Firm-Management-Platform',

  // Featured right after the hero. Plays in place; YouTube only loads on play.
  demo: {
    id: 'BMFFPC9LEzY',
    length: '2:09',
    title: 'See CSync in action',
    text: 'A walkthrough of the shipped product, made for its launch. Product demo videos were part of my role alongside the product design.',
    note: 'The video, CSync and the designs shown are the property of Intellosoft Infotech Private Limited. Shown for portfolio purposes only.',
  },
  launchVideo: { id: 'VkoeaxTwJi8', length: '0:33' }, // used in the marketing section

  summary: [
    {
      label: 'The problem',
      text: 'CS firms track deadlines for many client companies at once, mostly in spreadsheets, WhatsApp and their own reminders. Records get scattered and dates slip.',
    },
    {
      label: 'What I designed',
      text: 'One workspace for a firm’s tasks, deadlines and compliance records. I focused on the journeys that carry the deadlines: the CS Calendar and the Compliance Planner.',
    },
    {
      label: 'My role',
      text: 'First and only designer, as an intern: the product, the brand from scratch, and the launch creatives and videos, through to the shipped product.',
    },
  ],

  // Grows as sections are added
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Key modules' },
    { id: 'brand', label: 'Brand' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'reflection', label: 'Reflection' },
  ],

  overview: {
    title: 'Compliance, still run by hand',
    text: [
      'Company Secretary (CS) firms look after the legal and compliance work of many companies at once: annual returns, board meetings, director KYC and MCA forms, each with its own deadline.',
      'Software made for CS firms is still an emerging category, so much of this work lived in scattered documents, spreadsheets and manual reminders. CSync set out to digitise those processes and give each firm one structured place for its company records.',
    ],
    did: ['UX design', 'UI design', 'Information architecture', 'Wireframes & prototypes', 'Design system', 'Brand identity & logo', 'Marketing creatives', 'Demo & promo videos', 'Developer handoff'],
    stat: {
      value: '11,500+',
      text: 'practising Company Secretaries in India.',
      source: 'ICSI, 2025',
      href: 'https://www.icsi.edu/media/webmodules/26_NCPCS_Souvenir.pdf',
    },
    oldWay: { title: 'The old way', items: ['Tasks tracked in Excel', 'Updates chased on WhatsApp', 'Deadlines still missed'], source: 'CSync launch video' },
    audience: { title: 'Who it’s for', items: ['Company Secretary firms', 'Compliance teams', 'Managers and team leads', 'Employees and associates'] },
  },

  // Choices confirmed by Vimla; each paired with the UX principle behind it.
  // Marker positions are in the screen's 1536 × 736 coordinates.
  modules: {
    title: 'Two modules where deadlines live',
    lede: 'I designed most of CSync’s everyday journeys. These two carry the deadlines, so they got the most care. Both are shown exactly as shipped, with the UX principle behind each choice.',
    process: {
      title: 'How I worked',
      steps: [
        { name: 'Research', text: 'User research and competitor analysis, alongside the brand identity.' },
        { name: 'Design', text: 'Wireframes for the key journeys, then the UI.' },
        { name: 'Prototype & test', text: 'Clickable prototypes, tested, with feedback folded back in.' },
        { name: 'Refine & hand off', text: 'Final revisions and documentation, then building it with the developers.' },
      ],
    },
    calendar: {
      label: 'Module 1',
      name: 'CS Calendar',
      job: 'Helps a firm manage its important dates, deadlines and reminders in one month view.',
      notes: [
        {
          title: 'One month, three layers',
          text: 'Memos, invoices and tasks share one view: teal for memos and invoices, violet for tasks. Toggles with counts show or hide each layer.',
          law: 'Law of Similarity',
          why: 'Things that look alike are read as one group, so each layer is clear at a glance.',
          at: [918, 172],
        },
        {
          title: 'Details without leaving the month',
          text: 'Clicking a day fills the Deadlines panel with priority, status and who it’s assigned to.',
          law: 'Recognition over recall',
          why: 'The month stays in view, so nobody has to remember where they were after opening a day.',
          at: [1172, 150],
        },
        {
          title: 'Busy days stay tidy',
          text: '“+1 more” keeps busy days the same size as quiet ones.',
          law: 'Jakob’s Law',
          why: 'It’s the pattern people already know from Google and Outlook calendars, so it needs no explaining.',
          at: [640, 714],
        },
        {
          title: 'Today vs. selected',
          text: 'Today is a filled circle; the selected day gets an outline.',
          law: 'Von Restorff effect',
          why: 'What looks different gets noticed, so the two days that matter never blend into the grid.',
          at: [1132, 622],
        },
      ],
    },
    planner: {
      label: 'Module 2',
      name: 'Compliance Planner',
      job: 'Tracks the compliance requirements and documents for every company a firm has onboarded.',
      notes: [
        {
          title: 'Who’s behind, at a glance',
          text: 'Each company shows a progress bar and an “x left” badge.',
          law: 'Goal-gradient effect',
          why: 'People push harder as a goal gets close. Showing what’s left makes the finish line visible.',
          at: [296, 226],
        },
        {
          title: 'Filters with counts',
          text: 'All, Pending and Filed, with how many forms are in each.',
          law: 'Hick’s Law',
          why: 'Fewer items to scan means faster decisions, and the counts say what’s behind each filter before a click.',
          at: [706, 120],
        },
        {
          title: 'Action first',
          text: '“Sort: Not Filed First” puts the forms that need work on top.',
          law: 'Serial position effect',
          why: 'The first items in a list get the most attention, so that’s where pending forms go.',
          at: [1398, 182],
        },
        {
          title: 'One colour language',
          text: 'Amber means pending and green means filed, on badges, bars, counts and status pills.',
          law: 'Consistency and standards',
          why: 'One meaning per colour across the planner, so status reads the same everywhere.',
          at: [886, 646],
        },
      ],
    },
  },

  brand: {
    title: 'A brand built from scratch',
    lede: 'CSync had no identity yet, so I designed it: a clean, workflow-focused logo, a modern SaaS palette led by one indigo-purple, and type chosen to stay professional and easy to read.',
    logo: {
      title: 'Logo',
      text: 'A clean, workflow-focused mark with the CSync wordmark. The submark stands on its own where space is tight.',
    },
    colors: [
      { name: 'Indigo Purple', hex: '#6041E8', note: 'Primary: the brand, buttons, highlights', contrast: '6.1:1' },
      { name: 'Near black', hex: '#181718', note: 'Text and dark surfaces', contrast: '17.9:1' },
      { name: 'Light grey', hex: '#F1F1F1', note: 'Light backgrounds', light: true },
    ],
    type: [
      { family: 'Inter', role: 'Brand typeface', sample: 'Compliance, deadlines and records in one place.' },
      { family: 'Plus Jakarta Sans', role: 'Product UI, as shipped', sample: 'Annual Return Filing · 25 Apr 2026' },
    ],
  },

  // Images cropped from Vimla's Behance slides (with her OK); videos from the CSync YouTube channel.
  // The carousel was not a launch post, and she asked not to link the Instagram account.
  marketing: {
    title: 'Launching it',
    lede: 'Beyond the product, I designed CSync’s marketing: social media creatives, a launch video, the demo you saw at the top, and the website’s pricing page.',
    carousel: {
      label: 'Instagram · carousel',
      title: 'One story across five posts',
      text: 'The carousel walks a CS firm from the pain to the fix, with one illustration flowing across the posts so it reads as a single swipe.',
      arc: ['Hook', 'Problem', 'Impact', 'Fix', 'Call to action'],
      alt: 'Five-post Instagram carousel. 1: “Most CS firms are dying.” 2: “Tasks in WhatsApp. Deadlines in Excel. Ownership unclear. Things slip.” 3: “Seniors chase updates. Approvals get stuck. Clients feel the delay.” 4: “A CS firm needs: one system, one workflow, full visibility.” 5: “DM us DEMO for a quick walkthrough.”',
    },
    launch: {
      label: 'Launch video · 0:33',
      title: 'A teaser that opens on the problem',
      text: 'Short and to the point: tasks in Excel, updates chased on WhatsApp, deadlines still missed. Then CSync.',
      poster: ['Managing Tasks in Excel', 'Chasing Updates on WhatsApp', 'Still Missing Deadlines??'],
    },
    pricing: {
      label: 'Website · pricing',
      title: 'Pricing that reassures',
      text: 'Three plans with Premium highlighted, and the answers people look for before trying a new tool: a 15-day free trial, a money-back guarantee and 24/7 support.',
      law: 'Social proof',
      why: 'A “Most Popular” label shows what others choose, which makes the decision feel safer.',
      alt: 'CSync pricing page: Free (₹0 for 15 days), Premium (₹1,600 a month, marked Most Popular) and Enterprise (custom), with a 15-day free trial, 100% money-back guarantee and 24/7 support.',
    },
    note: 'The creatives, videos and pricing page are the property of Intellosoft Infotech Private Limited. Shown for portfolio purposes only.',
  },

  // Vimla's own words (2026-11-06), unedited apart from typography.
  reflection: {
    title: 'What CSync taught me',
    opening: 'CSync taught me that designing a SaaS product is as much about understanding how an industry works as it is about designing the product itself.',
    learnedIntro: 'I learned to',
    learned: ['navigate unfamiliar domains', 'simplify complex workflows', 'collaborate with developers', 'take ownership of a product beyond the interface'],
    closing: 'Most importantly, I learned that good design doesn’t just digitise an existing process; it makes that process better.',
  },

  next: { label: 'Next profile', title: 'Cognify', text: 'A calm everyday companion for young adults with dyslexia.', to: '/work/cognify' },
};
