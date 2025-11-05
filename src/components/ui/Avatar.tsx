import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IoniconsName } from '@/types/icons';

interface Props {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  shape?: 'circle' | 'rounded' | 'square';
  icon?: IoniconsName;
  backgroundColor?: string;
  textColor?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  badge?: React.ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const Avatar: React.FC<Props> = ({
  source,
  name,
  size = 'medium',
  shape = 'circle',
  icon,
  backgroundColor,
  textColor = '#ffffff',
  status,
  badge,
  onPress,
  containerStyle,
}) => {
  const avatarSize = typeof size === 'number' ? size : getSizeValue(size);
  const initials = getInitials(name);

  const renderContent = () => {
    if (source) {
      const imageSource = typeof source === 'string' ? { uri: source } : source;
      return (
        <AvatarImage
          source={imageSource}
          size={avatarSize}
          shape={shape}
        />
      );
    }

    if (icon) {
      return (
        <Ionicons
          name={icon}
          size={avatarSize * 0.5}
          color={textColor}
        />
      );
    }

    if (initials) {
      return (
        <InitialsText size={avatarSize} color={textColor}>
          {initials}
        </InitialsText>
      );
    }

    return (
      <Ionicons
        name="person"
        size={avatarSize * 0.5}
        color={textColor}
      />
    );
  };

  const content = (
    <AvatarContainer
      size={avatarSize}
      shape={shape}
      backgroundColor={backgroundColor || getRandomColor(name)}
      style={containerStyle}
    >
      {renderContent()}

      {status && (
        <StatusIndicator
          status={status}
          size={avatarSize}
          shape={shape}
        />
      )}

      {badge && (
        <BadgeWrapper size={avatarSize}>
          {badge}
        </BadgeWrapper>
      )}
    </AvatarContainer>
  );

  if (onPress) {
    return (
      <Touchable onPress={onPress} activeOpacity={0.7}>
        {content}
      </Touchable>
    );
  }

  return content;
};

// AvatarGroup component for displaying multiple avatars
interface AvatarGroupProps {
  avatars: Array<{
    id: string | number;
    source?: ImageSourcePropType | string;
    name?: string;
  }>;
  max?: number;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  spacing?: number;
  onPressMore?: () => void;
  containerStyle?: ViewStyle;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'medium',
  spacing = -8,
  onPressMore,
  containerStyle,
}) => {
  const theme = useTheme();
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const avatarSize = typeof size === 'number' ? size : getSizeValue(size);

  return (
    <GroupContainer style={containerStyle}>
      {displayAvatars.map((avatar, index) => (
        <AvatarWrapper
          key={avatar.id}
          spacing={spacing}
          zIndex={displayAvatars.length - index}
        >
          <Avatar
            {...avatar}
            size={size}
            containerStyle={{
              borderWidth: 2,
              borderColor: theme.colors.background,
            }}
          />
        </AvatarWrapper>
      ))}

      {remainingCount > 0 && (
        <AvatarWrapper
          spacing={spacing}
          zIndex={0}
        >
          <Avatar
            size={size}
            name={`+${remainingCount}`}
            backgroundColor="#94A3B8"
            onPress={onPressMore}
            containerStyle={{
              borderWidth: 2,
              borderColor: theme.colors.background,
            }}
          />
        </AvatarWrapper>
      )}
    </GroupContainer>
  );
};

const getInitials = (name?: string): string => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getRandomColor = (seed?: string): string => {
  const colors = [
    '#4BB4FF', '#5DD39E', '#FFB84C', '#FF6B6B',
    '#9B59B6', '#3498DB', '#E74C3C', '#1ABC9C',
    '#F39C12', '#D35400', '#C0392B', '#8E44AD',
  ];

  if (!seed) return colors[0];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const getSizeValue = (size: string): number => {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  };
  return sizes[size] || sizes.medium;
};

const getStatusColor = (status: string): string => {
  const colors = {
    online: '#5DD39E',
    offline: '#94A3B8',
    busy: '#FF6B6B',
    away: '#FFB84C',
  };
  return colors[status] || colors.offline;
};

const getBorderRadius = (shape: string, size: number): number => {
  if (shape === 'circle') return size / 2;
  if (shape === 'square') return 0;
  return size * 0.2; // rounded
};

const AvatarContainer = styled.View<{
  size: number;
  shape: string;
  backgroundColor: string;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ shape, size }) => getBorderRadius(shape, size)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const AvatarImage = styled.Image<{
  size: number;
  shape: string;
}>`
  width: 100%;
  height: 100%;
`;

const InitialsText = styled.Text<{ size: number; color: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ size }) => size * 0.4}px;
  color: ${({ color }) => color};
`;

const StatusIndicator = styled.View<{
  status: string;
  size: number;
  shape: string;
}>`
  position: absolute;
  bottom: ${({ size }) => size * 0.05}px;
  right: ${({ size }) => size * 0.05}px;
  width: ${({ size }) => size * 0.25}px;
  height: ${({ size }) => size * 0.25}px;
  border-radius: ${({ size }) => size * 0.125}px;
  background-color: ${({ status }) => getStatusColor(status)};
  border-width: 2px;
  border-color: #ffffff;
`;

const BadgeWrapper = styled.View<{ size: number }>`
  position: absolute;
  top: ${({ size }) => -size * 0.1}px;
  right: ${({ size }) => -size * 0.1}px;
`;

const Touchable = styled.TouchableOpacity``;

// AvatarGroup styles
const GroupContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarWrapper = styled.View<{ spacing: number; zIndex: number }>`
  margin-left: ${({ spacing }) => spacing}px;
  z-index: ${({ zIndex }) => zIndex};
`;
