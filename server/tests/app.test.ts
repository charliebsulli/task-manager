import request from "supertest";
import { app, server } from "../src/app";

test("server responds to /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  server.close();
});
