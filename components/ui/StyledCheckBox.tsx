import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { Circle, CircleDot } from 'lucide-react-native';
import StyledIcon from './StyledIcon';

interface StyledCheckBoxProps {
  title: string;
  imageSource: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
  className?: string;
}

export default function StyledCheckBox({
  title,
  imageSource,
  selected,
  onPress,
  className = '',
}: StyledCheckBoxProps) {
  return (
    <Pressable
      className={`relative mb-3 aspect-square overflow-hidden rounded-xl border-2 p-3 ${
        selected ? 'border-green-400 bg-green-800/70' : 'border-slate-600 bg-slate-800/40'
      } ${className}`}
      onPress={onPress}>
      <View className="absolute right-2 top-2">
        <StyledIcon
          Icon={selected ? CircleDot : Circle}
          size={20}
          colorName={selected ? 'green-400' : 'slate-300'}
        />
      </View>

      <View className="flex-1 items-center justify-center overflow-hidden rounded-lg">
        <Image source={imageSource} className="h-full w-full" resizeMode="contain" />
      </View>
      <Text className="mt-2 text-center text-base text-slate-100" numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}
