import { Stack } from 'expo-router';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import TopNavBar from '../components/ui/TopNavBar';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PRegular: Poppins_400Regular,
    PBold: Poppins_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f8fafc',
          headerTitle: '',
          headerShadowVisible: false,
          header: () => <TopNavBar />,
        }}>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }}></Stack.Screen>
        <Stack.Screen name="about" options={{ title: 'About', headerShown: true }}></Stack.Screen>
        <Stack.Screen
          name="offline-pregame"
          options={{ title: 'Offline', headerShown: true }}></Stack.Screen>
      </Stack>
      <StatusBar className="" />
    </SafeAreaProvider>
  );
}
