import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/global";
import useAppwrite from "../../hooks/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite/posts";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch: postsRefetch } = useAppwrite(() =>
    getSavedPosts(user?.$id)
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await postsRefetch();
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
            <Text className="text-2xl text-white font-pbold">Saved Videos</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos Found"}
            subtitle={"You do no have any saved videos"}
            buttonText="Back to Explore"
            onPress={() => router.push("home")}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
