import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/theme/SmartThemeProvider';
import SmartButton from '@/components/ui/SmartButton';

export default function TestScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: theme.typography.fontFamily.bold,
          color: theme.colors.textPrimary,
        }}
      >
        SmartUI Test
      </Text>

      <SmartButton title="Toggle Theme" onPress={toggleTheme} style={{ marginTop: 20 }} />
    </View>
  );
}
