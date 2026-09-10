import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { Circle, CircleDot } from 'lucide-react-native';

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
      className={`relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl border ${
        selected ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-900'
      } ${className}`}
      onPress={onPress}>
      <View className="flex-1 items-center justify-center pt-2">
        <Image source={imageSource} className="h-16 w-16" resizeMode="contain" />
      </View>
      <View className="flex-row items-center justify-between px-4 pb-3">
        <Text
          className={`font-bold tracking-tight ${selected ? 'text-emerald-400' : 'text-slate-300'}`}
          numberOfLines={1}>
          {title}
        </Text>
        {selected ? <CircleDot size={16} color="#10b981" /> : <Circle size={16} color="#475569" />}
      </View>
    </Pressable>
  );
}
