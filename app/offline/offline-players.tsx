import { HeaderIcon } from '@components/ui/HeaderIcon';
import Sheet from '@components/ui/Sheet';
import StyledInput from '@components/ui/StyledInput';
import { PlayerPill } from '@components/ui/PlayerPill';
import { useGameStore } from '@lib/store';
import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Platform, Pressable, ScrollView, Text, Vibration, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GroupIcon, PencilIcon, PlusIcon } from 'lucide-react-native';
import { themeColors } from '@lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

type PlayerForm = {
  playerName: string;
};

export default function OfflinePlayers() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const players = useGameStore((state) => state.players);
  const addPlayer = useGameStore((state) => state.addPlayer);
  const updatePlayer = useGameStore((state) => state.updatePlayer);
  const removePlayer = useGameStore((state) => state.removePlayer);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<PlayerForm>({
    defaultValues: { playerName: '' },
  });

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const showFeedback = (message: string) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedbackMessage(message);
    feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1600);
  };

  const handleDelete = (id: string) => {
    const player = players.find((item) => item.id === id);
    if (!player) return;
    setDeletingId(id);
    setTimeout(() => {
      removePlayer(id);
      Vibration.vibrate(50);
      showFeedback(`Eliminado ${player.playerName}`);
      if (editingId === id) {
        setEditingId(null);
        reset({ playerName: '' });
      }
      setDeletingId(null);
    }, 150);
  };

  const handleEdit = (id: string) => {
    const player = players.find((item) => item.id === id);
    if (!player) return;
    setEditingId(id);
    setValue('playerName', player.playerName);
    showFeedback(`Editando ${player.playerName}`);
  };

  const onSubmit: SubmitHandler<PlayerForm> = (data) => {
    const name = data.playerName.trim();
    if (!name) {
      showFeedback('Escribe un nombre primero');
      return;
    }
    if (editingId) {
      updatePlayer(editingId, name);
      setEditingId(null);
      showFeedback(`Actualizado ${name}`);
    } else {
      addPlayer(name);
      Vibration.vibrate([0, 20, 40, 20]);
      showFeedback(`Añadido ${name}`);
    }
    reset();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#0f172a' }}
      edges={['bottom', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: Math.max(insets.bottom, 24) + 140, // Space for the bottom sheet
          }}>
          <HeaderIcon
            title="Jugadores"
            iconName={GroupIcon}
            iconColorName={themeColors.gray}
            subtitle="3-24 jugadores"
          />
          <Text style={{ textAlign: 'center', color: '#4ade80', marginVertical: 16 }}>
            {players.length} jugadores
          </Text>
          {feedbackMessage ? (
            <Text style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: 12 }}>
              {feedbackMessage}
            </Text>
          ) : null}
          <View style={{ gap: 12 }}>
            {players.map((player) => (
              <PlayerPill
                key={player.id}
                name={player.playerName}
                initial={player.playerName ? player.playerName[0] : '?'}
                iconName={PencilIcon}
                iconColor="green-400"
                variant={player.variant}
                onDelete={() => handleDelete(player.id)}
                onEdit={() => handleEdit(player.id)}
                isDeleting={deletingId === player.id}
              />
            ))}
          </View>
        </ScrollView>
        <Sheet keyboardOffset={insets.top + 80} contentClassName="px-5 py-6 flex-col gap-2">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Controller
              control={control}
              name="playerName"
              render={({ field: { value, onChange } }) => (
                <StyledInput
                  placeholder="Añadir jugador"
                  containerClassName="flex-1"
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            <Pressable onPress={handleSubmit(onSubmit)}>
              <LinearGradient
                colors={[themeColors.onlineGradientStart, themeColors.onlineGradientEnd]}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {editingId ? <PencilIcon color="#fff" /> : <PlusIcon color="#fff" />}
              </LinearGradient>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              setEditingId(null);
              reset();
              router.back();
            }}
            style={{ marginTop: 8 }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#334155',
                paddingVertical: 16,
                borderRadius: 12,
              }}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                {editingId ? 'Cancelar Edición' : 'Volver'}
              </Text>
            </View>
          </Pressable>
        </Sheet>
      </View>
    </SafeAreaView>
  );
}
