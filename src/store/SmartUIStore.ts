import { create } from 'zustand';
import { adaptiveThemes } from '@/theme/adaptiveThemes';

type ThemeMode = keyof typeof adaptiveThemes;
type MotionLevel = 'full' | 'reduced';
type Mood = 'focus' | 'relax' | 'night';

interface SmartUIState {
  themeMode: ThemeMode;
  motionLevel: MotionLevel;
  userMood: Mood;
  interactionCount: number;
  incrementInteraction: () => void;
  adaptTheme: () => void;
}

export const useSmartUIStore = create<SmartUIState>((set, get) => ({
  themeMode: 'light',
  motionLevel: 'full',
  userMood: 'focus',
  interactionCount: 0,

  incrementInteraction: () => {
    const count = get().interactionCount + 1;
    set({ interactionCount: count });
    if (count % 5 === 0) get().adaptTheme();
  },

  adaptTheme: () => {
    const hour = new Date().getHours();
    let nextMode: ThemeMode = 'light';
    let mood: Mood = 'focus';

    if (hour >= 20 || hour < 6) { nextMode = 'calm'; mood = 'night'; }
    else if (hour >= 12 && hour < 18) { nextMode = 'vibrant'; mood = 'focus'; }
    else { nextMode = 'light'; mood = 'relax'; }

    const motionLevel: MotionLevel = get().interactionCount > 30 ? 'reduced' : 'full';
    set({ themeMode: nextMode, userMood: mood, motionLevel });
  },
}));
