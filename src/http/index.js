import axios from "axios";
import { userNotAuthorized } from "../effector/user/authorization";

export const API_URL = "http://localhost:8000/api/";
// export const API_URL = "https://admin.tt-crm.ru/api/";
export const API = "http://localhost:8000";
// export const API = "https://admin.tt-crm.ru";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `accessToken ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.post(
          `${API_URL}auth/token/refresh/`,
          {},
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.access);
        return $api.request(originalRequest);
      } catch (e) {
        if (e.response.status === 400) {
          userNotAuthorized();
        }
      }
    }
    throw error;
  }
);

export default $api;
