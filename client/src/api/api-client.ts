import axios from "axios";

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

api.interceptors.response.use();
// if a user is logged in, send an authentication header
// with the JWT with every request

// if the JWT is expired, send a refresh token to /refresh-token

// if the JWT is invalid, clear it, redirect to login page
