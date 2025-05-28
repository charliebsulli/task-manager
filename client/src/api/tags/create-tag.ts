import { Tag } from "../../../../shared/types";
import { api } from "../api-client";
import { useMutation } from "@tanstack/react-query";

export const createTag = (newTag: Tag) => {
  return api.post("/api/users/current/tags", newTag);
};

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (newTag: Tag) => createTag(newTag),
  });
};
