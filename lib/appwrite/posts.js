import { Query } from "react-native-appwrite";
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

export const getTrendingPosts = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(3))]
    );
    if (!posts) return [];
    return posts.documents;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};

export const getSearchPosts = async (query) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );
    if (!posts) return [];
    return posts.documents;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};

export const getPostsByUser = async (id) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", id)]
    );
    if (!posts) return [];
    return posts.documents;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};

export const getTotalUserPosts = async (id) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", id)]
    );
    return posts.total;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};

export const getTotalUserViews = async (id) => {
  try {
    const views = await db.listDocuments(
      config.databaseId,
      config.viewsCollectionId,
      [Query.equal("user", id)]
    );
    let totalViewCount = 0;
    views.documents.forEach((item) => (totalViewCount += item.view_count));
    return totalViewCount;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};
