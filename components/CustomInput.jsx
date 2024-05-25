import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const CustomInput = ({
  label = "",
  value,
  placeholder,
  onChange,
  otherStyles = "",
  icon = "",
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <View className={`space-y-1 ${otherStyles}`}>
      {label !== "" && (
        <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      )}
      <View className="w-full p-4 flex-row items-center bg-black-100 border-2 border-black-200 rounded-lg focus:border-secondary-200">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          className="flex-1 text-lg text-white bg-transparent"
          placeholderTextColor={"#7B7B8B"}
          secureTextEntry={label === "Password" && !showPass}
        />

        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Image
              source={!showPass ? icons.eye : icons.eyeHide}
              className="w-4 h-4"
            />
          </TouchableOpacity>
        )}
        {icon !== "" && (
          <TouchableOpacity>
            <Image source={icon} className="w-4 h-4" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
