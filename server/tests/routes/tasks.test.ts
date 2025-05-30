import express, { Express } from "express";
import tasks from "../../src/routes/tasks";
import request from "supertest";
import "../../src/routes/auth";
import { client } from "../../src/database/database";
import { tasksCollection } from "../../src/database/taskService";
import { Task } from "../../../shared/types";
import { ObjectId } from "mongodb";
import { Server } from "node:http";

// mock auth middleware
jest.mock("../../src/routes/auth", () => {
  return {
    ensureAuthenticated: jest.fn((req, res, next) => {
      req.user = { id: "test-user" }; // userId of current user for tests

      next();
    }),
  };
});

// mounts the task router on an app for testing
const createTestApp = () => {
  const app = express();
  app.use("/", tasks);
  return app;
};

const sampleTasks = [
  {
    name: "Test One",
    complete: false,
    tags: [],
    due: "none",
    userId: "test-user",
  },
  {
    name: "Test Two",
    complete: false,
    tags: [],
    due: "none",
    userId: "test-user",
  },
  {
    name: "Test Three",
    complete: false,
    tags: [],
    due: "none",
    userId: "other-user",
  },
];

describe("Test /tasks endpoint", () => {
  let app: Express;
  let server: Server;
  let sampleTaskIds: { [key: number]: ObjectId };

  beforeEach(async () => {
    app = createTestApp();
    server = app.listen();
    await tasksCollection.deleteMany({});
    sampleTaskIds = (await tasksCollection.insertMany(sampleTasks)).insertedIds;
  });

  afterEach(async () => {
    server.close();
    await tasksCollection.deleteMany({});
  });

  afterAll(() => {
    client.close();
  });

  test("GET user tasks", async () => {
    const response = await request(app).get("/");

    // check for expected response
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].userId).toEqual("test-user");

    // check database has been modified
    const cursor = tasksCollection.find({ userId: "test-user" });
    const result = await cursor.toArray();
    expect(result).toHaveLength(2);
  });

  test("PUT /taskId", async () => {
    // edit a task
    const taskId = sampleTaskIds[0].toHexString();
    const newTask: Task = {
      _id: taskId,
      name: "Replace",
      complete: true,
      tags: ["test"],
      due: "today",
      userId: "test-user",
    };

    // check for 204
    const response = await request(app)
      .put("/" + taskId)
      .send(newTask);
    expect(response.status).toBe(204);

    // check database updated
    const result = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
    if (!result) {
      fail("Edited task not found");
    }
    expect(result.name).toEqual("Replace");
  });

  test("POST /", async () => {
    const newTask: Task = {
      _id: "will be replaced",
      name: "Create",
      complete: true,
      tags: ["test"],
      due: "today",
      userId: "test-user",
    };

    const response = await request(app).post("/").send(newTask);
    expect(response.status).toBe(200);

    const taskId = response.body.taskId as string;
    const result = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
    expect(result).toBeTruthy(); // new task is found in db
  });

  test("DELETE /", async () => {
    const taskId = sampleTaskIds[0].toHexString();
    const response = await request(app).delete("/" + taskId);
    expect(response.status).toBe(204);

    const result = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
    expect(result).toBeNull();
  });
});
