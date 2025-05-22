import { User, Task } from "../../../shared/types";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

// fake data to start with
const users: User[] = [{ id: 0 }];

// this fake data was created with ChatGPT
const tasks: Task[] = [
  {
    name: "Wash dishes",
    complete: false,
    tags: ["red", "green"],
    due: "4/13",
    user: 0,
  },
  {
    name: "Buy groceries",
    complete: true,
    tags: ["blue"],
    due: "5/12",
    user: 0,
  },
  {
    name: "Write report",
    complete: false,
    tags: ["yellow", "green"],
    due: "10/25",
    user: 0,
  },
  {
    name: "Call plumber",
    complete: true,
    tags: [],
    due: "11/11",
    user: 0,
  },
  {
    name: "Schedule meeting",
    complete: false,
    tags: ["purple"],
    due: "11/11",
    user: 0,
  },
];

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
export async function editTask(newTask: Task) {
  const query = { _id: new ObjectId(newTask._id) };
  const replacement = newTask;
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
  console.log("id passed to deleteTask in dataService: ");
  console.log(_id);
  const filter = { _id: new ObjectId(_id) };
  console.log("filter before deleteOne called");
  console.log(filter);
  const result = tasksCollection.deleteOne(filter);
  return result;
}
