import { Alert } from "react-native";
import { config, db } from "./config";

export const getAllPosts = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );
    if (!posts) return [];
    return posts.documents;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};
