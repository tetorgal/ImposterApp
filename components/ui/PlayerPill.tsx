import { View, Text, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import StyledIcon from './StyledIcon';

import { LucideIcon, Trash } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

interface PlayerPillProps {
  name?: string;
  initial: string;
  iconName: LucideIcon;
  iconColor: string;
  variant: 'success' | 'danger' | 'secondary' | 'warning';
  onDelete?: () => void;
  onEdit?: () => void;
  isNew?: boolean;
  isDeleting?: boolean;
  isSelected?: boolean;
  disableDelete?: boolean;
}
export function PlayerPill({
  name,
  iconName,
  iconColor,
  initial,
  variant = 'danger',
  onDelete,
  onEdit,
  isNew = false,
  isDeleting = false,
  isSelected = false,
  disableDelete = false,
}: PlayerPillProps) {
  const popScale = useRef(new Animated.Value(0.92)).current;
  const deleteScale = useRef(new Animated.Value(1)).current;
  const deleteOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isNew) {
      popScale.setValue(0.92);
      Animated.spring(popScale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 14,
        speed: 18,
      }).start();
    }
  }, [isNew, popScale]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(deleteScale, {
        toValue: isDeleting ? 0.92 : 1,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(deleteOpacity, {
        toValue: isDeleting ? 0.6 : 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [deleteOpacity, deleteScale, isDeleting]);

  return (
    <Animated.View
      style={{ transform: [{ scale: isNew ? popScale : deleteScale }], opacity: deleteOpacity }}
      className="flex w-full flex-row items-center gap-4">
      {/* Card */}
      <View
        className={`flex flex-1 flex-row items-center justify-between rounded-full border-2 px-4 py-3 ${
          isSelected ? 'border-red-500 bg-red-500/20' : 'border-transparent bg-slate-800'
        }`}>
        <View className="flex flex-row items-center gap-3">
          <View
            className={`h-10 w-10 items-center justify-center rounded-full ${
              variant === 'success'
                ? 'bg-emerald-500'
                : variant === 'danger'
                  ? 'bg-rose-500'
                  : variant === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-indigo-500'
            }`}>
            <Text className="text-lg font-bold text-white">{initial?.toUpperCase() || '?'}</Text>
          </View>
          <Text className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
            {name}
          </Text>
        </View>
        <Pressable onPress={onEdit} className="p-1">
          <StyledIcon Icon={iconName} colorName={iconColor} size={16} />
        </Pressable>
      </View>
      {/* Cancel */}
      {!disableDelete && (
        <Pressable
          className="h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500 active:bg-rose-600"
          onPress={onDelete}>
          <Trash size={22} color="#ffffff" />
        </Pressable>
      )}
    </Animated.View>
  );
}
