# SmartUI Kit - React Native Component Library

[![React Native](https://img.shields.io/badge/React%20Native-0.76+-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-6.0+-DB7093?style=flat-square&logo=styled-components)](https://styled-components.com/)

A **comprehensive, production-ready UI component library** for React Native/Expo applications with full theme support, smooth animations, and TypeScript integration.

## 🌟 Features

- **40+ Custom Components** - Form inputs, layouts, navigation, feedback, and interactive components
- **Full Theme Support** - Seamless light/dark mode with styled-components integration
- **Smooth Animations** - Built with react-native-reanimated for 60fps performance
- **TypeScript First** - Complete type safety with excellent IntelliSense support
- **Accessibility Ready** - WCAG compliant components with screen reader support
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Zero Config** - Works out of the box with sensible defaults
- **Customizable** - Extensive prop APIs for complete customization

## 📦 Component Categories

### 🎨 Form Components (9)
TextInput, Switch, Checkbox, RadioButton, Dropdown, MultiSelect, Slider, SearchBar, Rating

### 📐 Layout & Structure (9)
Modal, Dialog, Divider, Accordion, BottomSheet, ActionSheet, Card, Menu, EmptyState

### 🖼️ Display Components (7)
Badge, NotificationBadge, Avatar, AvatarGroup, Skeleton, Chip, Progress

### 🧭 Navigation Components (3)
Tabs, SegmentedControl, Stepper

### ⚡ Interactive Components (3)
IconButton, FloatingActionButton, SwipeableItem

### 💬 Feedback Components (3)
Toast, Tooltip, Alert

**Total:** 40+ components with multiple variants

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Install Expo dependencies
npx expo install expo-linear-gradient expo-blur expo-haptics expo-status-bar react-native-reanimated react-native-screens react-native-safe-area-context

# Install additional packages
npm install styled-components zustand @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @expo/vector-icons
```

### Run the Project

```bash
# Start development server
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📚 Documentation

See [COMPONENTS.md](./COMPONENTS.md) for complete component documentation with:
- Detailed usage examples
- Props and TypeScript interfaces
- Multiple variant demonstrations
- Best practices and patterns

## 🎨 Theme System

SmartUI Kit uses styled-components for theming with full TypeScript support:

```typescript
import { ThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from '@/theme';

<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
  <App />
</ThemeProvider>
```

Theme includes:
- Colors (primary, secondary, success, error, accent, etc.)
- Typography (font families, sizes, weights)
- Spacing (consistent spacing scale)
- Border radius (radius variants)

## 🧩 Usage Example

```typescript
import { TextInput, ThemedButton, Card, useToast } from '@/components';

function MyScreen() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  return (
    <Card title="Login" subtitle="Enter your credentials">
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        variant="outlined"
      />
      <ThemedButton
        title="Login"
        variant="primary"
        onPress={() => showToast('Login successful!', 'success')}
      />
    </Card>
  );
}
```

## 🎯 Key Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **styled-components** - CSS-in-JS styling
- **react-native-reanimated** - High-performance animations
- **React Navigation** - Navigation library
- **Zustand** - Lightweight state management
- **@expo/vector-icons** - Icon library (Ionicons)

## 📱 Component Showcase

Run the app to explore the complete component showcase with live examples and interactive demos:

```bash
npm run start
```

Navigate to **Component Showcase** to see all components in action.

## 🤝 Contributing

This is a feature-complete component library. For bug reports or feature requests, please open an issue.

## 📄 License

This project is part of the SmartUI Kit component library.

---

**Built with ❤️ using React Native, Expo, and TypeScript**
