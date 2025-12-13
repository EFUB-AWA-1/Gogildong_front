import { useAuthStore } from '@/Login/stores/useAuthStore';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<(token?: string) => void> = [];

const processQueue = (token?: string) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (!status || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) {
      useAuthStore.getState().clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (token) originalRequest.headers.Authorization = `Bearer ${token}`;
          originalRequest._retry = true;
          axiosInstance(originalRequest).then(resolve).catch(reject);
        });
      });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const { data } = await axios.post(
        '/auth/refresh',
        { refreshToken },
        { baseURL: import.meta.env.VITE_API_URL, withCredentials: true }
      );

      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
      processQueue(data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearTokens();
      processQueue();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
