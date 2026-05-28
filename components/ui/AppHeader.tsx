import { Image, Text, View } from 'react-native';

interface AppHeaderProps {
  title: string;
  imageSource: any;
}

export default function AppHeader({ title, imageSource }: AppHeaderProps) {
  return (
    <View className="my-6 items-center justify-center">
      <Image source={imageSource} className="h-20 w-20 rounded-lg" />
      <Text className="font-poppins text-neon-orange text-shadow text-5xl font-extrabold">
        {title}
      </Text>
    </View>
  );
}
