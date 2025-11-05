import React, { useState } from 'react';
import styled from 'styled-components/native';
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

  return (
    <AnimatedContainer style={[animatedStyle, containerStyle]}>
      <AlertContainer type={type} variant={variant}>
        {displayIcon && (
          <IconWrapper>
            <Ionicons
              name={displayIcon}
              size={24}
              color={getIconColor(type, variant)}
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
              color={getIconColor(type, variant)}
            />
          </CloseButton>
        )}
      </AlertContainer>
    </AnimatedContainer>
  );
};

const getDefaultIcon = (type: string): IoniconsName => {
  const icons: Record<string, IoniconsName> = {
    info: 'information-circle',
    success: 'checkmark-circle',
    warning: 'warning',
    error: 'close-circle',
  };
  return icons[type] || 'information-circle';
};

const getBackgroundColor = (type: string, variant: string): string => {
  if (variant === 'outlined') return 'transparent';

  const backgrounds = {
    info: variant === 'filled' ? '#4BB4FF' : '#E5F4FF',
    success: variant === 'filled' ? '#5DD39E' : '#E8F8F0',
    warning: variant === 'filled' ? '#FFB84C' : '#FFF4E5',
    error: variant === 'filled' ? '#FF6B6B' : '#FFE5E5',
  };
  return backgrounds[type] || backgrounds.info;
};

const getTextColor = (type: string, variant: string): string => {
  if (variant === 'filled') return '#ffffff';

  const colors = {
    info: '#1E5A8E',
    success: '#1E7F4B',
    warning: '#9A5A00',
    error: '#C41E1E',
  };
  return colors[type] || colors.info;
};

const getIconColor = (type: string, variant: string): string => {
  if (variant === 'filled') return '#ffffff';

  const colors = {
    info: '#4BB4FF',
    success: '#5DD39E',
    warning: '#FFB84C',
    error: '#FF6B6B',
  };
  return colors[type] || colors.info;
};

const getBorderColor = (type: string): string => {
  const colors = {
    info: '#4BB4FF',
    success: '#5DD39E',
    warning: '#FFB84C',
    error: '#FF6B6B',
  };
  return colors[type] || colors.info;
};

const AnimatedContainer = styled(Animated.View)``;

const AlertContainer = styled.View<{ type: string; variant: string }>`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ type, variant }) => getBackgroundColor(type, variant)};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ type }) => getBorderColor(type)};
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
  color: ${({ type, variant }) => getTextColor(type, variant)};
`;

const AlertMessage = styled.Text<{ type: string; variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ type, variant }) => getTextColor(type, variant)};
  line-height: 18px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text<{ type: string; variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ type, variant }) => getIconColor(type, variant)};
  text-transform: uppercase;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;
