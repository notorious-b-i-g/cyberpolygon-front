import apiClient from './apiClient';

/**
 * Получение списка тестов
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список тестов
 */
export const getTests = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/tests/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка тестов:', error);
    throw error;
  }
};

/**
 * Получение теста по ID
 * @param {number} testId - ID теста
 * @returns {Promise<Object>} Данные теста
 */
export const getTestById = async (testId) => {
  try {
    const response = await apiClient.get(`/v1/tests/${testId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении теста ${testId}:`, error);
    throw error;
  }
};

/**
 * Создание нового теста
 * @param {Object} testData - Данные теста
 * @returns {Promise<Object>} Созданный тест
 */
export const createTest = async (testData) => {
  try {
    const response = await apiClient.post('/v1/tests/', testData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании теста:', error);
    throw error;
  }
};

/**
 * Проверка теста
 * @param {Object} checkData - Данные для проверки
 * @returns {Promise<Object>} Результат проверки
 */
export const checkTest = async (checkData) => {
  try {
    const response = await apiClient.post('/v1/tests/check/', checkData);
    return response;
  } catch (error) {
    console.error('Ошибка при проверке теста:', error);
    throw error;
  }
};

/**
 * Получение содержимого теста
 * @param {number} testId - ID теста
 * @returns {Promise<Object>} Содержимое теста
 */
export const getTestContent = async (testId) => {
  try {
    const response = await apiClient.get(`/v1/tests/${testId}/content/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении содержимого теста ${testId}:`, error);
    throw error;
  }
};

/**
 * Отправка ответов на тест
 * @param {number} testId - ID теста
 * @param {Array} answers - Массив ответов
 * @returns {Promise<Object>} Результат проверки
 */
export const submitTestAnswers = async (testId, answers) => {
  try {
    return await checkTest({
      testId,
      answers
    });
  } catch (error) {
    console.error(`Ошибка при отправке ответов на тест ${testId}:`, error);
    throw error;
  }
};

/**
 * Получение результатов теста
 * @param {number} testId - ID теста
 * @returns {Promise<Object>} Результаты теста
 */
export const getTestResults = async (testId) => {
  try {
    const response = await apiClient.get(`/v1/tests/${testId}/results/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении результатов теста ${testId}:`, error);
    throw error;
  }
}; 