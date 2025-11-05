import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  allowHalf?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'accent' | 'warning';
  showValue?: boolean;
  containerStyle?: ViewStyle;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  size = 'medium',
  color = 'warning',
  showValue = false,
  containerStyle,
}) => {
  const theme = useTheme();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleStarPress = (index: number, isHalf: boolean = false) => {
    if (readOnly || !onChange) return;

    const newValue = isHalf && allowHalf ? index + 0.5 : index + 1;
    onChange(newValue);
  };

  const getStarType = (index: number): 'full' | 'half' | 'empty' => {
    const displayValue = hoveredStar !== null ? hoveredStar : value;

    if (displayValue >= index + 1) return 'full';
    if (allowHalf && displayValue >= index + 0.5) return 'half';
    return 'empty';
  };

  const starSize = getStarSize(size);
  const starColor = getColorValue(color, theme);

  return (
    <Container style={containerStyle}>
      <StarsContainer>
        {Array.from({ length: max }, (_, index) => (
          <Star key={index} readOnly={readOnly}>
            <StarTouchable
              onPress={() => handleStarPress(index, false)}
              disabled={readOnly}
              activeOpacity={0.7}
            >
              <AnimatedStar index={index} size={starSize}>
                <Ionicons
                  name={getIconName(getStarType(index))}
                  size={starSize}
                  color={getStarType(index) !== 'empty' ? starColor : theme.colors.border}
                />
              </AnimatedStar>
            </StarTouchable>

            {allowHalf && !readOnly && (
              <HalfStarOverlay
                onPress={() => handleStarPress(index, true)}
                activeOpacity={1}
              />
            )}
          </Star>
        ))}
      </StarsContainer>

      {showValue && (
        <ValueContainer>
          <ValueText size={size}>
            {value.toFixed(allowHalf ? 1 : 0)} / {max}
          </ValueText>
        </ValueContainer>
      )}
    </Container>
  );
};

const getIconName = (type: 'full' | 'half' | 'empty'): 'star' | 'star-half' | 'star-outline' => {
  if (type === 'full') return 'star';
  if (type === 'half') return 'star-half';
  return 'star-outline';
};

const getStarSize = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 20, medium: 28, large: 36 };
  return sizes[size];
};

const getColorValue = (color: 'primary' | 'secondary' | 'accent' | 'warning', theme: any): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
    warning: theme.colors.accent, // Using accent for warning/star color
  };
  return colors[color];
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StarsContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Star = styled.View<{ readOnly: boolean }>`
  position: relative;
  opacity: ${({ readOnly }) => (readOnly ? 0.8 : 1)};
`;

const StarTouchable = styled.TouchableOpacity``;

const AnimatedStar = styled(Animated.View)<{ index: number; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const HalfStarOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
`;

const ValueContainer = styled.View`
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const ValueText = styled.Text<{ size: 'small' | 'medium' | 'large' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ size, theme }) => {
    if (size === 'small') return theme.typography.fontSize.sm;
    if (size === 'large') return theme.typography.fontSize.lg;
    return theme.typography.fontSize.md;
  }}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
