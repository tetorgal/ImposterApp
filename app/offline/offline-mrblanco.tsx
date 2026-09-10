import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@lib/store';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineMrBlanco() {
  const router = useRouter();
  const activeGame = useGameStore((state) => state.activeGame);
  const players = useGameStore((state) => state.players);
  const setActiveGameState = useGameStore((state) => state.setActiveGameState);

  const [guess, setGuess] = useState('');

  if (!activeGame) return null;

  const mrBlancoId = activeGame.roles.find((r) => r.role === 'mrblanco')?.playerId;
  const mrBlancoPlayer = players.find((p) => p.id === mrBlancoId);

  const handleGuess = () => {
    const isCorrect = guess.trim().toLowerCase() === activeGame.word.toLowerCase();

    setActiveGameState({
      winner: isCorrect ? 'mrblanco' : 'civils',
      status: 'resolution',
    });

    router.replace('/offline/offline-resolution');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-2 text-center text-2xl font-bold text-white">
          ¡Han atrapado a Mr. Blanco!
        </Text>
        <Text className="mb-8 text-center text-xl font-bold text-emerald-400">
          {mrBlancoPlayer?.playerName}
        </Text>

        <Text className="mb-6 text-center text-lg text-slate-300">
          Puedes robar la victoria si adivinas la palabra secreta.
        </Text>

        <TextInput
          className="mb-12 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-center text-xl text-white"
          placeholder="Escribe la palabra..."
          placeholderTextColor="#64748b"
          value={guess}
          onChangeText={setGuess}
          autoCapitalize="none"
        />

        <Pressable
          className={`w-full active:opacity-90 ${!guess.trim() ? 'opacity-50' : ''}`}
          onPress={handleGuess}
          disabled={!guess.trim()}>
          <LinearGradient
            colors={[themeColors.onlineGradientStart, themeColors.onlineGradientEnd]}
            className="min-h-[72px] w-full items-center justify-center rounded-2xl px-5">
            <Text className="text-xl font-bold text-white">Adivinar Palabra</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
