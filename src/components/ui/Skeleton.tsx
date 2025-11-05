import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius,
  variant = 'rectangular',
  animation = 'pulse',
  style,
}) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (animation === 'pulse') {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 800, easing: Easing.ease }),
          withTiming(1, { duration: 800, easing: Easing.ease })
        ),
        -1,
        false
      );
    }
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation === 'pulse' ? opacity.value : 1,
  }));

  const getHeight = () => {
    if (variant === 'text') return 16;
    if (variant === 'circular') return width;
    return height;
  };

  const getBorderRadius = () => {
    if (borderRadius !== undefined) return borderRadius;
    if (variant === 'circular') {
      const size = typeof width === 'number' ? width : 50;
      return size / 2;
    }
    if (variant === 'rounded') return 8;
    if (variant === 'text') return 4;
    return 0;
  };

  return (
    <AnimatedSkeletonBox
      style={[animatedStyle, style]}
      width={width}
      height={getHeight()}
      borderRadius={getBorderRadius()}
    />
  );
};

// Preset skeleton components for common use cases
interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: number | string;
  spacing?: number;
  width?: number | string;
  containerStyle?: ViewStyle;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lastLineWidth = '70%',
  spacing = 8,
  width = '100%',
  containerStyle,
}) => {
  return (
    <SkeletonTextContainer style={containerStyle}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : width}
          style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
        />
      ))}
    </SkeletonTextContainer>
  );
};

interface SkeletonCardProps {
  hasAvatar?: boolean;
  hasImage?: boolean;
  lines?: number;
  containerStyle?: ViewStyle;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasAvatar = false,
  hasImage = false,
  lines = 3,
  containerStyle,
}) => {
  return (
    <SkeletonCardContainer style={containerStyle}>
      {hasImage && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          borderRadius={12}
          style={{ marginBottom: 12 }}
        />
      )}

      {hasAvatar && (
        <SkeletonCardHeader>
          <Skeleton variant="circular" width={48} height={48} />
          <SkeletonCardHeaderText>
            <Skeleton variant="text" width="60%" height={16} style={{ marginBottom: 6 }} />
            <Skeleton variant="text" width="40%" height={14} />
          </SkeletonCardHeaderText>
        </SkeletonCardHeader>
      )}

      <SkeletonText lines={lines} />
    </SkeletonCardContainer>
  );
};

interface SkeletonListProps {
  items?: number;
  hasAvatar?: boolean;
  hasSubtitle?: boolean;
  containerStyle?: ViewStyle;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  hasAvatar = false,
  hasSubtitle = false,
  containerStyle,
}) => {
  return (
    <SkeletonListContainer style={containerStyle}>
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonListItem key={index}>
          {hasAvatar && <Skeleton variant="circular" width={40} height={40} />}

          <SkeletonListContent hasAvatar={hasAvatar}>
            <Skeleton variant="text" width="70%" height={16} style={{ marginBottom: 6 }} />
            {hasSubtitle && <Skeleton variant="text" width="50%" height={14} />}
          </SkeletonListContent>
        </SkeletonListItem>
      ))}
    </SkeletonListContainer>
  );
};

interface SkeletonGridProps {
  columns?: number;
  rows?: number;
  spacing?: number;
  imageHeight?: number;
  containerStyle?: ViewStyle;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  columns = 2,
  rows = 2,
  spacing = 12,
  imageHeight = 150,
  containerStyle,
}) => {
  return (
    <SkeletonGridContainer style={containerStyle}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <SkeletonGridItem key={index} columns={columns} spacing={spacing}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={imageHeight}
            style={{ marginBottom: 8 }}
          />
          <Skeleton variant="text" width="80%" height={14} style={{ marginBottom: 6 }} />
          <Skeleton variant="text" width="60%" height={12} />
        </SkeletonGridItem>
      ))}
    </SkeletonGridContainer>
  );
};

// Profile skeleton
export const SkeletonProfile: React.FC<{ containerStyle?: ViewStyle }> = ({ containerStyle }) => {
  return (
    <SkeletonProfileContainer style={containerStyle}>
      <Skeleton variant="circular" width={100} height={100} style={{ marginBottom: 16 }} />
      <Skeleton variant="text" width={150} height={20} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width={120} height={16} style={{ marginBottom: 16 }} />
      <SkeletonText lines={2} width="100%" spacing={6} />
    </SkeletonProfileContainer>
  );
};

const AnimatedSkeletonBox = styled(Animated.View)<{
  width: number | string;
  height: number | string;
  borderRadius: number;
}>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SkeletonTextContainer = styled.View`
  width: 100%;
`;

const SkeletonCardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const SkeletonCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SkeletonCardHeaderText = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const SkeletonListContainer = styled.View`
  width: 100%;
`;

const SkeletonListItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const SkeletonListContent = styled.View<{ hasAvatar: boolean }>`
  flex: 1;
  ${({ hasAvatar, theme }) => hasAvatar && `margin-left: ${theme.spacing.md}px;`}
`;

const SkeletonGridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: -6px;
`;

const SkeletonGridItem = styled.View<{ columns: number; spacing: number }>`
  width: ${({ columns }) => `${100 / columns}%`};
  padding: ${({ spacing }) => spacing / 2}px;
`;

const SkeletonProfileContainer = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;
