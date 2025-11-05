import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, FlatList, ViewStyle, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

interface Props {
  options: DropdownOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  containerStyle?: ViewStyle;
}

export const Dropdown: React.FC<Props> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  searchable = false,
  multiple = false,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const rotateAnim = useSharedValue(0);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const toggleDropdown = () => {
    if (!disabled) {
      const newState = !isOpen;
      setIsOpen(newState);
      rotateAnim.value = withSpring(newState ? 1 : 0, {
        damping: 12,
        stiffness: 150,
      });
    }
  };

  const handleSelectOption = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
    rotateAnim.value = withSpring(0);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value * 180}deg` }],
  }));

  return (
    <Container style={containerStyle}>
      {label && <Label>{label}</Label>}

      <SelectButton
        onPress={toggleDropdown}
        disabled={disabled}
        hasError={!!error}
        activeOpacity={0.7}
      >
        <SelectText hasValue={!!selectedOption} disabled={disabled}>
          {selectedOption?.label || placeholder}
        </SelectText>

        <AnimatedIconWrapper style={animatedIconStyle}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={disabled ? '#94A3B8' : '#3C4A59'}
          />
        </AnimatedIconWrapper>
      </SelectButton>

      {error && <ErrorText>{error}</ErrorText>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalOverlay onPress={() => setIsOpen(false)} activeOpacity={1}>
          <DropdownMenu>
            {searchable && (
              <SearchInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <OptionItem
                  onPress={() => !item.disabled && handleSelectOption(item.value)}
                  disabled={item.disabled}
                  isSelected={item.value === value}
                >
                  {item.icon && (
                    <Ionicons name={item.icon as any} size={20} color="#3C4A59" />
                  )}
                  <OptionText
                    isSelected={item.value === value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </OptionText>
                  {item.value === value && (
                    <Ionicons name="checkmark" size={20} color="#4BB4FF" />
                  )}
                </OptionItem>
              )}
              ListEmptyComponent={
                <EmptyState>
                  <EmptyText>No options found</EmptyText>
                </EmptyState>
              }
              style={{ maxHeight: 300 }}
            />
          </DropdownMenu>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

// MultiSelect component variant
interface MultiSelectProps extends Omit<Props, 'value' | 'onValueChange' | 'multiple'> {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  values,
  onValuesChange,
  placeholder = 'Select options',
  label,
  error,
  disabled = false,
  searchable = false,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const rotateAnim = useSharedValue(0);

  const selectedLabels = options
    .filter((opt) => values.includes(opt.value))
    .map((opt) => opt.label)
    .join(', ');

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const toggleDropdown = () => {
    if (!disabled) {
      const newState = !isOpen;
      setIsOpen(newState);
      rotateAnim.value = withSpring(newState ? 1 : 0);
    }
  };

  const handleToggleOption = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue];
    onValuesChange(newValues);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value * 180}deg` }],
  }));

  return (
    <Container style={containerStyle}>
      {label && <Label>{label}</Label>}

      <SelectButton
        onPress={toggleDropdown}
        disabled={disabled}
        hasError={!!error}
        activeOpacity={0.7}
      >
        <SelectText hasValue={values.length > 0} disabled={disabled}>
          {selectedLabels || placeholder}
        </SelectText>

        <AnimatedIconWrapper style={animatedIconStyle}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={disabled ? '#94A3B8' : '#3C4A59'}
          />
        </AnimatedIconWrapper>
      </SelectButton>

      {error && <ErrorText>{error}</ErrorText>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalOverlay onPress={() => setIsOpen(false)} activeOpacity={1}>
          <DropdownMenu>
            {searchable && (
              <SearchInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <OptionItem
                  onPress={() => !item.disabled && handleToggleOption(item.value)}
                  disabled={item.disabled}
                  isSelected={values.includes(item.value)}
                >
                  <CheckboxWrapper>
                    <Checkbox isChecked={values.includes(item.value)}>
                      {values.includes(item.value) && (
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                      )}
                    </Checkbox>
                  </CheckboxWrapper>
                  <OptionText
                    isSelected={values.includes(item.value)}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </OptionText>
                </OptionItem>
              )}
              style={{ maxHeight: 300 }}
            />
          </DropdownMenu>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.small}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const SelectButton = styled.TouchableOpacity<{
  hasError: boolean;
  disabled: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  min-height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SelectText = styled.Text<{ hasValue: boolean; disabled: boolean }>`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme, hasValue }) =>
    hasValue ? theme.colors.textPrimary : theme.colors.textSecondary};
`;

const AnimatedIconWrapper = styled(Animated.View)``;

const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.tiny}px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const DropdownMenu = styled.View`
  width: 90%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 10;
  overflow: hidden;
`;

const SearchInput = styled.TextInput`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const OptionItem = styled.TouchableOpacity<{
  isSelected: boolean;
  disabled?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.surface : 'transparent'};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const OptionText = styled.Text<{ isSelected: boolean; disabled?: boolean }>`
  flex: 1;
  font-family: ${({ theme, isSelected }) =>
    isSelected ? theme.typography.fontFamily.semiBold : theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmptyState = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CheckboxWrapper = styled.View``;

const Checkbox = styled.View<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  border-width: 2px;
  border-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
`;
