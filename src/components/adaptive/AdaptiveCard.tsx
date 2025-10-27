import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { useResponsiveContext } from '@/providers/ResponsiveProvider';
import { lightTheme } from '@/theme/lightTheme';

type SpacingKey = keyof typeof lightTheme.spacing;

interface AdaptiveCardProps extends ViewProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const AdaptiveCard: React.FC<AdaptiveCardProps> = ({
  title,
  subtitle,
  children,
  ...rest
}) => {
  const { isSmall, isLarge } = useResponsiveContext();
  const spacingKey: SpacingKey = isLarge ? 'xl' : isSmall ? 'md' : 'lg';

  return (
    <CardContainer spacingKey={spacingKey} {...rest}>
      {title && <CardTitle>{title}</CardTitle>}
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      {children}
    </CardContainer>
  );
};

const CardContainer = styled.View<{ spacingKey: SpacingKey }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  padding: ${({ theme, spacingKey }) => theme.spacing[spacingKey]}px;
`;

const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CardSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;
