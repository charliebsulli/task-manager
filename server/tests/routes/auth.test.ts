import express, { Express } from "express";
import auth from "../../src/routes/auth";
import request from "supertest";
import database, { client } from "../../src/database/database";
import {
  invalidTokensCollection,
  userRefreshTokensCollection,
  usersCollection,
} from "../../src/database/userService";
import { Server } from "node:http";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const USERID = "f3a7b2c9d4e1f6a8b5c2d9e7";

// mock auth middleware
jest.mock("../../src/middleware/ensureAuthenticated", () => {
  return {
    ensureAuthenticated: jest.fn((req, res, next) => {
      req.user = { id: USERID };
      req.accessToken = { value: "accessToken", exp: 0 };
      next();
    }),
  };
});

// mounts the auth router on an app for testing
const createTestApp = () => {
  const app = express();
  app.use("/", auth);
  return app;
};

describe("test auth routes", () => {
  let app: Express;
  let server: Server;

  beforeEach(async () => {
    app = createTestApp();
    server = app.listen();
    await database.dropCollection("users");
    await database.dropCollection("userRefreshTokens");
    await database.dropCollection("invalidTokens");
  });

  afterEach(async () => {
    server.close();
    await database.dropCollection("users");
    await database.dropCollection("userRefreshTokens");
    await database.dropCollection("invalidTokens");
  });

  afterAll(() => {
    client.close();
  });

  test("POST /register", async () => {
    const username = "test-user";
    const password = "password";

    const response = await request(app)
      .post("/register")
      .send({ username, password });

    expect(response.status).toBe(201);

    const user = await usersCollection.findOne({ username });
    expect(user).toBeTruthy();
  });

  test("POST /register duplicate username", async () => {
    const username = "test-user";
    const password = "password";
    await usersCollection.insertOne({ username, password });

    const response = await request(app)
      .post("/register")
      .send({ username, password });

    expect(response.status).toBe(409);
  });

  test("POST /login", async () => {
    const username = "test-user";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 12);
    await usersCollection.insertOne({ username, password: hashedPassword });

    const response = await request(app)
      .post("/login")
      .send({ username, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    // check for the refresh token in the database

    const refreshToken = await userRefreshTokensCollection.findOne({
      userId: response.body.id,
    });
    if (!refreshToken) {
      fail("Refresh token not found in DB");
    }
    expect(refreshToken.refreshToken).toEqual(response.body.refreshToken);
  });

  test("POST /login wrong credentials", async () => {
    const username = "test-user";
    const password = "password";
    const response = await request(app)
      .post("/login")
      .send({ username, password });
    expect(response.status).toBe(401);
  });

  // test refresh token
  test("POST /refresh-token", async () => {
    const username = "test-user";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 12);
    await usersCollection.insertOne({ username, password: hashedPassword });

    const login = await request(app)
      .post("/login")
      .send({ username, password });

    const { refreshToken } = login.body;
    const response = await request(app)
      .post("/refresh-token")
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");

    const refreshTokenResult = await userRefreshTokensCollection.findOne({
      userId: login.body.id,
    });
    if (!refreshTokenResult) {
      fail("Refresh token not found in DB");
    }
    expect(refreshTokenResult.refreshToken).toEqual(response.body.refreshToken);
  });

  test("GET /logout", async () => {
    const username = "test-user";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 12);
    await usersCollection.insertOne({
      _id: new ObjectId(USERID),
      username,
      password: hashedPassword,
    });

    await request(app).post("/login").send({ username, password });

    const logout = await request(app).get("/logout");
    expect(logout.status).toBe(204);

    const refreshToken = await userRefreshTokensCollection.findOne({
      userId: USERID,
    });
    expect(refreshToken).toBeNull();

    const invalidToken = await invalidTokensCollection.findOne({
      userId: USERID,
    });
    expect(invalidToken).toBeTruthy();
  });
});
