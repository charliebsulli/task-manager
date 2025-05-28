import { useMutation } from "@tanstack/react-query";
import { api } from "../api-client";
import { Credentials } from "../api-client";

export const register = (credentials: Credentials) => {
  return api.post("/api/auth/register", credentials);
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: Credentials) => register(credentials),
  });
};
