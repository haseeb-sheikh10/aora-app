import { ResizeMode, Video } from "expo-av";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/global";
import { createPost } from "../../lib/appwrite/posts";

const Create = () => {
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
    userId: user?.$id,
  });

  const handleChange = (value, name) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const openPicker = async (selectType) => {
    const result = await launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? MediaTypeOptions.Images
          : MediaTypeOptions.Videos,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }
      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const handleSubmit = async () => {
    const { title, video, thumbnail, prompt, userId } = form;
    if (!title || !video || !thumbnail || !prompt || !userId) {
      Alert.alert("Please fill all the fields");
      return;
    }
    try {
      await createPost(form);
      Alert.alert("Success", "Post uploaded successfully");
      router.push("home");
    } catch (error) {
      console.error("Error", error);
      Alert.alert("Error", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 py-8">
          <Text className="text-2xl text-white font-pbold">Upload Video</Text>
          <CustomInput
            label={"Video Title"}
            value={form.title}
            placeholder={"Give your video a catchy title.."}
            onChange={(e) => handleChange(e, "title")}
            otherStyles={"mt-7"}
          />
          <View className="space-y-1 mt-5">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>
            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{
                    uri: form.video.uri,
                  }}
                  className="w-full h-64 rounded-lg"
                  resizeMode={ResizeMode.CONTAIN}
                />
              ) : (
                <View className="w-full px-4 h-28 rounded-lg bg-black-100 border-2 border-black-200 justify-center items-center">
                  <View className="w-12 h-12 border border-dashed border-secondary-100 justify-center items-center">
                    <Image
                      source={icons?.upload}
                      className="w-1/2 h-1/2 border border-red-500"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="space-y-1 mt-5">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Thumbnail
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{
                    uri: form.thumbnail.uri,
                  }}
                  className="w-full h-64 rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full px-4 h-16 rounded-lg bg-black-100 border-2 border-black-200 justify-center items-center">
                  <View className="w-ful gap-1 justify-center items-center flex-row">
                    <Image
                      source={icons?.upload}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-sm">Choose a file</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <CustomInput
            label={"AI Prompt"}
            value={form.prompt}
            placeholder={"The AI prompt of your video.."}
            onChange={(e) => handleChange(e, "prompt")}
            otherStyles={"mt-5"}
          />

          <CustomButton otherStyles="mt-5" onPress={handleSubmit}>
            Submit & Publish
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
