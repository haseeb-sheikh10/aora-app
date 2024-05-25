import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
  refreshing,
}) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);
  }, [refreshing]);

  return (
    <View className="px-4 flex-col my-7 items-center">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-2 flex-1">
          <View className="border border-secondary rounded-lg w-11 h-11 p-0">
            <Image
              source={{ uri: avatar }}
              className="rounded-lg w-full h-full"
            />
          </View>
          <View>
            <Text className="text-white text-sm font-pbold" numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-52 rounded-xl bg-black-100 mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-52 rounded-xl relative justify-center items-center mt-3"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="rounded-xl w-full h-full"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute rounded-xl"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
