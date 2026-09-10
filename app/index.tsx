import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRightIcon, DatabaseIcon, Globe, Smartphone } from 'lucide-react-native';
import { PressableFeedback } from 'heroui-native';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-950 px-6 pt-16">
      <View className="flex-1">
        <View className="mb-12 mt-8 flex flex-col gap-2">
          <Text className="text-5xl font-bold tracking-tighter text-white">Impostor</Text>
          <Text className="text-lg text-slate-400">Encuentra al mentiroso.</Text>
        </View>

        <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
          Modos de juego
        </Text>

        <View className="mb-4 flex flex-row gap-4">
          <Pressable
            className="min-h-55 flex-1 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 active:bg-slate-800"
            onPress={() => router.navigate('/offline/offline-pregame')}>
            <View className="flex-1 justify-between p-5">
              <View className="mb-4 flex-col gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <Smartphone size={20} color="#10b981" />
                </View>
                <Text className="text-xl font-bold tracking-tight text-white">Local</Text>
                <Text className="text-sm leading-relaxed text-slate-400">Todos donde mismo. </Text>
              </View>
              <View className="items-start">
                <View className="rounded-full bg-slate-800 px-4 py-2">
                  <Text className="text-xs font-bold uppercase tracking-wider text-white">
                    Jugar
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>

          <Pressable
            className="min-h-55 flex-1 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 opacity-50 active:bg-slate-800"
            // onPress={() => router.navigate('/online/lobby')}
          >
            <View className="flex-1 justify-between p-5">
              <View className="mb-4 flex-col gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <Globe size={20} color="#3b82f6" />
                </View>
                <Text className="text-xl font-bold tracking-tight text-white">En línea</Text>
                <Text className="text-sm leading-relaxed text-slate-400">
                  Cada quien en su pantalla.
                </Text>
              </View>
              <View className="items-start">
                <View className="rounded-full bg-slate-800 px-3 py-2">
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Próximamente
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
          Contenido
        </Text>

        <Pressable className="flex-row items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-5 active:bg-slate-800">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
              <DatabaseIcon size={20} color="#f97316" />
            </View>
            <View className="flex-col">
              <Text className="text-lg font-bold tracking-tight text-white">
                Paquetes de palabras
              </Text>
              <Text className="text-sm text-slate-400">Administra tus colecciones</Text>
            </View>
          </View>
          <ChevronRightIcon size={20} color="#64748b" />
        </Pressable>
      </View>
    </View>
  );
}
