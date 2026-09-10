import { Stack } from 'expo-router';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { HeroUINativeProvider } from 'heroui-native';

import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  GoogleSans_400Regular,
  GoogleSans_700Bold,
} from '@expo-google-fonts/google-sans';
import React, { useEffect } from 'react';
import TopNavBar from '@components/ui/TopNavBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    GoogleSans_400Regular,
    GoogleSans_700Bold,
  });

  const createHeader = (variant: 'home' | 'back') => () => <TopNavBar variant={variant} />;

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#0f172a' },
              headerTintColor: '#c4c4c4',
              headerTitle: '',
              headerShadowVisible: false,
            }}>
            <Stack.Screen
              name="index"
              options={{ title: 'Home', headerShown: true, header: createHeader('home') }}
            />
            <Stack.Screen
              name="about"
              options={{ title: 'About', headerShown: true, header: createHeader('back') }}
            />
            <Stack.Screen
              name="offline/offline-pregame"
              options={{ title: 'Offline', headerShown: true, header: createHeader('home') }}
            />
            <Stack.Screen
              name="offline/offline-players"
              options={{ title: 'Players', headerShown: true, header: createHeader('back') }}
            />
            <Stack.Screen
              name="offline/offline-rounds"
              options={{ title: 'Rounds', headerShown: true, header: createHeader('back') }}
            />
            <Stack.Screen
              name="offline/offline-time"
              options={{ title: 'Time', headerShown: true, header: createHeader('back') }}
            />
          </Stack>
          <StatusBar barStyle="light-content" />
        </SafeAreaProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
