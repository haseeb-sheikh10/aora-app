import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/global";
import useAppwrite from "../../hooks/useAppwrite";
import { getAllPosts, getTrendingPosts } from "../../lib/appwrite/posts";

const Home = () => {
  const { user } = useGlobalContext();

  const { data: posts, refetch: postsRefetch } = useAppwrite(getAllPosts);
  const { data: trendingPosts, refetch: trendingPostsRefetch } =
    useAppwrite(getTrendingPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await postsRefetch();
    await trendingPostsRefetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} refreshing={refreshing} />
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
            <SearchInput />

            <View className="mt-7">
              <Text className="text-gray-100 font-plight">Trending Videos</Text>

              <Trending posts={trendingPosts ?? []} refreshing={refreshing} />
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
