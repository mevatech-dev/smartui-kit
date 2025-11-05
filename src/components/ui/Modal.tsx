import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Modal as RNModal, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  animationType?: 'fade' | 'slide' | 'scale';
  position?: 'center' | 'bottom' | 'top';
  contentStyle?: ViewStyle;
}

export const Modal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = 'scale',
  position = 'center',
  contentStyle,
}) => {
  const backdropOpacity = useSharedValue(0);
  const contentAnim = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 200 });
      contentAnim.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 });
      contentAnim.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const animatedContentStyle = useAnimatedStyle(() => {
    if (animationType === 'fade') {
      return { opacity: contentAnim.value };
    }

    if (animationType === 'slide') {
      const translateY = position === 'bottom'
        ? (1 - contentAnim.value) * 500
        : position === 'top'
        ? (contentAnim.value - 1) * 500
        : 0;

      return {
        transform: [{ translateY }],
        opacity: contentAnim.value,
      };
    }

    if (animationType === 'scale') {
      return {
        transform: [{ scale: contentAnim.value }],
        opacity: contentAnim.value,
      };
    }

    return {};
  });

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ModalContainer position={position}>
        <AnimatedBackdrop
          style={animatedBackdropStyle}
          as={TouchableOpacity}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />

        <AnimatedContent
          style={[animatedContentStyle, contentStyle]}
          size={size}
          position={position}
        >
          {(title || showCloseButton) && (
            <Header>
              {title && <Title>{title}</Title>}
              {showCloseButton && (
                <CloseButton onPress={onClose}>
                  <Ionicons name="close" size={24} color="#3C4A59" />
                </CloseButton>
              )}
            </Header>
          )}

          <ContentWrapper>{children}</ContentWrapper>
        </AnimatedContent>
      </ModalContainer>
    </RNModal>
  );
};

// Dialog component (simpler variant of Modal)
interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger' | 'success';
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} size="small" showCloseButton={false}>
      <DialogContent>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}

        <DialogActions>
          <DialogButton onPress={handleCancel} variant="secondary">
            <DialogButtonText variant="secondary">{cancelText}</DialogButtonText>
          </DialogButton>

          <DialogButton onPress={handleConfirm} variant={variant}>
            <DialogButtonText variant={variant}>{confirmText}</DialogButtonText>
          </DialogButton>
        </DialogActions>
      </DialogContent>
    </Modal>
  );
};

const getContentWidth = (size: string) => {
  const widths = {
    small: '80%',
    medium: '90%',
    large: '95%',
    fullscreen: '100%',
  };
  return widths[size] || widths.medium;
};

const getContentMaxWidth = (size: string) => {
  const maxWidths = {
    small: 320,
    medium: 500,
    large: 700,
    fullscreen: '100%',
  };
  return maxWidths[size] || maxWidths.medium;
};

const ModalContainer = styled.View<{ position: string }>`
  flex: 1;
  justify-content: ${({ position }) =>
    position === 'bottom' ? 'flex-end' : position === 'top' ? 'flex-start' : 'center'};
  align-items: center;
`;

const AnimatedBackdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AnimatedContent = styled(Animated.View)<{
  size: string;
  position: string;
}>`
  width: ${({ size }) => getContentWidth(size)};
  max-width: ${({ size }) => getContentMaxWidth(size)};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme, position, size }) =>
    position === 'bottom' || position === 'top' || size === 'fullscreen' ? 0 : theme.radius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 10;
  max-height: 90%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

const ContentWrapper = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

// Dialog specific styles
const DialogContent = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const DialogTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;

const DialogDescription = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 20px;
`;

const DialogActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const DialogButton = styled.TouchableOpacity<{ variant: string }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme, variant }) => {
    if (variant === 'danger') return theme.colors.error;
    if (variant === 'success') return theme.colors.success;
    if (variant === 'secondary') return theme.colors.surface;
    return theme.colors.primary;
  }};
  align-items: center;
  justify-content: center;
`;

const DialogButtonText = styled.Text<{ variant: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.textPrimary : '#ffffff')};
`;
