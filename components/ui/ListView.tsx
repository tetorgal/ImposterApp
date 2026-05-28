import React, { ReactNode } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import StyledIcon from './StyledIcon';
// import StyledGradient from './StyledGradient';
import { ChevronRight } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

export interface ListViewItem {
  label: string;
  labelClassName?: string;
  labelSuffix?: ReactNode;
  labelSuffixClassName?: string;
  rightText?: ReactNode;
  rightTextClassName?: string;
  showEndIcon?: boolean;
  endIconName?: string;
  endIconType?: string;
  endIconColorName?: string;
  isSelected?: boolean;
  key?: string;
  onPress?: () => void;
}

interface ListViewProps {
  items: ListViewItem[];
  className?: string;
  itemClassName?: string;
  scrollable?: boolean;
}

export default function ListView({
  items,
  className = 'rounded-xl border border-slate-700 bg-slate-800 px-4 py-2',
  itemClassName = 'group flex-row items-center justify-between py-2',
  scrollable = false,
}: ListViewProps) {
  const listContent = (
    <View className={className}>
      {items.map((item, index) => {
        const finalLabelClassName = item.isSelected
          ? 'text-green-400'
          : (item.labelClassName ?? 'text-slate-100');
        const finalRightTextClassName = item.rightTextClassName ?? 'text-slate-100';
        const shouldShowEndIcon = item.isSelected;

        return (
          <Pressable
            key={item.key ?? `${item.label}-${index}`}
            className={itemClassName}
            onPress={item.onPress}>
            <View className="flex-row items-center gap-2">
              <Text
                className={`font-poppins font-bold ${finalLabelClassName} group-active:text-slate-300`}>
                {item.label}
              </Text>
              {item.labelSuffix ? (
                <Text
                  className={`font-poppins font-bold ${item.labelSuffixClassName ?? finalLabelClassName} group-active:text-slate-300`}>
                  {item.labelSuffix}
                </Text>
              ) : null}
            </View>

            {(item.rightText || shouldShowEndIcon) && (
              <View className="flex-row items-center">
                {item.rightText ? (
                  <Text
                    className={`font-poppins mr-2 ${finalRightTextClassName} group-active:text-slate-300`}>
                    {item.rightText}
                  </Text>
                ) : null}
                {shouldShowEndIcon ? (
                  <View className="group-active:opacity-70">
                    {item.endIconName != null && (
                      <StyledIcon
                        Icon={ChevronRight}
                        size={12}
                        colorName={
                          item.isSelected
                            ? themeColors.success
                            : (item.endIconColorName ?? themeColors.textMuted)
                        }
                      />
                    )}
                  </View>
                ) : null}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
  if (scrollable) {
    return (
      <View className="relative flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {listContent}
        </ScrollView>
        {/* <StyledGradient
          colorNames={['transparent', 'slate-900']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="pointer-events-none absolute -bottom-4 left-0 right-0 h-14"
        /> */}
      </View>
    );
  }

  return listContent;
}
