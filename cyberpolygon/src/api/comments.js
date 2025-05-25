import apiClient from './apiClient';

/**
 * Получение списка комментариев
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список комментариев
 */
export const getComments = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/comments/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка комментариев:', error);
    throw error;
  }
};

/**
 * Получение комментария по ID
 * @param {number} commentId - ID комментария
 * @returns {Promise<Object>} Данные комментария
 */
export const getCommentById = async (commentId) => {
  try {
    const response = await apiClient.get(`/v1/comment/${commentId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении комментария ${commentId}:`, error);
    throw error;
  }
};

/**
 * Создание нового комментария
 * @param {Object} commentData - Данные комментария
 * @returns {Promise<Object>} Созданный комментарий
 */
export const createComment = async (commentData) => {
  try {
    const response = await apiClient.post('/v1/comments/', commentData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании комментария:', error);
    throw error;
  }
};

/**
 * Обновление комментария
 * @param {number} commentId - ID комментария
 * @param {Object} commentData - Данные для обновления
 * @returns {Promise<Object>} Обновленный комментарий
 */
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await apiClient.put(`/v1/comment/${commentId}/`, commentData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении комментария ${commentId}:`, error);
    throw error;
  }
};

/**
 * Частичное обновление комментария
 * @param {number} commentId - ID комментария
 * @param {Object} commentData - Данные для обновления
 * @returns {Promise<Object>} Обновленный комментарий
 */
export const partialUpdateComment = async (commentId, commentData) => {
  try {
    const response = await apiClient.patch(`/v1/comment/${commentId}/`, commentData);
    return response;
  } catch (error) {
    console.error(`Ошибка при частичном обновлении комментария ${commentId}:`, error);
    throw error;
  }
};

/**
 * Удаление комментария
 * @param {number} commentId - ID комментария
 * @returns {Promise<Object>} Результат операции
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await apiClient.delete(`/v1/comment/${commentId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении комментария ${commentId}:`, error);
    throw error;
  }
};

/**
 * Получение комментариев по заданию
 * @param {number} taskId - ID задания
 * @returns {Promise<Array>} Список комментариев
 */
export const getCommentsByTaskId = async (taskId) => {
  try {
    const response = await apiClient.get(`/v1/comments/?task_id=${taskId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении комментариев для задания ${taskId}:`, error);
    throw error;
  }
};

/**
 * Получение комментариев пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<Array>} Список комментариев
 */
export const getCommentsByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/v1/comments/?user_id=${userId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении комментариев пользователя ${userId}:`, error);
    throw error;
  }
}; 