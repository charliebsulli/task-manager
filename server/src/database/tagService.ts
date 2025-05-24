import { Tag } from "../../../shared/types";
import { ObjectId } from "mongodb";
import database from "./database";

const tagsCollection = database.collection("tags");

// get all Tags
export async function getTags() {
  const cursor = tagsCollection.find({});
  const allTags = await cursor.toArray();
  return allTags;
}

// create Tag
export async function createTag(newTag: Tag) {
  const { _id, ...doc } = newTag;
  const result = await tagsCollection.insertOne(doc);
  return result.insertedId; // sends _id of inserted tag back to the client
}

// delete Tag by id
export async function deleteTask(_id: string) {
  const filter = { _id: new ObjectId(_id) };
  const result = tagsCollection.deleteOne(filter);
  return result;
}
