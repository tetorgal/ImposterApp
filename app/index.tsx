import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text className="font-poppins-bold text-lg text-white">Home screen</Text>
      <Link href={'/about'} className="font-poppins text-lg text-white underline">
        Go to about
      </Link>
    </View>
  );
}
