import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressProps {
  value: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  showLabel?: boolean;
  indeterminate?: boolean;
  containerStyle?: ViewStyle;
}

interface CircularProgressProps extends ProgressProps {
  thickness?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'medium',
  color = 'primary',
  showLabel = false,
  indeterminate = false,
  containerStyle,
}) => {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!indeterminate) {
      progress.value = withSpring(Math.max(0, Math.min(100, value)), {
        damping: 15,
        stiffness: 100,
      });
    }
  }, [value, indeterminate]);

  const progressColor = getColorValue(color, theme);
  const height = getHeight(size);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <Container style={containerStyle}>
      <TrackContainer height={height}>
        <Track height={height} />
        <AnimatedProgressBar
          style={animatedStyle}
          as={ProgressBar}
          height={height}
          color={progressColor}
          indeterminate={indeterminate}
        />
      </TrackContainer>
      {showLabel && !indeterminate && (
        <LabelContainer>
          <LabelText>{Math.round(value)}%</LabelText>
        </LabelContainer>
      )}
    </Container>
  );
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 'medium',
  color = 'primary',
  showLabel = false,
  thickness = 4,
  indeterminate = false,
  containerStyle,
}) => {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!indeterminate) {
      progress.value = withTiming(Math.max(0, Math.min(100, value)), {
        duration: 500,
      });
    }
  }, [value, indeterminate]);

  const progressColor = getColorValue(color, theme);
  const circleSize = getCircleSize(size);
  const radius = (circleSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (progress.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <CircularContainer size={circleSize} style={containerStyle}>
      <Svg width={circleSize} height={circleSize}>
        {/* Background circle */}
        <Circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke={theme.colors.border}
          strokeWidth={thickness}
          fill="none"
        />
        {/* Progress circle */}
        <AnimatedCircle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${circleSize / 2}, ${circleSize / 2}`}
        />
      </Svg>
      {showLabel && !indeterminate && (
        <CircularLabel>
          <CircularLabelText size={size}>{Math.round(value)}%</CircularLabelText>
        </CircularLabel>
      )}
    </CircularContainer>
  );
};

const getColorValue = (
  color: 'primary' | 'secondary' | 'success' | 'error' | 'accent',
  theme: any
): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    error: theme.colors.error,
    accent: theme.colors.accent,
  };
  return colors[color];
};

const getHeight = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 4, medium: 6, large: 8 };
  return sizes[size];
};

const getCircleSize = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 40, medium: 60, large: 80 };
  return sizes[size];
};

const Container = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const TrackContainer = styled.View<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  position: relative;
  overflow: hidden;
  border-radius: ${({ height }) => height / 2}px;
`;

const Track = styled.View<{ height: number }>`
  position: absolute;
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ height }) => height / 2}px;
`;

const ProgressBar = styled.View<{ height: number; color: string; indeterminate?: boolean }>`
  position: absolute;
  height: ${({ height }) => height}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ height }) => height / 2}px;
`;

const AnimatedProgressBar = styled(Animated.View)``;

const LabelContainer = styled.View`
  align-items: flex-end;
`;

const LabelText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CircularContainer = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const CircularLabel = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const CircularLabelText = styled.Text<{ size: 'small' | 'medium' | 'large' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ size, theme }) => {
    if (size === 'small') return theme.typography.fontSize.xs;
    if (size === 'large') return theme.typography.fontSize.lg;
    return theme.typography.fontSize.sm;
  }}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
