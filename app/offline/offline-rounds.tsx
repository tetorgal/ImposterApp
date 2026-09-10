import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@lib/store';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineRounds() {
  const router = useRouter();
  const activeGame = useGameStore((state) => state.activeGame);
  const players = useGameStore((state) => state.players);
  const gameConfig = useGameStore((state) => state.gameConfig);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  if (!activeGame || !activeGame.roles) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white">No hay juego activo.</Text>
      </SafeAreaView>
    );
  }

  const currentRoleObj = activeGame.roles[currentPlayerIndex];
  const currentPlayer = players.find((p) => p.id === currentRoleObj.playerId);

  const handleNext = () => {
    if (isRevealed) {
      // Move to next player or start discussion
      if (currentPlayerIndex < activeGame.roles.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        setIsRevealed(false);
      } else {
        router.replace('/offline/offline-discussion');
      }
    } else {
      setIsRevealed(true);
    }
  };

  const getRoleText = () => {
    if (currentRoleObj.role === 'impostor') return 'Eres el Impostor';
    if (currentRoleObj.role === 'mrblanco') return 'Eres Mr. Blanco';
    return 'Eres Civil';
  };

  const getRoleDescription = () => {
    if (currentRoleObj.role === 'impostor') {
      if (gameConfig.hintsEnabled) {
        return `Intenta que no te descubran. La pista es: ${activeGame.hint}`;
      }
      return 'Intenta que no te descubran. Escucha a los demás para adivinar la palabra.';
    }
    if (currentRoleObj.role === 'mrblanco') {
      return 'No sabes la palabra. Si te descubren, ¡puedes intentar adivinarla para ganar!';
    }
    return `La palabra secreta es: ${activeGame.word}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center px-6">
        {!isRevealed ? (
          <>
            <Text className="mb-8 text-center text-2xl font-bold text-white">
              Pasa el teléfono a
            </Text>
            <Text className="mb-12 text-center text-4xl font-bold text-emerald-400">
              {currentPlayer?.playerName}
            </Text>
            <Pressable className="w-full active:opacity-90" onPress={handleNext}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#059669',
                  paddingVertical: 16,
                  borderRadius: 12,
                }}>
                <Text className="text-xl font-bold text-white">
                  Si si soy {currentPlayer?.playerName}
                </Text>
              </View>
            </Pressable>
          </>
        ) : (
          <>
            <Text className="mb-6 text-center text-3xl font-bold text-white">{getRoleText()}</Text>
            <Text className="mb-12 px-4 text-center text-lg text-slate-300">
              {getRoleDescription()}
            </Text>
            <Pressable className="w-full active:opacity-90" onPress={handleNext}>
              <View className="min-h-[72px] w-full items-center justify-center rounded-2xl bg-slate-700 px-5">
                <Text className="text-xl font-bold text-white">
                  {currentPlayerIndex < activeGame.roles.length - 1
                    ? 'Ocultar y pasar al siguiente'
                    : 'Comenzar a jugar'}
                </Text>
              </View>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
