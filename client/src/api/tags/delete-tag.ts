import { useMutation } from "@tanstack/react-query";
import { api } from "../api-client";

export const deleteTag = (id: string) => {
  return api.delete("/api/users/current/tags" + id);
};

export const useDeleteTag = () => {
  return useMutation({ mutationFn: (id: string) => deleteTag(id) });
};
