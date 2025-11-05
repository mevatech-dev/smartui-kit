import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { TextInputProps, ViewStyle, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (text: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  showCancel?: boolean;
  cancelText?: string;
  loading?: boolean;
  variant?: 'default' | 'rounded';
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onClear,
  onFocus,
  onBlur,
  placeholder = 'Search...',
  showCancel = false,
  cancelText = 'Cancel',
  loading = false,
  variant = 'default',
  containerStyle,
  ...rest
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const cancelWidth = useSharedValue(showCancel && isFocused ? 70 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    if (showCancel) {
      cancelWidth.value = withTiming(70, { duration: 200 });
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (showCancel && !value) {
      cancelWidth.value = withTiming(0, { duration: 200 });
    }
    onBlur?.();
  };

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  const handleCancel = () => {
    handleClear();
    setIsFocused(false);
    cancelWidth.value = withTiming(0, { duration: 200 });
  };

  const handleSubmit = () => {
    onSearch?.(value);
  };

  const cancelAnimatedStyle = useAnimatedStyle(() => ({
    width: cancelWidth.value,
    opacity: cancelWidth.value > 0 ? 1 : 0,
  }));

  return (
    <Container style={containerStyle}>
      <InputContainer variant={variant} focused={isFocused}>
        <SearchIcon>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        </SearchIcon>

        <Input
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          returnKeyType="search"
          {...rest}
        />

        {loading && (
          <ActionContainer>
            <ActivityIndicator color={theme.colors.textSecondary} />
          </ActionContainer>
        )}

        {!loading && value.length > 0 && (
          <ActionContainer>
            <ClearButton onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </ClearButton>
          </ActionContainer>
        )}
      </InputContainer>

      {showCancel && (
        <AnimatedCancelContainer style={cancelAnimatedStyle} as={CancelContainer}>
          <CancelButton onPress={handleCancel}>
            <CancelText>{cancelText}</CancelText>
          </CancelButton>
        </AnimatedCancelContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const InputContainer = styled.View<{ variant: 'default' | 'rounded'; focused: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ variant, theme }) =>
    variant === 'rounded' ? theme.radius.full : theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ focused, theme }) =>
    focused ? theme.colors.primary : theme.colors.border};
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  min-height: 44px;
`;

const SearchIcon = styled.View`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionContainer = styled.View`
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const ClearButton = styled.TouchableOpacity``;

const CancelContainer = styled.View`
  overflow: hidden;
`;

const AnimatedCancelContainer = styled(Animated.View)``;

const CancelButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

const CancelText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.primary};
`;
