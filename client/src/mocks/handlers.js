import { http, HttpResponse } from "msw";

// describe the entire network request handler
export const handlers = [
  http.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tasks",
    () => {
      return new HttpResponse(null, { status: 200 });
    }
  ),
  http.put(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tasks/:taskId",
    () => {
      return new HttpResponse(null, { status: 204 });
    }
  ),
  http.delete(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tasks/:taskId",
    () => {
      return new HttpResponse(null, { status: 204 });
    }
  ),
  http.post(process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tags", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.delete(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tags/:tagId",
    () => {
      return new HttpResponse(null, { status: 204 });
    }
  ),
];
