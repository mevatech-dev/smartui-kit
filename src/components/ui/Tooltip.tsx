import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  content: string | React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  showArrow?: boolean;
  delay?: number;
  containerStyle?: ViewStyle;
}

export const Tooltip: React.FC<Props> = ({
  content,
  children,
  placement = 'top',
  backgroundColor,
  textColor = '#ffffff',
  showArrow = true,
  delay = 200,
  containerStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [childLayout, setChildLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  let timeoutId: NodeJS.Timeout;

  const handlePressIn = (event: any) => {
    event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      setChildLayout({ x: pageX, y: pageY, width, height });
    });

    timeoutId = setTimeout(() => {
      setIsVisible(true);
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }, delay);
  };

  const handlePressOut = () => {
    if (timeoutId) clearTimeout(timeoutId);

    scale.value = withTiming(0, { duration: 150 });
    opacity.value = withTiming(0, { duration: 150 }, () => {
      setIsVisible(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getTooltipPosition = () => {
    const { x, y, width, height } = childLayout;
    const spacing = 8;
    const arrowSize = showArrow ? 6 : 0;

    switch (placement) {
      case 'top':
        return {
          left: x + width / 2,
          top: y - spacing - arrowSize,
          transform: [{ translateX: -50 }, { translateY: -100 }],
        };
      case 'bottom':
        return {
          left: x + width / 2,
          top: y + height + spacing + arrowSize,
          transform: [{ translateX: -50 }],
        };
      case 'left':
        return {
          left: x - spacing - arrowSize,
          top: y + height / 2,
          transform: [{ translateX: -100 }, { translateY: -50 }],
        };
      case 'right':
        return {
          left: x + width + spacing + arrowSize,
          top: y + height / 2,
          transform: [{ translateY: -50 }],
        };
      default:
        return { left: x, top: y };
    }
  };

  return (
    <>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>

      {isVisible && (
        <Modal transparent visible={isVisible} animationType="none">
          <ModalContainer>
            <AnimatedTooltipWrapper
              style={[
                animatedStyle,
                {
                  position: 'absolute',
                  ...getTooltipPosition(),
                },
              ]}
            >
              <TooltipContent backgroundColor={backgroundColor}>
                {showArrow && <Arrow placement={placement} backgroundColor={backgroundColor} />}

                {typeof content === 'string' ? (
                  <TooltipText color={textColor}>{content}</TooltipText>
                ) : (
                  content
                )}
              </TooltipContent>
            </AnimatedTooltipWrapper>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

// Simpler Tooltip variant with controlled visibility
interface ControlledTooltipProps extends Omit<Props, 'delay'> {
  visible: boolean;
  onClose?: () => void;
}

export const ControlledTooltip: React.FC<ControlledTooltipProps> = ({
  content,
  children,
  visible,
  onClose,
  placement = 'top',
  backgroundColor,
  textColor = '#ffffff',
  showArrow = true,
  containerStyle,
}) => {
  const [childLayout, setChildLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    } else {
      scale.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const handleLayout = (event: any) => {
    event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      setChildLayout({ x: pageX, y: pageY, width, height });
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getTooltipPosition = () => {
    const { x, y, width, height } = childLayout;
    const spacing = 8;
    const arrowSize = showArrow ? 6 : 0;

    switch (placement) {
      case 'top':
        return {
          left: x + width / 2,
          top: y - spacing - arrowSize,
          transform: [{ translateX: -50 }, { translateY: -100 }],
        };
      case 'bottom':
        return {
          left: x + width / 2,
          top: y + height + spacing + arrowSize,
          transform: [{ translateX: -50 }],
        };
      case 'left':
        return {
          left: x - spacing - arrowSize,
          top: y + height / 2,
          transform: [{ translateX: -100 }, { translateY: -50 }],
        };
      case 'right':
        return {
          left: x + width + spacing + arrowSize,
          top: y + height / 2,
          transform: [{ translateY: -50 }],
        };
      default:
        return { left: x, top: y };
    }
  };

  return (
    <>
      <TouchableOpacity
        onLayout={handleLayout}
        activeOpacity={1}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>

      {visible && (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
          <ModalContainer onPress={onClose} activeOpacity={1}>
            <AnimatedTooltipWrapper
              style={[
                animatedStyle,
                {
                  position: 'absolute',
                  ...getTooltipPosition(),
                },
              ]}
            >
              <TooltipContent backgroundColor={backgroundColor}>
                {showArrow && <Arrow placement={placement} backgroundColor={backgroundColor} />}

                {typeof content === 'string' ? (
                  <TooltipText color={textColor}>{content}</TooltipText>
                ) : (
                  content
                )}
              </TooltipContent>
            </AnimatedTooltipWrapper>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

const ModalContainer = styled.TouchableOpacity`
  flex: 1;
`;

const AnimatedTooltipWrapper = styled(Animated.View)``;

const TooltipContent = styled.View<{ backgroundColor?: string }>`
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  max-width: 250px;
`;

const TooltipText = styled.Text<{ color: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ color }) => color};
  line-height: 18px;
`;

const Arrow = styled.View<{ placement: string; backgroundColor?: string }>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  ${({ placement, theme, backgroundColor }) => {
    const color = backgroundColor || theme.colors.textPrimary;
    const size = 6;

    if (placement === 'top') {
      return `
        bottom: -${size}px;
        left: 50%;
        margin-left: -${size}px;
        border-left-width: ${size}px;
        border-right-width: ${size}px;
        border-top-width: ${size}px;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: ${color};
      `;
    }

    if (placement === 'bottom') {
      return `
        top: -${size}px;
        left: 50%;
        margin-left: -${size}px;
        border-left-width: ${size}px;
        border-right-width: ${size}px;
        border-bottom-width: ${size}px;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: ${color};
      `;
    }

    if (placement === 'left') {
      return `
        right: -${size}px;
        top: 50%;
        margin-top: -${size}px;
        border-top-width: ${size}px;
        border-bottom-width: ${size}px;
        border-left-width: ${size}px;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: ${color};
      `;
    }

    if (placement === 'right') {
      return `
        left: -${size}px;
        top: 50%;
        margin-top: -${size}px;
        border-top-width: ${size}px;
        border-bottom-width: ${size}px;
        border-right-width: ${size}px;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-right-color: ${color};
      `;
    }

    return '';
  }}
`;
