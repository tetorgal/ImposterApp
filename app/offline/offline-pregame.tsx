import React from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import StyledCheckBox from '@components/ui/StyledCheckBox';
import Sheet from '@components/ui/Sheet';
import ToggleSwitch from 'toggle-switch-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Clock, FlagIcon, GroupIcon, SearchIcon, Users } from 'lucide-react-native';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, GameMode } from '@lib/store';

const GAME_MODE_OPTIONS = [
  {
    label: 'Clásico',
    value: 'classic' as GameMode,
    imageSource: require('@assets/sus-dog.png'),
  },
  {
    label: 'Misterioso',
    value: 'mysterious' as GameMode,
    imageSource: require('@assets/icon.png'),
  },
  {
    label: 'Caos',
    value: 'chaos' as GameMode,
    imageSource: require('@assets/adaptive-icon.png'),
  },
];

export default function OfflinePregame() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const playersCount = useGameStore((state) => state.players.length);
  const gameConfig = useGameStore((state) => state.gameConfig);
  const setGameConfig = useGameStore((state) => state.setGameConfig);
  const startGame = useGameStore((state) => state.startGame);

  const decrementImpostors = () => {
    setGameConfig({ impostors: Math.max(1, gameConfig.impostors - 1) });
  };

  const incrementImpostors = () => {
    setGameConfig({ impostors: Math.min(Math.max(1, playersCount - 1), gameConfig.impostors + 1) });
  };

  const handleStartGame = () => {
    if (playersCount < 3) {
      alert('Necesitas al menos 3 jugadores para jugar.');
      return;
    }
    startGame();
    router.navigate('/offline/offline-rounds');
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#020617' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 220 + insets.bottom,
          }}>
          <View className="mb-10">
            <Text className="mb-2 text-4xl font-bold tracking-tighter text-white">Sala Local</Text>
            <Text className="text-slate-400">Configura la partida y los jugadores.</Text>
          </View>

          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Modo de juego
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-6 mb-8 w-full px-6"
            contentContainerStyle={{ paddingRight: 24 }}>
            <View className="flex-row gap-3">
              {GAME_MODE_OPTIONS.map((option) => (
                <StyledCheckBox
                  key={option.value}
                  title={option.label}
                  imageSource={option.imageSource}
                  selected={gameConfig.mode === option.value}
                  onPress={() => setGameConfig({ mode: option.value })}
                  className="mb-0 w-40"
                />
              ))}
            </View>
          </ScrollView>

          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Ajustes
          </Text>

          <View className="mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            <Pressable
              className="flex-row items-center justify-between border-b border-slate-800/50 p-5 active:bg-slate-800/50"
              onPress={() => router.navigate('/offline/offline-players')}>
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                  <GroupIcon color="#6366f1" size={20} />
                </View>
                <Text className="text-lg font-bold tracking-tight text-slate-200">Jugadores</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-slate-400">{playersCount}</Text>
                <ChevronRight size={20} color="#475569" />
              </View>
            </Pressable>

            <View className="flex-row items-center justify-between border-b border-slate-800/50 p-5">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                  <Users color="#ef4444" size={20} />
                </View>
                <Text className="text-lg font-bold tracking-tight text-slate-200">Impostores</Text>
              </View>
              <View className="flex-row items-center rounded-full border border-slate-800 bg-slate-950 p-1">
                <Pressable
                  className="h-8 w-8 items-center justify-center rounded-full active:bg-slate-800"
                  onPress={decrementImpostors}>
                  <Text className="font-bold text-slate-400">-</Text>
                </Pressable>
                <Text className="w-8 text-center font-bold text-slate-200">
                  {gameConfig.impostors}
                </Text>
                <Pressable
                  className="h-8 w-8 items-center justify-center rounded-full bg-slate-800 active:bg-slate-700"
                  onPress={incrementImpostors}>
                  <Text className="font-bold text-slate-200">+</Text>
                </Pressable>
              </View>
            </View>

            <View className="flex-row items-center justify-between p-5">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                  <SearchIcon color="#f59e0b" size={20} />
                </View>
                <Text className="text-lg font-bold tracking-tight text-slate-200">
                  Pistas para impostores
                </Text>
              </View>
              <ToggleSwitch
                isOn={gameConfig.hintsEnabled}
                onColor="#10b981"
                offColor="#334155"
                size="small"
                onToggle={(val) => setGameConfig({ hintsEnabled: val })}
              />
            </View>
          </View>

          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            Tiempo
          </Text>

          <View className="mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            <Pressable className="flex-row items-center justify-between border-b border-slate-800/50 p-5">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-teal-500/10">
                  <FlagIcon color="#14b8a6" size={20} />
                </View>
                <Text className="text-lg font-bold tracking-tight text-slate-200">Rondas</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-slate-400">{gameConfig.rounds}</Text>
                <ChevronRight size={20} color="#475569" />
              </View>
            </Pressable>

            <Pressable
              className="flex-row items-center justify-between p-5 active:bg-slate-800/50"
              onPress={() => router.navigate('/offline/offline-time')}>
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <Clock color="#3b82f6" size={20} />
                </View>
                <Text className="text-lg font-bold tracking-tight text-slate-200">Duración</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-slate-400">{gameConfig.durationMinutes} min</Text>
                <ChevronRight size={20} color="#475569" />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Sheet includeSafeAreaPadding={true} contentClassName="px-6 py-4">
        <Pressable className="w-full active:opacity-90" onPress={handleStartGame}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#059669',
              paddingVertical: 16,
              borderRadius: 12,
            }}>
            <Text className="text-lg font-bold uppercase tracking-wider text-white">
              Iniciar Partida
            </Text>
          </View>
        </Pressable>
      </Sheet>
    </SafeAreaView>
  );
}
