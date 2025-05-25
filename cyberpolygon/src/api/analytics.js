import apiClient from './apiClient';

/**
 * Получение общей статистики платформы
 * @returns {Promise<Object>} Общая статистика
 */
export const getPlatformStatistics = async () => {
  try {
    const response = await apiClient.get('/analytics/platform');
    return response;
  } catch (error) {
    console.error('Ошибка при получении статистики платформы:', error);
    throw error;
  }
};

/**
 * Получение личной статистики пользователя
 * @returns {Promise<Object>} Личная статистика пользователя
 */
export const getUserStatistics = async () => {
  try {
    const response = await apiClient.get('/analytics/user');
    return response;
  } catch (error) {
    console.error('Ошибка при получении личной статистики:', error);
    throw error;
  }
};

/**
 * Получение рейтинга пользователей
 * @param {Object} params - Параметры запроса
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @param {string} params.timeframe - Временной интервал (week, month, alltime)
 * @returns {Promise<Object>} Рейтинг пользователей
 */
export const getUsersRanking = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.timeframe) queryParams.append('timeframe', params.timeframe);
    
    const url = `/analytics/ranking?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении рейтинга пользователей:', error);
    throw error;
  }
};

/**
 * Получение аналитики по заданиям
 * @param {Object} params - Параметры запроса
 * @param {string} params.category - Категория заданий
 * @param {string} params.difficulty - Сложность заданий
 * @param {string} params.period - Период (week, month, year)
 * @returns {Promise<Object>} Аналитика по заданиям
 */
export const getTasksAnalytics = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params.period) queryParams.append('period', params.period);
    
    const url = `/analytics/tasks?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении аналитики по заданиям:', error);
    throw error;
  }
};

/**
 * Получение истории активности пользователя
 * @param {Object} params - Параметры запроса
 * @param {string} params.startDate - Начальная дата (YYYY-MM-DD)
 * @param {string} params.endDate - Конечная дата (YYYY-MM-DD)
 * @param {string} params.activityType - Тип активности (task, course, resource)
 * @returns {Promise<Object>} История активности
 */
export const getUserActivityHistory = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.activityType) queryParams.append('activityType', params.activityType);
    
    const url = `/analytics/activity?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении истории активности:', error);
    throw error;
  }
};

/**
 * Получение аналитики по курсам
 * @param {Object} params - Параметры запроса
 * @param {string} params.category - Категория курсов
 * @param {string} params.status - Статус (active, completed)
 * @returns {Promise<Object>} Аналитика по курсам
 */
export const getCoursesAnalytics = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);
    if (params.status) queryParams.append('status', params.status);
    
    const url = `/analytics/courses?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении аналитики по курсам:', error);
    throw error;
  }
};

/**
 * Получение общего прогресса пользователя
 * @returns {Promise<Object>} Прогресс пользователя
 */
export const getUserProgress = async () => {
  try {
    const response = await apiClient.get('/analytics/progress');
    return response;
  } catch (error) {
    console.error('Ошибка при получении прогресса пользователя:', error);
    throw error;
  }
};

/**
 * Получение статистики атак
 * @param {Object} params - Параметры запроса
 * @param {string} params.period - Период (day, week, month, year)
 * @returns {Promise<Object>} Статистика атак
 */
export const getAttacksStatistics = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.period) queryParams.append('period', params.period);
    
    const url = `/analytics/attacks?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении статистики атак:', error);
    throw error;
  }
}; 