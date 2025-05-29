import express, { Express } from "express";
import tasks from "../../src/routes/tasks";
import request from "supertest";
import "../../src/routes/auth";
import db from "../../src/database/database";
import { tasksCollection } from "../../src/database/taskService";
import { Task } from "../../../shared/types";

// mock auth middleware
jest.mock("../../src/routes/auth", () => {
  return {
    ensureAuthenticated: jest.fn((req, res, next) => {
      req.user = { id: "test-user" };

      next();
    }),
  };
});

// mounts the task router on an app for testing
const createTestApp = () => {
  const app = express();
  app.use("/tasks", tasks);
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

  beforeEach(async () => {
    app = createTestApp();
    await tasksCollection.deleteMany({});
    await tasksCollection.insertMany(sampleTasks);
  });

  afterEach(async () => {
    await tasksCollection.deleteMany({});
  });

  test("GET /", async () => {
    const response = await request(app).get("/tasks");

    // check for expected response
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].userId).toEqual("test-user");

    // check database has been modified
    const cursor = tasksCollection.find({ userId: "test-user" });
    const result = await cursor.toArray();
    expect(result).toHaveLength(2);
  });
});
