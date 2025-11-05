import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  children?: React.ReactNode;
  text?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'square' | 'circle';
  icon?: string;
  iconPosition?: 'left' | 'right';
  dot?: boolean;
  outline?: boolean;
  containerStyle?: ViewStyle;
}

export const Badge: React.FC<Props> = ({
  children,
  text,
  variant = 'primary',
  size = 'medium',
  shape = 'rounded',
  icon,
  iconPosition = 'left',
  dot = false,
  outline = false,
  containerStyle,
}) => {
  const content = text || children;

  if (dot) {
    return (
      <DotBadge variant={variant} size={size} style={containerStyle} />
    );
  }

  return (
    <BadgeContainer
      variant={variant}
      size={size}
      shape={shape}
      outline={outline}
      style={containerStyle}
    >
      {icon && iconPosition === 'left' && (
        <IconWrapper>
          <Ionicons
            name={icon as any}
            size={getIconSize(size)}
            color={outline ? getColorForVariant(variant) : '#ffffff'}
          />
        </IconWrapper>
      )}

      {content && (
        <BadgeText variant={variant} size={size} outline={outline}>
          {content}
        </BadgeText>
      )}

      {icon && iconPosition === 'right' && (
        <IconWrapper>
          <Ionicons
            name={icon as any}
            size={getIconSize(size)}
            color={outline ? getColorForVariant(variant) : '#ffffff'}
          />
        </IconWrapper>
      )}
    </BadgeContainer>
  );
};

// Notification Badge (for overlaying on other components)
interface NotificationBadgeProps {
  count?: number;
  showZero?: boolean;
  max?: number;
  variant?: 'primary' | 'error' | 'success';
  size?: 'small' | 'medium';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: { x?: number; y?: number };
  children: React.ReactNode;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count = 0,
  showZero = false,
  max = 99,
  variant = 'error',
  size = 'small',
  position = 'top-right',
  offset = {},
  children,
}) => {
  const displayCount = count > max ? `${max}+` : count.toString();
  const shouldShow = count > 0 || (count === 0 && showZero);

  return (
    <NotificationContainer>
      {children}
      {shouldShow && (
        <NotificationDot
          variant={variant}
          size={size}
          position={position}
          offset={offset}
        >
          {count > 0 && (
            <NotificationText size={size}>{displayCount}</NotificationText>
          )}
        </NotificationDot>
      )}
    </NotificationContainer>
  );
};

const getColorForVariant = (variant: string) => {
  const colors = {
    primary: '#4BB4FF',
    secondary: '#B3E5FC',
    success: '#5DD39E',
    error: '#FF6B6B',
    accent: '#FFB84C',
  };
  return colors[variant] || colors.primary;
};

const getPaddingForSize = (size: string) => {
  const paddings = {
    small: '4px 8px',
    medium: '6px 12px',
    large: '8px 16px',
  };
  return paddings[size] || paddings.medium;
};

const getFontSizeForSize = (size: string) => {
  const sizes = {
    small: 11,
    medium: 13,
    large: 15,
  };
  return sizes[size] || sizes.medium;
};

const getIconSize = (size: string) => {
  const sizes = {
    small: 12,
    medium: 14,
    large: 16,
  };
  return sizes[size] || sizes.medium;
};

const getDotSize = (size: string) => {
  const sizes = {
    small: 8,
    medium: 12,
    large: 16,
  };
  return sizes[size] || sizes.medium;
};

const getBadgeRadius = (shape: string) => {
  if (shape === 'circle') return 999;
  if (shape === 'square') return 4;
  return 12; // rounded
};

const BadgeContainer = styled.View<{
  variant: string;
  size: string;
  shape: string;
  outline: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => getPaddingForSize(size)};
  border-radius: ${({ shape }) => getBadgeRadius(shape)}px;
  background-color: ${({ variant, outline }) =>
    outline ? 'transparent' : getColorForVariant(variant)};
  border-width: ${({ outline }) => (outline ? '1px' : '0px')};
  border-color: ${({ variant }) => getColorForVariant(variant)};
  gap: 4px;
  align-self: flex-start;
`;

const BadgeText = styled.Text<{
  variant: string;
  size: string;
  outline: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ size }) => getFontSizeForSize(size)}px;
  color: ${({ variant, outline }) =>
    outline ? getColorForVariant(variant) : '#ffffff'};
`;

const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const DotBadge = styled.View<{ variant: string; size: string }>`
  width: ${({ size }) => getDotSize(size)}px;
  height: ${({ size }) => getDotSize(size)}px;
  border-radius: ${({ size }) => getDotSize(size) / 2}px;
  background-color: ${({ variant }) => getColorForVariant(variant)};
`;

// Notification Badge styles
const NotificationContainer = styled.View`
  position: relative;
`;

const NotificationDot = styled.View<{
  variant: string;
  size: string;
  position: string;
  offset: { x?: number; y?: number };
}>`
  position: absolute;
  ${({ position, offset }) => {
    const x = offset.x || 0;
    const y = offset.y || 0;

    if (position === 'top-right') return `top: ${-4 + y}px; right: ${-4 + x}px;`;
    if (position === 'top-left') return `top: ${-4 + y}px; left: ${-4 + x}px;`;
    if (position === 'bottom-right') return `bottom: ${-4 + y}px; right: ${-4 + x}px;`;
    if (position === 'bottom-left') return `bottom: ${-4 + y}px; left: ${-4 + x}px;`;
    return `top: ${-4 + y}px; right: ${-4 + x}px;`;
  }}
  min-width: ${({ size }) => (size === 'small' ? 18 : 22)}px;
  min-height: ${({ size }) => (size === 'small' ? 18 : 22)}px;
  background-color: ${({ variant }) => getColorForVariant(variant)};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-width: 2px;
  border-color: #ffffff;
`;

const NotificationText = styled.Text<{ size: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ size }) => (size === 'small' ? 10 : 12)}px;
  color: #ffffff;
`;
