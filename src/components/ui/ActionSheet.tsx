import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ActionSheetOption {
  label: string;
  onPress: () => void;
  icon?: IoniconsName;
  destructive?: boolean;
  disabled?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  showCancel?: boolean;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
  showCancel = true,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(500);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withSpring(500, { damping: 20, stiffness: 300 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const handleOptionPress = (onPress: () => void) => {
    onPress();
    onClose();
  };

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
      onRequestClose={onClose}
    >
      <Container>
        <TouchableWithoutFeedback onPress={onClose}>
          <AnimatedBackdrop style={backdropAnimatedStyle} as={Backdrop} />
        </TouchableWithoutFeedback>

        <AnimatedSheet style={sheetAnimatedStyle} as={Sheet}>
          {(title || message) && (
            <HeaderContainer>
              {title && <Title>{title}</Title>}
              {message && <Message>{message}</Message>}
            </HeaderContainer>
          )}

          <OptionsContainer>
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <OptionButton
                  onPress={() => handleOptionPress(option.onPress)}
                  disabled={option.disabled}
                  activeOpacity={0.7}
                >
                  {option.icon && (
                    <OptionIcon>
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={
                          option.destructive
                            ? theme.colors.error
                            : option.disabled
                            ? theme.colors.textSecondary
                            : theme.colors.textPrimary
                        }
                      />
                    </OptionIcon>
                  )}
                  <OptionText destructive={option.destructive} disabled={option.disabled}>
                    {option.label}
                  </OptionText>
                </OptionButton>
                {index < options.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </OptionsContainer>

          {showCancel && (
            <CancelContainer>
              <CancelButton onPress={onClose} activeOpacity={0.7}>
                <CancelText>{cancelLabel}</CancelText>
              </CancelButton>
            </CancelContainer>
          )}
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

const Sheet = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${({ theme }) => theme.radius.xl}px;
  border-top-right-radius: ${({ theme }) => theme.radius.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

const AnimatedSheet = styled(Animated.View)``;

const HeaderContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Message = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const OptionsContainer = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const OptionIcon = styled.View`
  width: 24px;
  align-items: center;
`;

const OptionText = styled.Text<{ destructive?: boolean; disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ destructive, disabled, theme }) =>
    destructive
      ? theme.colors.error
      : disabled
      ? theme.colors.textSecondary
      : theme.colors.textPrimary};
  flex: 1;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const CancelContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

const CancelText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
