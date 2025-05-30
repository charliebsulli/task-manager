import jwt from "jsonwebtoken";
import { getEnvVar } from "../../src/utils/utils";
import request from "supertest";
import express from "express";
import { ensureAuthenticated } from "../../src/middleware/ensureAuthenticated";
import { client } from "../../src/database/database";

test("ensureAuthenticated middleware adds accessToken and user to req", async () => {
  const app = express();
  app.use(ensureAuthenticated);
  app.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json({ user: req.user, accessToken: req.accessToken });
  });
  const server = app.listen();

  const accessToken = jwt.sign(
    { userId: "test-user" },
    getEnvVar("ACCESS_TOKEN_SECRET")
  );
  const response = await request(app)
    .get("/")
    .set("Authorization", accessToken);

  expect(response.status).toBe(200);

  expect(response.body.user.id).toEqual("test-user");
  expect(response.body.accessToken.value).toEqual(accessToken);

  server.close();
  client.close();
});
