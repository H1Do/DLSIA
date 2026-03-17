import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const customInstance = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const { data } = await AXIOS_INSTANCE(config);
  return data;
};
