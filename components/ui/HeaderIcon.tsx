import { Text, View } from 'react-native';
import StyledIcon from './StyledIcon';

interface HeaderIconProps {
  title: string;
  iconName: string;
  iconType?: string;
  iconSize?: number;
  iconColorName?: string;
  subtitle?: string;
}

export function HeaderIcon({
  title,
  iconName,
  iconType = 'font-awesome',
  iconSize = 40,
  iconColorName = 'orange-400',
  subtitle,
}: HeaderIconProps) {
  return (
    <View className="flex items-center justify-center py-4">
      <StyledIcon name={iconName} type={iconType} size={iconSize} colorName={iconColorName} />
      <Text className="font-poppins text-xl font-bold text-slate-200">{title}</Text>
      {subtitle != null && <Text className="text-md font-poppins text-gray-400">{subtitle}</Text>}
    </View>
  );
}
