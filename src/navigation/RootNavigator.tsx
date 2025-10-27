import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '@/screens/HomeScreen';
import FormScreen from '@/screens/FormScreen';
import LayoutDemoScreen from '@/screens/LayoutDemoScreen';
import MotionDemoScreen from '@/screens/MotionDemoScreen';
import AdaptiveDemoScreen from '@/screens/AdaptiveDemoScreen';
import SmartHomeScreen from '@/screens/SmartHomeScreen';
import { useThemeStore } from '@/store/ThemeStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useThemeStore();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border },
      tabBarIcon: ({ color, size }) => {
        let icon: any = 'home';
        if (route.name === 'Progress') icon = 'activity';
        if (route.name === 'Forms') icon = 'edit';
        if (route.name === 'Effects') icon = 'zap';
        return <Feather name={icon} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={LayoutDemoScreen} />
      <Tab.Screen name="Forms" component={FormScreen} />
      <Tab.Screen name="Effects" component={MotionDemoScreen} />
    </Tab.Navigator>
  );
};

export default function RootNavigator() {
  const { isDark } = useThemeStore();
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Adaptive" component={AdaptiveDemoScreen} />
        <Stack.Screen name="Smart" component={SmartHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
