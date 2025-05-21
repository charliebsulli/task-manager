import { useMutation } from "@tanstack/react-query";
import { api } from "./api-client";

export const deleteTask = (taskId: number) => {
  return api.delete("/api/" + taskId);
};

export const useDeleteTask = () => {
  return useMutation({ mutationFn: (taskId: number) => deleteTask(taskId) });
};
