import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

export interface TabItem {
  key: string;
  label: string;
  icon?: IoniconsName;
  badge?: number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  scrollable = false,
  containerStyle,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.key || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabPress = (key: string, disabled?: boolean) => {
    if (disabled) return;

    if (controlledActiveTab === undefined) {
      setInternalActiveTab(key);
    }
    onChange?.(key);
  };

  const TabsContent = (
    <TabsContainer variant={variant} fullWidth={fullWidth} style={containerStyle}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          onPress={() => handleTabPress(tab.key, tab.disabled)}
          activeOpacity={0.7}
          isActive={activeTab === tab.key}
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          disabled={tab.disabled}
          tabCount={tabs.length}
        >
          {tab.icon && (
            <TabIcon>
              <Ionicons
                name={tab.icon}
                size={getIconSize(size)}
                color={getTabColor(activeTab === tab.key, tab.disabled, variant)}
              />
            </TabIcon>
          )}

          <TabLabel
            isActive={activeTab === tab.key}
            variant={variant}
            size={size}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabLabel>

          {tab.badge !== undefined && tab.badge > 0 && (
            <TabBadge>
              <TabBadgeText>{tab.badge > 99 ? '99+' : tab.badge}</TabBadgeText>
            </TabBadge>
          )}

          {variant === 'underline' && activeTab === tab.key && (
            <UnderlineIndicator />
          )}
        </TabButton>
      ))}
    </TabsContainer>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {TabsContent}
      </ScrollView>
    );
  }

  return TabsContent;
};

// TabPanel component for content
interface TabPanelProps {
  activeTab: string;
  tabKey: string;
  children: React.ReactNode;
  lazy?: boolean;
  keepMounted?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  activeTab,
  tabKey,
  children,
  lazy = true,
  keepMounted = false,
}) => {
  const [hasBeenActive, setHasBeenActive] = useState(activeTab === tabKey);

  React.useEffect(() => {
    if (activeTab === tabKey && !hasBeenActive) {
      setHasBeenActive(true);
    }
  }, [activeTab, tabKey]);

  if (lazy && !hasBeenActive) {
    return null;
  }

  if (keepMounted) {
    return (
      <PanelContainer isActive={activeTab === tabKey}>
        {children}
      </PanelContainer>
    );
  }

  return activeTab === tabKey ? <PanelContainer isActive>{children}</PanelContainer> : null;
};

// TabPanels container
interface TabPanelsProps {
  children: React.ReactNode;
  animated?: boolean;
}

export const TabPanels: React.FC<TabPanelsProps> = ({ children, animated = true }) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animated ? opacity.value : 1,
  }));

  return (
    <AnimatedPanelsContainer style={animatedStyle}>
      {children}
    </AnimatedPanelsContainer>
  );
};

const getTabColor = (isActive: boolean, disabled?: boolean, variant?: string) => {
  if (disabled) return '#94A3B8';
  if (isActive) {
    if (variant === 'pills') return '#ffffff';
    return '#4BB4FF';
  }
  return '#707E93';
};

const getIconSize = (size: string) => {
  const sizes = { small: 16, medium: 20, large: 24 };
  return sizes[size] || sizes.medium;
};

const getFontSize = (size: string) => {
  const sizes = { small: 12, medium: 14, large: 16 };
  return sizes[size] || sizes.medium;
};

const getPadding = (size: string) => {
  const paddings = {
    small: '8px 12px',
    medium: '12px 16px',
    large: '14px 20px',
  };
  return paddings[size] || paddings.medium;
};

const TabsContainer = styled.View<{ variant: string; fullWidth: boolean }>`
  flex-direction: row;
  ${({ variant, theme }) => {
    if (variant === 'pills') {
      return `
        background-color: ${theme.colors.surface};
        border-radius: ${theme.radius.md}px;
        padding: 4px;
      `;
    }
    if (variant === 'underline') {
      return `
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.border};
      `;
    }
    return '';
  }}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
`;

const TabButton = styled.TouchableOpacity<{
  isActive: boolean;
  variant: string;
  size: string;
  fullWidth: boolean;
  disabled?: boolean;
  tabCount: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => getPadding(size)};
  position: relative;
  ${({ fullWidth, tabCount }) => fullWidth && `flex: ${1 / tabCount};`}

  ${({ variant, isActive, theme, disabled }) => {
    if (variant === 'pills') {
      return `
        background-color: ${isActive ? theme.colors.primary : 'transparent'};
        border-radius: ${theme.radius.sm}px;
        margin-horizontal: 2px;
      `;
    }
    if (variant === 'underline') {
      return '';
    }
    return `
      background-color: ${isActive ? theme.colors.surface : 'transparent'};
      border-radius: ${theme.radius.sm}px ${theme.radius.sm}px 0 0;
      border-width: 1px;
      border-color: ${isActive ? theme.colors.border : 'transparent'};
      border-bottom-width: 0;
      margin-horizontal: 2px;
    `;
  }}

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const TabIcon = styled.View`
  margin-right: 6px;
`;

const TabLabel = styled.Text<{
  isActive: boolean;
  variant: string;
  size: string;
  disabled?: boolean;
}>`
  font-family: ${({ theme, isActive }) =>
    isActive ? theme.typography.fontFamily.semiBold : theme.typography.fontFamily.regular};
  font-size: ${({ size }) => getFontSize(size)}px;
  color: ${({ isActive, disabled, variant }) => getTabColor(isActive, disabled, variant)};
`;

const TabBadge = styled.View`
  background-color: #ff6b6b;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  padding: 2px 4px;
  margin-left: 6px;
  align-items: center;
  justify-content: center;
`;

const TabBadgeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: 10px;
  color: #ffffff;
`;

const UnderlineIndicator = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

// TabPanel styles
const PanelContainer = styled.View<{ isActive: boolean }>`
  ${({ isActive }) => !isActive && 'display: none;'}
`;

const AnimatedPanelsContainer = styled(Animated.View)`
  flex: 1;
`;
