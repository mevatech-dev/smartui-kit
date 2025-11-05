import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Modal, TouchableWithoutFeedback, Dimensions, PanResponder } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  dismissible?: boolean;
  showHandle?: boolean;
  snapPoints?: number[]; // Array of percentages [25, 50, 75, 100]
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  size = 'medium',
  dismissible = true,
  showHandle = true,
  snapPoints,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  const getSheetHeight = (): number => {
    const sizes = {
      small: SCREEN_HEIGHT * 0.3,
      medium: SCREEN_HEIGHT * 0.5,
      large: SCREEN_HEIGHT * 0.75,
      full: SCREEN_HEIGHT * 0.95,
    };
    return sizes[size];
  };

  const sheetHeight = getSheetHeight();

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 300 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const handleClose = () => {
    if (dismissible) {
      onClose();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => dismissible,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return dismissible && Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.value = gestureState.dy;
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > sheetHeight * 0.3 || gestureState.vy > 0.5) {
        runOnJS(handleClose)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      }
    },
  });

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Container>
        <TouchableWithoutFeedback onPress={handleClose}>
          <AnimatedBackdrop style={backdropAnimatedStyle} as={Backdrop} />
        </TouchableWithoutFeedback>

        <AnimatedSheet style={sheetAnimatedStyle} as={Sheet} height={sheetHeight}>
          <SheetContent {...panResponder.panHandlers}>
            {showHandle && <Handle />}

            {title && <SheetTitle>{title}</SheetTitle>}

            <ScrollContainer showsVerticalScrollIndicator={false}>
              {children}
            </ScrollContainer>
          </SheetContent>
        </AnimatedSheet>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Backdrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AnimatedBackdrop = styled(Animated.View)``;

const Sheet = styled.View<{ height: number }>`
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.radius.xl}px;
  border-top-right-radius: ${({ theme }) => theme.radius.xl}px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

const AnimatedSheet = styled(Animated.View)``;

const SheetContent = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Handle = styled.View`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SheetTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
