import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.cc.aora",
  projectId: "66509d16003c53af8a91",
  databaseId: "6650fa97002c079caf0d",
  userCollectionId: "6650fb64001e08c03045",
  videosCollectionId: "6650fb74001d6b4c24db",
  storageId: "6650fe6b002961539fae",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const db = new Databases(client);
