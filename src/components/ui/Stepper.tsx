import React from 'react';
import styled, { useTheme, DefaultTheme } from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface Step {
  label: string;
  description?: string;
  icon?: IoniconsName;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical';
  color?: 'primary' | 'secondary' | 'success' | 'accent';
  showStepNumbers?: boolean;
  containerStyle?: ViewStyle;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  variant = 'horizontal',
  color = 'primary',
  showStepNumbers = true,
  containerStyle,
}) => {
  const theme = useTheme();
  const activeColor = getColorValue(color, theme);

  const getStepStatus = (index: number): 'completed' | 'active' | 'upcoming' => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  if (variant === 'vertical') {
    return (
      <VerticalContainer style={containerStyle}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <VerticalStepContainer key={index}>
              <VerticalStepIndicatorContainer>
                <StepCircle status={status} color={activeColor}>
                  {status === 'completed' ? (
                    <Ionicons name="checkmark" size={16} color={theme.colors.background} />
                  ) : step.icon ? (
                    <Ionicons
                      name={step.icon}
                      size={16}
                      color={status === 'active' ? theme.colors.background : theme.colors.textSecondary}
                    />
                  ) : showStepNumbers ? (
                    <StepNumber status={status}>{index + 1}</StepNumber>
                  ) : null}
                </StepCircle>
                {!isLast && <VerticalConnector status={status} color={activeColor} />}
              </VerticalStepIndicatorContainer>

              <VerticalStepContent>
                <StepLabel status={status}>{step.label}</StepLabel>
                {step.description && (
                  <StepDescription status={status}>{step.description}</StepDescription>
                )}
              </VerticalStepContent>
            </VerticalStepContainer>
          );
        })}
      </VerticalContainer>
    );
  }

  return (
    <HorizontalContainer style={containerStyle}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;

        return (
          <HorizontalStepContainer key={index} isLast={isLast}>
            <StepCircle status={status} color={activeColor}>
              {status === 'completed' ? (
                <Ionicons name="checkmark" size={16} color={theme.colors.background} />
              ) : step.icon ? (
                <Ionicons
                  name={step.icon}
                  size={16}
                  color={status === 'active' ? theme.colors.background : theme.colors.textSecondary}
                />
              ) : showStepNumbers ? (
                <StepNumber status={status}>{index + 1}</StepNumber>
              ) : null}
            </StepCircle>

            <StepLabel status={status}>{step.label}</StepLabel>

            {!isLast && <HorizontalConnector status={status} color={activeColor} />}
          </HorizontalStepContainer>
        );
      })}
    </HorizontalContainer>
  );
};

const getColorValue = (
  color: 'primary' | 'secondary' | 'success' | 'accent',
  theme: DefaultTheme
): string => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    accent: theme.colors.accent,
  };
  return colors[color];
};

const HorizontalContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const HorizontalStepContainer = styled.View<{ isLast: boolean }>`
  flex: ${({ isLast }) => (isLast ? '0' : '1')};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  position: relative;
`;

const HorizontalConnector = styled.View<{ status: 'completed' | 'active' | 'upcoming'; color: string }>`
  position: absolute;
  top: 16px;
  left: 50%;
  right: -50%;
  height: 2px;
  background-color: ${({ status, color, theme }) =>
    status === 'completed' ? color : theme.colors.border};
`;

const VerticalContainer = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
`;

const VerticalStepContainer = styled.View`
  flex-direction: row;
  min-height: 60px;
`;

const VerticalStepIndicatorContainer = styled.View`
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const VerticalConnector = styled.View<{ status: 'completed' | 'active' | 'upcoming'; color: string }>`
  width: 2px;
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  background-color: ${({ status, color, theme }) =>
    status === 'completed' ? color : theme.colors.border};
`;

const VerticalStepContent = styled.View`
  flex: 1;
  padding-top: 6px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const StepCircle = styled.View<{ status: 'completed' | 'active' | 'upcoming'; color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ status, color, theme }) => {
    if (status === 'completed' || status === 'active') return color;
    return theme.colors.surface;
  }};
  border-width: 2px;
  border-color: ${({ status, color, theme }) => {
    if (status === 'completed' || status === 'active') return color;
    return theme.colors.border;
  }};
`;

const StepNumber = styled.Text<{ status: 'completed' | 'active' | 'upcoming' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ status, theme }) => {
    if (status === 'active') return theme.colors.background;
    if (status === 'completed') return theme.colors.background;
    return theme.colors.textSecondary;
  }};
`;

const StepLabel = styled.Text<{ status: 'completed' | 'active' | 'upcoming' }>`
  font-family: ${({ status, theme }) =>
    status === 'active' ? theme.typography.fontFamily.bold : theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ status, theme }) => {
    if (status === 'active') return theme.colors.textPrimary;
    if (status === 'completed') return theme.colors.textPrimary;
    return theme.colors.textSecondary;
  }};
  text-align: center;
`;

const StepDescription = styled.Text<{ status: 'completed' | 'active' | 'upcoming' }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
