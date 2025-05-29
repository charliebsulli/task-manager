import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api-client";

export const getTags = () => {
  return api.get("/api/users/current/tags");
};

export const getTagsQueryOptions = () => {
  return queryOptions({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};

export const useTags = () => {
  return useQuery(getTagsQueryOptions());
};
