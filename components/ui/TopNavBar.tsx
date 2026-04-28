import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyledIcon from './StyledIcon';

interface TopNavBarProps {
  variant?: 'home' | 'back';
}

export default function TopNavBar({ variant = 'home' }: TopNavBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const navigateHome = () => {
    router.replace('/');
  };

  const navigateAbout = () => {
    router.push('/about');
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    navigateHome();
  };

  return (
    <View
      className="w-full flex-row items-center justify-between bg-slate-900 px-4"
      style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}>
      {variant === 'home' ? (
        <>
          <Pressable
            accessibilityLabel="Go to home"
            className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
            onPress={navigateHome}>
            <StyledIcon name="home" type="font-awesome" size={18} colorName="slate-100" />
          </Pressable>
          <Pressable
            accessibilityLabel="Go to about"
            className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
            onPress={navigateAbout}>
            <StyledIcon
              name="question-circle"
              type="font-awesome"
              size={18}
              colorName="slate-100"
            />
          </Pressable>
        </>
      ) : (
        <Pressable
          accessibilityLabel="Go back"
          className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
          onPress={goBack}>
          <StyledIcon name="chevron-left" type="font-awesome" size={18} colorName="slate-100" />
        </Pressable>
      )}
    </View>
  );
}
