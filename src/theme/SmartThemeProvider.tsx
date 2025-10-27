import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from '@/store/ThemeStore';

interface Props {
  children: ReactNode;
}

export const SmartThemeProvider = ({ children }: Props) => {
  const { theme } = useThemeStore();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const useTheme = useThemeStore;
export const useSmartTheme = useThemeStore;
