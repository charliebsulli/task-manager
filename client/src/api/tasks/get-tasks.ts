import { queryOptions, useQuery } from "@tanstack/react-query";
import { Task } from "../../../../shared/types";
import { api } from "../api-client";

export const getTasks = () => {
  return api.get("/api/tasks");
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
