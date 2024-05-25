import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 py-8">
          <Text className="text-2xl text-white font-pbold">Upload Video</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
