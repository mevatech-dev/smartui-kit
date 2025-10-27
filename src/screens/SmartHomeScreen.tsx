import React from 'react';
import { SmartThemeProvider } from '@/providers/SmartThemeProvider';
import { useSmartUIStore } from '@/store/SmartUIStore';
import { Container } from '@/components/layout/Container';
import { ThemedCard } from '@/components/ui/ThemedCard';
import { AnimatedButton } from '@/components/motion/AnimatedButton';

export default function SmartHomeScreen() {
  const { incrementInteraction, themeMode, userMood, motionLevel } = useSmartUIStore();
  return (
    <SmartThemeProvider>
      <Container>
        <ThemedCard title="AI Adaptive UI" subtitle={`Mode: ${themeMode.toUpperCase()} | Mood: ${userMood}`} />
        <ThemedCard subtitle={`Motion Level: ${motionLevel}`} />
        <AnimatedButton title="Interact with me 👆" variant="accent" fullWidth onPress={incrementInteraction} />
      </Container>
    </SmartThemeProvider>
  );
}
