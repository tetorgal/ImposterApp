import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import StyledIcon from './StyledIcon';

export default function TopNavBar() {
  const router = useRouter();

  return (
    <View className="w-full flex-row items-center justify-between bg-slate-900 px-4 py-12">
      <Pressable
        accessibilityLabel="Go to home"
        className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
        onPress={() => router.navigate('/')}>
        <StyledIcon name="home" type="font-awesome" size={18} colorName="slate-100" />
      </Pressable>
      <Pressable
        accessibilityLabel="Go to about"
        className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
        onPress={() => router.navigate('/about')}>
        <StyledIcon name="question-circle" type="font-awesome" size={18} colorName="slate-100" />
      </Pressable>
    </View>
  );
}
