import axios from "axios";
import { toast_fy } from "../Utils/Toast/Toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respostas Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 503) {
      const objectError = JSON.parse(error.response.request.responseText);
      toast_fy(objectError);
      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
    return Promise.reject(error);
  }
);

// Interceptor de respostas NotFoundException, BadRequest, ConflictException, InternalServerErrorException
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if ([400, 404, 409, 500].includes(status)) {
      const objectError = JSON.parse(error.response.request.responseText);
      toast_fy(objectError);
    }
    return Promise.reject(error);
  }
);

export default api;
