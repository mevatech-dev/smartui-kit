import React from 'react';
import styled, { useTheme, DefaultTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface FABAction {
  icon: IoniconsName;
  label?: string;
  onPress: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
}

interface FloatingActionButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  icon: IoniconsName;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
  extended?: boolean;
  label?: string;
  actions?: FABAction[];
  onPress?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  size = 'medium',
  color = 'primary',
  position = 'bottom-right',
  extended = false,
  label,
  actions,
  onPress,
  disabled = false,
  ...rest
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePress = () => {
    if (actions) {
      setIsExpanded(!isExpanded);
      rotation.value = withSpring(isExpanded ? 0 : 45, { damping: 15 });
    } else {
      onPress?.();
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const fabColor = getColorValue(color, theme);
  const fabSize = getFABSize(size, extended);
  const iconSize = getIconSize(size);

  return (
    <FABContainer position={position}>
      {actions && isExpanded && (
        <ActionsContainer position={position}>
          {actions.map((action, index) => (
            <ActionItemContainer key={index}>
              {action.label && <ActionLabel>{action.label}</ActionLabel>}
              <ActionButton
                onPress={() => {
                  action.onPress();
                  setIsExpanded(false);
                  rotation.value = withSpring(0, { damping: 15 });
                }}
                activeOpacity={0.7}
                color={action.color ? getColorValue(action.color, theme) : fabColor}
              >
                <Ionicons name={action.icon} size={20} color={theme.colors.background} />
              </ActionButton>
            </ActionItemContainer>
          ))}
        </ActionsContainer>
      )}

      <AnimatedFAB
        style={animatedStyle}
        as={FABButton}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={disabled}
        size={fabSize}
        color={fabColor}
        extended={extended}
        {...rest}
      >
        <Ionicons name={icon} size={iconSize} color={theme.colors.background} />
        {extended && label && <FABLabel>{label}</FABLabel>}
      </AnimatedFAB>
    </FABContainer>
  );
};

const getColorValue = (
  color: 'primary' | 'secondary' | 'success' | 'error' | 'accent',
  theme: DefaultTheme
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

const getFABSize = (size: 'small' | 'medium' | 'large', extended: boolean): { width: number; height: number } => {
  if (extended) {
    const heights = { small: 40, medium: 48, large: 56 };
    return { width: 0, height: heights[size] }; // Width auto for extended
  }
  const sizes = { small: 40, medium: 56, large: 64 };
  const dimension = sizes[size];
  return { width: dimension, height: dimension };
};

const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  const sizes = { small: 18, medium: 24, large: 28 };
  return sizes[size];
};

const FABContainer = styled.View<{ position: string }>`
  position: absolute;
  ${({ position }) => {
    const [vertical, horizontal] = position.split('-');
    let styles = '';

    if (vertical === 'bottom') styles += 'bottom: 16px;';
    if (vertical === 'top') styles += 'top: 16px;';

    if (horizontal === 'right') styles += 'right: 16px;';
    if (horizontal === 'left') styles += 'left: 16px;';
    if (horizontal === 'center') styles += 'align-self: center;';

    return styles;
  }}
  z-index: 1000;
`;

const FABButton = styled.TouchableOpacity<{
  size: { width: number; height: number };
  color: string;
  extended: boolean;
}>`
  ${({ size, extended }) =>
    extended
      ? `
    min-width: ${size.height}px;
    height: ${size.height}px;
    padding-horizontal: 16px;
  `
      : `
    width: ${size.width}px;
    height: ${size.height}px;
  `}
  background-color: ${({ color }) => color};
  border-radius: ${({ size }) => size.height / 2}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 6;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedFAB = styled(Animated.View)``;

const FABLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.background};
  text-transform: uppercase;
`;

const ActionsContainer = styled.View<{ position: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' }>`
  position: absolute;
  gap: 12px;
  ${({ position }) => {
    const [vertical, horizontal] = position.split('-');
    let styles = '';

    // Vertical positioning
    if (vertical === 'bottom') styles += 'bottom: 72px;';
    if (vertical === 'top') styles += 'top: 72px;';

    // Horizontal positioning
    if (horizontal === 'right') styles += ' right: 0; align-items: flex-end;';
    else if (horizontal === 'left') styles += ' left: 0; align-items: flex-start;';
    else if (horizontal === 'center') styles += ' align-self: center; align-items: center;';

    return styles;
  }}
`;

const ActionItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ActionLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.background};
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ActionButton = styled.TouchableOpacity<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;
