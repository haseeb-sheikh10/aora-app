import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import EmptyState from "../../components/EmptyState";
import Trending from "../../components/Trending";
import { icons, images } from "../../constants";
import { useGlobalContext } from "../../context/global";
import { getAllPosts } from "../../lib/appwrite/posts";
import useAppwrite from "../../hooks/useAppwrite";

const Home = () => {
  const [search, setSearch] = useState("");
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch;
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="px-4">
            <Text className="text-white text-lg">{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 py-8">
            <View className="flex-row justify-between items-center">
              <View className="">
                <Text className="text-sm text-gray-100 font-psemibold">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-pbold">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </View>
            <CustomInput
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder={"Search for a video topic"}
              icon={icons.search}
              otherStyles="mt-5"
            />

            <View className="mt-7">
              <Text className="text-gray-100 font-plight">Trending Videos</Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos Found"}
            subtitle={"Be the first one to upload a video"}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
