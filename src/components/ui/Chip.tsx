import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
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
  const ChipContainer = onPress ? ChipTouchable : ChipView;

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
      {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}

      {icon && !avatar && (
        <IconWrapper>
          <Ionicons
            name={icon}
            size={size === 'small' ? 14 : 16}
            color={getIconColor(variant, color)}
          />
        </IconWrapper>
      )}

      <ChipLabel variant={variant} color={color} size={size}>
        {label}
      </ChipLabel>

      {onDelete && (
        <DeleteButton onPress={onDelete} disabled={disabled} activeOpacity={0.7}>
          <Ionicons
            name="close-circle"
            size={size === 'small' ? 16 : 18}
            color={getIconColor(variant, color)}
          />
        </DeleteButton>
      )}
    </ChipContainer>
  );
};

const getColorForVariant = (color: string): string => {
  const colors = {
    primary: '#4BB4FF',
    secondary: '#B3E5FC',
    success: '#5DD39E',
    error: '#FF6B6B',
    accent: '#FFB84C',
  };
  return colors[color] || colors.primary;
};

const getIconColor = (variant: string, color: string): string => {
  if (variant === 'outlined') {
    return getColorForVariant(color);
  }
  return '#ffffff';
};

const getPadding = (size: string) => {
  if (size === 'small') {
    return { vertical: 4, horizontal: 8 };
  }
  return { vertical: 6, horizontal: 12 };
};

const getFontSize = (size: string) => {
  return size === 'small' ? 12 : 14;
};

const ChipView = styled.View<{
  variant: string;
  color: string;
  size: string;
}>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radius.full}px;
  padding-vertical: ${({ size }) => getPadding(size).vertical}px;
  padding-horizontal: ${({ size }) => getPadding(size).horizontal}px;
  background-color: ${({ variant, color }) =>
    variant === 'filled' ? getColorForVariant(color) : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ color }) => getColorForVariant(color)};
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const ChipTouchable = styled.TouchableOpacity<{
  variant: string;
  color: string;
  size: string;
}>`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radius.full}px;
  padding-vertical: ${({ size }) => getPadding(size).vertical}px;
  padding-horizontal: ${({ size }) => getPadding(size).horizontal}px;
  background-color: ${({ variant, color }) =>
    variant === 'filled' ? getColorForVariant(color) : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ color }) => getColorForVariant(color)};
  gap: ${({ theme }) => theme.spacing.xs}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

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
  font-size: ${({ size }) => getFontSize(size)}px;
  color: ${({ variant, color }) =>
    variant === 'outlined' ? getColorForVariant(color) : '#ffffff'};
`;

const DeleteButton = styled.TouchableOpacity`
  margin-left: 4px;
  justify-content: center;
  align-items: center;
`;
