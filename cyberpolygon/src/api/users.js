import apiClient from './apiClient';

/**
 * Получение списка пользователей
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список пользователей
 */
export const getUsers = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/users/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    throw error;
  }
};

/**
 * Получение пользователя по ID
 * @param {number} userId - ID пользователя
 * @returns {Promise<Object>} Данные пользователя
 */
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/v1/user/${userId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении пользователя ${userId}:`, error);
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
    const response = await apiClient.delete(`/v1/user/${userId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении пользователя ${userId}:`, error);
    throw error;
  }
};

/**
 * Получение аватаров пользователя
 * @param {number} userId - ID пользователя (опционально)
 * @returns {Promise<Array>} Список аватаров
 */
export const getUserAvatars = async (userId) => {
  try {
    // Если есть userId, получаем аватары конкретного пользователя
    const url = userId ? `/v1/avatars/?user_id=${userId}` : '/v1/avatars/';
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении аватаров пользователя:', error);
    throw error;
  }
};

/**
 * Загрузка аватара для пользователя
 * @param {number} userId - ID пользователя
 * @param {File} avatarFile - Файл аватара
 * @returns {Promise<Object>} Результат операции
 */
export const uploadAvatar = async (userId, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('image', avatarFile);
    
    const response = await apiClient.post('/v1/avatars/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    throw error;
  }
};

/**
 * Получение профиля текущего пользователя
 * @returns {Promise<Object>} Данные профиля
 */
export const getUserProfile = async () => {
  try {
    // Получаем текущего пользователя - этот эндпоинт нужно уточнить в API
    const response = await apiClient.get('/v1/users/profile/');
    return response;
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error);
    throw error;
  }
};

/**
 * Обновление профиля пользователя
 * @param {Object} profileData - Данные профиля
 * @returns {Promise<Object>} Обновленные данные профиля
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/v1/users/profile/', profileData);
    return response;
  } catch (error) {
    console.error('Ошибка при обновлении профиля пользователя:', error);
    throw error;
  }
};

/**
 * Изменение пароля пользователя
 * @param {Object} passwordData - Данные для смены пароля
 * @returns {Promise<Object>} Результат операции
 */
export const changeUserPassword = async (passwordData) => {
  try {
    const response = await apiClient.post('/v1/users/change-password/', passwordData);
    return response;
  } catch (error) {
    console.error('Ошибка при изменении пароля пользователя:', error);
    throw error;
  }
}; 