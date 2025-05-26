import { ObjectId } from "mongodb";
import database from "./database";

const usersCollection = database.collection("users");
const userRefreshTokensCollection = database.collection("userRefreshTokens");
const invalidTokensCollection = database.collection("invalidTokens");

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
  userId: string
) {
  await userRefreshTokensCollection.insertOne({ refreshToken, userId });
}

export async function findUserRefreshToken(
  refreshToken: string,
  userId: string
) {
  const userRefreshToken = await userRefreshTokensCollection.findOne({
    refreshToken,
    userId,
  });
  return userRefreshToken;
}

export async function deleteUserRefreshToken(refreshToken: string) {
  await userRefreshTokensCollection.deleteOne({ refreshToken });
}

export async function deleteManyUserRefreshTokens(userId: string) {
  await userRefreshTokensCollection.deleteMany({ userId });
}

export async function insertInvalidToken(
  accessToken: string,
  userId: string,
  expirationTime: number
) {
  await invalidTokensCollection.insertOne({
    accessToken,
    userId,
    expirationTime,
  });
}

export async function findInvalidAccessToken(accessToken: string) {
  const result = await invalidTokensCollection.findOne({ accessToken });
  return result;
}
