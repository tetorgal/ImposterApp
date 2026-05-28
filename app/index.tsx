import { View, Text, Pressable } from 'react-native';
import AppHeader from '@components/ui/AppHeader';

import SectionTitle from '@components/ui/SectionTitle';

import { useRouter } from 'expo-router';
import { ChevronRightIcon, DatabaseIcon, Globe, TabletSmartphoneIcon } from 'lucide-react-native';
import { themeColors } from '@lib/theme';
import { Card, PressableFeedback } from 'heroui-native';
// import StyledGradient from '@components/ui/StyledGradient';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <View className="flex items-center justify-center">
        <AppHeader title="Impostor" imageSource={require('@assets/sus-dog.png')} />

        <SectionTitle title="Modo de juego" />
        <View className="my-5 flex flex-row gap-4">
          <PressableFeedback
            className="overflow-hidden rounded-2xl"
            onPress={() => router.navigate('/offline/offline-pregame')}>
            <PressableFeedback.Highlight />

            <LinearGradient
              colors={[
                themeColors.localGradientStart,
                themeColors.localGradientMiddle,
                themeColors.localGradientEnd,
              ]}
              className="flex-1 p-1">
              <Card className="gap-2 border-none bg-transparent shadow-none">
                <Card.Header>
                  <View className="flex flex-col items-center justify-center gap-2">
                    <TabletSmartphoneIcon size={32} color={themeColors.gray} />
                    <Text className="font-poppins-bold text-lg text-slate-100">Local</Text>
                  </View>
                </Card.Header>

                <Card.Body>
                  <Text className="font-poppins text-center text-slate-200">
                    Todos juegan en el mismo dispositivo
                  </Text>
                </Card.Body>

                <Card.Footer className="flex items-center justify-center">
                  <View className=" items-center justify-center rounded-lg bg-slate-300 p-2 ">
                    <Text className="font-poppins font-bold text-white">Jugar</Text>
                  </View>
                </Card.Footer>
              </Card>

              {/* </StyledGradient> */}
            </LinearGradient>
          </PressableFeedback>

          {/* <ModeCard
            title="En linea"
            description="Juega con amigos o con el mundo"
            iconName={Globe}
            iconColorName={themeColors.text}
            gradient={['green-500', 'green-700']}
            buttonLabel="Jugar"
          /> */}
        </View>

        <View className="flex flex-row gap-4 ">
          <Pressable className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-400/10 px-4 py-2 active:bg-slate-400/20">
            <DatabaseIcon size={30} color={themeColors.error}></DatabaseIcon>
            <View className="ml-2 flex-1 flex-col">
              <Text className="font-poppins font-bold  text-white">Paquetes</Text>
              <Text className="font-poppins text-sm text-slate-200">
                Toda la colección y los tuyos
              </Text>
            </View>

            <ChevronRightIcon size={12} color={themeColors.border}></ChevronRightIcon>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
