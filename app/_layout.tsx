import { Stack } from 'expo-router';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }}></Stack.Screen>
        <Stack.Screen name="about" options={{ title: 'About', headerShown: true }}></Stack.Screen>
      </Stack>
      <StatusBar className="" />
    </SafeAreaProvider>
  );
}
