import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/global";
import useAppwrite from "../../hooks/useAppwrite";
import {
  getPostsByUser,
  getTotalUserPosts,
  getTotalUserViews,
} from "../../lib/appwrite/posts";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../lib/appwrite/auth";
import { router } from "expo-router";
import { formatViews } from "../../lib/utils/formatViews";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: myVideos, refetch: refecthMyVideos } = useAppwrite(() =>
    getPostsByUser(user?.$id)
  );
  const { data: totalPosts, refetch: refecthTotalPosts } = useAppwrite(() =>
    getTotalUserPosts(user?.$id)
  );
  const { data: totalViews, refetch: refetchTotalViews } = useAppwrite(() =>
    getTotalUserViews(user?.$id)
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refecthMyVideos();
    await refecthTotalPosts();
    await refetchTotalViews();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("sign-in");
    } catch (error) {
      console.error("Error logging out", error);
      Alert.alert("Error", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={myVideos ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} refreshing={refreshing} />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 py-8">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row justify-end"
            >
              <Image
                source={icons.logout}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="justify-center items-center mt-5">
              <View className="justify-center items-center">
                <View className="border border-secondary rounded-lg w-16 h-16 p-0">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="rounded-lg w-full h-full"
                  />
                </View>
                <Text className="text-lg text-white font-pbold mt-1">
                  {user?.username}
                </Text>
              </View>
              <View className="flex-row justify-center gap-10 py-2">
                <View className="justify-center items-center">
                  <Text className="text-xl font-psemibold text-white">
                    {totalPosts}
                  </Text>
                  <Text className="text-sm font-pregular text-gray-100">
                    Posts
                  </Text>
                </View>
                <View className="justify-center items-center">
                  <Text className="text-xl font-psemibold text-white">
                    {formatViews(totalViews)}
                  </Text>
                  <Text className="text-sm font-pregular text-gray-100">
                    Views
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos Found"}
            subtitle={"No videos found for this profile"}
            onPress={() => router.push("create")}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
