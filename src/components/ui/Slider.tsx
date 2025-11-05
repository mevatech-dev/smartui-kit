import React, { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { PanResponder, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  containerStyle?: ViewStyle;
}

interface RangeSliderProps {
  minValue?: number;
  maxValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (minValue: number, maxValue: number) => void;
  onSlidingComplete?: (minValue: number, maxValue: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  containerStyle?: ViewStyle;
}

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  disabled = false,
  showValue = false,
  color = 'primary',
  containerStyle,
}) => {
  const theme = useTheme();
  const [sliderValue, setSliderValue] = useState(value);
  const [sliderWidth, setSliderWidth] = useState(0);
  const scale = useSharedValue(1);

  // Sync internal state with value prop
  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const normalizeValue = (val: number): number => {
    const rounded = Math.round(val / step) * step;
    return Math.max(min, Math.min(max, rounded));
  };

  const valueToPosition = (val: number): number => {
    return ((val - min) / (max - min)) * sliderWidth;
  };

  const positionToValue = (pos: number): number => {
    const percentage = pos / sliderWidth;
    const rawValue = min + percentage * (max - min);
    return normalizeValue(rawValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        const position = Math.max(0, Math.min(sliderWidth, evt.nativeEvent.locationX));
        const newValue = positionToValue(position);
        setSliderValue(newValue);
        onValueChange?.(newValue);
        scale.value = withSpring(1.3);
      },
      onPanResponderMove: (evt) => {
        const position = Math.max(0, Math.min(sliderWidth, evt.nativeEvent.locationX));
        const newValue = positionToValue(position);
        setSliderValue(newValue);
        onValueChange?.(newValue);
      },
      onPanResponderRelease: () => {
        scale.value = withSpring(1);
        onSlidingComplete?.(sliderValue);
      },
    })
  ).current;

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const thumbColor = getColorValue(color, theme);
  const percentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <SliderContainer style={containerStyle}>
      {showValue && <ValueText>{sliderValue}</ValueText>}
      <TrackContainer
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        <Track disabled={disabled} />
        <ActiveTrack percentage={percentage} color={thumbColor} disabled={disabled} />
        <AnimatedThumb
          style={[thumbAnimatedStyle, { left: `${percentage}%` }]}
          as={Thumb}
          color={thumbColor}
          disabled={disabled}
        />
      </TrackContainer>
    </SliderContainer>
  );
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  minValue = 0,
  maxValue = 100,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onSlidingComplete,
  disabled = false,
  showValue = false,
  color = 'primary',
  containerStyle,
}) => {
  const theme = useTheme();
  const [sliderMinValue, setSliderMinValue] = useState(minValue);
  const [sliderMaxValue, setSliderMaxValue] = useState(maxValue);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const minScale = useSharedValue(1);
  const maxScale = useSharedValue(1);

  // Sync internal state with value props
  useEffect(() => {
    setSliderMinValue(minValue);
  }, [minValue]);

  useEffect(() => {
    setSliderMaxValue(maxValue);
  }, [maxValue]);

  const normalizeValue = (val: number): number => {
    const rounded = Math.round(val / step) * step;
    return Math.max(min, Math.min(max, rounded));
  };

  const valueToPosition = (val: number): number => {
    return ((val - min) / (max - min)) * sliderWidth;
  };

  const positionToValue = (pos: number): number => {
    const percentage = pos / sliderWidth;
    const rawValue = min + percentage * (max - min);
    return normalizeValue(rawValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        const touchPosition = evt.nativeEvent.locationX;
        const minPosition = valueToPosition(sliderMinValue);
        const maxPosition = valueToPosition(sliderMaxValue);

        const distanceToMin = Math.abs(touchPosition - minPosition);
        const distanceToMax = Math.abs(touchPosition - maxPosition);

        if (distanceToMin < distanceToMax) {
          setActiveThumb('min');
          minScale.value = withSpring(1.3);
        } else {
          setActiveThumb('max');
          maxScale.value = withSpring(1.3);
        }
      },
      onPanResponderMove: (evt) => {
        const position = Math.max(0, Math.min(sliderWidth, evt.nativeEvent.locationX));
        const newValue = positionToValue(position);

        if (activeThumb === 'min') {
          const constrainedValue = Math.min(newValue, sliderMaxValue);
          setSliderMinValue(constrainedValue);
          onValueChange?.(constrainedValue, sliderMaxValue);
        } else if (activeThumb === 'max') {
          const constrainedValue = Math.max(newValue, sliderMinValue);
          setSliderMaxValue(constrainedValue);
          onValueChange?.(sliderMinValue, constrainedValue);
        }
      },
      onPanResponderRelease: () => {
        minScale.value = withSpring(1);
        maxScale.value = withSpring(1);
        onSlidingComplete?.(sliderMinValue, sliderMaxValue);
        setActiveThumb(null);
      },
    })
  ).current;

  const minThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: minScale.value }],
  }));

  const maxThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: maxScale.value }],
  }));

  const thumbColor = getColorValue(color, theme);
  const minPercentage = ((sliderMinValue - min) / (max - min)) * 100;
  const maxPercentage = ((sliderMaxValue - min) / (max - min)) * 100;

  return (
    <SliderContainer style={containerStyle}>
      {showValue && (
        <RangeValueContainer>
          <ValueText>{sliderMinValue}</ValueText>
          <ValueText>{sliderMaxValue}</ValueText>
        </RangeValueContainer>
      )}
      <TrackContainer
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        <Track disabled={disabled} />
        <RangeActiveTrack
          minPercentage={minPercentage}
          maxPercentage={maxPercentage}
          color={thumbColor}
          disabled={disabled}
        />
        <AnimatedThumb
          style={[minThumbAnimatedStyle, { left: `${minPercentage}%` }]}
          as={Thumb}
          color={thumbColor}
          disabled={disabled}
        />
        <AnimatedThumb
          style={[maxThumbAnimatedStyle, { left: `${maxPercentage}%` }]}
          as={Thumb}
          color={thumbColor}
          disabled={disabled}
        />
      </TrackContainer>
    </SliderContainer>
  );
};

const getColorValue = (color: 'primary' | 'secondary' | 'success' | 'error' | 'accent', theme: any): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    error: theme.colors.error,
    accent: theme.colors.accent,
  };
  return colors[color];
};

const SliderContainer = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ValueText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

const RangeValueContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TrackContainer = styled.View`
  height: 40px;
  justify-content: center;
  position: relative;
`;

const Track = styled.View<{ disabled?: boolean }>`
  height: 4px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.border : theme.colors.surface};
  border-radius: 2px;
`;

const ActiveTrack = styled.View<{ percentage: number; color: string; disabled?: boolean }>`
  position: absolute;
  height: 4px;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ color, disabled, theme }) => (disabled ? theme.colors.textSecondary : color)};
  border-radius: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const RangeActiveTrack = styled.View<{
  minPercentage: number;
  maxPercentage: number;
  color: string;
  disabled?: boolean;
}>`
  position: absolute;
  height: 4px;
  left: ${({ minPercentage }) => minPercentage}%;
  width: ${({ minPercentage, maxPercentage }) => maxPercentage - minPercentage}%;
  background-color: ${({ color, disabled, theme }) => (disabled ? theme.colors.textSecondary : color)};
  border-radius: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Thumb = styled.View<{ color: string; disabled?: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ color, disabled, theme }) => (disabled ? theme.colors.textSecondary : color)};
  margin-left: -10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedThumb = styled(Animated.View)``;
