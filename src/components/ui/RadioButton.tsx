import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  labelPosition?: 'left' | 'right';
  containerStyle?: ViewStyle;
}

export const RadioButton: React.FC<Props> = ({
  selected,
  onSelect,
  label,
  disabled = false,
  size = 'medium',
  color,
  labelPosition = 'right',
  containerStyle,
}) => {
  const selectAnim = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    selectAnim.value = withSpring(selected ? 1 : 0, {
      damping: 12,
      stiffness: 150,
    });
  }, [selected]);

  const animatedInnerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: selectAnim.value }],
    opacity: selectAnim.value,
  }));

  const handlePress = () => {
    if (!disabled) {
      onSelect();
    }
  };

  const circleSize = getCircleSize(size);
  const innerSize = getInnerSize(size);

  const radioComponent = (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <OuterCircle size={circleSize} disabled={disabled} selected={selected} color={color}>
        <AnimatedInnerCircle style={animatedInnerStyle} size={innerSize} color={color} />
      </OuterCircle>
    </TouchableOpacity>
  );

  if (label) {
    return (
      <Container style={containerStyle}>
        {labelPosition === 'left' && <Label disabled={disabled}>{label}</Label>}
        {radioComponent}
        {labelPosition === 'right' && <Label disabled={disabled}>{label}</Label>}
      </Container>
    );
  }

  return radioComponent;
};

// RadioGroup component for managing multiple radio buttons
interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactElement<RadioGroupItemProps>[];
  containerStyle?: ViewStyle;
}

interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  children,
  containerStyle,
}) => {
  return (
    <GroupContainer style={containerStyle}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          selected: child.props.value === value,
          onSelect: () => onValueChange(child.props.value),
        })
      )}
    </GroupContainer>
  );
};

export const RadioGroupItem: React.FC<RadioGroupItemProps & { selected?: boolean; onSelect?: () => void }> = ({
  selected = false,
  onSelect = () => {},
  ...props
}) => {
  return <RadioButton selected={selected} onSelect={onSelect} {...props} />;
};

const getCircleSize = (size: 'small' | 'medium' | 'large') => {
  const sizes = { small: 18, medium: 24, large: 28 };
  return sizes[size];
};

const getInnerSize = (size: 'small' | 'medium' | 'large') => {
  const sizes = { small: 8, medium: 12, large: 14 };
  return sizes[size];
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const GroupContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text<{ disabled: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.textSecondary : theme.colors.textPrimary)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const OuterCircle = styled.View<{
  size: number;
  disabled: boolean;
  selected: boolean;
  color?: string;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  border-width: 2px;
  border-color: ${({ theme, selected, color }) =>
    selected ? color || theme.colors.primary : theme.colors.border};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const AnimatedInnerCircle = styled(Animated.View)<{
  size: number;
  color?: string;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
`;
