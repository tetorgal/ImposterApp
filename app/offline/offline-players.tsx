import { HeaderIcon } from '@components/ui/HeaderIcon';
import { View } from 'react-native';

export default function OfflinePlayers() {
  return (
    <View className="flex-1 bg-slate-900 p-4 pb-32">
      <HeaderIcon title="Jugadores" iconName="group" iconColorName="blue-500" />
    </View>
  );
}
