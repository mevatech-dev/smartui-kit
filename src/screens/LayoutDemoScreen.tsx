import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';
import { Container } from '@/components/layout/Container';
import { ThemedCard } from '@/components/ui/ThemedCard';

export default function LayoutDemoScreen() {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ThemedCard title="Lessons" subtitle="24/50" />
        <ThemedCard title="XP Points" subtitle="720" />
      </Container>
    </ThemeProvider>
  );
}
