# SmartUI Kit - Integration Guide

Complete guide for integrating SmartUI Kit into your React Native application.

## 📦 Installation Methods

### Method 1: Copy Components (Recommended for Customization)

This method gives you full control over the components and allows easy customization.

#### Step 1: Copy Required Folders

Copy these folders from SmartUI Kit to your project:

```bash
# From SmartUI Kit project root
your-smartui-kit/
  ├── src/
  │   ├── components/       # Copy this entire folder
  │   ├── theme/           # Copy this entire folder
  │   ├── providers/       # Copy this entire folder (if using ResponsiveProvider)
  │   └── types/           # Copy this entire folder
  └── assets/fonts/        # Copy if using custom fonts

# To your new project
your-child-app/
  ├── src/
  │   ├── components/      # Paste here
  │   ├── theme/          # Paste here
  │   ├── providers/      # Paste here
  │   └── types/          # Paste here
  └── assets/fonts/       # Paste here
```

#### Step 2: Install Dependencies

```bash
cd your-child-app

# Install Expo dependencies
npx expo install expo-linear-gradient expo-blur expo-haptics expo-status-bar react-native-reanimated react-native-screens react-native-safe-area-context expo-font

# Install other required packages
npm install styled-components zustand @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @expo/vector-icons

# Install dev dependencies
npm install --save-dev @types/styled-components-react-native babel-plugin-styled-components babel-plugin-module-resolver
```

#### Step 3: Configure Babel

Update your `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['babel-plugin-styled-components', { displayName: true }],
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: { '@': './src' },
      }],
      'react-native-reanimated/plugin' // Must be last
    ]
  };
};
```

#### Step 4: Configure TypeScript

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "extends": "expo/tsconfig.base"
}
```

#### Step 5: Load Custom Fonts (if needed)

In your `App.tsx`:

```typescript
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Italic': require('./assets/fonts/NunitoSans-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return <YourApp />;
}
```

#### Step 6: Wrap Your App with Theme Provider

```typescript
import { SmartThemeProvider } from '@/theme/SmartThemeProvider';
import { ToastProvider } from '@/components';

export default function App() {
  return (
    <SmartThemeProvider>
      <ToastProvider>
        {/* Your app content */}
      </ToastProvider>
    </SmartThemeProvider>
  );
}
```

---

## 🎨 Basic Usage Examples

### Example 1: Simple Form Screen

```typescript
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, ThemedButton, Switch } from '@/components';
import styled from 'styled-components/native';

export const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);

  return (
    <Container>
      <ScrollView>
        <TextInput
          label="Child's Name"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          variant="outlined"
        />

        <TextInput
          label="Parent Email"
          placeholder="parent@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          variant="outlined"
        />

        <Switch
          label="Enable Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />

        <ThemedButton
          title="Save Profile"
          variant="primary"
          onPress={() => console.log('Save')}
        />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
```

### Example 2: Interactive Card with Progress

```typescript
import React from 'react';
import { Card, Progress, Badge, IconButton } from '@/components';
import styled from 'styled-components/native';

export const LessonCard = ({ title, progress, level }) => {
  return (
    <Card
      variant="elevated"
      title={title}
      subtitle={`Level ${level}`}
      headerIcon="book"
      actions={[
        { label: 'Start', onPress: () => console.log('Start') },
      ]}
    >
      <ContentWrapper>
        <Badge text={`${progress}% Complete`} variant="success" />
        <Progress value={progress} color="success" showLabel />
      </ContentWrapper>
    </Card>
  );
};

const ContentWrapper = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;
```

### Example 3: Child-Friendly Rating System

```typescript
import React, { useState } from 'react';
import { Rating, Avatar, ThemedButton } from '@/components';
import { useToast } from '@/components';
import styled from 'styled-components/native';

export const ActivityFeedback = ({ activityName, childName }) => {
  const [rating, setRating] = useState(0);
  const { showToast } = useToast();

  const handleSubmit = () => {
    showToast({
      message: `Great job! ${childName} rated ${rating} stars! 🌟`,
      type: 'success'
    });
  };

  return (
    <Container>
      <Avatar name={childName} size="large" />

      <Title>How was {activityName}?</Title>

      <Rating
        value={rating}
        onChange={setRating}
        max={5}
        size="large"
        color="warning"
        showValue
      />

      <ThemedButton
        title="Submit Feedback"
        variant="success"
        onPress={handleSubmit}
        disabled={rating === 0}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h2}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
```

---

## 🎯 Child App Specific Use Cases

### 1. Reward System with Badges

```typescript
import { Badge, Avatar, Card } from '@/components';

export const RewardsScreen = ({ points, badges }) => (
  <>
    <Card title="Your Rewards">
      <Badge text={`${points} Points`} variant="accent" size="large" />
      {badges.map(badge => (
        <Badge key={badge} text={badge} variant="success" icon="star" />
      ))}
    </Card>
  </>
);
```

### 2. Progress Tracker

```typescript
import { Stepper, CircularProgress } from '@/components';

export const LearningProgress = ({ currentStep, steps }) => (
  <>
    <CircularProgress value={75} showLabel color="success" />

    <Stepper
      steps={steps}
      currentStep={currentStep}
      variant="horizontal"
      color="success"
    />
  </>
);
```

### 3. Interactive Games List

```typescript
import { Card, Chip, IconButton } from '@/components';

export const GameCard = ({ game }) => (
  <Card
    coverImage={game.image}
    title={game.name}
    subtitle={game.category}
  >
    <Chip label={game.ageRange} color="primary" icon="people" />
    <Chip label={`${game.duration} min`} color="secondary" icon="time" />
  </Card>
);
```

### 4. Safe Content with EmptyState

```typescript
import { EmptyState } from '@/components';

export const NoContentYet = () => (
  <EmptyState
    icon="happy"
    title="Nothing Here Yet!"
    description="Ask your parent to add some fun activities!"
    variant="illustration"
  />
);
```

---

## 🎨 Theme Customization for Kids

Create a custom theme for your child app:

```typescript
// src/theme/childTheme.ts
export const childTheme = {
  colors: {
    primary: '#FF6B9D',      // Playful pink
    secondary: '#C44569',    // Deep pink
    accent: '#FFA07A',       // Light coral
    success: '#00D9FF',      // Bright blue
    error: '#FF6348',        // Soft red
    warning: '#FFA502',      // Orange
    background: '#FFF5E6',   // Warm background
    surface: '#FFFFFF',
    textPrimary: '#2C3E50',
    textSecondary: '#7F8C8D',
    border: '#E8E8E8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontFamily: {
      // Use 'System' as default or load a playful font like 'ComicNeue'
      // See EXAMPLES.md for kid-friendly font recommendations
      regular: 'System',  // Or 'ComicNeue-Regular' after loading
      medium: 'System',
      semiBold: 'System',
      bold: 'System',
    },
    fontSize: {
      tiny: 12,
      small: 14,
      body: 16,
      h3: 20,
      h2: 24,
      h1: 32,
    },
  },
};
```

---

## 🚀 Quick Start Template

Here's a complete minimal setup:

```typescript
// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SmartThemeProvider } from '@/theme/SmartThemeProvider';
import { ToastProvider } from '@/components';
import { ChildHomeScreen } from './src/screens/ChildHomeScreen';

export default function App() {
  return (
    <SmartThemeProvider>
      <ToastProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ChildHomeScreen />
        </SafeAreaView>
      </ToastProvider>
    </SmartThemeProvider>
  );
}

// src/screens/ChildHomeScreen.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Badge, Progress, ThemedButton } from '@/components';
import styled from 'styled-components/native';

export const ChildHomeScreen = () => {
  return (
    <Container>
      <ScrollView>
        <Card
          title="Welcome Back!"
          subtitle="Let's learn something new today"
          variant="elevated"
        >
          <Badge text="5 New Activities" variant="success" />
          <Progress value={60} color="success" showLabel />

          <ThemedButton
            title="Start Learning"
            variant="primary"
            onPress={() => console.log('Start')}
          />
        </Card>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
```

---

## 📚 Available Components

All 40+ components are ready to use:

### Most Useful for Kids Apps:
- **Badge** - Rewards, achievements
- **Card** - Content containers
- **Progress** - Learning progress
- **Rating** - Activity feedback
- **Avatar** - Child profiles
- **Chip** - Tags, categories
- **EmptyState** - No content screens
- **Modal/Dialog** - Confirmations
- **Toast** - Fun notifications
- **Stepper** - Multi-step activities

### Full List:
See [COMPONENTS.md](./COMPONENTS.md) for complete documentation of all 40+ components.

---

## 🔧 Troubleshooting

### Issue: "Cannot find module '@/components'"

**Solution:** Ensure babel.config.js has the module-resolver plugin configured correctly.

### Issue: Theme not working

**Solution:** Make sure your app is wrapped with `<SmartThemeProvider>`.

### Issue: Fonts not loading

**Solution:** Check that fonts are in `assets/fonts/` and loaded with `useFonts()`.

### Issue: Reanimated errors

**Solution:** Ensure `react-native-reanimated/plugin` is the **last** plugin in babel.config.js.

---

## 📞 Need Help?

- Check [COMPONENTS.md](./COMPONENTS.md) for detailed component documentation
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub for bugs or questions

---

**Happy building! 🎨🚀**
