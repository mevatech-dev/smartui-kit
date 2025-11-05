import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { PanResponder, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface SwipeAction {
  label?: string;
  icon: IoniconsName;
  backgroundColor: string;
  onPress: () => void;
}

interface SwipeableItemProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  threshold?: number;
  containerStyle?: ViewStyle;
}

export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  leftActions,
  rightActions,
  threshold = 80,
  containerStyle,
}) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const startX = useRef(0);

  const actionWidth = 80;
  const maxLeftSwipe = leftActions ? leftActions.length * actionWidth : 0;
  const maxRightSwipe = rightActions ? -(rightActions.length * actionWidth) : 0;

  const handleActionPress = (action: SwipeAction) => {
    action.onPress();
    translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderGrant: () => {
        startX.current = translateX.value;
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = startX.current + gestureState.dx;

        // Constrain to max swipe distances
        if (newX > 0 && leftActions) {
          translateX.value = Math.min(newX, maxLeftSwipe);
        } else if (newX < 0 && rightActions) {
          translateX.value = Math.max(newX, maxRightSwipe);
        } else if ((newX > 0 && !leftActions) || (newX < 0 && !rightActions)) {
          translateX.value = 0;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = gestureState.vx;
        const currentX = translateX.value;

        // Determine if should snap to actions or close
        if (Math.abs(currentX) < threshold && Math.abs(velocity) < 0.5) {
          translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        } else if (currentX > 0 && leftActions) {
          translateX.value = withSpring(maxLeftSwipe, { damping: 20, stiffness: 300 });
        } else if (currentX < 0 && rightActions) {
          translateX.value = withSpring(maxRightSwipe, { damping: 20, stiffness: 300 });
        } else {
          translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        }
      },
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Container style={containerStyle}>
      {/* Left actions */}
      {leftActions && leftActions.length > 0 && (
        <ActionsContainer side="left">
          {leftActions.map((action, index) => (
            <ActionButton
              key={index}
              onPress={() => handleActionPress(action)}
              backgroundColor={action.backgroundColor}
              activeOpacity={0.7}
            >
              <Ionicons name={action.icon} size={24} color="#fff" />
              {action.label && <ActionLabel>{action.label}</ActionLabel>}
            </ActionButton>
          ))}
        </ActionsContainer>
      )}

      {/* Right actions */}
      {rightActions && rightActions.length > 0 && (
        <ActionsContainer side="right">
          {rightActions.map((action, index) => (
            <ActionButton
              key={index}
              onPress={() => handleActionPress(action)}
              backgroundColor={action.backgroundColor}
              activeOpacity={0.7}
            >
              <Ionicons name={action.icon} size={24} color="#fff" />
              {action.label && <ActionLabel>{action.label}</ActionLabel>}
            </ActionButton>
          ))}
        </ActionsContainer>
      )}

      {/* Swipeable content */}
      <AnimatedContent style={animatedStyle} as={ContentContainer} {...panResponder.panHandlers}>
        {children}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  overflow: hidden;
`;

const ActionsContainer = styled.View<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ side }) => (side === 'left' ? 'left: 0;' : 'right: 0;')}
  flex-direction: row;
  align-items: stretch;
`;

const ActionButton = styled.TouchableOpacity<{ backgroundColor: string }>`
  width: 80px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ActionLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  color: #fff;
`;

const ContentContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

const AnimatedContent = styled(Animated.View)``;
