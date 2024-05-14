import axios from "axios";
import TokenService from "./token.service";

export const baseLink = "https://localhost:7152/";
const instance = axios.create({
  baseURL: baseLink + "api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
