import { http, HttpResponse } from "msw";

// describe the entire network request handler
export const handlers = [
  http.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/users/current/tasks",
    ({ request }) => {
      console.log(`Request from ${request.url} caught by MSW`);
      return HttpResponse.json({ status: 200 });
    }
  ),
];
