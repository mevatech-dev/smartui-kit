import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemeStore } from '@/store/ThemeStore';
type SmartButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
};

export default function SmartButton({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
}: SmartButtonProps) {
  const { theme } = useThemeStore();

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
      ? theme.colors.surface
      : 'transparent';

  const borderColor =
    variant === 'outline' ? theme.colors.primary : 'transparent';

  const textColor =
    variant === 'secondary'
      ? theme.colors.textPrimary
      : variant === 'outline'
      ? theme.colors.primary
      : '#fff';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        { backgroundColor, borderColor },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          { color: textColor, fontFamily: theme.typography.fontFamily.bold },
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});
