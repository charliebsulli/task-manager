import { useMutation } from "@tanstack/react-query";
import { api } from "../api-client";
import { Credentials } from "../api-client";
import { isAxiosError } from "axios";

export const register = (credentials: Credentials) => {
  return api.post("/api/auth/register", credentials);
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: Credentials) => register(credentials),
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message); // Log the server's error message
      }
    },
  });
};
