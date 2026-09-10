import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@lib/store';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineDiscussion() {
  const router = useRouter();
  const gameConfig = useGameStore((state) => state.gameConfig);

  const [timeLeft, setTimeLeft] = useState(gameConfig.durationMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleVote = () => {
    router.replace('/offline/offline-vote');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-8 text-center text-2xl font-bold text-white">Tiempo de Discusión</Text>

        <Text className="mb-12 text-center text-7xl font-bold tabular-nums text-emerald-400">
          {formatTime(timeLeft)}
        </Text>

        {timeLeft <= 0 && (
          <Text className="text-error mb-8 text-center text-xl font-bold">
            ¡El tiempo se ha acabado!
          </Text>
        )}

        <Pressable className="w-full active:opacity-90" onPress={handleVote}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: themeColors.error,
              paddingVertical: 16,
              borderRadius: 12,
            }}>
            <Text className="text-xl font-bold text-white">Votar</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
