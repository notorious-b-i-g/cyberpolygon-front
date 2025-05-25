import axiosInstance from './axiosInstance';

/**
 * Получить список ресурсов
 * @returns {Promise<Array>} Список ресурсов
 */
export const getResources = async () => {
  const response = await axiosInstance.get('/resources/');
  return response.data;
};

/**
 * Получить ресурс по ID
 * @param {number|string} id - ID ресурса
 * @returns {Promise<Object>} Данные ресурса
 */
export const getResourceById = async (id) => {
  const response = await axiosInstance.get(`/resources/${id}/`);
  return response.data;
};

/**
 * Получить ресурсы по категории
 * @param {string} category - Категория ресурсов
 * @returns {Promise<Array>} Список ресурсов в категории
 */
export const getResourcesByCategory = async (category) => {
  const response = await axiosInstance.get(`/resources/category/${category}/`);
  return response.data;
};

const resourcesApi = {
  list: getResources,
  get: getResourceById,
  getByCategory: getResourcesByCategory
};

export default resourcesApi; 