import { Pressable, Text, View } from 'react-native';
import StyledGradient from './StyledGradient';
import StyledIcon from './StyledIcon';

interface ModeCardProps {
  title: string;
  description: string;
  iconName: string;
  iconType: string;
  iconColorName: string;
  gradient: [string, string];
  buttonLabel?: string;
  onPress?: () => void;
}

export default function ModeCard({
  title,
  description,
  iconName,
  iconType,
  iconColorName,
  gradient,
  buttonLabel = 'Jugar',
  onPress,
}: ModeCardProps) {
  return (
    <StyledGradient colorNames={gradient} className=" w-2/5 rounded-lg">
      <View className=" items-center justify-center p-5">
        <StyledIcon name={iconName} type={iconType} size={36} colorName={iconColorName} />
        <View className="flex items-center justify-center py-2">
          <Text className="font-poppins text-lg font-bold text-white">{title}</Text>
          <Text className="text-center font-poppins text-gray-100 text-shadow">{description}</Text>
        </View>
        <Pressable
          className="rounded-lg bg-slate-300/40 px-3 py-1 active:bg-slate-300"
          onPress={onPress}>
          <Text className="font-poppins text-white">{buttonLabel}</Text>
        </Pressable>
      </View>
    </StyledGradient>
  );
}
