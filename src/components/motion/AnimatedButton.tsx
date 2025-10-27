import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedButton } from '@/components/ui/ThemedButton';

export const AnimatedButton: React.FC<{ title: string; onPress?: () => void; variant?: 'primary'|'accent'|'success'|'error'; fullWidth?: boolean; }>
= ({ title, onPress, variant='primary', fullWidth }) => {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={style}>
      <ThemedButton
        title={title}
        variant={variant}
        fullWidth={!!fullWidth}
        onPressIn={() => (scale.value = withSpring(0.95, { damping: 10 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 10 }))}
        onPress={onPress}
      />
    </Animated.View>
  );
};
