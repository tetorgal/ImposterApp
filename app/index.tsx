import { View, Text, Pressable } from 'react-native';
import AppHeader from '../components/ui/AppHeader';
import ModeCard from '../components/ui/ModeCard';
import SectionTitle from '../components/ui/SectionTitle';
import StyledIcon from '../components/ui/StyledIcon';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="flex items-center justify-center">
        <AppHeader title="Impostor" imageSource={require('../assets/sus-dog.png')} />
        <SectionTitle title="Modo de juego" />
        <View className="my-5 flex flex-row gap-4">
          <ModeCard
            title="Local"
            description="Todos juegan en el mismo dispositivo"
            iconName="mobile"
            iconType="font-awesome"
            iconColorName="orange-300"
            gradient={['purple-400', 'purple-600']}
            buttonLabel="Jugar"
            onPress={() => router.navigate('/offline-pregame')}
          />
          <ModeCard
            title="En linea"
            description="Juega con amigos o con el mundo"
            iconName="globe"
            iconType="font-awesome"
            iconColorName="slate-100"
            gradient={['green-500', 'green-700']}
            buttonLabel="Jugar"
          />
        </View>

        <View className="flex flex-row gap-4 ">
          <Pressable className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-400/10 px-4 py-2 active:bg-slate-400/20">
            <StyledIcon
              name="database"
              type="font-awesome"
              size={30}
              colorName="red-400"></StyledIcon>
            <View className="ml-2 flex-1 flex-col">
              <Text className="font-poppins font-bold  text-white">Paquetes</Text>
              <Text className="font-poppins text-sm text-slate-200">
                Toda la colección y los tuyos
              </Text>
            </View>

            <StyledIcon
              name="chevron-right"
              type="font-awesome"
              size={12}
              colorName="slate-200"></StyledIcon>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
