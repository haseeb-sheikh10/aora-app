import { ID, Query } from "react-native-appwrite";
import { account, avatars, config, db } from "./config";

export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const registerUser = async (email, password, username) => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, username);
    if (!newAcc) throw Error;

    const avatarUrl = avatars.getInitials(username);
    const session = await loginUser(email, password);

    const newUser = await createUser(newAcc, email, username, avatarUrl);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const createUser = async (account, email, username, avatar) => {
  try {
    const newUser = await db.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        account_id: account.$id,
        email,
        username,
        avatar,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAcc = await account.get();
    if (!currentAcc) throw new Error();

    const currentUser = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("account_id", currentAcc.$id)]
    );

    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
