import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-72 h-56" />
      <Text className="text-white font-pbold text-lg">{title}</Text>
      <Text className="text-gray-100 text-sm font-medium">{subtitle}</Text>
      <CustomButton onPress={() => {}} otherStyles="mt-3">
        Create Video
      </CustomButton>
    </View>
  );
};

export default EmptyState;
