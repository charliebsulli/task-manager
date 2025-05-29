import { useMutation } from "@tanstack/react-query";
import { api } from "../api-client";

export const refresh = (refreshToken: string) => {
  return api.post("/api/auth/refresh", refreshToken);
};

export const useRefresh = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => refresh(refreshToken),
    onSuccess(data, variables, context) {
      if (data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
      if (data.data.refreshToken) {
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }
    },
  });
};
