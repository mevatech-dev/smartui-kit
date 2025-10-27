import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';
import { Container } from '@/components/layout/Container';
import { ThemedCard } from '@/components/ui/ThemedCard';
import { AnimatedButton } from '@/components/motion/AnimatedButton';

export default function HomeScreen() {
  const { theme, toggleTheme, isDark } = useThemeStore();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ThemedCard title="SmartUI" subtitle="Design System Ready" />
        <AnimatedButton title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`} variant="accent" onPress={toggleTheme} />
      </Container>
    </ThemeProvider>
  );
}
