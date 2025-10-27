import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';
import { ResponsiveProvider } from '@/providers/ResponsiveProvider';
import { Container } from '@/components/layout/Container';
import { AdaptiveCard } from '../components/adaptive/AdaptiveCard';

export default function AdaptiveDemoScreen() {
  const { theme } = useThemeStore();
  return (
    <ResponsiveProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <AdaptiveCard title="Adaptive Layout" subtitle="Changes with screen size" />
        </Container>
      </ThemeProvider>
    </ResponsiveProvider>
  );
}
