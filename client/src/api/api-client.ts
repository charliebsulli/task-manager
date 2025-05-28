import axios from "axios";

export interface Credentials {
  username: string;
  password: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// all of my requests need auth header
// if there is no auth header, must redirect to login page
