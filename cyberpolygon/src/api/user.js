// import axios from 'axios';
import API_CONFIG from '../config/api';
import apiClient from './apiClient';

const API_URL = API_CONFIG.getApiUrl();

/**
 * Получение списка всех пользователей
 * @returns {Promise<Array>} Список пользователей
 */
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/cyberpolygon/api/v1/users/');
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    throw error;
  }
};

/**
 * Получение информации о пользователе по ID
 * @param {number} userId - ID пользователя
 * @returns {Promise<Object>} Информация о пользователе
 */
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/cyberpolygon/api/v1/user/${userId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Создание нового пользователя
 * @param {Object} userData - Данные пользователя
 * @param {string} userData.username - Имя пользователя
 * @param {string} userData.email - Email пользователя
 * @param {string} userData.password - Пароль пользователя
 * @param {string} userData.user_data - Дополнительные данные пользователя
 * @param {string} [userData.telegram_id] - Telegram ID пользователя (опционально)
 * @returns {Promise<Object>} Созданный пользователь
 */
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/cyberpolygon/api/v1/users/', userData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    throw error;
  }
};

/**
 * Обновление пользователя
 * @param {number} userId - ID пользователя
 * @param {Object} userData - Обновленные данные пользователя
 * @returns {Promise<Object>} Обновленный пользователь
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/cyberpolygon/api/v1/user/${userId}/`, userData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Частичное обновление пользователя
 * @param {number} userId - ID пользователя
 * @param {Object} userData - Частично обновленные данные пользователя
 * @returns {Promise<Object>} Обновленный пользователь
 */
export const partialUpdateUser = async (userId, userData) => {
  try {
    const response = await apiClient.patch(`/cyberpolygon/api/v1/user/${userId}/`, userData);
    return response;
  } catch (error) {
    console.error(`Ошибка при частичном обновлении пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Удаление пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<Object>} Результат операции
 */
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/cyberpolygon/api/v1/user/${userId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Получение аватаров пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<Array>} Список аватаров пользователя
 */
export const getUserAvatars = async (userId) => {
  try {
    // Фильтрация по userId может быть реализована на бэкенде или фронтенде
    const response = await apiClient.get('/cyberpolygon/api/v1/avatars/');
    return userId 
      ? response.filter(avatar => avatar.user_id === userId) 
      : response;
  } catch (error) {
    console.error(`Ошибка при получении аватаров пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Загрузка аватара пользователя
 * @param {number} userId - ID пользователя
 * @param {File} avatarFile - Файл аватара
 * @returns {Promise<Object>} Загруженный аватар
 */
export const uploadAvatar = async (userId, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('avatar', avatarFile);
    
    const response = await apiClient.post('/cyberpolygon/api/v1/avatars/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error(`Ошибка при загрузке аватара для пользователя ${userId}:`, error);
    throw error;
  }
};

// Дополнительные функции для работы с текущим пользователем

/**
 * Получение профиля текущего пользователя
 * @returns {Promise<Object>} Профиль пользователя
 */
export const getUserProfile = async () => {
  try {
    // Предполагаем, что получаем ID текущего пользователя из хранилища
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
      throw new Error('Пользователь не авторизован');
    }
    
    return getUserById(currentUser.id);
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error);
    throw error;
  }
};

/**
 * Обновление профиля текущего пользователя
 * @param {Object} profileData - Данные профиля для обновления
 * @returns {Promise<Object>} Обновленный профиль
 */
export const updateUserProfile = async (profileData) => {
  try {
    // Предполагаем, что получаем ID текущего пользователя из хранилища
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
      throw new Error('Пользователь не авторизован');
    }
    
    return partialUpdateUser(currentUser.id, profileData);
  } catch (error) {
    console.error('Ошибка при обновлении профиля пользователя:', error);
    throw error;
  }
};

/**
 * Смена пароля пользователя
 * @param {Object} passwords - Данные для смены пароля
 * @param {string} passwords.current_password - Текущий пароль
 * @param {string} passwords.new_password - Новый пароль
 * @returns {Promise<Object>} Результат операции
 */
export const changeUserPassword = async (passwords) => {
  try {
    // Предполагаем, что получаем ID текущего пользователя из хранилища
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
      throw new Error('Пользователь не авторизован');
    }
    
    // Изменение пароля также может быть реализовано как отдельный эндпоинт
    return partialUpdateUser(currentUser.id, { password: passwords.new_password });
  } catch (error) {
    console.error('Ошибка при смене пароля:', error);
    throw error;
  }
};

export const getUserStatistics = async () => {
  try {
    // Используем apiClient вместо axios
    const response = await apiClient.get('/user/statistics');
    return response;
  } catch (error) {
    console.error('Get statistics error:', error);
    throw error;
  }
};

export const getUserActivity = async () => {
  try {
    // Используем apiClient вместо axios
    const response = await apiClient.get('/user/activity');
    return response;
  } catch (error) {
    console.error('Get activity error:', error);
    throw error;
  }
};