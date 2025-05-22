import { useMutation } from "@tanstack/react-query";
import { Task } from "../../../shared/types";
import { api } from "./api-client";

export const updateTask = (newTask: Task) => {
  return api.put("/api/" + newTask._id, newTask);
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: (newTask: Task) => updateTask(newTask),
  });
};
