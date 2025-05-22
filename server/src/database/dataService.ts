import { Task } from "../../../shared/types";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const uri = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1";
const client = new MongoClient(uri);

const databaseName = process.env.DB_NAME || "test";
const database = client.db(databaseName);

const tasksCollection = database.collection("tasks");

// get all Tasks
export async function getTasks() {
  const cursor = tasksCollection.find({});
  const allTasks = await cursor.toArray();
  return allTasks;
}

// edit Task by id
export async function editTask(_id: string, newTask: Task) {
  const query = { _id: new ObjectId(_id) };
  const replacement = {
    ...newTask,
    _id: new ObjectId(newTask._id),
  };
  const result = await tasksCollection.replaceOne(query, replacement);
  return result; // may have to parse result
}

// create Task
export async function createTask(newTask: Task) {
  const { _id, ...doc } = newTask;
  const result = await tasksCollection.insertOne(doc);
  return result.insertedId; // sends _id of inserted task back to the client
}

// delete Task by id
export async function deleteTask(_id: string) {
  const filter = { _id: new ObjectId(_id) };
  const result = tasksCollection.deleteOne(filter);
  return result;
}
