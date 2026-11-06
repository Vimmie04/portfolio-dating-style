import { RoleScreen, WelcomeScreen } from './Onboarding.jsx';
import { HomeScreen, SubmitScreen, TaskDetailScreen, TasksScreen } from './Work.jsx';
import { ApprovalsScreen, InReviewScreen, RecognisedScreen } from './Review.jsx';
import { CertificateScreen, ProfileScreen, WinsScreen } from './Recognition.jsx';

/** Every redesigned screen, in story order. `who` is whose phone it is. */
export const SCREENS = {
  welcome: { Component: WelcomeScreen, title: 'Welcome', who: 'Riya', caption: 'Leads with the promise, shown with real product moments instead of a three-slide carousel.' },
  role: { Component: RoleScreen, title: 'Pick your role', who: 'Riya', caption: 'Role and sign-in on one screen. LinkedIn comes first, because that’s where certificates end up.' },
  home: { Component: HomeScreen, title: 'Home', who: 'Riya', caption: 'One statement, one progress card and the one task that matters next. Everything else is a tap away.' },
  tasks: { Component: TasksScreen, title: 'Tasks', who: 'Riya', caption: 'One switch for status, grouped by when it’s due. Every card shows three things: title, due date, XP.' },
  task: { Component: TaskDetailScreen, title: 'Task detail', who: 'Riya', caption: 'Due, reward and teammate at a glance; brief, checklist and files below, so nothing gets lost in a chat thread.' },
  submit: { Component: SubmitScreen, title: 'Submit work', who: 'Riya', caption: 'One sheet: your file, a note for the reviewer, send.' },
  review: { Component: InReviewScreen, title: 'In review', who: 'Riya', caption: 'Waiting becomes visible: seen, expected by when, and a polite nudge if it slips.' },
  approvals: { Component: ApprovalsScreen, title: 'Reviews', who: 'Neha', caption: 'New: the team lead’s side. Approve, give quick feedback and send kudos from one card.' },
  approved: { Component: RecognisedScreen, title: 'Recognised', who: 'Riya', caption: 'Green appears once, here. XP plus the reviewer’s actual words.' },
  certificate: { Component: CertificateScreen, title: 'Certificate', who: 'Riya', caption: 'Designed like a real certificate: signed by Neha, sealed with the milestone medal, with a date and a verifiable ID.' },
  wins: { Component: WinsScreen, title: 'Wins', who: 'Riya', caption: 'Your week first. The team board resets weekly, so nobody is stuck at the bottom.' },
  profile: { Component: ProfileScreen, title: 'Profile', who: 'Riya', caption: 'A wall of wins: illustrated badges in four tiers, and certificates that prove real work.' },
};

export const SCREEN_ORDER = Object.keys(SCREENS);
