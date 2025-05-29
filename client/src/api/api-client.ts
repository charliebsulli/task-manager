import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

export interface Credentials {
  username: string;
  password: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        // all other 401s can be redirected to login
        if (error.response?.data.code === "AccessTokenExpired") {
          // attempt to use refresh token
          const refresh = await api.post("/api/auth/refresh-token");
          if (refresh.status === 200) {
            localStorage.setItem("accessToken", refresh.data.accessToken);
            localStorage.setItem("refreshToken", refresh.data.refreshToken);
            // React Query will make the request again
          } else {
            localStorage.clear();
            window.location.href = "/auth/login";
          }
        } else {
          localStorage.clear();
          window.location.href = "/auth/login";
        }
      }
    }
    return error;
  }
);
