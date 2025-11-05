import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { TouchableOpacityProps, ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface CardAction {
  label: string;
  onPress: () => void;
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
}

interface CardProps extends Omit<TouchableOpacityProps, 'style'> {
  children?: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';

  // Header
  title?: string;
  subtitle?: string;
  headerIcon?: IoniconsName;
  headerAvatar?: React.ReactNode;
  headerAction?: React.ReactNode;

  // Cover image
  coverImage?: ImageSourcePropType;
  coverImageHeight?: number;

  // Footer
  actions?: CardAction[];
  footer?: React.ReactNode;

  // Interactive
  onPress?: () => void;

  // Styling
  containerStyle?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  title,
  subtitle,
  headerIcon,
  headerAvatar,
  headerAction,
  coverImage,
  coverImageHeight = 200,
  actions,
  footer,
  onPress,
  containerStyle,
  ...rest
}) => {
  const theme = useTheme();
  const hasHeader = title || subtitle || headerIcon || headerAvatar || headerAction;
  const hasFooter = actions || footer;

  const CardContainer = onPress ? CardTouchable : CardView;

  return (
    <CardContainer
      variant={variant}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
      style={containerStyle}
      {...rest}
    >
      {coverImage && (
        <CoverImage source={coverImage} height={coverImageHeight} resizeMode="cover" />
      )}

      {hasHeader && (
        <CardHeader>
          {headerAvatar && <HeaderAvatar>{headerAvatar}</HeaderAvatar>}

          {headerIcon && !headerAvatar && (
            <HeaderIconContainer>
              <Ionicons name={headerIcon} size={24} color={theme.colors.primary} />
            </HeaderIconContainer>
          )}

          {(title || subtitle) && (
            <HeaderTextContainer>
              {title && <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>}
              {subtitle && <HeaderSubtitle numberOfLines={2}>{subtitle}</HeaderSubtitle>}
            </HeaderTextContainer>
          )}

          {headerAction && <HeaderActionContainer>{headerAction}</HeaderActionContainer>}
        </CardHeader>
      )}

      {children && <CardBody>{children}</CardBody>}

      {hasFooter && (
        <CardFooter>
          {footer ? (
            footer
          ) : actions ? (
            <ActionsContainer>
              {actions.map((action, index) => (
                <ActionButton
                  key={index}
                  onPress={action.onPress}
                  disabled={action.disabled}
                  activeOpacity={0.7}
                >
                  <ActionButtonText color={action.color || 'primary'} disabled={action.disabled}>
                    {action.label}
                  </ActionButtonText>
                </ActionButton>
              ))}
            </ActionsContainer>
          ) : null}
        </CardFooter>
      )}
    </CardContainer>
  );
};

const getElevation = (variant: 'elevated' | 'outlined' | 'filled'): string => {
  if (variant === 'elevated') {
    return `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.1;
      shadow-radius: 8px;
      elevation: 3;
    `;
  }
  return '';
};

const getBackgroundColor = (variant: 'elevated' | 'outlined' | 'filled', theme: any): string => {
  if (variant === 'filled') return theme.colors.surface;
  return theme.colors.background;
};

const getBorder = (variant: 'elevated' | 'outlined' | 'filled', theme: any): string => {
  if (variant === 'outlined') {
    return `
      border-width: 1px;
      border-color: ${theme.colors.border};
    `;
  }
  return '';
};

const CardView = styled.View<{ variant: 'elevated' | 'outlined' | 'filled' }>`
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ variant, theme }) => getBackgroundColor(variant, theme)};
  overflow: hidden;
  ${({ variant }) => getElevation(variant)}
  ${({ variant, theme }) => getBorder(variant, theme)}
`;

const CardTouchable = styled.TouchableOpacity<{ variant: 'elevated' | 'outlined' | 'filled' }>`
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ variant, theme }) => getBackgroundColor(variant, theme)};
  overflow: hidden;
  ${({ variant }) => getElevation(variant)}
  ${({ variant, theme }) => getBorder(variant, theme)}
`;

const CoverImage = styled.Image<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const HeaderAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
`;

const HeaderIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  align-items: center;
  justify-content: center;
`;

const HeaderTextContainer = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const HeaderSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeaderActionContainer = styled.View`
  margin-left: auto;
`;

const CardBody = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const CardFooter = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  justify-content: flex-end;
`;

const ActionButton = styled.TouchableOpacity`
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ActionButtonText = styled.Text<{ color: string; disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ color, theme }) => {
    if (color === 'error') return theme.colors.error;
    if (color === 'secondary') return theme.colors.textSecondary;
    return theme.colors.primary;
  }};
  text-transform: uppercase;
`;
