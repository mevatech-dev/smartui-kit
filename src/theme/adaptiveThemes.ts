import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export const adaptiveThemes = {
  light: lightTheme,
  dark: darkTheme,
  vibrant: {
    ...lightTheme,
    name: 'vibrant',
    colors: {
      ...lightTheme.colors,
      primary: '#F97316',
      accent: '#E11D48',
      background: '#FFF7ED',
    },
  },
  calm: {
    ...darkTheme,
    name: 'calm',
    colors: {
      ...darkTheme.colors,
      primary: '#3B82F6',
      accent: '#6366F1',
      textPrimary: '#CBD5E1',
    },
  },
};
export type AdaptiveMode = keyof typeof adaptiveThemes;
