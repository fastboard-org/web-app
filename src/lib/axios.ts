import axios from "axios";
import { auth } from "./auth";
import { getIdToken } from "firebase/auth";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    const token = user ? await getIdToken(user) : null;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
