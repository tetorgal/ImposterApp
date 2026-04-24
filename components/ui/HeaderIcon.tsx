import { Text, View } from 'react-native';
import StyledIcon from './StyledIcon';

interface HeaderIconProps {
  title: string;
  iconName: string;
  iconType?: string;
  iconSize?: number;
  iconColorName?: string;
}

export function HeaderIcon({
  title,
  iconName,
  iconType = 'font-awesome',
  iconSize = 40,
  iconColorName = 'orange-400',
}: HeaderIconProps) {
  return (
    <View className="my-4 flex items-center justify-center">
      <StyledIcon name={iconName} type={iconType} size={iconSize} colorName={iconColorName} />
      <Text className="font-poppins text-xl font-bold text-slate-200">{title}</Text>
    </View>
  );
}
