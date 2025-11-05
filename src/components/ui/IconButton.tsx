import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface IconButtonProps extends TouchableOpacityProps {
  icon: IoniconsName;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled' | 'outlined' | 'ghost';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent' | 'neutral';
  shape?: 'circle' | 'rounded' | 'square';
  animated?: boolean;
  badge?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'medium',
  variant = 'default',
  color = 'primary',
  shape = 'circle',
  animated = true,
  badge,
  disabled = false,
  ...rest
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (animated) {
      scale.value = withSpring(0.9, { damping: 10 });
    }
  };

  const handlePressOut = () => {
    if (animated) {
      scale.value = withSpring(1, { damping: 10 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const buttonSize = getButtonSize(size);
  const iconSize = getIconSize(size);

  return (
    <ButtonWrapper>
      <AnimatedButton
        style={animatedStyle}
        as={ButtonContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.7}
        size={buttonSize}
        variant={variant}
        color={color}
        shape={shape}
        {...rest}
      >
        <Ionicons
          name={icon}
          size={iconSize}
          color={getIconColor(variant, color, theme, disabled)}
        />
      </AnimatedButton>

      {badge !== undefined && badge > 0 && (
        <BadgeContainer>
          <BadgeText>{badge > 99 ? '99+' : badge}</BadgeText>
        </BadgeContainer>
      )}
    </ButtonWrapper>
  );
};

const getButtonSize = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 32, medium: 40, large: 48 };
  return sizes[size];
};

const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 18, medium: 22, large: 26 };
  return sizes[size];
};

const getColorValue = (color: 'primary' | 'secondary' | 'success' | 'error' | 'accent' | 'neutral', theme: any): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    error: theme.colors.error,
    accent: theme.colors.accent,
    neutral: theme.colors.textSecondary,
  };
  return colors[color];
};

const getIconColor = (variant: 'default' | 'filled' | 'outlined' | 'ghost', color: 'primary' | 'secondary' | 'success' | 'error' | 'accent' | 'neutral', theme: any, disabled?: boolean): string => {
  if (disabled) return theme.colors.textSecondary;

  if (variant === 'filled') return theme.colors.background;
  if (variant === 'outlined' || variant === 'ghost') return getColorValue(color, theme);

  return theme.colors.textPrimary;
};

const getBackgroundColor = (variant: 'default' | 'filled' | 'outlined' | 'ghost', color: 'primary' | 'secondary' | 'success' | 'error' | 'accent' | 'neutral', theme: any): string => {
  if (variant === 'filled') return getColorValue(color, theme);
  if (variant === 'outlined') return 'transparent';
  if (variant === 'ghost') return 'transparent';

  return theme.colors.surface;
};

const getBorderRadius = (shape: 'circle' | 'rounded' | 'square', size: number): number => {
  if (shape === 'circle') return size / 2;
  if (shape === 'square') return 0;
  return 8; // rounded
};

const ButtonWrapper = styled.View`
  position: relative;
`;

const ButtonContainer = styled.TouchableOpacity<{
  size: number;
  variant: string;
  color: string;
  shape: string;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ shape, size }) => getBorderRadius(shape, size)}px;
  background-color: ${({ variant, color, theme }) => getBackgroundColor(variant as any, color as any, theme)};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ color, theme }) => getColorValue(color as any, theme)};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedButton = styled(Animated.View)``;

const BadgeContainer = styled.View`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  min-height: 18px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.background};
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.background};
`;
