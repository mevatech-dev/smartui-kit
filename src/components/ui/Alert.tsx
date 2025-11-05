import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface AlertProps {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'standard' | 'filled' | 'outlined';
  icon?: IoniconsName;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  containerStyle?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  type = 'info',
  variant = 'standard',
  icon,
  showIcon = true,
  closable = false,
  onClose,
  action,
  containerStyle,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const opacity = useSharedValue(1);
  const height = useSharedValue(1);

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 200 });
    height.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setIsVisible)(false);
      onClose?.();
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    maxHeight: height.value === 0 ? 0 : 1000,
    overflow: 'hidden',
  }));

  if (!isVisible) return null;

  const defaultIcon = getDefaultIcon(type);
  const displayIcon = icon || (showIcon ? defaultIcon : undefined);

  const iconColor = getIconColor(type, variant, theme);

  return (
    <AnimatedContainer style={[animatedStyle, containerStyle]}>
      <AlertContainer type={type} variant={variant}>
        {displayIcon && (
          <IconWrapper>
            <Ionicons
              name={displayIcon}
              size={24}
              color={iconColor}
            />
          </IconWrapper>
        )}

        <ContentWrapper>
          {title && (
            <AlertTitle type={type} variant={variant}>
              {title}
            </AlertTitle>
          )}
          <AlertMessage type={type} variant={variant}>
            {message}
          </AlertMessage>
        </ContentWrapper>

        {action && (
          <ActionButton onPress={action.onPress} activeOpacity={0.7}>
            <ActionText type={type} variant={variant}>
              {action.label}
            </ActionText>
          </ActionButton>
        )}

        {closable && (
          <CloseButton onPress={handleClose} activeOpacity={0.7}>
            <Ionicons
              name="close"
              size={20}
              color={iconColor}
            />
          </CloseButton>
        )}
      </AlertContainer>
    </AnimatedContainer>
  );
};

const getDefaultIcon = (type: 'info' | 'success' | 'warning' | 'error'): IoniconsName => {
  const icons: Record<'info' | 'success' | 'warning' | 'error', IoniconsName> = {
    info: 'information-circle',
    success: 'checkmark-circle',
    warning: 'warning',
    error: 'close-circle',
  };
  return icons[type];
};

const getBackgroundColor = (type: 'info' | 'success' | 'warning' | 'error', variant: 'standard' | 'filled' | 'outlined', theme: any): string => {
  if (variant === 'outlined') return 'transparent';

  const typeColors = {
    info: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.accent,
    error: theme.colors.error,
  };

  if (variant === 'filled') {
    return typeColors[type];
  }

  // For standard variant, use lighter version from surface
  return theme.colors.surface;
};

const getTextColor = (type: 'info' | 'success' | 'warning' | 'error', variant: 'standard' | 'filled' | 'outlined', theme: any): string => {
  if (variant === 'filled') return theme.colors.background;

  return theme.colors.textPrimary;
};

const getIconColor = (type: 'info' | 'success' | 'warning' | 'error', variant: 'standard' | 'filled' | 'outlined', theme: any): string => {
  if (variant === 'filled') return theme.colors.background;

  const colors = {
    info: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.accent,
    error: theme.colors.error,
  };
  return colors[type];
};

const getBorderColor = (type: 'info' | 'success' | 'warning' | 'error', theme: any): string => {
  const colors = {
    info: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.accent,
    error: theme.colors.error,
  };
  return colors[type];
};

const AnimatedContainer = styled(Animated.View)``;

const AlertContainer = styled.View<{ type: string; variant: string }>`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ type, variant, theme }) => getBackgroundColor(type as any, variant as any, theme)};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ type, theme }) => getBorderColor(type as any, theme)};
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const IconWrapper = styled.View`
  padding-top: 2px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const AlertTitle = styled.Text<{ type: string; variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ type, variant, theme }) => getTextColor(type as any, variant as any, theme)};
`;

const AlertMessage = styled.Text<{ type: string; variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ type, variant, theme }) => getTextColor(type as any, variant as any, theme)};
  line-height: 18px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text<{ type: string; variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ type, variant, theme }) => getIconColor(type as any, variant as any, theme)};
  text-transform: uppercase;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;
