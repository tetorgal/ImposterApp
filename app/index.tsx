import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text className="text-white">Home screen</Text>
      <Link href={'/about'} className="text-lg text-white underline">
        Go to about
      </Link>
    </View>
  );
}
