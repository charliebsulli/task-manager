import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api-client";

export const logout = () => {
  return api.get("/api/auth/logout");
};

export const useLogout = () => {
  return useMutation({ mutationFn: logout });
};
