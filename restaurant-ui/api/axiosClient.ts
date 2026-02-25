import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getSessionStorage, removeSessionStorage } from '@/utils/storage_actions';
import { STORAGE_KEY } from '@/constants/storage';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => {
  const userToken = getSessionStorage(STORAGE_KEY.USER_TOKEN);
  return userToken || '';
};

const requestConfig = {
  baseURL: BASE_URL,
  timeout: 10000, // 10s
};

const AxiosClient = axios.create(requestConfig);

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // const { method, url } = response.config;
  // const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  // logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response.data;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    // const { method, url } = error.config;
    const { status } = response ?? {};

    // console.log('======> error', { message, method, url, statusText, status });
    if (status === 401 || status === 403) {
      removeSessionStorage(STORAGE_KEY.USER_TOKEN);
    } else {
      // showErrorApi(data);
    }
  } else {
  }

  return Promise.reject(error);
};

AxiosClient.interceptors.request.use(onRequest, onErrorResponse);
AxiosClient.interceptors.response.use(onResponse, onErrorResponse);
export default AxiosClient;
