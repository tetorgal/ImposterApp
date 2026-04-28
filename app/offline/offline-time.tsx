import React, { useState } from 'react';
import { View } from 'react-native';
import { HeaderIcon } from '@components/ui/HeaderIcon';
import ListView from '@components/ui/ListView';

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
        iconName="history"
        iconColorName="gray-200"
        subtitle="Recomendado segun el tamaño de tu grupo"
      />

      <ListView items={listItems} scrollable />
    </View>
  );
}
