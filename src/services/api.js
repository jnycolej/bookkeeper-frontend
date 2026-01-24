import axios from "axios";

const rawBase =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const BASE_URL = rawBase.endsWith("/api") ? rawBase : `${rawBase.replace(/\/$/, "")}/api`;


const api = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": "application/json"},
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // console.log('[api] request to', config.baseURL + config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {  return response;},
  (err) => {
    console.error("[api] error from -", err.config?.url, "-", err?.message);
    return Promise.reject(err);
  }
);

export default api;
