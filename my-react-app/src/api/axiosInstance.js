import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// Runs before every request is sent
api.interceptors.request.use((config) => {
  console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Runs after every response comes back
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[Response Error]", error.message);
    return Promise.reject(error);
  }
);

export default api;