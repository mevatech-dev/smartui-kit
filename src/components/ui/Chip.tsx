import React from 'react';
import styled, { css, useTheme } from 'styled-components/native';
import { ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'accent';
  size?: 'small' | 'medium';
  icon?: IoniconsName;
  avatar?: React.ReactNode;
  onPress?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  icon,
  avatar,
  onPress,
  onDelete,
  disabled = false,
  containerStyle,
}) => {
  const theme = useTheme();

  // Fix nested touchables: if both onPress and onDelete exist,
  // wrap in View and handle clicks separately
  const hasMultipleActions = onPress && onDelete;
  const ChipContainer = hasMultipleActions ? ChipView : (onPress ? ChipTouchable : ChipView);

  const iconColor = getIconColor(variant, color, theme);

  const chipContent = (
    <>
      {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}

      {icon && !avatar && (
        <IconWrapper>
          <Ionicons
            name={icon}
            size={size === 'small' ? 14 : 16}
            color={iconColor}
          />
        </IconWrapper>
      )}

      <ChipLabel variant={variant} color={color} size={size}>
        {label}
      </ChipLabel>

      {onDelete && (
        <DeleteButton
          onPress={onDelete}
          disabled={disabled}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="close-circle"
            size={size === 'small' ? 16 : 18}
            color={iconColor}
          />
        </DeleteButton>
      )}
    </>
  );

  if (hasMultipleActions) {
    // When both onPress and onDelete exist, wrap content in pressable area
    // and delete button will stop propagation
    return (
      <ChipPressableWrapper
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={containerStyle}
      >
        <ChipView variant={variant} color={color} size={size}>
          {chipContent}
        </ChipView>
      </ChipPressableWrapper>
    );
  }

  return (
    <ChipContainer
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      variant={variant}
      color={color}
      size={size}
      style={containerStyle}
    >
      {chipContent}
    </ChipContainer>
  );
};

const getColorForVariant = (color: 'primary' | 'secondary' | 'success' | 'error' | 'accent', theme: any): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    error: theme.colors.error,
    accent: theme.colors.accent,
  };
  return colors[color];
};

const getIconColor = (variant: 'filled' | 'outlined', color: 'primary' | 'secondary' | 'success' | 'error' | 'accent', theme: any): string => {
  if (variant === 'outlined') {
    return getColorForVariant(color, theme);
  }
  return theme.colors.background;
};

const getPadding = (size: 'small' | 'medium') => {
  if (size === 'small') {
    return { vertical: 4, horizontal: 8 };
  }
  return { vertical: 6, horizontal: 12 };
};

const getFontSize = (size: 'small' | 'medium') => {
  return size === 'small' ? 12 : 14;
};

// Shared styles using css helper
const chipBaseStyles = css<{
  variant: string;
  color: string;
  size: string;
}>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radius.full}px;
  padding-vertical: ${({ size }) => getPadding(size as any).vertical}px;
  padding-horizontal: ${({ size }) => getPadding(size as any).horizontal}px;
  background-color: ${({ variant, color, theme }) =>
    variant === 'filled' ? getColorForVariant(color as any, theme) : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ color, theme }) => getColorForVariant(color as any, theme)};
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const ChipView = styled.View<{
  variant: string;
  color: string;
  size: string;
}>`
  ${chipBaseStyles}
`;

const ChipTouchable = styled.TouchableOpacity<{
  variant: string;
  color: string;
  size: string;
}>`
  ${chipBaseStyles}
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ChipPressableWrapper = styled.TouchableOpacity``;

const AvatarWrapper = styled.View`
  margin-right: 4px;
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ChipLabel = styled.Text<{
  variant: string;
  color: string;
  size: string;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ size }) => getFontSize(size as any)}px;
  color: ${({ variant, color, theme }) =>
    variant === 'outlined' ? getColorForVariant(color as any, theme) : theme.colors.background};
`;

const DeleteButton = styled.TouchableOpacity`
  margin-left: 4px;
  justify-content: center;
  align-items: center;
`;
