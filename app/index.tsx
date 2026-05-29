import { View, Text, Pressable } from 'react-native';
import AppHeader from '@components/ui/AppHeader';

import SectionTitle from '@components/ui/SectionTitle';

import { useRouter } from 'expo-router';
import { ChevronRightIcon, DatabaseIcon, Globe, Smartphone } from 'lucide-react-native';
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
            className=" rounded-2xl max-w-1/2"
            onPress={() => router.navigate('/offline/offline-pregame')}>
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
                    <Smartphone size={32} color={themeColors.gray} />
                    <Text className="font-bold text-lg text-slate-100">Local</Text>
                  </View>
                </Card.Header>

                <Card.Body>
                  <Text className="text-center text-slate-200">
                    Todos juegan en el mismo dispositivo
                  </Text>
                </Card.Body>

                <Card.Footer className="flex items-center justify-center">
                  <View className="items-center justify-center rounded-full bg-slate-100/20 p-2 ">
                    <Text className="font-bold text-white">Jugar</Text>
                  </View>
                </Card.Footer>
              </Card>

              {/* </StyledGradient> */}
            </LinearGradient>
          </PressableFeedback>

   <PressableFeedback
            className=" rounded-2xl max-w-1/2"
            // onPress={() => router.navigate('/offline/offline-pregame')}
            >
            <LinearGradient
              colors={[
                themeColors.onlineGradientStart,
                themeColors.onlineGradientMiddle,
                themeColors.onlineGradientEnd
              ]}
              className="flex-1 p-1">
              <Card className="gap-2 border-none bg-transparent shadow-none">
                <Card.Header>
                  <View className="flex flex-col items-center justify-center gap-1">
                    <Globe size={32} color={themeColors.gray} />
                    <Text className="font-bold text-lg text-slate-100">En línea</Text>
                  </View>
                </Card.Header>

                <Card.Body>
                  <Text className="text-center text-slate-200">
                    Juega con varios dispositivos
                  </Text>
                </Card.Body>

                <Card.Footer className="flex items-center justify-center">
                  <View className="items-center justify-center rounded-full bg-slate-100/20 p-2 ">
                    <Text className="font-bold text-white">Jugar</Text>
                  </View>
                </Card.Footer>
              </Card>

              {/* </StyledGradient> */}
            </LinearGradient>
          </PressableFeedback>

        </View>

        <View className="flex flex-row gap-4 ">
          <Pressable className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-400/10 px-4 py-2 active:bg-slate-400/20">
            <DatabaseIcon size={30} color={themeColors.error}></DatabaseIcon>
            <View className="ml-2 flex-1 flex-col">
              <Text className="font-bold text-white">Paquetes</Text>
              <Text className="text-sm text-slate-200">
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
