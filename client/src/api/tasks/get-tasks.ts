import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api-client";

export const getTasks = () => {
  return api.get("/api/users/current/tasks");
};

export const getTasksQueryOptions = () => {
  return queryOptions({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};

export const useTasks = () => {
  return useQuery(getTasksQueryOptions());
};
