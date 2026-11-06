import { WelcomeScreen } from './Welcome.jsx';
import { SetPaceScreen } from './SetPace.jsx';
import { TodayScreen } from './Today.jsx';
import { TasksScreen } from './Tasks.jsx';
import { PlanTomorrowScreen } from './PlanTomorrow.jsx';
import { BreakItDownScreen } from './BreakItDown.jsx';
import { OneStepScreen } from './OneStep.jsx';
import { SmallWinScreen } from './SmallWin.jsx';
import { RoutinesScreen } from './Routines.jsx';
import { AskCogniScreen } from './AskCogni.jsx';
import { SimplerAnswerScreen } from './SimplerAnswer.jsx';
import { MeScreen } from './Me.jsx';

/** Every Cognify screen, in story order. Ids match the screens' nav() targets. */
export const SCREENS = {
  welcome: { title: 'Welcome', caption: 'Cogni says hello, with one promise and one way in.', Component: WelcomeScreen },
  pace: { title: 'Set your pace', caption: 'Pick 1, 3 or 5 small wins a day, and turn on reading help.', Component: SetPaceScreen },
  today: { title: 'Today', caption: 'One question answered: what’s the next small thing?', Component: TodayScreen },
  tasks: { title: 'Tasks', caption: 'The day in three parts. Every status is an icon and a word.', Component: TasksScreen },
  plan: { title: 'Plan tomorrow', caption: 'Pick up to three things the evening before, with Cogni’s tips.', Component: PlanTomorrowScreen },
  breakdown: { title: 'Break it down', caption: 'Cogni turns a task into small steps, each with a time in plain words.', Component: BreakItDownScreen },
  step: { title: 'One step at a time', caption: 'Only the current step, and time spent instead of a countdown.', Component: OneStepScreen },
  win: { title: 'Small win', caption: 'A calm celebration. “Take a break” is as big as “Keep going”.', Component: SmallWinScreen },
  routines: { title: 'Routines', caption: 'The same few steps on repeat, so there’s less to remember.', Component: RoutinesScreen },
  cogni: { title: 'Ask Cogni', caption: 'Help from any screen: voice first, and aware of what you’re looking at.', Component: AskCogniScreen },
  answer: { title: 'A simpler answer', caption: 'Dense text in three short chunks, and one tap to make it a task.', Component: SimplerAnswerScreen },
  me: { title: 'Me', caption: 'A streak that rest days keep safe, a chosen challenge and badges.', Component: MeScreen },
};

export const SCREEN_ORDER = Object.keys(SCREENS);

/** The screens grouped into the four moments of the day they belong to. */
export const FLOWS = [
  { id: 'a', title: 'Getting started', text: 'A friendly hello, then one choice: how much feels right each day.', screens: ['welcome', 'pace'] },
  { id: 'b', title: 'Planning the day', text: 'Today shows the next small thing; Tasks and Plan tomorrow keep the rest calm.', screens: ['today', 'tasks', 'plan'] },
  { id: 'c', title: 'Doing a task', text: 'Big tasks become small steps, one step is on screen at a time, and each one is celebrated.', screens: ['breakdown', 'step', 'win'] },
  { id: 'd', title: 'Help and habits', text: 'Routines take memory load off, Cogni helps from anywhere, and Me shows progress without pressure.', screens: ['routines', 'cogni', 'answer', 'me'] },
];
