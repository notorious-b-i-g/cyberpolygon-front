import axios from './axiosInstance';
import { setAuthorizationHeader } from './interceptors';

const AUTH_URL = '';

/**
 * Выход пользователя из системы
 * @returns {Promise} Промис с результатом операции
 */
export const logout = async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setAuthorizationHeader(null);
  return true;
};

/**
 * Получение URL для OAuth авторизации
 * @param {string} provider - Провайдер OAuth (github, yandex, telegram)
 * @returns {Promise<string>} URL для авторизации через OAuth
 */
export const getOAuthUrl = async (provider) => {
  // Создаем state для безопасности OAuth и идентификации провайдера при возврате
  const state = JSON.stringify({ provider, timestamp: Date.now() });
  
  try {
    const response = await axios.get(`/auth/oauth/${provider}/`);
    
    // Добавляем state к полученному URL
    const authUrl = new URL(response.data.authorization_url);
    authUrl.searchParams.set('state', state);
    
    return authUrl.toString();
  } catch (error) {
    throw error;
  }
};

/**
 * Обработка OAuth callback
 * @param {string} code - Код авторизации от OAuth провайдера
 * @param {string} provider - Провайдер OAuth (github, yandex, telegram)
 * @returns {Promise} Промис с данными пользователя и токеном
 */
export const handleOAuthCallback = async (code, provider) => {
  try {
    const response = await axios.post(`/auth/oauth/${provider}/callback/`, { code });
    
    // Сохраняем токены в localStorage
    localStorage.setItem('access_token', response.data.access);
    if (response.data.refresh) {
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    
    // Устанавливаем заголовок авторизации для всех последующих запросов
    setAuthorizationHeader(response.data.access);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Обновление токена доступа с использованием refresh токена
 * @returns {Promise<string>} Новый токен доступа
 */
export const refreshToken = async (refresh) => {
  const response = await axios.post(`/token/refresh/`, { refresh });
  return response.data;
};

/**
 * Проверка авторизации пользователя
 * @returns {boolean} true, если пользователь авторизован
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

/**
 * Получение информации о текущем пользователе
 * @returns {Promise} Промис с данными пользователя
 */
export const getCurrentUser = async () => {
  const response = await axios.get(`${AUTH_URL}/me/`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.patch(`${AUTH_URL}/profile/`, data);
  return response.data;
};

/**
 * Верификация Telegram (если будет включена в будущем)
 * @param {string} userData - Данные пользователя
 * @returns {Promise<Object>} Результат верификации
 */
export const verifyTelegram = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/telegram/verify/`, userData);
  return response.data;
};

const authApi = {
  logout,
  getCurrentUser,
  updateProfile,
  getOAuthUrl,
  handleOAuthCallback,
  isAuthenticated,
  verifyTelegram,
  refreshToken
};

export default authApi;