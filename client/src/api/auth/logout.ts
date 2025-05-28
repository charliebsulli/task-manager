import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api-client";

export const logout = () => {
  return api.get("/api/auth/logout");
};

export const getLogoutQueryOptions = () => {
  return queryOptions({ queryKey: ["logout"], queryFn: logout });
};

export const useLogout = () => {
  return useQuery(getLogoutQueryOptions());
};
