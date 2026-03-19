import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const customInstance = async <T>(
  url: string,
  config: AxiosRequestConfig,
): Promise<{ data: T; status: number; headers: unknown }> => {
  const response = await AXIOS_INSTANCE({
    url,
    ...config,
    // @ts-expect-error body doesn't exist...
    data: config.data || config.body,
  });
  return {
    data: response.data,
    status: response.status,
    headers: response.headers,
  };
};
