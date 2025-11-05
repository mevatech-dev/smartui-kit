import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
}

export const Switch: React.FC<Props> = ({
  value,
  onValueChange,
  disabled = false,
  size = 'medium',
  activeColor,
  inactiveColor,
  label,
  labelPosition = 'right',
  containerStyle,
}) => {
  const switchAnim = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    switchAnim.value = withSpring(value ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value]);

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      switchAnim.value,
      [0, 1],
      [inactiveColor || '#E0E6ED', activeColor || '#4BB4FF']
    ),
  }));

  const animatedThumbStyle = useAnimatedStyle(() => {
    const sizes = { small: 14, medium: 22, large: 28 };
    const trackPadding = 3;
    const maxTranslate = getSwitchWidth(size) - sizes[size] - trackPadding * 2;

    return {
      transform: [{ translateX: switchAnim.value * maxTranslate }],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const switchComponent = (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <AnimatedTrack style={animatedTrackStyle} size={size} disabled={disabled}>
        <AnimatedThumb style={animatedThumbStyle} size={size} />
      </AnimatedTrack>
    </TouchableOpacity>
  );

  if (label) {
    return (
      <Container style={containerStyle}>
        {labelPosition === 'left' && <Label>{label}</Label>}
        {switchComponent}
        {labelPosition === 'right' && <Label>{label}</Label>}
      </Container>
    );
  }

  return switchComponent;
};

const getSwitchWidth = (size: 'small' | 'medium' | 'large') => {
  const widths = { small: 36, medium: 52, large: 64 };
  return widths[size];
};

const getSwitchHeight = (size: 'small' | 'medium' | 'large') => {
  const heights = { small: 20, medium: 28, large: 36 };
  return heights[size];
};

const getThumbSize = (size: 'small' | 'medium' | 'large') => {
  const sizes = { small: 14, medium: 22, large: 28 };
  return sizes[size];
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const AnimatedTrack = styled(Animated.View)<{
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}>`
  width: ${({ size }) => getSwitchWidth(size)}px;
  height: ${({ size }) => getSwitchHeight(size)}px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  padding: 3px;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedThumb = styled(Animated.View)<{
  size: 'small' | 'medium' | 'large';
}>`
  width: ${({ size }) => getThumbSize(size)}px;
  height: ${({ size }) => getThumbSize(size)}px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: ${({ theme }) => theme.colors.background};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;
