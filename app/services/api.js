import axios from 'axios';
import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL || 'http://192.168.1.10:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Sessione scaduta');
    }
    return Promise.reject(error);
  }
);

export default api;