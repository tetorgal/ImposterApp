import { View, Text, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import StyledIcon from './StyledIcon';

import StyledAvatar from './StyledAvatar';

type AvatarVariant = 'red' | 'yellow' | 'blue' | 'green';

interface PlayerPillProps {
  name?: string;
  initial: string;
  iconName: string;
  iconColor: string;
  variant?: AvatarVariant;
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
  variant = 'red',
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
          <StyledAvatar rounded title={initial.toUpperCase()} variant={variant} />
          <Text className="px-2 font-poppins text-lg text-gray-300 ">{name}</Text>
        </View>
        <Pressable onPress={onEdit} className="p-1">
          <StyledIcon name={iconName} type="font-awesome" colorName={iconColor} size={16} />
        </Pressable>
      </View>
      {/* Cancel */}
      <Pressable className="shrink-0" onPress={onDelete}>
        {/* <StyledGradient
                    colorNames={['red-400', 'red-600']}
                    className="w-12 h-12 items-center justify-center rounded-full"
                > */}
        <StyledIcon name={'trash'} type="font-awesome" colorName={'red-400'} size={16} />
        {/* </StyledGradient> */}
      </Pressable>
    </Animated.View>
  );
}
