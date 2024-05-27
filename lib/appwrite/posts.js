import { ID, Query } from "react-native-appwrite";
import { account, config, db, storage } from "./config";

export const getAllPosts = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt")]
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
      [Query.equal("creator", id), Query.orderDesc("$createdAt")]
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

const getFileUrl = async (file_id, type) => {
  try {
    let fileUrl;
    if (type === "video") {
      fileUrl = storage.getFileView(config?.storageId, file_id);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config?.storageId,
        file_id,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error();
    return fileUrl;
  } catch (error) {
    console.error("Error getting file url", error);
    throw new Error();
  }
};

const uploadFile = async (file, type) => {
  if (!file) return;
  const asset = {
    name: file.fileName,
    uri: file.uri,
    type: file.mimeType,
    size: file.fileSize,
  };
  try {
    const uploadedFile = await storage.createFile(
      config?.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFileUrl(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file", error);
    throw new Error();
  }
};

export const createPost = async (data) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(data.thumbnail, "image"),
      uploadFile(data.video, "video"),
    ]);

    const formData = {
      title: data?.title,
      video: videoUrl,
      thumbnail: thumbnailUrl,
      prompt: data?.prompt,
      creator: data?.userId,
    };

    const newPost = await db.createDocument(
      config?.databaseId,
      config?.videosCollectionId,
      ID.unique(),
      formData
    );

    return newPost;
  } catch (error) {
    console.error("Error creating post", error);
    throw new Error();
  }
};

export const getSavedPosts = async (user_id) => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    const savedPosts = posts.documents.filter((doc) => {
      let found = false;
      for (let user of doc.liked_by) {
        if (user?.$id === user_id) {
          found = true;
          break;
        }
      }
      if (found) return doc;
    });
    console.log(savedPosts);
    return savedPosts;
  } catch (error) {
    console.error("Error getting posts", error);
    throw new Error();
  }
};

export const savePost = async (post_id) => {
  try {
    let post = await db.getDocument(
      config.databaseId,
      config.videosCollectionId,
      post_id
    );
    const user = await account.get();
    post.liked_by.push(user);
    await db.updateDocument(
      config.databaseId,
      config.videosCollectionId,
      post_id,
      post
    );
    return post;
  } catch (error) {
    console.error("Error saving post", error);
    throw new Error();
  }
};
