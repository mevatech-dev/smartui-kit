import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface SegmentOption {
  label: string;
  value: string;
  icon?: IoniconsName;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'pills';
  color?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  variant = 'default',
  color = 'primary',
  disabled = false,
  containerStyle,
}) => {
  const theme = useTheme();
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const activeIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (segmentWidths.length > 0 && activeIndex >= 0) {
      const offset = segmentWidths.slice(0, activeIndex).reduce((sum, width) => sum + width, 0);
      translateX.value = withSpring(offset, { damping: 20, stiffness: 300 });
      indicatorWidth.value = withSpring(segmentWidths[activeIndex], { damping: 20, stiffness: 300 });
    }
  }, [activeIndex, segmentWidths]);

  const handleSegmentLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSegmentWidths((prev) => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const handlePress = (option: SegmentOption) => {
    if (!disabled && !option.disabled && option.value !== value) {
      onChange(option.value);
    }
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
  }));

  const activeColor = getColorValue(color, theme);

  return (
    <Container variant={variant} style={containerStyle}>
      <AnimatedIndicator
        style={indicatorAnimatedStyle}
        as={Indicator}
        variant={variant}
        color={activeColor}
      />

      {options.map((option, index) => {
        const isActive = option.value === value;

        return (
          <Segment
            key={option.value}
            onPress={() => handlePress(option)}
            onLayout={(e) => handleSegmentLayout(index, e)}
            disabled={disabled || option.disabled}
            activeOpacity={0.7}
          >
            {option.icon && (
              <SegmentIcon>
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={
                    isActive
                      ? variant === 'default'
                        ? theme.colors.background
                        : activeColor
                      : theme.colors.textSecondary
                  }
                />
              </SegmentIcon>
            )}
            <SegmentText isActive={isActive} variant={variant} activeColor={activeColor}>
              {option.label}
            </SegmentText>
          </Segment>
        );
      })}
    </Container>
  );
};

const getColorValue = (color: 'primary' | 'secondary' | 'accent', theme: any): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.accent,
  };
  return colors[color];
};

const Container = styled.View<{ variant: 'default' | 'pills' }>`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ variant, theme }) =>
    variant === 'pills' ? theme.radius.full : theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.xs}px;
  position: relative;
`;

const Indicator = styled.View<{ variant: 'default' | 'pills'; color: string }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs}px;
  bottom: ${({ theme }) => theme.spacing.xs}px;
  background-color: ${({ variant, color, theme }) =>
    variant === 'default' ? color : theme.colors.background};
  border-radius: ${({ variant, theme }) =>
    variant === 'pills' ? theme.radius.full : theme.radius.sm}px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

const AnimatedIndicator = styled(Animated.View)``;

const Segment = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
  z-index: 1;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SegmentIcon = styled.View``;

const SegmentText = styled.Text<{ isActive: boolean; variant: 'default' | 'pills'; activeColor: string }>`
  font-family: ${({ isActive, theme }) =>
    isActive ? theme.typography.fontFamily.bold : theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ isActive, variant, activeColor, theme }) => {
    if (isActive) {
      return variant === 'default' ? theme.colors.background : activeColor;
    }
    return theme.colors.textSecondary;
  }};
`;
