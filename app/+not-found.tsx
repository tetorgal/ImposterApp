import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }}></Stack.Screen>
      <View className="flex-1 items-center justify-center bg-slate-600">
        <Link href={'/'} className="text-lg text-white underline">
          Go back to Home Screen
        </Link>
      </View>
    </>
  );
}
