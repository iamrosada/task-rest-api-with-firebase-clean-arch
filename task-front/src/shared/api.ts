import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

client.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config } as any;
    const token = localStorage.getItem('x-access-token');
    if (token) {
      updatedConfig.headers = {
        ...updatedConfig.headers,
        'x-access-token': token
      };
    }
    return updatedConfig;
  },
  (error) => Promise.reject(error)
);
