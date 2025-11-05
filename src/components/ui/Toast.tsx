import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface ToastConfig {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  position?: 'top' | 'bottom';
}

interface ToastContextValue {
  showToast: (config: Omit<ToastConfig, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
}) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const toastIdCounter = React.useRef(0);

  const showToast = useCallback((config: Omit<ToastConfig, 'id'>) => {
    const id = `toast-${toastIdCounter.current++}`;
    const newToast: ToastConfig = {
      id,
      duration: 3000,
      type: 'info',
      position: 'bottom',
      ...config,
    };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => hideToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: ToastConfig;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const translateY = useSharedValue(toast.position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const handleDismiss = () => {
    translateY.value = withTiming(
      toast.position === 'top' ? -100 : 100,
      { duration: 200 },
      () => runOnJS(onDismiss)()
    );
    opacity.value = withTiming(0, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  return (
    <AnimatedToastWrapper style={animatedStyle} position={toast.position || 'bottom'}>
      <ToastContent type={toast.type || 'info'}>
        <IconWrapper>
          <Ionicons name={getIcon() as any} size={24} color="#ffffff" />
        </IconWrapper>

        <MessageWrapper>
          <ToastMessage>{toast.message}</ToastMessage>
        </MessageWrapper>

        {toast.action && (
          <ActionButton onPress={toast.action.onPress}>
            <ActionText>{toast.action.label}</ActionText>
          </ActionButton>
        )}

        <CloseButton onPress={handleDismiss}>
          <Ionicons name="close" size={20} color="#ffffff" />
        </CloseButton>
      </ToastContent>
    </AnimatedToastWrapper>
  );
};

// Helper hook for common toast actions
export const useToastActions = () => {
  const { showToast } = useToast();

  return {
    success: (message: string, duration?: number) =>
      showToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) =>
      showToast({ message, type: 'error', duration }),
    info: (message: string, duration?: number) =>
      showToast({ message, type: 'info', duration }),
    warning: (message: string, duration?: number) =>
      showToast({ message, type: 'warning', duration }),
  };
};

const getColorForType = (type: string): string => {
  const colors = {
    success: '#5DD39E',
    error: '#FF6B6B',
    warning: '#FFB84C',
    info: '#4BB4FF',
  };
  return colors[type] || colors.info;
};

const ToastContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${({ theme }) => theme.spacing.lg}px;
  pointer-events: box-none;
  z-index: 9999;
`;

const AnimatedToastWrapper = styled(Animated.View)<{ position: string }>`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  ${({ position }) => position === 'top' && 'margin-top: 12px;'}
`;

const ToastContent = styled.View<{ type: string }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ type }) => getColorForType(type)};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
  min-height: 56px;
`;

const IconWrapper = styled.View`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const MessageWrapper = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const ToastMessage = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: #ffffff;
  line-height: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: #ffffff;
  text-transform: uppercase;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;
