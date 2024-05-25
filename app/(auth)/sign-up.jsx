import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { images } from "../../constants";
import { registerUser } from "../../lib/appwrite/auth";
import { useGlobalContext } from "../../context/global";

const SignUp = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (val, name) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = async () => {
    console.log(value);
    if (!value.email || !value.username || !value.password) {
      Alert.alert("Error", "Please fill out all the fields");
      return;
    }

    try {
      const result = await registerUser(
        value.email,
        value.password,
        value.username
      );

      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "Signed Up Successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
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
        <View className="px-4 justify-center">
          <Image source={images.logo} className="w-[115px] h-[34px]" />
          <Text className="text-2xl font-pbold text-white mt-10">Sign up</Text>
          <View className="">
            <CustomInput
              label={"Username"}
              value={value.username}
              placeholder={"Your unique username"}
              onChange={(e) => handleChange(e, "username")}
              otherStyles={"mt-7"}
            />
            <CustomInput
              label={"Email"}
              value={value.email}
              placeholder={"Your email"}
              onChange={(e) => handleChange(e, "email")}
              otherStyles={"mt-7"}
            />
            <CustomInput
              label={"Password"}
              value={value.password}
              placeholder={"Your password"}
              onChange={(e) => handleChange(e, "password")}
              otherStyles={"mt-7"}
            />

            <CustomButton onPress={() => handleSubmit()} otherStyles="mt-7">
              Sign Up
            </CustomButton>
            <View className="flex-row justify-center items-center gap-1 text-sm mt-3 font-psemibold">
              <Text className="text-gray-100">Already have an account?</Text>
              <Link href="sign-in" className="text-secondary">
                Login
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
