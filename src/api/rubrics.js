import axiosInstance from './axiosInstance';

const RUBRICS_URL = '/rubrics';

/**
 * Получить список всех рубрик
 * @returns {Promise<Array>} Массив рубрик
 */
export const getRubrics = async () => {
  const response = await axiosInstance.get(`${RUBRICS_URL}/`);
  return response.data;
};

/**
 * Получить детальную информацию о рубрике по ID
 * @param {number} id - ID рубрики
 * @returns {Promise<Object>} Объект с информацией о рубрике
 */
export const getRubricById = async (id) => {
  const response = await axiosInstance.get(`${RUBRICS_URL}/${id}/`);
  return response.data;
};

/**
 * Получить рубрику по slug через фильтрацию
 * @param {string} slug - Slug рубрики
 * @returns {Promise<Object>} Объект с информацией о рубрике
 */
export const getRubricBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`${RUBRICS_URL}/?slug=${slug}`);
    return Array.isArray(response.data) && response.data.length > 0 
      ? response.data[0] 
      : null;
  } catch (error) {
    return null;
  }
};

/**
 * Получить рубрику по названию
 * @param {string} name - Название рубрики
 * @returns {Promise<Object>} Объект с информацией о рубрике
 */
export const getRubricByName = async (name) => {
  try {
    const response = await axiosInstance.get(`${RUBRICS_URL}/?name=${name}`);
    return Array.isArray(response.data) && response.data.length > 0 
      ? response.data[0] 
      : null;
  } catch (error) {
    return null;
  }
};

/**
 * Создать новую рубрику
 * @param {Object} data - Данные новой рубрики
 * @returns {Promise<Object>} Созданная рубрика
 */
export const createRubric = async (data) => {
  const response = await axiosInstance.post(`${RUBRICS_URL}/`, data);
  return response.data;
};

/**
 * Обновить существующую рубрику
 * @param {number|string} id - ID рубрики
 * @param {Object} data - Данные для обновления
 * @returns {Promise<Object>} Обновленная рубрика
 */
export const updateRubric = async (id, data) => {
  const response = await axiosInstance.patch(`${RUBRICS_URL}/${id}/`, data);
  return response.data;
};

/**
 * Удалить рубрику
 * @param {number|string} id - ID рубрики
 * @returns {Promise<Object>} Результат операции
 */
export const deleteRubric = async (id) => {
  const response = await axiosInstance.delete(`${RUBRICS_URL}/${id}/`);
  return response.data;
};

const rubricsApi = {
  getRubrics,
  getRubricById,
  getRubricBySlug,
  getRubricByName,
  createRubric,
  updateRubric,
  deleteRubric
};

export default rubricsApi; 