import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
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
      className={`relative mb-3 overflow-hidden rounded-xl border-2 p-3 ${
        selected ? 'border-orange-400 bg-slate-800/70' : 'border-slate-600 bg-slate-800/40'
      } ${className}`}
      onPress={onPress}>
      <View className="absolute right-2 top-2">
        <StyledIcon
          name={selected ? 'dot-circle-o' : 'circle-thin'}
          type="font-awesome"
          size={20}
          colorName={selected ? 'orange-400' : 'slate-300'}
        />
      </View>

      <Image source={imageSource} className="h-24 w-full rounded-lg p-4" resizeMode="cover" />
      <Text className="text-center font-poppins text-base font-bold text-slate-100">{title}</Text>
    </Pressable>
  );
}
