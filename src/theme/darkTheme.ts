import { lightTheme } from './lightTheme';
export const darkTheme = {
  ...lightTheme,
  name: 'dark',
  colors: {
    ...lightTheme.colors,
    background: '#0F172A',
    surface: '#1E293B',
    gradientStart: '#1E293B',
    gradientEnd: '#0F172A',
    textPrimary: '#E2E8F0',
    textSecondary: '#94A3B8',
    border: '#334155',
    shadow: 'rgba(255,255,255,0.05)',
    tabInactive: '#64748B',
    gradients: {
      background: ['#1E293B', '#0F172A'],
      orange: ['#FFB84C', '#C67C00'],
      success: ['#5DD39E', '#3C8B68'],
      error: ['#FF6B6B', '#C24A4A'],
    },
    icon: {
      default: '#B3E5FC',
      muted: '#64748B',
      active: '#4BB4FF',
      inverted: '#0F172A',
    },
  },
};
export type DarkTheme = typeof darkTheme;
