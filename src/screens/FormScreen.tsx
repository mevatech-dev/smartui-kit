import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';
import { Container } from '@/components/layout/Container';
import { ThemedCard } from '@/components/ui/ThemedCard';
import { AnimatedButton } from '@/components/motion/AnimatedButton';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function FormScreen() {
  const { theme } = useThemeStore();
  const [progress, setProgress] = useState(0.4);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ThemedCard title="Form Elements" subtitle="Progress sample">
          <ProgressBar progress={progress} />
        </ThemedCard>
        <AnimatedButton title="Increase" variant="success" onPress={() => setProgress(p => Math.min(1, p+0.1))} />
      </Container>
    </ThemeProvider>
  );
}
