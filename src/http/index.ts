import axios from 'axios';
import { StorageKeys } from '@/constants/localStorage';
import { AuthUser } from '@/types/auth';

export const BASE_URL = 'http://localhost:4000';
export const REFRESH_URL = '/auth/refresh';

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(StorageKeys.refreshToken);
      if (refreshToken) {
        try {
          const response = await axios.get<AuthUser>(
            `${BASE_URL}${REFRESH_URL}`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem(StorageKeys.accessToken, newAccessToken); //set new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error);
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
