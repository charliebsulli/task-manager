import { Task } from "../../../shared/types";
import { api } from "./api-client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const createTask = (newTask: Task) => {
  return api.post("/api", newTask);
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (newTask: Task) => createTask(newTask),
  });
};
