import { useMutation } from "@tanstack/react-query";
import { api, Credentials } from "../api-client";

export const login = (credentials: Credentials) => {
  return api.post("/api/auth/login", credentials);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
  });
};
