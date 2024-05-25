import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, loginUser } from "../../lib/appwrite/auth";
import { useGlobalContext } from "../../context/global";

const SignIn = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (val, name) => {
    setValue({ ...value, [name]: val });
  };

  const handleSubmit = async () => {
    console.log(value);
    if (!value.email || !value.password) {
      Alert.alert("Error", "Please fill out all the fields");
      return;
    }
    try {
      const session = await loginUser(value.email, value.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      Alert.alert("Success", "Logged In Successfully");
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
        <View className="justify-center px-4">
          <Image source={images.logo} className="w-[115px] h-[34px]" />
          <Text className="text-2xl font-pbold text-white mt-10">Sign in</Text>
          <View className="">
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

            <CustomButton onPress={handleSubmit} otherStyles="mt-7">
              Log In
            </CustomButton>
            <View className="flex-row justify-center items-center gap-1 text-sm font-psemibold mt-3">
              <Text className="text-gray-100">Don't have an account?</Text>
              <Link href="sign-up" className="text-secondary">
                Sign up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
