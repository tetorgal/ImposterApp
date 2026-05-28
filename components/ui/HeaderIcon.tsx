import { Text, View } from 'react-native';
import StyledIcon from './StyledIcon';
import { LucideIcon } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

interface HeaderIconProps {
  title: string;
  iconName: LucideIcon;
  iconType?: string;
  iconSize?: number;
  iconColorName?: string;
  subtitle?: string;
}

export function HeaderIcon({
  title,
  iconName,
  iconSize = 48,
  iconColorName = 'gray', // default to the key in themeColors
  subtitle,
}: HeaderIconProps) {
  return (
    <View className="flex items-center justify-center py-4">
      <StyledIcon Icon={iconName} size={iconSize} colorName={iconColorName} />
      <Text className="font-poppins text-2xl font-bold text-slate-200">{title}</Text>
      {subtitle != null && <Text className="text-md font-poppins text-gray-400">{subtitle}</Text>}
    </View>
  );
}
