import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '@lib/store';
import { themeColors } from '@lib/theme';
import { PlayerPill } from '@components/ui/PlayerPill';
import { UserX } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineVote() {
  const router = useRouter();
  const activeGame = useGameStore((state) => state.activeGame);
  const players = useGameStore((state) => state.players);
  const setActiveGameState = useGameStore((state) => state.setActiveGameState);

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  if (!activeGame) return null;

  const handleEliminate = () => {
    if (!selectedPlayerId) return;

    const eliminatedRole = activeGame.roles.find((r) => r.playerId === selectedPlayerId);

    setActiveGameState({
      eliminatedPlayerId: selectedPlayerId,
      status: eliminatedRole?.role === 'mrblanco' ? 'mrblanco-guess' : 'resolution',
    });

    if (eliminatedRole?.role === 'mrblanco') {
      router.replace('/offline/offline-mrblanco');
    } else {
      router.replace('/offline/offline-resolution');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 px-6 pt-10">
        <Text className="mb-2 text-center text-2xl font-bold text-white">Votación</Text>
        <Text className="mb-8 text-center text-slate-300">¿A quién quieren eliminar?</Text>

        <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-3 pb-8">
            {players.map((player) => (
              <Pressable
                key={player.id}
                onPress={() => setSelectedPlayerId(player.id)}
                className="active:opacity-80">
                <PlayerPill
                  name={player.playerName}
                  initial={player.playerName[0]}
                  iconName={UserX}
                  iconColor={selectedPlayerId === player.id ? 'white' : 'slate-400'}
                  variant={player.variant}
                  isSelected={selectedPlayerId === player.id}
                  disableDelete={true}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View className="py-6">
          <Pressable
            className={`w-full active:opacity-90 ${!selectedPlayerId ? 'opacity-50' : ''}`}
            onPress={handleEliminate}
            disabled={!selectedPlayerId}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: selectedPlayerId ? themeColors.error : '#475569',
                paddingVertical: 16,
                borderRadius: 12,
              }}>
              <Text className="text-xl font-bold text-white">Eliminar Jugador</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
