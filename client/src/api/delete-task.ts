import { useMutation } from "@tanstack/react-query";
import { api } from "./api-client";
import { Task } from "../../../shared/types";

export const deleteTask = (id: string) => {
  return api.delete("/api/" + id);
};

export const useDeleteTask = () => {
  return useMutation({ mutationFn: (id: string) => deleteTask(id) });
};
