import database from "./database";
import { ObjectId } from "mongodb";

const usersCollection = database.collection("users");
const userRefreshTokensCollection = database.collection("userRefreshTokens");

export async function findUser(username: string) {
  const user = await usersCollection.findOne({ username });
  return user;
}

export async function insertUser(username: string, password: string) {
  const user = await usersCollection.insertOne({ username, password });
  return user.insertedId;
}

export async function insertUserRefreshToken(
  refreshToken: string,
  userId: ObjectId
) {
  await userRefreshTokensCollection.insertOne({ refreshToken, userId });
}

export async function findUserRefreshToken(
  refreshToken: string,
  userId: ObjectId
) {
  const userRefreshToken = await userRefreshTokensCollection.findOne({
    refreshToken,
    userId,
  });
  return userRefreshToken;
}
