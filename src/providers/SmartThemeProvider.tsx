import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { adaptiveThemes } from '@/theme/adaptiveThemes';
import { useSmartUIStore } from '@/store/SmartUIStore';
import { AdaptiveStatusBar } from '@/providers/StatusBar';
import { AnimatedGradientBackground } from '@/components/visuals/AnimatedGradientBackground';
import * as Haptics from 'expo-haptics';

export const SmartThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { themeMode, motionLevel, adaptTheme } = useSmartUIStore();
  const theme = adaptiveThemes[themeMode];

  useEffect(() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }, [themeMode]);
  useEffect(() => { const i = setInterval(adaptTheme, 10000); return () => clearInterval(i); }, []);

  return (
    <ThemeProvider theme={{ ...theme, motionLevel }}>
      <AdaptiveStatusBar />
      <AnimatedGradientBackground isDark={themeMode === 'dark' || themeMode === 'calm'}>
        {children}
      </AnimatedGradientBackground>
    </ThemeProvider>
  );
};
