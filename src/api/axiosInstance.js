import axios from 'axios';
import { API } from '../config/env';

// Создаем экземпляр axios с настроенным baseURL
const axiosInstance = axios.create({
  baseURL: API.URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерцепторы для обработки запросов и ответов
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если ошибка 401 (Unauthorized) и запрос не помечен как retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // Пытаемся обновить токен
          const response = await axios.post(`${API.BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          const { access } = response.data;
          localStorage.setItem('token', access);
          
          // Обновляем заголовок Authorization в оригинальном запросе
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Повторяем оригинальный запрос с новым токеном
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Если не удалось обновить токен, очищаем хранилище и перенаправляем на страницу входа
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;