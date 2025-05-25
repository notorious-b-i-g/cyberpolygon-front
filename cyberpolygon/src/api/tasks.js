// import axios from 'axios';
import API_CONFIG from '../config/api';
import apiClient from './apiClient';

const API_URL = API_CONFIG.getApiUrl();

/**
 * Получение списка задач
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список задач
 */
export const getTasks = async (params = {}) => {
  try {
    const response = await apiClient.get('/v1/tasks/', { params });
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка задач:', error);
    throw error;
  }
};

/**
 * Получение задачи по ID
 * @param {number} taskId - ID задачи
 * @returns {Promise<Object>} Данные задачи
 */
export const getTaskById = async (taskId) => {
  try {
    const response = await apiClient.get(`/v1/task/${taskId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении задачи ${taskId}:`, error);
    throw error;
  }
};

/**
 * Создание новой задачи
 * @param {Object} taskData - Данные задачи
 * @returns {Promise<Object>} Созданная задача
 */
export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/v1/tasks/', taskData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    throw error;
  }
};

/**
 * Обновление задачи
 * @param {number} taskId - ID задачи
 * @param {Object} taskData - Данные для обновления
 * @returns {Promise<Object>} Обновленная задача
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await apiClient.put(`/v1/task/${taskId}/`, taskData);
    return response;
  } catch (error) {
    console.error(`Ошибка при обновлении задачи ${taskId}:`, error);
    throw error;
  }
};

/**
 * Частичное обновление задачи
 * @param {number} taskId - ID задачи
 * @param {Object} taskData - Данные для обновления
 * @returns {Promise<Object>} Обновленная задача
 */
export const partialUpdateTask = async (taskId, taskData) => {
  try {
    const response = await apiClient.patch(`/v1/task/${taskId}/`, taskData);
    return response;
  } catch (error) {
    console.error(`Ошибка при частичном обновлении задачи ${taskId}:`, error);
    throw error;
  }
};

/**
 * Удаление задачи
 * @param {number} taskId - ID задачи
 * @returns {Promise<Object>} Результат операции
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await apiClient.delete(`/v1/task/${taskId}/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении задачи ${taskId}:`, error);
    throw error;
  }
};

/**
 * Проверка флага для задачи
 * @param {number} taskId - ID задачи
 * @param {string} flag - Флаг для проверки
 * @returns {Promise<Object>} Результат проверки
 */
export const checkTaskFlag = async (taskId, flag) => {
  try {
    const response = await apiClient.post('/v1/tasks/check_flag/', {
      task_id: taskId,
      flag
    });
    return response;
  } catch (error) {
    console.error(`Ошибка при проверке флага для задачи ${taskId}:`, error);
    throw error;
  }
};

/**
 * Получение заданий пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<Array>} Список заданий пользователя
 */
export const getUserTasks = async (userId) => {
  try {
    const response = await apiClient.get(`/v1/tasks/?user_id=${userId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении заданий пользователя ${userId}:`, error);
    throw error;
  }
};

// Дополнительные функции для работы с заданиями в контексте обучения

/**
 * Получение списка заданий для обучения (алиас для getTasks)
 * @returns {Promise<Array>} Список заданий
 */
export const getTrainingTasks = async () => {
  return getTasks();
};

/**
 * Старт задания пользователем
 * @param {number} taskId - ID задания
 * @returns {Promise<Object>} Результат операции
 */
export const startTask = async (taskId) => {
  try {
    // Это расширение API, не представленное в спецификации
    // Предполагаем, что этот эндпоинт может быть добавлен позже
    const response = await apiClient.post(`/cyberpolygon/api/v1/task/${taskId}/start/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при старте задания ${taskId}:`, error);
    throw error;
  }
};

/**
 * Отправка ответа на задание
 * @param {number} taskId - ID задания
 * @param {string} answer - Ответ пользователя
 * @returns {Promise<Object>} Результат проверки
 */
export const submitTaskAnswer = async (taskId, answer) => {
  try {
    // Предполагаем, что для этого используется эндпоинт check_flag
    const response = await checkTaskFlag({ taskId, flag: answer });
    return response;
  } catch (error) {
    console.error(`Ошибка при отправке ответа для задания ${taskId}:`, error);
    throw error;
  }
};

/**
 * Получение подсказки к заданию
 * @param {number} taskId - ID задания
 * @returns {Promise<Object>} Подсказка
 */
export const getTaskHint = async (taskId) => {
  try {
    // Это расширение API, не представленное в спецификации
    // Предполагаем, что этот эндпоинт может быть добавлен позже
    const response = await apiClient.get(`/cyberpolygon/api/v1/task/${taskId}/hint/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении подсказки для задания ${taskId}:`, error);
    throw error;
  }
};

/**
 * Получение статуса задания для пользователя
 * @param {number} taskId - ID задания
 * @returns {Promise<Object>} Статус задания
 */
export const getTaskStatus = async (taskId) => {
  try {
    // Это расширение API, не представленное в спецификации
    // Предполагаем, что этот эндпоинт может быть добавлен позже
    const response = await apiClient.get(`/cyberpolygon/api/v1/task/${taskId}/status/`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении статуса задания ${taskId}:`, error);
    throw error;
  }
};

export const submitTaskSolution = async (taskId, solution) => {
  try {
    const response = await apiClient.post(`/tasks/${taskId}/submit`, { solution });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserProgress = async () => {
  try {
    const response = await apiClient.get('/user/progress');
    return response;
  } catch (error) {
    throw error;
  }
}; 