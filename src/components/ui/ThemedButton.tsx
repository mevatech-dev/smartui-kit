import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'accent' | 'success' | 'error';
  fullWidth?: boolean;
}

export const ThemedButton: React.FC<Props> = ({ title, variant='primary', fullWidth=false, ...rest }) => (
  <ButtonContainer variant={variant} fullWidth={fullWidth} activeOpacity={0.85} {...rest}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

const ButtonContainer = styled.TouchableOpacity<{ variant: string; fullWidth: boolean }>`
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  align-items: center; justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
`;
