import { create } from 'zustand';
import { lightTheme, darkTheme } from '../theme';

interface ThemeState {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {
    const next = !get().isDark;
    set({ isDark: next, theme: next ? darkTheme : lightTheme });
  },
}));

export const useSmartTheme = useThemeStore;
