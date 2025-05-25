import apiClient from './apiClient';

/**
 * Получение списка категорий форума
 * @returns {Promise<Object>} Список категорий форума
 */
export const getForumCategories = async () => {
  try {
    const response = await apiClient.get('/forums/categories');
    return response;
  } catch (error) {
    console.error('Ошибка при получении категорий форума:', error);
    throw error;
  }
};

/**
 * Получение списка тем в категории
 * @param {string} categoryId - ID категории
 * @param {Object} params - Параметры запроса
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @param {string} params.sort - Сортировка (newest, popular, activity)
 * @returns {Promise<Object>} Список тем в категории
 */
export const getTopicsByCategory = async (categoryId, params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sort) queryParams.append('sort', params.sort);
    
    const url = `/forums/categories/${categoryId}/topics?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении тем категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Создание новой темы
 * @param {string} categoryId - ID категории
 * @param {Object} topicData - Данные темы
 * @param {string} topicData.title - Заголовок темы
 * @param {string} topicData.content - Содержание первого сообщения
 * @param {Array<string>} topicData.tags - Теги темы (опционально)
 * @returns {Promise<Object>} Созданная тема
 */
export const createTopic = async (categoryId, topicData) => {
  try {
    const response = await apiClient.post(`/forums/categories/${categoryId}/topics`, topicData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании темы:', error);
    throw error;
  }
};

/**
 * Получение информации о конкретной теме
 * @param {string} topicId - ID темы
 * @returns {Promise<Object>} Информация о теме
 */
export const getTopicById = async (topicId) => {
  try {
    const response = await apiClient.get(`/forums/topics/${topicId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении информации о теме ${topicId}:`, error);
    throw error;
  }
};

/**
 * Обновление темы
 * @param {string} topicId - ID темы
 * @param {Object} topicData - Новые данные темы
 * @param {string} topicData.title - Заголовок темы
 * @param {Array<string>} topicData.tags - Теги темы
 * @returns {Promise<Object>} Обновленная тема
 */
export const updateTopic = async (topicId, topicData) => {
  try {
    const response = await apiClient.put(`/forums/topics/${topicId}`, topicData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении темы ${topicId}:`, error);
    throw error;
  }
};

/**
 * Удаление темы
 * @param {string} topicId - ID темы
 * @returns {Promise<Object>} Результат операции
 */
export const deleteTopic = async (topicId) => {
  try {
    const response = await apiClient.delete(`/forums/topics/${topicId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении темы ${topicId}:`, error);
    throw error;
  }
};

/**
 * Закрытие темы
 * @param {string} topicId - ID темы
 * @returns {Promise<Object>} Результат операции
 */
export const closeTopic = async (topicId) => {
  try {
    const response = await apiClient.post(`/forums/topics/${topicId}/close`);
    return response;
  } catch (error) {
    console.error(`Ошибка при закрытии темы ${topicId}:`, error);
    throw error;
  }
};

/**
 * Открытие закрытой темы
 * @param {string} topicId - ID темы
 * @returns {Promise<Object>} Результат операции
 */
export const reopenTopic = async (topicId) => {
  try {
    const response = await apiClient.post(`/forums/topics/${topicId}/reopen`);
    return response;
  } catch (error) {
    console.error(`Ошибка при открытии темы ${topicId}:`, error);
    throw error;
  }
};

/**
 * Получение сообщений темы
 * @param {string} topicId - ID темы
 * @param {Object} params - Параметры запроса
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @returns {Promise<Object>} Список сообщений темы
 */
export const getPostsByTopic = async (topicId, params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const url = `/forums/topics/${topicId}/posts?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении сообщений темы ${topicId}:`, error);
    throw error;
  }
};

/**
 * Создание сообщения в теме
 * @param {string} topicId - ID темы
 * @param {Object} postData - Данные сообщения
 * @param {string} postData.content - Содержание сообщения
 * @param {string} postData.parentId - ID родительского сообщения (для ответов, опционально)
 * @returns {Promise<Object>} Созданное сообщение
 */
export const createPost = async (topicId, postData) => {
  try {
    const response = await apiClient.post(`/forums/topics/${topicId}/posts`, postData);
    return response;
  } catch (error) {
    console.error(`Ошибка при создании сообщения в теме ${topicId}:`, error);
    throw error;
  }
};

/**
 * Обновление сообщения
 * @param {string} postId - ID сообщения
 * @param {Object} postData - Новые данные сообщения
 * @param {string} postData.content - Содержание сообщения
 * @returns {Promise<Object>} Обновленное сообщение
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await apiClient.put(`/forums/posts/${postId}`, postData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении сообщения ${postId}:`, error);
    throw error;
  }
};

/**
 * Удаление сообщения
 * @param {string} postId - ID сообщения
 * @returns {Promise<Object>} Результат операции
 */
export const deletePost = async (postId) => {
  try {
    const response = await apiClient.delete(`/forums/posts/${postId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении сообщения ${postId}:`, error);
    throw error;
  }
};

/**
 * Голосование за сообщение (лайк/дизлайк)
 * @param {string} postId - ID сообщения
 * @param {Object} voteData - Данные голосования
 * @param {number} voteData.value - Значение голоса (1 для лайка, -1 для дизлайка, 0 для отмены)
 * @returns {Promise<Object>} Результат операции
 */
export const voteForPost = async (postId, voteData) => {
  try {
    const response = await apiClient.post(`/forums/posts/${postId}/vote`, voteData);
    return response;
  } catch (error) {
    console.error(`Ошибка при голосовании за сообщение ${postId}:`, error);
    throw error;
  }
};

/**
 * Пометить сообщение как решение
 * @param {string} topicId - ID темы
 * @param {string} postId - ID сообщения
 * @returns {Promise<Object>} Результат операции
 */
export const markPostAsSolution = async (topicId, postId) => {
  try {
    const response = await apiClient.post(`/forums/topics/${topicId}/solution`, { postId });
    return response;
  } catch (error) {
    console.error(`Ошибка при отметке сообщения ${postId} как решения:`, error);
    throw error;
  }
};

/**
 * Поиск по форуму
 * @param {Object} params - Параметры запроса
 * @param {string} params.query - Поисковый запрос
 * @param {string} params.categoryId - ID категории (опционально)
 * @param {string} params.type - Тип результатов (topics, posts, all)
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @returns {Promise<Object>} Результаты поиска
 */
export const searchForum = async (params) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append('query', params.query);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params.type) queryParams.append('type', params.type);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const url = `/forums/search?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при поиске по форуму:', error);
    throw error;
  }
}; 