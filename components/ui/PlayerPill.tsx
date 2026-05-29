import { View, Text, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import StyledIcon from './StyledIcon';

import { Avatar } from 'heroui-native';
import { LucideIcon, Trash } from 'lucide-react-native';

interface PlayerPillProps {
  name?: string;
  initial: string;
  iconName: LucideIcon;
  iconColor: string;
  variant: 'success' | 'danger' | 'accent' | 'warning';
  onDelete?: () => void;
  onEdit?: () => void;
  isNew?: boolean;
  isDeleting?: boolean;
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
      <View className="flex flex-1 flex-row items-center justify-between rounded-3xl bg-slate-800 px-4 py-3">
        <View className="flex flex-row items-center gap-2">
          <Avatar className="rounded-full" color={variant} alt={initial.toUpperCase()}>
            <Avatar.Fallback>{initial.toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <Text className="px-2 text-lg text-gray-300 ">{name}</Text>
        </View>
        <Pressable onPress={onEdit} className="p-1">
          <StyledIcon Icon={iconName} colorName={iconColor} size={16} />
        </Pressable>
      </View>
      {/* Cancel */}
      <Pressable className="shrink-0" onPress={onDelete}>
        {/* <StyledGradient
                    colorNames={['red-400', 'red-600']}
                    className="w-12 h-12 items-center justify-center rounded-full"
                > */}
        <StyledIcon Icon={Trash} colorName={'red-400'} size={16} />
        {/* </StyledGradient> */}
      </Pressable>
    </Animated.View>
  );
}
