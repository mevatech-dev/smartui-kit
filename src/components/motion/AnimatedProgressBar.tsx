import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';

export const AnimatedProgressBar: React.FC<{ progress: number; variant?: 'primary'|'accent'|'success'|'error' }>
= ({ progress, variant='primary' }) => {
  const p = useSharedValue(0);
  useEffect(() => { p.value = withTiming(progress, { duration: 800 }); }, [progress]);
  const style = useAnimatedStyle(() => ({ width: `${Math.max(0, Math.min(1, p.value))*100}%` }));
  return (
    <BarBackground>
      <Animated.View style={[{ height: '100%' }, style]}>
        <BarFill variant={variant} />
      </Animated.View>
    </BarBackground>
  );
};

const BarBackground = styled.View`
  height: 8px; width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.full}px;
  overflow: hidden;
`;
const BarFill = styled.View<{ variant: string }>`
  flex: 1; background-color: ${({ theme, variant }) => theme.colors[variant]};
  border-radius: ${({ theme }) => theme.radius.full}px;
`;
