import { Task } from "../shared/types";
import { ObjectId } from "mongodb";
import database from "./database";

export const tasksCollection = database.collection("tasks");

// get all Tasks
export async function getTasks(userId: string) {
  const cursor = tasksCollection.find({ userId });
  const allTasks = await cursor.toArray();
  return allTasks;
}

// get Task by id
export async function getTask(taskId: string) {
  const result = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
  return result;
}

// edit Task by id
export async function editTask(taskId: string, newTask: Task) {
  const query = { _id: new ObjectId(taskId) };
  const replacement = {
    ...newTask,
    _id: new ObjectId(newTask._id),
  };
  await tasksCollection.replaceOne(query, replacement);
}

// create Task
export async function createTask(newTask: Task) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...doc } = newTask;
  const result = await tasksCollection.insertOne(doc);
  return result.insertedId; // sends _id of inserted task back to the client
}

// delete Task by id
export async function deleteTask(taskId: string) {
  const filter = { _id: new ObjectId(taskId) };
  await tasksCollection.deleteOne(filter);
}
