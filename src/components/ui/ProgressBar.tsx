import React from 'react';
import styled from 'styled-components/native';

export const ProgressBar: React.FC<{ progress: number; variant?: 'primary'|'accent'|'success'|'error' }>
= ({ progress, variant='primary' }) => (
  <BarBackground>
    <BarFill variant={variant} style={{ width: `${Math.max(0, Math.min(1, progress))*100}%` }} />
  </BarBackground>
);

const BarBackground = styled.View`
  height: 8px; width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.full}px;
  overflow: hidden;
`;
const BarFill = styled.View<{ variant: string }>`
  height: 100%;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  border-radius: ${({ theme }) => theme.radius.full}px;
`;
