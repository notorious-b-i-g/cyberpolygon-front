// import axios from 'axios';
import API_CONFIG from '../config/api';
import apiClient from './apiClient';

const API_URL = API_CONFIG.getApiUrl();

/**
 * Вход пользователя
 * @param {Object} credentials - Учетные данные пользователя
 * @param {string} credentials.username - Имя пользователя
 * @param {string} credentials.password - Пароль пользователя
 * @returns {Promise<Object>} Результат операции, включая токен авторизации
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/v1/auth/login/', credentials);
    // Сохраняем токен в localStorage для использования в других запросах
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    console.error('Ошибка при входе в систему:', error);
    throw error;
  }
};

/**
 * Регистрация нового пользователя
 * @param {Object} userData - Данные пользователя
 * @param {string} userData.username - Имя пользователя
 * @param {string} userData.email - Email пользователя
 * @param {string} userData.password - Пароль пользователя
 * @returns {Promise<Object>} Результат операции
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/v1/auth/register/', userData);
    return response;
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
};

/**
 * Выход пользователя
 * @returns {Promise<Object>} Результат операции
 */
export const logout = async () => {
  try {
    const response = await apiClient.post('/v1/auth/logout/');
    // Удаляем токен из localStorage
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
    // В любом случае удаляем токен из localStorage
    localStorage.removeItem('token');
    throw error;
  }
};

/**
 * Проверка аутентификации пользователя
 * @returns {Promise<boolean>} Статус аутентификации
 */
export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    // Эндпоинт для проверки токена пока не реализован в бэкенде
    // При необходимости можно добавить соответствующий запрос
    return true;
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
    return false;
  }
};

/**
 * Сброс пароля пользователя
 * @param {Object} resetData - Данные для сброса пароля
 * @param {string} resetData.email - Email пользователя
 * @returns {Promise<Object>} Результат операции
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await apiClient.post('/v1/auth/reset-password/', resetData);
    return response;
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    throw error;
  }
};

/**
 * Получение данных текущего пользователя
 * @returns {Object|null} Данные пользователя
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

/**
 * Проверка авторизации пользователя
 * @returns {boolean} Результат проверки
 */
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
}; 