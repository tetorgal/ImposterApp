import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import StyledIcon from '@components/ui/StyledIcon';
import StyledCheckBox from '@components/ui/StyledCheckBox';
import StyledGradient from '@components/ui/StyledGradient';
import Sheet from '@components/ui/Sheet';
import ToggleSwitch from 'toggle-switch-react-native';
import { HeaderIcon } from '@components/ui/HeaderIcon';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const GAME_MODE_OPTIONS = [
  {
    label: 'Clasico',
    value: 'classic',
    imageSource: require('@assets/sus-dog.png'),
  },
  {
    label: 'Misterioso',
    value: 'mysterious',
    imageSource: require('@assets/icon.png'),
  },
  {
    label: 'Caos',
    value: 'chaos',
    imageSource: require('@assets/adaptive-icon.png'),
  },
];

export default function OfflinePregame() {
  const insets = useSafeAreaInsets();

  const [selectedMode, setSelectedMode] = useState<string>('classic');
  const players = 8;
  const [impostors, setImpostors] = useState<number>(2);
  const [hintsEnabled, setHintsEnabled] = useState<boolean>(true);
  const router = useRouter();

  const decrementImpostors = () => {
    setImpostors((current) => Math.max(1, current - 1));
  };

  const incrementImpostors = () => {
    setImpostors((current) => Math.min(players - 1, current + 1));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 220 + insets.bottom,
            flexGrow: 1,
            justifyContent: 'flex-start',
          }}>
          <View className="-mt-2">
            <HeaderIcon title="Offline" iconName="mobile" iconColorName="orange-400" />
          </View>

          <View className="-mt-1 w-full">
            <Text className="mb-2 text-center font-poppins font-bold text-gray-200">
              Modo de juego
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="w-full"
              contentContainerStyle={{ paddingRight: 8 }}>
              <View className="flex-row">
                {GAME_MODE_OPTIONS.map((option, index) => (
                  <View
                    key={option.value}
                    className={index < GAME_MODE_OPTIONS.length - 1 ? 'mr-2' : ''}>
                    <StyledCheckBox
                      title={option.label}
                      imageSource={option.imageSource}
                      selected={selectedMode === option.value}
                      onPress={() => setSelectedMode(option.value)}
                      className="mb-0 h-40 w-40"
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <Text className="mb-2 mt-1 text-center font-poppins font-bold text-gray-200">
            Configuración del juego
          </Text>

          <View className="my-4 gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">
            <Pressable
              className="group flex-row items-center justify-between py-2"
              onPress={() => router.navigate('/offline/offline-players')}>
              <View className="flex flex-row items-center gap-2 ">
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="group"
                    type="font-awesome"
                    colorName="blue-500"
                    size={24}></StyledIcon>
                </View>
                <Text className="font-poppins font-bold text-slate-100 group-active:text-slate-300">
                  Jugadores
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 font-poppins text-slate-100 group-active:text-slate-300">
                  {players}
                </Text>
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="chevron-right"
                    type="font-awesome"
                    size={12}
                    colorName="slate-200"
                  />
                </View>
              </View>
            </Pressable>

            <View className="h-px bg-slate-700" />

            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-1">
                <StyledIcon
                  name="user-secret"
                  type="font-awesome"
                  colorName="red-500"
                  size={24}></StyledIcon>
                <Text className="font-poppins font-bold text-slate-100">Impostores</Text>
                <View className="ml-1">
                  <StyledIcon
                    name="info-circle"
                    type="font-awesome"
                    size={12}
                    colorName="slate-300"
                  />
                </View>
              </View>
              <View className="flex-row items-center">
                <Pressable
                  className="h-7 w-7 items-center justify-center rounded-md bg-slate-700 active:bg-slate-600"
                  onPress={decrementImpostors}>
                  <Text className="font-poppins text-white">-</Text>
                </Pressable>
                <Text className="mx-3 font-poppins text-slate-100">{impostors}</Text>
                <Pressable
                  className="h-7 w-7 items-center justify-center rounded-md bg-orange-500 active:bg-orange-400"
                  onPress={incrementImpostors}>
                  <Text className="font-poppins text-white">+</Text>
                </Pressable>
              </View>
            </View>

            <View className="h-px bg-slate-700" />

            <View className="flex-row items-center justify-between py-2">
              <View className="flex flex-row gap-2">
                <StyledIcon
                  name="search"
                  type="font-awesome"
                  colorName="orange-400"
                  size={24}></StyledIcon>
                <Text className="font-poppins font-bold text-slate-100">Pista para impostores</Text>
              </View>
              <ToggleSwitch
                isOn={hintsEnabled}
                onColor="green"
                offColor="gray"
                size="small"
                onToggle={setHintsEnabled}
              />
            </View>
          </View>

          {/* ROUNDS TIME LIST */}
          <View className="gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">
            <Pressable className="group flex-row items-center justify-between py-2">
              <View className="flex flex-row items-center gap-2 ">
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="flag"
                    type="font-awesome"
                    colorName="gray-400"
                    size={24}></StyledIcon>
                </View>
                <Text className="font-poppins font-bold text-slate-100 group-active:text-slate-300">
                  Rondas
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 font-poppins text-slate-100 group-active:text-slate-300">
                  {players} Rondas
                </Text>
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="chevron-right"
                    type="font-awesome"
                    size={12}
                    colorName="slate-200"
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              className="group flex-row items-center justify-between py-2"
              onPress={() => router.navigate('/offline/offline-time')}>
              <View className="flex flex-row items-center gap-2 ">
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="history"
                    type="font-awesome"
                    colorName="gray-400"
                    size={24}></StyledIcon>
                </View>
                <Text className="font-poppins font-bold text-slate-100 group-active:text-slate-300">
                  Duración
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-2 font-poppins text-slate-100 group-active:text-slate-300">
                  {players} Minutos
                </Text>
                <View className="group-active:opacity-70">
                  <StyledIcon
                    name="chevron-right"
                    type="font-awesome"
                    size={12}
                    colorName="slate-200"
                  />
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>

        <Sheet>
          <Pressable className="w-full active:opacity-90">
            <StyledGradient
              colorNames={['green-500', 'emerald-600']}
              className="w-full items-center rounded-xl px-4 py-4">
              <Text className="font-poppins font-bold text-white">Iniciar juego</Text>
            </StyledGradient>
          </Pressable>
        </Sheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
