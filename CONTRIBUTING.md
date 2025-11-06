# Contributing to SmartUI Kit

Thank you for your interest in contributing to SmartUI Kit! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Expo CLI
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smartui-kit.git
   cd smartui-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 📝 Development Workflow

### Branch Naming

- Feature branches: `feature/component-name` or `feature/description`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/description`
- Refactoring: `refactor/description`

### Coding Standards

#### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid using `any` type

#### Component Structure

```typescript
import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface ComponentNameProps {
  // Props interface
  prop1: string;
  prop2?: number;
  style?: ViewStyle;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = 0,
  style,
}) => {
  // Component implementation
  return <Container style={style}>{/* ... */}</Container>;
};

// Styled components
const Container = styled.View`
  // Styles using theme
  background-color: ${({ theme }) => theme.colors.background};
`;
```

#### Theme Integration

- Always use theme values for colors, spacing, typography
- Access theme via `useTheme()` hook or styled-components props

```typescript
import { useTheme } from 'styled-components/native';

const theme = useTheme();
const color = theme.colors.primary;
```

#### Animation

- Use `react-native-reanimated` for animations
- Prefer `useSharedValue` and `useAnimatedStyle`

### Code Quality

Before submitting a PR, ensure:

1. **Type checking passes**
   ```bash
   npm run type-check
   ```

2. **Linting passes**
   ```bash
   npm run lint
   ```

3. **Code is formatted**
   ```bash
   npm run format
   ```

### Documentation

When adding a new component:

1. **Add to COMPONENTS.md**
   - Usage example with code
   - Props documentation
   - Multiple variant examples

2. **Add to ComponentShowcaseScreen**
   - Working example in the app
   - Demonstrates key features

3. **Update exports**
   - Export from component file
   - Add to `src/components/ui/index.ts`
   - Add to `src/components/index.ts`

## 🐛 Bug Reports

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Device/platform information
- Relevant code snippets

## ✨ Feature Requests

When suggesting features:

- Describe the feature and use case
- Explain why it would be valuable
- Provide examples or mockups if possible
- Consider if it fits the library's scope

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-component
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns
   - Add TypeScript types

3. **Test your changes**
   - Test on iOS, Android, and Web if possible
   - Verify theme integration (light/dark modes)
   - Check TypeScript and linting

4. **Update documentation**
   - Update COMPONENTS.md
   - Add showcase example
   - Update README if needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add MyComponent with animation support"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/my-new-component
   ```

7. **PR Description**
   - Clear title describing the change
   - Detailed description of what and why
   - Screenshots/videos of new features
   - Link related issues

## 📋 Commit Message Guidelines

Follow conventional commits format:

- `feat: add Tooltip component with positioning`
- `fix: resolve SwipeableItem animation issue`
- `docs: update Avatar component documentation`
- `refactor: improve Modal animation performance`
- `style: format code with prettier`
- `chore: update dependencies`

## 🎨 Component Guidelines

### Props Design

- Make components flexible but with sensible defaults
- Use descriptive prop names
- Group related props
- Support common customization patterns

### Accessibility

- Add proper accessibility labels
- Support screen readers
- Ensure keyboard navigation where applicable
- Test with accessibility features enabled

### Performance

- Optimize re-renders with `React.memo` when appropriate
- Use `useCallback` and `useMemo` for expensive operations
- Avoid inline functions in render
- Profile animations for 60fps

## 🔍 Code Review

All PRs require review before merging. Reviewers will check:

- Code quality and style
- TypeScript types
- Documentation completeness
- Theme integration
- Performance implications
- Accessibility considerations

## ❓ Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review COMPONENTS.md documentation

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to SmartUI Kit! 🎉
