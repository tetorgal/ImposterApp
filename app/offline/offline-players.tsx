import { HeaderIcon } from '@components/ui/HeaderIcon';
import Sheet from '@components/ui/Sheet';
// import StyledGradient from '@components/ui/StyledGradient';
import StyledIcon from '@components/ui/StyledIcon';
import StyledInput from '@components/ui/StyledInput';
import { PlayerPill } from '@components/ui/PlayerPill';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useQuery, useMutation } from 'convex/react';
import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  Vibration,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GroupIcon, Pencil, PencilIcon, PlusIcon } from 'lucide-react-native';
import { themeColors } from '@lib/theme';

type AvatarVariant = 'danger' | 'warning' | 'primary' | 'success';

type PlayerForm = {
  playerName: string;
};

type PlayerDoc = {
  _id: Id<'players'>;
  playerName: string;
  variant: AvatarVariant;
};

const avatarVariants: AvatarVariant[] = ['danger', 'warning', 'primary', 'success'];

const getNextVariant = (players: PlayerDoc[]) => {
  let selectedVariant = avatarVariants[0];
  let lowestCount = Number.POSITIVE_INFINITY;

  avatarVariants.forEach((variant) => {
    const count = players.filter((player) => player.variant === variant).length;
    if (count < lowestCount) {
      lowestCount = count;
      selectedVariant = variant;
    }
  });

  return selectedVariant;
};

export default function OfflinePlayers() {
  const insets = useSafeAreaInsets();
  const playerDB = (useQuery(api.controllers.players.get) ?? []) as PlayerDoc[];
  const createPlayer = useMutation(api.controllers.players.create);
  const updatePlayer = useMutation(api.controllers.players.update);
  const deletePlayer = useMutation(api.controllers.players.remove);

  const [editingId, setEditingId] = useState<Id<'players'> | null>(null);
  const [newlyCreatedId, setNewlyCreatedId] = useState<Id<'players'> | null>(null);
  const [deletingId, setDeletingId] = useState<Id<'players'> | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<PlayerForm>({
    defaultValues: { playerName: '' },
  });

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const showFeedback = (message: string) => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    setFeedbackMessage(message);
    feedbackTimerRef.current = setTimeout(() => setFeedbackMessage(null), 1600);
  };

  const handleDelete = async (id: Id<'players'>) => {
    const player = playerDB.find((item) => item._id === id);
    if (!player) return;

    setDeletingId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      await deletePlayer({ id });
      Vibration.vibrate(50);
      showFeedback(`Deleted ${player.playerName}`);
      if (editingId === id) {
        setEditingId(null);
        reset({ playerName: '' });
      }
    } catch (error) {
      console.error(error);
      showFeedback('Could not delete player');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: Id<'players'>) => {
    const player = playerDB.find((item) => item._id === id);
    if (!player) return;
    setEditingId(id);
    setValue('playerName', player.playerName);
    showFeedback(`Editing ${player.playerName}`);
  };

  const onSubmit: SubmitHandler<PlayerForm> = async (data) => {
    if (!data.playerName || data.playerName.trim() === '') {
      showFeedback('Type a player name first');
      return;
    }

    try {
      if (editingId) {
        await updatePlayer({ id: editingId, playerName: data.playerName.trim() });
        setEditingId(null);
        reset();
        showFeedback(`Updated ${data.playerName.trim()}`);
        return;
      }

      const createdId = await createPlayer({
        playerName: data.playerName.trim(),
        variant: getNextVariant(playerDB),
      });

      setNewlyCreatedId(createdId);
      reset();
      Vibration.vibrate([0, 20, 40, 20]);
      showFeedback(`Added ${data.playerName.trim()}`);
      setTimeout(() => setNewlyCreatedId(null), 800);
    } catch (error) {
      console.error(error);
      showFeedback('Could not save player');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 12}>
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 220 + insets.bottom,
            }}>
            <HeaderIcon
              title="Jugadores"
              iconName={GroupIcon}
              iconColorName={themeColors.gray}
              subtitle="3-24 jugadores"
            />
            <Text className="font-poppins my-4 text-center text-green-400">
              {playerDB.length} jugadores
            </Text>

            {feedbackMessage ? (
              <Text className="font-poppins mb-3 text-center text-sm text-slate-300">
                {feedbackMessage}
              </Text>
            ) : null}

            <View className="flex flex-col gap-3">
              {playerDB.map((player) => (
                <PlayerPill
                  key={player._id}
                  name={player.playerName}
                  initial={player.playerName[0]}
                  iconName={Pencil}
                  iconColor="green-400"
                  variant={player.variant}
                  onDelete={() => handleDelete(player._id)}
                  onEdit={() => handleEdit(player._id)}
                  isNew={newlyCreatedId === player._id}
                  isDeleting={deletingId === player._id}
                />
              ))}
            </View>
          </ScrollView>

          <Sheet
            keyboardOffset={insets.top + 80}
            contentClassName="px-5 py-6 flex flex-col justify-between flex-1 gap-2">
            <View className="flex flex-row items-center gap-2">
              <Controller
                control={control}
                name="playerName"
                render={({ field: { value, onChange } }) => (
                  <StyledInput
                    placeholder="Añadir jugador"
                    containerClassName="flex-1"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Pressable onPress={handleSubmit(onSubmit)} className="shrink-0">
                {/* <StyledGradient
                  colorNames={['green-400', 'emerald-500']}
                  className="h-12 w-12 items-center justify-center rounded-full active:opacity-75">
                  <StyledIcon
                    Icon={editingId ? PencilIcon : PlusIcon}
                    colorName={themeColors.background}
                  />
                </StyledGradient> */}
              </Pressable>
            </View>

            <Pressable className="mt-2 w-full active:opacity-90">
              {/* <StyledGradient
                colorNames={['slate-700', 'gray-800']}
                className="w-full items-center rounded-xl px-4 py-4">
                <Text className="font-poppins font-bold text-white">Cancelar</Text>
              </StyledGradient> */}
            </Pressable>
          </Sheet>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
