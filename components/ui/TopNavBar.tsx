import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyledIcon from './StyledIcon';
import { BadgeQuestionMark, ChevronRight, Home } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

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
            <StyledIcon Icon={Home} size={18} colorName={themeColors.text} />
          </Pressable>
          <Pressable
            accessibilityLabel="Go to about"
            className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
            onPress={navigateAbout}>
            <StyledIcon Icon={BadgeQuestionMark} size={18} colorName={themeColors.gray} />
          </Pressable>
        </>
      ) : (
        <Pressable
          accessibilityLabel="Go back"
          className="rounded-full bg-slate-700/60 p-3 active:bg-slate-600"
          onPress={goBack}>
          <StyledIcon Icon={ChevronRight} size={18} colorName="slate-100" />
        </Pressable>
      )}
    </View>
  );
}
