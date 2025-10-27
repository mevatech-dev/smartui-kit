import React, { createContext, useContext } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ResponsiveContextType {
  width: number; height: number;
  isSmall: boolean; isMedium: boolean; isLarge: boolean;
  isLandscape: boolean;
  platform: 'ios' | 'android' | 'web';
  insets: { top: number; bottom: number };
}
const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

const ResponsiveContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const value: ResponsiveContextType = {
    width, height,
    isSmall: width < 380,
    isMedium: width >= 380 && width < 768,
    isLarge: width >= 768,
    isLandscape: width > height,
    platform: Platform.OS as ResponsiveContextType['platform'],
    insets: { top: insets.top, bottom: insets.bottom },
  };
  return (
    <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>
  );
};

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SafeAreaProvider>
    <ResponsiveContextProvider>{children}</ResponsiveContextProvider>
  </SafeAreaProvider>
);

export const useResponsiveContext = () => {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) throw new Error('useResponsiveContext must be used inside ResponsiveProvider');
  return ctx;
};
