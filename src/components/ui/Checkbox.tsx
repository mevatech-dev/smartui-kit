import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
}

export const Checkbox: React.FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  disabled = false,
  size = 'medium',
  color,
  labelPosition = 'right',
  containerStyle,
}) => {
  const checkAnim = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    checkAnim.value = withSpring(checked ? 1 : 0, {
      damping: 12,
      stiffness: 150,
    });
  }, [checked]);

  const animatedBoxStyle = useAnimatedStyle(() => ({
    borderColor: interpolate(checkAnim.value, [0, 1], [0, 1]) > 0.5 ? color || '#4BB4FF' : '#E0E6ED',
    backgroundColor: interpolate(checkAnim.value, [0, 1], [0, 1]) > 0.5 ? color || '#4BB4FF' : 'transparent',
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    opacity: checkAnim.value,
    transform: [{ scale: checkAnim.value }],
  }));

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const boxSize = getBoxSize(size);
  const iconSize = getIconSize(size);

  const checkboxComponent = (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <AnimatedBox style={animatedBoxStyle} size={boxSize} disabled={disabled}>
        <AnimatedCheck style={animatedCheckStyle}>
          <Ionicons name="checkmark" size={iconSize} color="#ffffff" />
        </AnimatedCheck>
      </AnimatedBox>
    </TouchableOpacity>
  );

  if (label) {
    return (
      <Container style={containerStyle}>
        {labelPosition === 'left' && <Label disabled={disabled}>{label}</Label>}
        {checkboxComponent}
        {labelPosition === 'right' && <Label disabled={disabled}>{label}</Label>}
      </Container>
    );
  }

  return checkboxComponent;
};

const getBoxSize = (size: 'small' | 'medium' | 'large') => {
  const sizes = { small: 18, medium: 24, large: 28 };
  return sizes[size];
};

const getIconSize = (size: 'small' | 'medium' | 'large') => {
  const sizes = { small: 14, medium: 18, large: 22 };
  return sizes[size];
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text<{ disabled: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.textSecondary : theme.colors.textPrimary)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedBox = styled(Animated.View)<{ size: number; disabled: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-width: 2px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedCheck = styled(Animated.View)`
  position: absolute;
`;
