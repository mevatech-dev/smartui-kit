import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInputProps, ViewStyle } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
}

export const TextInput: React.FC<Props> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  fullWidth = false,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container style={containerStyle} fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}

      <InputWrapper
        variant={variant}
        isFocused={isFocused}
        hasError={!!error}
      >
        {leftIcon && <IconContainer position="left">{leftIcon}</IconContainer>}

        <StyledTextInput
          {...rest}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          hasLeftIcon={!!leftIcon}
          hasRightIcon={!!rightIcon}
          placeholderTextColor={({ theme }) => theme.colors.textSecondary}
        />

        {rightIcon && <IconContainer position="right">{rightIcon}</IconContainer>}
      </InputWrapper>

      {error && <HelperText isError>{error}</HelperText>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </Container>
  );
};

const Container = styled.View<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const InputWrapper = styled.View<{
  variant: string;
  isFocused: boolean;
  hasError: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, variant }) =>
    variant === 'filled' ? theme.colors.surface : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' || variant === 'default' ? '1px' : '0px')};
  border-color: ${({ theme, isFocused, hasError }) =>
    hasError ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  min-height: 48px;
`;

const StyledTextInput = styled.TextInput<{
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding-left: ${({ theme, hasLeftIcon }) => (hasLeftIcon ? theme.spacing.sm : 0)}px;
  padding-right: ${({ theme, hasRightIcon }) => (hasRightIcon ? theme.spacing.sm : 0)}px;
`;

const IconContainer = styled.View<{ position: 'left' | 'right' }>`
  justify-content: center;
  align-items: center;
`;

const HelperText = styled.Text<{ isError?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.tiny}px;
  color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.textSecondary)};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;
