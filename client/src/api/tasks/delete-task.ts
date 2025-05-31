import { useMutation } from "@tanstack/react-query";
import { api } from "../api-client";

export const deleteTask = (id: string) => {
  return api.delete("/api/users/current/tasks/" + id);
};

export const useDeleteTask = () => {
  return useMutation({ mutationFn: (id: string) => deleteTask(id) });
};
