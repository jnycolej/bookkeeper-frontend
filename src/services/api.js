import axios from 'axios';

// Always hit localhost:5050 from the browser in development
const HOST =
  process.env.NODE_ENV === 'development'
    ? 'localhost:5050'
    : process.env.REACT_APP_API_HOST;  // for production you can override

const BASE_URL = `http://${HOST}/api`;
// console.log('[api] BASE_URL =', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // console.log('[api] request to', config.baseURL + config.url);
  return config;
});
api.interceptors.response.use(
  (response) => {
    // console.log('[api] response from', response.config.url, response.status);
    return response;
  },
  (err) => {
    console.error('[api] error from', err.config?.url, err.message);
    return Promise.reject(err);
  }
);

export default api;
