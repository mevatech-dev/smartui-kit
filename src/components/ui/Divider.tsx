import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface Props {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  spacing?: number;
  children?: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  style?: ViewStyle;
}

export const Divider: React.FC<Props> = ({
  orientation = 'horizontal',
  thickness = 1,
  color,
  spacing = 16,
  children,
  textAlign = 'center',
  style,
}) => {
  if (orientation === 'vertical') {
    return (
      <VerticalContainer spacing={spacing} style={style}>
        <VerticalLine thickness={thickness} color={color} />
      </VerticalContainer>
    );
  }

  if (children) {
    return (
      <HorizontalContainer spacing={spacing} style={style}>
        {(textAlign === 'center' || textAlign === 'right') && (
          <Line thickness={thickness} color={color} flex={textAlign === 'center' ? 1 : 3} />
        )}
        <TextWrapper>
          <DividerText>{children}</DividerText>
        </TextWrapper>
        {(textAlign === 'center' || textAlign === 'left') && (
          <Line thickness={thickness} color={color} flex={textAlign === 'center' ? 1 : 3} />
        )}
      </HorizontalContainer>
    );
  }

  return (
    <HorizontalContainer spacing={spacing} style={style}>
      <Line thickness={thickness} color={color} flex={1} />
    </HorizontalContainer>
  );
};

const HorizontalContainer = styled.View<{ spacing: number }>`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ spacing }) => spacing}px;
  width: 100%;
`;

const VerticalContainer = styled.View<{ spacing: number }>`
  margin-horizontal: ${({ spacing }) => spacing}px;
  height: 100%;
`;

const Line = styled.View<{ thickness: number; color?: string; flex?: number }>`
  height: ${({ thickness }) => thickness}px;
  background-color: ${({ theme, color }) => color || theme.colors.border};
  ${({ flex }) => flex && `flex: ${flex};`}
`;

const VerticalLine = styled.View<{ thickness: number; color?: string }>`
  width: ${({ thickness }) => thickness}px;
  flex: 1;
  background-color: ${({ theme, color }) => color || theme.colors.border};
`;

const TextWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const DividerText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
