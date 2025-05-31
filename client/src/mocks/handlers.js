import { http, HttpResponse } from "msw";

// describe the entire network request handler
export const handlers = [
  http.post("http://localhost:8080/api/users/current/tasks", () => {
    console.log("POST request to /api/users/current/tasks intercepted");
  }),
];
