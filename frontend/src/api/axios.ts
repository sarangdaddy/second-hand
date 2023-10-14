import axios from 'axios';

import { BASE_URL } from '../constants/api';
import { ACCESS_TOKEN } from '../constants/login';

export const axiosInstanceWithoutBearer = axios.create({
  baseURL: BASE_URL,
});

export const axiosInstanceWithBearer = axios.create({
  baseURL: BASE_URL,
});

axiosInstanceWithBearer.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
