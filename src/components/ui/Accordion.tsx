import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle, LayoutAnimation, Platform, UIManager } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  icon?: IoniconsName;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onToggle?: (expanded: boolean) => void;
  containerStyle?: ViewStyle;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  icon,
  defaultExpanded = false,
  disabled = false,
  onToggle,
  containerStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const rotation = useSharedValue(defaultExpanded ? 1 : 0);
  const contentHeight = useSharedValue(defaultExpanded ? 1 : 0);
  const theme = useTheme();

  const handleToggle = () => {
    if (disabled) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newState = !isExpanded;
    setIsExpanded(newState);

    rotation.value = withSpring(newState ? 1 : 0, {
      damping: 12,
      stiffness: 150,
    });

    contentHeight.value = withTiming(newState ? 1 : 0, {
      duration: 300,
    });

    onToggle?.(newState);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(contentHeight.value, [0, 1], [0, 1]),
    maxHeight: interpolate(contentHeight.value, [0, 1], [0, 1000]),
  }));

  return (
    <Container style={containerStyle}>
      <Header
        onPress={handleToggle}
        disabled={disabled}
        activeOpacity={0.7}
        isExpanded={isExpanded}
      >
        {icon && (
          <IconWrapper>
            <Ionicons name={icon} size={20} color={theme.colors.textPrimary} />
          </IconWrapper>
        )}

        <Title disabled={disabled}>{title}</Title>

        <AnimatedChevron style={animatedIconStyle}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={disabled ? theme.colors.textSecondary : theme.colors.textPrimary}
          />
        </AnimatedChevron>
      </Header>

      {isExpanded && (
        <AnimatedContent style={animatedContentStyle}>
          <ContentWrapper>{children}</ContentWrapper>
        </AnimatedContent>
      )}
    </Container>
  );
};

// Accordion component for managing multiple items
interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
  allowMultiple?: boolean;
  defaultExpandedKeys?: string[];
  containerStyle?: ViewStyle;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  defaultExpandedKeys = [],
  containerStyle,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);

  const handleItemToggle = (key: string, isExpanded: boolean) => {
    if (allowMultiple) {
      setExpandedKeys((prev) =>
        isExpanded ? [...prev, key] : prev.filter((k) => k !== key)
      );
    } else {
      setExpandedKeys(isExpanded ? [key] : []);
    }
  };

  return (
    <AccordionContainer style={containerStyle}>
      {React.Children.map(children, (child, index) => {
        const key = `accordion-item-${index}`;
        const isExpanded = expandedKeys.includes(key);

        return React.cloneElement(child, {
          defaultExpanded: isExpanded,
          onToggle: (expanded: boolean) => {
            handleItemToggle(key, expanded);
            child.props.onToggle?.(expanded);
          },
        });
      })}
    </AccordionContainer>
  );
};

// Controlled Accordion Item
interface ControlledAccordionItemProps extends Omit<AccordionItemProps, 'defaultExpanded'> {
  expanded: boolean;
}

export const ControlledAccordionItem: React.FC<ControlledAccordionItemProps> = ({
  title,
  children,
  icon,
  expanded,
  disabled = false,
  onToggle,
  containerStyle,
}) => {
  const rotation = useSharedValue(expanded ? 1 : 0);
  const contentHeight = useSharedValue(expanded ? 1 : 0);
  const theme = useTheme();

  React.useEffect(() => {
    rotation.value = withSpring(expanded ? 1 : 0, {
      damping: 12,
      stiffness: 150,
    });

    contentHeight.value = withTiming(expanded ? 1 : 0, {
      duration: 300,
    });
  }, [expanded]);

  const handleToggle = () => {
    if (disabled) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle?.(!expanded);
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(contentHeight.value, [0, 1], [0, 1]),
    maxHeight: interpolate(contentHeight.value, [0, 1], [0, 1000]),
  }));

  return (
    <Container style={containerStyle}>
      <Header
        onPress={handleToggle}
        disabled={disabled}
        activeOpacity={0.7}
        isExpanded={expanded}
      >
        {icon && (
          <IconWrapper>
            <Ionicons name={icon} size={20} color={theme.colors.textPrimary} />
          </IconWrapper>
        )}

        <Title disabled={disabled}>{title}</Title>

        <AnimatedChevron style={animatedIconStyle}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={disabled ? theme.colors.textSecondary : theme.colors.textPrimary}
          />
        </AnimatedChevron>
      </Header>

      {expanded && (
        <AnimatedContent style={animatedContentStyle}>
          <ContentWrapper>{children}</ContentWrapper>
        </AnimatedContent>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  overflow: hidden;
`;

const Header = styled.TouchableOpacity<{
  isExpanded: boolean;
  disabled: boolean;
}>`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme, isExpanded }) =>
    isExpanded ? theme.colors.surface : theme.colors.background};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const IconWrapper = styled.View`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text<{ disabled: boolean }>`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.body}px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textSecondary : theme.colors.textPrimary};
`;

const AnimatedChevron = styled(Animated.View)`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

const AnimatedContent = styled(Animated.View)`
  overflow: hidden;
`;

const ContentWrapper = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  padding-top: 0;
`;

const AccordionContainer = styled.View`
  width: 100%;
`;
