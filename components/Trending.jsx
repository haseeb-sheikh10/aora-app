import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.id}</Text>}
      horizontal
    />
  );
};

export default Trending;
