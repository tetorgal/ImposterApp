import React, { useState } from 'react';
import { View } from 'react-native';
import { HeaderIcon } from '@components/ui/HeaderIcon';
import ListView from '@components/ui/ListView';
import { Clock } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

export default function OfflinePregame() {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(4);
  const listItems = [
    ...Array.from({ length: 24 }, (_, index) => {
      const minutes = index + 1;
      const isRecommended = minutes === 4;
      const isSelected = selectedMinutes === minutes;

      return {
        key: `${minutes}-minutes`,
        label: `${minutes} minuto${minutes === 1 ? '' : 's'}`,
        labelSuffix: isRecommended && !isSelected ? '(recomendado)' : undefined,
        labelSuffixClassName: 'text-gray-200',
        isSelected,
        onPress: () => setSelectedMinutes(minutes),
      };
    }),
  ];

  return (
    <View className="flex-1 bg-slate-900 p-4 pb-32">
      <HeaderIcon
        title="Duración"
        iconName={Clock}
        iconColorName={themeColors.gray}
        subtitle="Recomendado segun el tamaño de tu grupo"
      />

      <ListView items={listItems} scrollable />
    </View>
  );
}
