import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface EmptyStateAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outlined';
}

interface EmptyStateProps {
  icon?: IoniconsName;
  image?: ImageSourcePropType;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  variant?: 'default' | 'minimal' | 'illustration';
  containerStyle?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  image,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  containerStyle,
}) => {
  return (
    <Container variant={variant} style={containerStyle}>
      {variant !== 'minimal' && (
        <IconContainer variant={variant}>
          {image ? (
            <IllustrationImage source={image} resizeMode="contain" />
          ) : icon ? (
            <Ionicons name={icon} size={variant === 'illustration' ? 120 : 80} color="#CBD5E0" />
          ) : (
            <Ionicons name="file-tray-outline" size={80} color="#CBD5E0" />
          )}
        </IconContainer>
      )}

      <ContentContainer variant={variant}>
        <Title variant={variant}>{title}</Title>
        {description && <Description variant={variant}>{description}</Description>}
      </ContentContainer>

      {(action || secondaryAction) && (
        <ActionsContainer>
          {action && (
            <ActionButton
              onPress={action.onPress}
              variant={action.variant || 'primary'}
              activeOpacity={0.7}
            >
              <ActionButtonText variant={action.variant || 'primary'}>{action.label}</ActionButtonText>
            </ActionButton>
          )}
          {secondaryAction && (
            <ActionButton
              onPress={secondaryAction.onPress}
              variant={secondaryAction.variant || 'outlined'}
              activeOpacity={0.7}
            >
              <ActionButtonText variant={secondaryAction.variant || 'outlined'}>
                {secondaryAction.label}
              </ActionButtonText>
            </ActionButton>
          )}
        </ActionsContainer>
      )}
    </Container>
  );
};

const Container = styled.View<{ variant: 'default' | 'minimal' | 'illustration' }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ variant, theme }) => {
    if (variant === 'minimal') return theme.spacing.sm;
    if (variant === 'illustration') return theme.spacing.lg;
    return theme.spacing.md;
  }}px;
`;

const IconContainer = styled.View<{ variant: 'default' | 'minimal' | 'illustration' }>`
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ variant, theme }) => {
    if (variant === 'illustration') return theme.spacing.md;
    return 0;
  }}px;
`;

const IllustrationImage = styled.Image`
  width: 200px;
  height: 200px;
`;

const ContentContainer = styled.View<{ variant: 'default' | 'minimal' | 'illustration' }>`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  max-width: ${({ variant }) => (variant === 'minimal' ? '280px' : '320px')};
`;

const Title = styled.Text<{ variant: 'default' | 'minimal' | 'illustration' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ variant, theme }) => {
    if (variant === 'minimal') return theme.typography.fontSize.lg;
    if (variant === 'illustration') return theme.typography.fontSize.xl;
    return theme.typography.fontSize.h3;
  }}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

const Description = styled.Text<{ variant: 'default' | 'minimal' | 'illustration' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.fontSize.md * 1.5}px;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionButton = styled.TouchableOpacity<{ variant: 'primary' | 'outlined' }>`
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : '0px')};
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ActionButtonText = styled.Text<{ variant: 'primary' | 'outlined' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors.background : theme.colors.primary};
`;
