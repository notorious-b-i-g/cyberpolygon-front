import apiClient from './apiClient';

/**
 * Получение списка категорий
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список категорий
 */
export const getCategories = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/categories/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка категорий:', error);
    throw error;
  }
};

/**
 * Получение категории по ID
 * @param {number} categoryId - ID категории
 * @returns {Promise<Object>} Данные категории
 */
export const getCategoryById = async (categoryId) => {
  try {
    const response = await apiClient.get(`/v1/category/${categoryId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Создание новой категории
 * @param {Object} categoryData - Данные категории
 * @returns {Promise<Object>} Созданная категория
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/v1/categories/', categoryData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    throw error;
  }
};

/**
 * Обновление категории
 * @param {number} categoryId - ID категории
 * @param {Object} categoryData - Данные для обновления
 * @returns {Promise<Object>} Обновленная категория
 */
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await apiClient.put(`/v1/category/${categoryId}/`, categoryData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Частичное обновление категории
 * @param {number} categoryId - ID категории
 * @param {Object} categoryData - Данные для обновления
 * @returns {Promise<Object>} Обновленная категория
 */
export const partialUpdateCategory = async (categoryId, categoryData) => {
  try {
    const response = await apiClient.patch(`/v1/category/${categoryId}/`, categoryData);
    return response;
  } catch (error) {
    console.error(`Ошибка при частичном обновлении категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Удаление категории
 * @param {number} categoryId - ID категории
 * @returns {Promise<Object>} Результат операции
 */
export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`/v1/category/${categoryId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении категории ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Получение заданий по категории
 * @param {number} categoryId - ID категории
 * @returns {Promise<Array>} Список заданий
 */
export const getTasksByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/v1/tasks/?category=${categoryId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении заданий для категории ${categoryId}:`, error);
    throw error;
  }
}; 