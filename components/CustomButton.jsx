import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({ children, onPress, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-lg min-h-[58px] min-w-full justify-center items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className="text-primary text-base font-pbold">{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
