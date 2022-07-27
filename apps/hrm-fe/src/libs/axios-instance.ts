import { RefreshResponse } from '@api/auth/dto';
import { ApiError } from '@api/errorHandler';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getItem, setItem } from 'services/localStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const setToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    api.defaults.headers.common['Authorization'] = `Bearer ${getItem('token')}`;
  }
};

// Browser Open without Login
setToken();

const subscribers: SubCallback[] = [];

type SubCallback = (token: string) => void;

const addSubscriber = (callback: SubCallback) => {
  subscribers.push(callback);
};

// When the refresh is successful, we start retrying the requests one by one and empty the queue
const onRefreshSuccess = (newAccessToken: string) => {
  subscribers.forEach((callback) => callback(newAccessToken));
  subscribers.splice(0, subscribers.length);
};

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const addQueue = new Promise((resolve) => {
      addSubscriber((newAccessToken) => {
        error.response.config.headers[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        resolve(axios(error.config));
      });
    });

    if (
      error.response.status === 401 &&
      error.response.data.name === 'JWT_EXPIRED'
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refresh = await api.post<RefreshResponse>('auth/refresh');
          setItem('token', refresh.data.token);
          setToken(refresh.data.token);
          error.response.config.headers[
            'Authorization'
          ] = `Bearer ${refresh.data.token}`;
          onRefreshSuccess(refresh.data.token);
          isRefreshing = false;
        } catch (err) {
          throw error;
        }
      }
      return addQueue;
    }
    throw error;
  },
);
export default api;
