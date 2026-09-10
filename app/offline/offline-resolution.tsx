import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore, Role } from '@lib/store';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineResolution() {
  const router = useRouter();
  const activeGame = useGameStore((state) => state.activeGame);
  const players = useGameStore((state) => state.players);
  const setActiveGameState = useGameStore((state) => state.setActiveGameState);

  const [winnerMessage, setWinnerMessage] = useState('');
  const [winnerColor, setWinnerColor] = useState('');

  useEffect(() => {
    if (!activeGame || !activeGame.eliminatedPlayerId) return;

    if (activeGame.winner === 'mrblanco') {
      setWinnerMessage('¡Mr. Blanco robó la victoria!');
      setWinnerColor('text-blue-400');
    } else if (activeGame.winner === 'civils') {
      setWinnerMessage('¡Los Civiles ganaron!');
      setWinnerColor('text-emerald-400');
    } else {
      // Determine if they voted out an impostor
      const eliminatedRoleObj = activeGame.roles.find(
        (r) => r.playerId === activeGame.eliminatedPlayerId
      );
      if (eliminatedRoleObj?.role === 'impostor') {
        setWinnerMessage('¡Atraparon al Impostor! Ganaron los Civiles.');
        setWinnerColor('text-emerald-400');
      } else {
        setWinnerMessage('¡Se equivocaron! Ganaron los Impostores.');
        setWinnerColor('text-error');
      }
    }
  }, [activeGame]);

  if (!activeGame) return null;

  const handleFinish = () => {
    setActiveGameState({}); // clear active game or keep it for history
    router.replace('/offline/offline-pregame');
  };

  const getRoleName = (role: Role) => {
    if (role === 'impostor') return 'Impostor';
    if (role === 'mrblanco') return 'Mr. Blanco';
    return 'Civil';
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 px-6 pt-10">
        <Text className="mb-2 text-center text-3xl font-bold text-white">Fin de la Ronda</Text>

        <Text className={`mb-6 text-center text-2xl font-bold text-gray-300 ${winnerColor}`}>
          {winnerMessage}
        </Text>

        <View className="mb-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">
          <Text className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            La palabra era
          </Text>
          <Text className="text-center text-3xl font-bold text-white">{activeGame.word}</Text>
        </View>

        <Text className="mb-4 font-bold text-slate-300">Roles de los Jugadores</Text>
        <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-3 pb-8">
            {activeGame.roles.map((roleObj) => {
              const p = players.find((player) => player.id === roleObj.playerId);
              const isEliminated = p?.id === activeGame.eliminatedPlayerId;

              return (
                <View
                  key={roleObj.playerId}
                  className={`flex-row items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4 ${isEliminated ? 'opacity-50' : ''}`}>
                  <Text
                    className={`text-lg font-bold text-white ${isEliminated ? 'line-through' : ''}`}>
                    {p?.playerName}
                  </Text>
                  <Text
                    className={`font-bold text-red-400 ${roleObj.role === 'impostor' ? 'text-error' : roleObj.role === 'mrblanco' ? 'text-blue-400' : 'text-emerald-400'}`}>
                    {getRoleName(roleObj.role)}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View className="py-6">
          <Pressable className="w-full active:opacity-90" onPress={handleFinish}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#059669',
                paddingVertical: 16,
                borderRadius: 12,
              }}>
              <Text className="text-xl font-bold text-white">Volver al lobby</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
