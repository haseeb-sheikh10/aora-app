import CustomButton from "@/components/CustomButton";
import { colors, images } from "@/constants";
import { useGlobalContext } from "@/context/global";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isLoggedIn, isLoading } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="items-center justify-center px-4 min-h-[85vh]">
            <Image source={images.logo} className="w-[115px] h-[34px]" />
            <Image
              source={images.cards}
              className="h-[298px] w-[375px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-4xl font-semibold text-white text-center">
                Discover Endless Possibilities with{" "}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[65px] h-[13px] absolute -bottom-1 -right-1"
              />
            </View>

            <Text className="text-gray-100 my-5 font-pregular text-center text-sm">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>

            <CustomButton
              isLoading={false}
              onPress={() => router.push("sign-in")}
            >
              Continue With Email
            </CustomButton>
          </View>
        </ScrollView>
        <StatusBar style="light" backgroundColor={colors.primary} />
      </SafeAreaView>
    </>
  );
}
