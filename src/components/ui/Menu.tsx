import React, { useState, useRef } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Modal, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface MenuItem {
  label: string;
  icon?: IoniconsName;
  onPress: () => void;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  containerStyle?: ViewStyle;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  containerStyle,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<any>(null);

  const handleOpen = () => {
    if (triggerRef.current) {
      triggerRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
        setVisible(true);
      });
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleItemPress = (item: MenuItem) => {
    if (!item.disabled) {
      item.onPress();
      handleClose();
    }
  };

  const getMenuPosition = () => {
    const menuWidth = 200;
    const spacing = 4;

    switch (placement) {
      case 'bottom-start':
        return { top: triggerLayout.y + triggerLayout.height + spacing, left: triggerLayout.x };
      case 'bottom-end':
        return { top: triggerLayout.y + triggerLayout.height + spacing, left: triggerLayout.x + triggerLayout.width - menuWidth };
      case 'top-start':
        return { bottom: triggerLayout.y - spacing, left: triggerLayout.x };
      case 'top-end':
        return { bottom: triggerLayout.y - spacing, left: triggerLayout.x + triggerLayout.width - menuWidth };
      default:
        return { top: triggerLayout.y + triggerLayout.height + spacing, left: triggerLayout.x };
    }
  };

  return (
    <Container style={containerStyle}>
      <TriggerContainer ref={triggerRef} onPress={handleOpen}>
        {trigger}
      </TriggerContainer>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <Backdrop>
            <TouchableWithoutFeedback>
              <MenuContainer style={getMenuPosition()}>
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.divider && index > 0 && <MenuDivider />}
                    <MenuItemContainer
                      onPress={() => handleItemPress(item)}
                      disabled={item.disabled}
                      activeOpacity={0.7}
                    >
                      {item.icon && (
                        <MenuItemIcon>
                          <Ionicons
                            name={item.icon}
                            size={20}
                            color={
                              item.destructive
                                ? theme.colors.error
                                : item.disabled
                                ? theme.colors.textSecondary
                                : theme.colors.textPrimary
                            }
                          />
                        </MenuItemIcon>
                      )}
                      <MenuItemText destructive={item.destructive} disabled={item.disabled}>
                        {item.label}
                      </MenuItemText>
                    </MenuItemContainer>
                  </React.Fragment>
                ))}
              </MenuContainer>
            </TouchableWithoutFeedback>
          </Backdrop>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};

const Container = styled.View``;

const TriggerContainer = styled.TouchableOpacity``;

const Backdrop = styled.View`
  flex: 1;
  background-color: transparent;
`;

const MenuContainer = styled.View`
  position: absolute;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const MenuItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const MenuItemIcon = styled.View`
  width: 24px;
  align-items: center;
`;

const MenuItemText = styled.Text<{ destructive?: boolean; disabled?: boolean }>`
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

const MenuDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-vertical: ${({ theme }) => theme.spacing.xs}px;
`;
