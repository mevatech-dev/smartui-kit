import React from 'react';
import styled from 'styled-components/native';
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
          color={getIconColor(variant, color, disabled)}
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

const getButtonSize = (size: string): number => {
  const sizes = { small: 32, medium: 40, large: 48 };
  return sizes[size] || sizes.medium;
};

const getIconSize = (size: string): number => {
  const sizes = { small: 18, medium: 22, large: 26 };
  return sizes[size] || sizes.medium;
};

const getColorValue = (color: string): string => {
  const colors = {
    primary: '#4BB4FF',
    secondary: '#B3E5FC',
    success: '#5DD39E',
    error: '#FF6B6B',
    accent: '#FFB84C',
    neutral: '#707E93',
  };
  return colors[color] || colors.primary;
};

const getIconColor = (variant: string, color: string, disabled?: boolean): string => {
  if (disabled) return '#94A3B8';

  if (variant === 'filled') return '#ffffff';
  if (variant === 'outlined' || variant === 'ghost') return getColorValue(color);

  return '#3C4A59';
};

const getBackgroundColor = (variant: string, color: string): string => {
  if (variant === 'filled') return getColorValue(color);
  if (variant === 'outlined') return 'transparent';
  if (variant === 'ghost') return 'transparent';

  return '#F6F7FB';
};

const getBorderRadius = (shape: string, size: number): number => {
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
  background-color: ${({ variant, color }) => getBackgroundColor(variant, color)};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ color }) => getColorValue(color)};
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
  background-color: #ff6b6b;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-width: 2px;
  border-color: #ffffff;
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: 10px;
  color: #ffffff;
`;
