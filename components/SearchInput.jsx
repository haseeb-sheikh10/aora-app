import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  initialQuery = "",
  placeholder = "Search for a video topic",
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();

  return (
    <View className={`space-y-1 mt-5`}>
      <View className="w-full p-4 flex-row items-center bg-black-100 border-2 border-black-200 rounded-lg focus:border-secondary-200">
        <TextInput
          value={query}
          placeholder={placeholder}
          onChangeText={(e) => setQuery(e)}
          className="flex-1 text-lg text-white bg-transparent"
          placeholderTextColor={"#CDCDE0"}
        />
        <TouchableOpacity
          onPress={() => {
            if (!query)
              return Alert.alert(
                "Missing query",
                "Please input something to search"
              );
            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`search/${query}`);
          }}
        >
          <Image source={icons.search} className="w-4 h-4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
