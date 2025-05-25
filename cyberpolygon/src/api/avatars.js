import apiClient from './apiClient';

/**
 * Получение списка аватаров
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список аватаров
 */
export const getAvatars = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/avatars/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка аватаров:', error);
    throw error;
  }
};

/**
 * Получение аватара по ID
 * @param {number} avatarId - ID аватара
 * @returns {Promise<Object>} Данные аватара
 */
export const getAvatarById = async (avatarId) => {
  try {
    const response = await apiClient.get(`/v1/avatars/${avatarId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении аватара ${avatarId}:`, error);
    throw error;
  }
};

/**
 * Создание нового аватара
 * @param {Object} avatarData - Данные аватара
 * @param {number} avatarData.user_id - ID пользователя
 * @param {File} [avatarData.image] - Файл изображения (опционально)
 * @returns {Promise<Object>} Созданный аватар
 */
export const createAvatar = async (avatarData) => {
  try {
    let data;
    
    // Если передан файл изображения, используем FormData
    if (avatarData.image instanceof File) {
      data = new FormData();
      Object.keys(avatarData).forEach(key => {
        data.append(key, avatarData[key]);
      });
    } else {
      data = avatarData;
    }
    
    const response = await apiClient.post('/v1/avatars/', data, {
      headers: avatarData.image instanceof File ? {
        'Content-Type': 'multipart/form-data',
      } : {},
    });
    
    return response;
  } catch (error) {
    console.error('Ошибка при создании аватара:', error);
    throw error;
  }
};

/**
 * Обновление аватара
 * @param {number} avatarId - ID аватара
 * @param {Object} avatarData - Данные для обновления
 * @returns {Promise<Object>} Обновленный аватар
 */
export const updateAvatar = async (avatarId, avatarData) => {
  try {
    let data;
    
    // Если передан файл изображения, используем FormData
    if (avatarData.image instanceof File) {
      data = new FormData();
      Object.keys(avatarData).forEach(key => {
        data.append(key, avatarData[key]);
      });
    } else {
      data = avatarData;
    }
    
    const response = await apiClient.put(`/v1/avatars/${avatarId}/`, data, {
      headers: avatarData.image instanceof File ? {
        'Content-Type': 'multipart/form-data',
      } : {},
    });
    
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении аватара ${avatarId}:`, error);
    throw error;
  }
};

/**
 * Частичное обновление аватара
 * @param {number} avatarId - ID аватара
 * @param {Object} avatarData - Данные для обновления
 * @returns {Promise<Object>} Обновленный аватар
 */
export const partialUpdateAvatar = async (avatarId, avatarData) => {
  try {
    let data;
    
    // Если передан файл изображения, используем FormData
    if (avatarData.image instanceof File) {
      data = new FormData();
      Object.keys(avatarData).forEach(key => {
        data.append(key, avatarData[key]);
      });
    } else {
      data = avatarData;
    }
    
    const response = await apiClient.patch(`/v1/avatars/${avatarId}/`, data, {
      headers: avatarData.image instanceof File ? {
        'Content-Type': 'multipart/form-data',
      } : {},
    });
    
    return response;
  } catch (error) {
    console.error(`Ошибка при частичном обновлении аватара ${avatarId}:`, error);
    throw error;
  }
};

/**
 * Удаление аватара
 * @param {number} avatarId - ID аватара
 * @returns {Promise<Object>} Результат операции
 */
export const deleteAvatar = async (avatarId) => {
  try {
    const response = await apiClient.delete(`/v1/avatars/${avatarId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении аватара ${avatarId}:`, error);
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
    const response = await apiClient.get(`/v1/avatars/?user_id=${userId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении аватаров пользователя ${userId}:`, error);
    throw error;
  }
}; 