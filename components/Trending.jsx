import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    // opacity: 0,
    scale: 0.9,
  },
  1: {
    // opacity: 1,
    scale: 1,
  },
};

const zoomOut = {
  0: {
    // opacity: 0,
    scale: 1,
  },
  1: {
    // opacity: 1,
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item, refreshing }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);
  }, [refreshing]);

  return (
    <Animatable.View
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item?.video }}
          className="w-40 h-64 rounded-3xl my-5 bg-black-100 overflow-hidden shadow-lg shadow-black/40"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative justify-center items-center rounded-3xl"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-40 h-64 rounded-3xl my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute rounded-xl"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 160 }}
      horizontal
    />
  );
};

export default Trending;
