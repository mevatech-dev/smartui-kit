import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';

export const AnimatedGradientBackground: React.FC<{ variant?: 'background'|'orange'|'success'|'error'; isDark?: boolean; children?: React.ReactNode; }>
= ({ variant='background', isDark=false, children }) => {
  const theme = useTheme() as any;
  const colors = theme.colors.gradients[variant];
  return (
    <LinearGradient colors={colors} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{ flex:1, padding:16 }}>
      {children}
    </LinearGradient>
  );
};
