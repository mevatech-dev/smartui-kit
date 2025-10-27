import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';

export const AdaptiveStatusBar = () => {
  const theme = useTheme() as any;
  const isDark = theme?.name === 'dark' || theme?.name === 'calm';
  return <StatusBar style={isDark ? 'light' : 'dark'} animated />;
};
