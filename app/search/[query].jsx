import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { colors, images } from "../../constants";
import useAppwrite from "../../hooks/useAppwrite";
import { getSearchPosts } from "../../lib/appwrite/posts";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: searchResults, refetch: searchRefetch } = useAppwrite(() =>
    getSearchPosts(query)
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await searchRefetch();
    setRefreshing(false);
  };

  useEffect(() => {
    searchRefetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchResults ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} refreshing={refreshing} />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 py-8">
            <View className="flex-row justify-between items-center">
              <View className="">
                <Text className="text-sm text-gray-100 font-psemibold">
                  Search results
                </Text>
                <Text className="text-2xl text-white font-pbold">{query}</Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </View>
            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos Found"}
            subtitle={"No videos found for this search query"}
            onPress={() => router.push("create")}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" backgroundColor={colors.primary} />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
