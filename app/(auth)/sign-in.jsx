import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 py-12 w-full justify-center">
          <Image source={images.logo} className="w-[115px] h-[34px]" />
          <Text className="text-xl font-pbold text-white mt-10">Sign in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
