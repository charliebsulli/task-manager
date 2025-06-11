import { Tag } from "../shared/types";
import { ObjectId } from "mongodb";
import database from "./database";

export const tagsCollection = database.collection("tags");

// get all Tags
export async function getTags(userId: string) {
  const cursor = tagsCollection.find({ userId });
  const allTags = await cursor.toArray();
  return allTags;
}

// get Tag by id
export async function getTag(tagId: string) {
  const tag = await tagsCollection.findOne({ _id: new ObjectId(tagId) });
  return tag;
}
// create Tag
export async function createTag(newTag: Tag) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...doc } = newTag;
  const result = await tagsCollection.insertOne(doc);
  return result.insertedId; // sends _id of inserted tag back to the client
}

// delete Tag by id
export async function deleteTag(tagId: string) {
  const filter = { _id: new ObjectId(tagId) };
  await tagsCollection.deleteOne(filter);
}
