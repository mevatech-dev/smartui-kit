import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

interface Props extends ViewProps { title?: string; subtitle?: string; children?: React.ReactNode; }

export const ThemedCard: React.FC<Props> = ({ title, subtitle, children, ...rest }) => (
  <CardContainer {...rest}>
    {title && <CardTitle>{title}</CardTitle>}
    {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    {children}
  </CardContainer>
);

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CardSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;
