import { useMutation } from "@tanstack/react-query";
import { api } from "./api-client";
import { Task } from "../../../shared/types";

export const deleteTask = (task: Task) => {
  return api.delete("/api");
};

export const useDeleteTask = () => {
  return useMutation({ mutationFn: (task: Task) => deleteTask(task) });
};
