import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SmartThemeProvider } from '@/theme/SmartThemeProvider';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Italic': require('../assets/fonts/NunitoSans-Italic.ttf'),
    'NunitoSans-Medium': require('../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-SemiBold': require('../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Bold': require('../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-ExtraBold': require('../assets/fonts/NunitoSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color="#4BB4FF" />
        <Text style={{ marginTop: 10 }}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SmartThemeProvider>
      <RootNavigator />
    </SmartThemeProvider>
  );
}
