import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';
import { Container } from '@/components/layout/Container';
import { ThemedCard } from '@/components/ui/ThemedCard';
import { AnimatedProgressBar } from '@/components/motion/AnimatedProgressBar';
import { AnimatedButton } from '@/components/motion/AnimatedButton';

export default function MotionDemoScreen() {
  const { theme } = useThemeStore();
  const [progress, setProgress] = useState(0.6);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ThemedCard title="Motion" subtitle="Reanimated">
          <AnimatedProgressBar progress={progress} />
        </ThemedCard>
        <AnimatedButton title="Add Progress" variant="accent" onPress={() => setProgress(p => Math.min(1, p+0.1))} />
      </Container>
    </ThemeProvider>
  );
}
