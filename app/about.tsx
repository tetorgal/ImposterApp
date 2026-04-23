import { Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppins text-lg text-white">About screen</Text>
      </View>
    </View>
  );
}
