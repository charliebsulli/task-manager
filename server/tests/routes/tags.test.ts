import express, { Express } from "express";
import tags from "../../src/routes/tags";
import request from "supertest";
import "../../src/routes/auth";
import { client } from "../../src/database/database";
import { tagsCollection } from "../../src/database/tagService";
import { Tag } from "../../../shared/types";
import { ObjectId } from "mongodb";
import { Server } from "node:http";

// mock auth middleware
jest.mock("../../src/middleware/ensureAuthenticated", () => {
  return {
    ensureAuthenticated: jest.fn((req, res, next) => {
      req.user = { id: "test-user" }; // userId of current user for tests

      next();
    }),
  };
});

// mounts the router on an app for testing
const createTestApp = () => {
  const app = express();
  app.use("/", tags);
  return app;
};

const sampleTags = [
  {
    name: "Tag One",
    userId: "test-user",
  },
  {
    name: "Tag Two",
    userId: "test-user",
  },
  {
    name: "Tag Three",
    userId: "other-user",
  },
];

describe("Test tags routes", () => {
  let app: Express;
  let server: Server;
  let sampleTagIds: { [key: number]: ObjectId };

  beforeEach(async () => {
    app = createTestApp();
    server = app.listen();
    await tagsCollection.deleteMany({});
    sampleTagIds = (await tagsCollection.insertMany(sampleTags)).insertedIds;
  });

  afterEach(async () => {
    server.close();
    await tagsCollection.deleteMany({});
  });

  afterAll(() => {
    client.close();
  });

  test("GET user tags", async () => {
    const response = await request(app).get("/");

    // check for expected response
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].userId).toEqual("test-user");

    // check database has been modified
    const cursor = tagsCollection.find({ userId: "test-user" });
    const result = await cursor.toArray();
    expect(result).toHaveLength(2);
  });

  test("POST /", async () => {
    const newTag: Tag = {
      _id: "will be replaced",
      name: "New Tag",
      userId: "test-user",
    };

    const response = await request(app).post("/").send(newTag);
    expect(response.status).toBe(200);

    const tagId = response.body.tagId as string;
    const result = await tagsCollection.findOne({ _id: new ObjectId(tagId) });
    expect(result).toBeTruthy(); // new task is found in db
  });

  test("DELETE /", async () => {
    const tagId = sampleTagIds[0].toHexString();
    const response = await request(app).delete("/" + tagId);
    expect(response.status).toBe(204);

    const result = await tagsCollection.findOne({ _id: new ObjectId(tagId) });
    expect(result).toBeNull();
  });
});
